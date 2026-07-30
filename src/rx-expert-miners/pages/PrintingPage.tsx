import { useState, useRef, useEffect } from "react";
import { Printer, Copy, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  getReceiveQueue,
  getDispatchQueue,
  setReceiveQueue,
  setDispatchQueue,
  clearReceiveQueue,
  clearDispatchQueue,
  normalizeReceiveQueue,
  normalizeDispatchQueue,
} from "@/utils/printQueue";

const WAREHOUSE_NOTE =
  "Miners unapproved or repaired and stored over 30 days will incur a $1/day warehouse fee thereafter.";

type ReceiveRow = {
  entryData: string;
  clientName: string;
  serialNumber: string;
  psuSerial: string;
  hbSerial: string;
  minerModel: string;
  location: string;
  note: string;
};

type DispatchRow = {
  serialNumber: string;
  minerModel: string;
  psuNumber: string;
  hashboardSerial: string;
  workOrder: string;
  finalStatus: string;
  dispatchDate: string;
  location: string;
};

const emptyReceive = (): ReceiveRow => ({
  entryData: "",
  clientName: "",
  serialNumber: "",
  psuSerial: "",
  hbSerial: "",
  minerModel: "",
  location: "",
  note: "",
});

const emptyDispatch = (): DispatchRow => ({
  serialNumber: "",
  minerModel: "",
  psuNumber: "",
  hashboardSerial: "",
  workOrder: "",
  finalStatus: "",
  dispatchDate: "",
  location: "",
});

const today = () => new Date().toISOString().slice(0, 10);

// --- column definitions (single source of truth for both the edit table and the print table) ---
type Column<T> = { key: keyof T; label: string; type?: "text" | "date" };

const RECEIVE_COLUMNS: Column<ReceiveRow>[] = [
  { key: "entryData", label: "Entry Data" },
  { key: "clientName", label: "Client Name" },
  { key: "serialNumber", label: "Serial Number" },
  { key: "psuSerial", label: "PSU Serial" },
  { key: "hbSerial", label: "HB Serial" },
  { key: "minerModel", label: "Miner Model" },
  { key: "location", label: "Location" },
  { key: "note", label: "Note" },
];

const DISPATCH_COLUMNS: Column<DispatchRow>[] = [
  { key: "serialNumber", label: "Serial Number" },
  { key: "minerModel", label: "Miner Model" },
  { key: "psuNumber", label: "PSU Number" },
  { key: "hashboardSerial", label: "Hashboard Serial" },
  { key: "workOrder", label: "Work Order" },
  { key: "finalStatus", label: "Final Status" },
  { key: "dispatchDate", label: "Dispatch Date", type: "date" },
  { key: "location", label: "Location" },
];

// --- generic row helpers (shared by receive + dispatch state) ---
const rowHasData = (row: Record<string, string>) =>
  Object.values(row).some((v) => v.trim() !== "");

function updateRow<T>(rows: T[], i: number, key: keyof T, value: string): T[] {
  return rows.map((r, idx) => (idx === i ? { ...r, [key]: value } : r));
}

function removeRow<T>(rows: T[], i: number, makeEmpty: () => T): T[] {
  return rows.length === 1 ? [makeEmpty()] : rows.filter((_, idx) => idx !== i);
}

// --- shared table components ---
function EditableTable<T extends Record<string, string>>({
  columns,
  rows,
  onChange,
  onRemove,
}: {
  columns: Column<T>[];
  rows: T[];
  onChange: (i: number, key: keyof T, value: string) => void;
  onRemove: (i: number) => void;
}) {
  return (
    <table className="w-full text-sm border">
      <thead className="bg-muted">
        <tr>
          {columns.map((c) => (
            <th key={String(c.key)} className="border px-2 py-1 text-left">
              {c.label}
            </th>
          ))}
          <th className="border px-2 py-1 w-10" />
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={String(c.key)} className="border p-0">
                <Input
                  type={c.type ?? "text"}
                  className="h-8 border-0 rounded-none"
                  value={row[c.key]}
                  onChange={(e) => onChange(i, c.key, e.target.value)}
                />
              </td>
            ))}
            <td className="border p-0 text-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onRemove(i)}
              >
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PrintTable<T extends Record<string, string>>({
  columns,
  rows,
}: {
  columns: Column<T>[];
  rows: T[];
}) {
  return (
    <table className="w-full text-xs border border-black border-collapse">
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={String(c.key)}
              className="border border-black px-1 py-1 text-left bg-gray-100"
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={String(c.key)} className="border border-black px-1 py-1">
                {row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const PrintingPage = () => {
  const [mode, setMode] = useState<"receive" | "dispatch">("receive");

  // Receive state
  const [receivedBy, setReceivedBy] = useState("HASSAN ISMAIL");
  const [rDeliveredBy, setRDeliveredBy] = useState("");
  const [rDate, setRDate] = useState(today());
  const [rRows, setRRows] = useState<ReceiveRow[]>([emptyReceive()]);

  // Dispatch state
  const [dCustomerName, setDCustomerName] = useState("");
  const [dDate, setDDate] = useState(today());
  const [dRows, setDRows] = useState<DispatchRow[]>([emptyDispatch()]);

  const printRef = useRef<HTMLDivElement>(null);
  const selfWriteRef = useRef(0);
  const queuesReadyRef = useRef(false);

  // Auto-load any queued items from MasterData / scanners
  useEffect(() => {
    const loadQueues = () => {
      if (selfWriteRef.current > 0) {
        selfWriteRef.current -= 1;
        return;
      }
      const rq = getReceiveQueue();
      setRRows(
        rq.length
          ? rq
              .map((q) => ({
                entryData: q.entryData || "",
                clientName: q.clientName || "",
                serialNumber: q.serialNumber || "",
                psuSerial: q.psuSerial || "",
                hbSerial: q.hbSerial || "",
                minerModel: q.minerModel || "",
                location: q.location || "",
                note: q.note || "",
              }))
              .concat([emptyReceive()])
          : [emptyReceive()],
      );
      const dq = getDispatchQueue();
      const customer = dq.find((q) => q.customerName)?.customerName;
      setDCustomerName(customer || "");
      setDRows(
        dq.length
          ? dq
              .map((q) => ({
                serialNumber: q.serialNumber || "",
                minerModel: q.minerModel || "",
                psuNumber: q.psuNumber || "",
                hashboardSerial: q.hashboardSerial || "",
                workOrder: q.workOrder || "",
                finalStatus: q.finalStatus || "",
                dispatchDate: q.dispatchDate || today(),
                location: q.location || "",
              }))
              .concat([emptyDispatch()])
          : [emptyDispatch()],
      );
    };
    loadQueues();
    const readyTimer = window.setTimeout(() => {
      queuesReadyRef.current = true;
    }, 0);
    const handler = () => loadQueues();
    window.addEventListener("print-queue-changed", handler);
    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("print-queue-changed", handler);
    };
  }, []);

  const updateR = (i: number, k: keyof ReceiveRow, v: string) =>
    setRRows((rs) => updateRow(rs, i, k, v));
  const updateD = (i: number, k: keyof DispatchRow, v: string) =>
    setDRows((rs) => updateRow(rs, i, k, v));

  const removeR = (i: number) =>
    setRRows((rs) => removeRow(rs, i, emptyReceive));
  const removeD = (i: number) =>
    setDRows((rs) => removeRow(rs, i, emptyDispatch));

  const rQuantity = rRows.filter(rowHasData).length;
  const dQuantity = dRows.filter(rowHasData).length;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    const el = printRef.current;
    if (!el) return;
    try {
      const html = el.innerHTML;
      const text = el.innerText;
      if (navigator.clipboard && (window as any).ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([text], { type: "text/plain" }),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(text);
      }
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Copy failed");
    }
  };

  const clearAll = () => {
    if (mode === "receive") {
      setRRows([emptyReceive()]);
      clearReceiveQueue();
    } else {
      setDRows([emptyDispatch()]);
      clearDispatchQueue();
    }
    toast.success("Cleared");
  };

  // Keep queue in sync with edits so it persists across navigations
  useEffect(() => {
    if (!queuesReadyRef.current) return;
    const items = normalizeReceiveQueue(
      rRows.filter(rowHasData).map((r) => ({
        entryData: r.entryData,
        clientName: r.clientName,
        serialNumber: r.serialNumber,
        psuSerial: r.psuSerial,
        hbSerial: r.hbSerial,
        minerModel: r.minerModel,
        location: r.location,
        note: r.note,
      })),
    );
    selfWriteRef.current += 1;
    setReceiveQueue(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rRows]);

  useEffect(() => {
    if (!queuesReadyRef.current) return;
    const items = normalizeDispatchQueue(
      dRows.filter(rowHasData).map((r) => ({
        serialNumber: r.serialNumber,
        minerModel: r.minerModel,
        psuNumber: r.psuNumber,
        hashboardSerial: r.hashboardSerial,
        workOrder: r.workOrder,
        finalStatus: r.finalStatus,
        dispatchDate: r.dispatchDate,
        location: r.location,
        customerName: dCustomerName,
      })),
    );
    selfWriteRef.current += 1;
    setDispatchQueue(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dRows, dCustomerName]);

  return (
    <div className="space-y-4">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; padding: 16px; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="flex items-center justify-between gap-3 no-print flex-wrap">
        <div className="flex items-center gap-3">
          <Printer className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Printing</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={mode === "receive" ? "default" : "outline"}
            onClick={() => setMode("receive")}
          >
            <Check className="h-4 w-4 mr-1" /> Receive
          </Button>
          <Button
            size="sm"
            variant={mode === "dispatch" ? "default" : "outline"}
            onClick={() => setMode("dispatch")}
          >
            <Check className="h-4 w-4 mr-1" /> Dispatch
          </Button>
          <Button size="sm" variant="ghost" onClick={clearAll} title="Clear">
            <Trash2 className="h-4 w-4 mr-1" /> Clear
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            title="Copy for print"
          >
            <Copy className="h-4 w-4 mr-1" /> Copy
          </Button>
          <Button size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1" /> Print
          </Button>
        </div>
      </div>

      {mode === "receive" && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3 no-print">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <Label>Received By</Label>
              <Input
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
              />
            </div>
            <div>
              <Label>Customer Name</Label>
              <Input
                value={rDeliveredBy}
                onChange={(e) => setRDeliveredBy(e.target.value)}
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={rDate}
                onChange={(e) => setRDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input value={String(rQuantity)} readOnly />
            </div>
          </div>
          <div className="overflow-x-auto">
            <EditableTable
              columns={RECEIVE_COLUMNS}
              rows={rRows}
              onChange={updateR}
              onRemove={removeR}
            />
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setRRows((rs) => [...rs, emptyReceive()])}
          >
            + Add Row
          </Button>
        </div>
      )}

      {mode === "dispatch" && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3 no-print">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label>Customer Name</Label>
              <Input
                value={dCustomerName}
                onChange={(e) => setDCustomerName(e.target.value)}
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={dDate}
                onChange={(e) => setDDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input value={String(dQuantity)} readOnly />
            </div>
          </div>
          <div className="overflow-x-auto">
            <EditableTable
              columns={DISPATCH_COLUMNS}
              rows={dRows}
              onChange={updateD}
              onRemove={removeD}
            />
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setDRows((rs) => [...rs, emptyDispatch()])}
          >
            + Add Row
          </Button>
        </div>
      )}

      {/* Printable area */}
      <div
        ref={printRef}
        className="print-area rounded-lg border border-border bg-white text-black p-6 space-y-3"
      >
        <div className="flex items-center justify-between border-b border-black pb-2 mb-2">
          <img
            src="/logo.png"
            alt="RX Expert Miners"
            className="h-14 object-contain"
          />
          <div className="text-right text-xs leading-tight">
            <div className="font-bold text-base">RX EXPERT MINERS</div>
            <div>Hardware Service & Maintenance</div>
          </div>
        </div>
        {mode === "receive" ? (
          <>
            <h2 className="text-xl font-bold text-center">Receive</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <b>Received By:</b> {receivedBy}
              </div>
              <div>
                <b>Customer Name:</b> {rDeliveredBy}
              </div>
              <div>
                <b>Quantity:</b> {rQuantity}
              </div>
              <div>
                <b>Date:</b> {rDate}
              </div>
            </div>
            <div className="text-sm italic">Note: "{WAREHOUSE_NOTE}"</div>
            <PrintTable columns={RECEIVE_COLUMNS} rows={rRows} />
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-center">Dispatch</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <b>Customer Name:</b> {dCustomerName}
              </div>
              <div>
                <b>Date:</b> {dDate}
              </div>
              <div>
                <b>Quantity:</b> {dQuantity}
              </div>
            </div>
            <div className="text-sm italic">Note: "{WAREHOUSE_NOTE}"</div>
            <PrintTable columns={DISPATCH_COLUMNS} rows={dRows} />
          </>
        )}
      </div>
    </div>
  );
};

export default PrintingPage;
