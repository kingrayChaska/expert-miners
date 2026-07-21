import { useState } from "react";

const WEB3FORMS_ACCESS_KEY = "b91ed106-a4b7-47a9-923c-8ad12d1c5fdb";

const inputClass =
  "w-full bg-navy-panel border border-navy-line rounded-[6px] px-[14px] py-[12px] text-white text-[14.5px] focus:outline-none focus:border-gold transition-colors";
const labelClass =
  "block font-mono text-[12.5px] text-[#9aa0c2] tracking-[0.03em] mb-[7px]";

const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Miner Repair Request — Expert Miners");

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const rawText = await response.text();
      let result = {};

      try {
        result = rawText ? JSON.parse(rawText) : {};
      } catch {
        result = {
          success: false,
          message:
            rawText || "The contact service returned an unexpected response.",
        };
      }

      if (result.success) {
        setStatus("success");
        setErrorMessage("");
        form.reset();
      } else {
        console.error("Web3Forms submission failed:", result);
        setErrorMessage(
          result.message ||
            "Something went wrong sending your request. Please try again, or message us on WhatsApp instead.",
        );
        setStatus("error");
      }
    } catch (err) {
      console.error("Web3Forms request error:", err);
      setErrorMessage(
        "The contact service is not responding right now. Please try again in a moment, or message us on WhatsApp instead.",
      );
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-[100px]">
      <div className="max-w-[1180px] mx-auto px-[28px]">
        <div className="mb-[56px]">
          <h2 className="text-[28px] md:text-[42px] font-[700] text-white mb-[16px]">
            Have a miner that needs <span className="gold-text">repair?</span>
          </h2>
          <p className="text-[17px] text-[#9aa0c2] max-w-[560px]">
            Fill out the form and our team will get in touch — or message us
            directly on WhatsApp for urgent issues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[18px]">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[18px]">
              <div>
                <label className={labelClass}>Phone / WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+971 ..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Miner Brand</label>
                <select name="miner_brand" className={inputClass}>
                  <option>Bitmain</option>
                  <option>WhatsMiner</option>
                  <option>Avalon</option>
                  <option>Iceriver</option>
                  <option>Goldshell</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[18px]">
              <div>
                <label className={labelClass}>Miner Model</label>
                <input
                  type="text"
                  name="miner_model"
                  placeholder="e.g. Antminer S21"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Issue Type</label>
                <select name="issue_type" className={inputClass}>
                  <option>Not Hashing</option>
                  <option>Low Hashrate</option>
                  <option>PSU Issue</option>
                  <option>Hashboard Fault</option>
                  <option>Overheating</option>
                  <option>Firmware Issue</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="mb-[18px]">
              <label className={labelClass}>Repair Urgency</label>
              <select name="urgency" className={inputClass}>
                <option>Normal</option>
                <option>Urgent</option>
                <option>Critical – Miner Down</option>
              </select>
            </div>

            <div className="mb-[18px]">
              <label className={labelClass}>Describe the Issue</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Tell us what's happening with your miner..."
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="px-[26px] py-[14px] rounded-[6px] bg-gold text-[#161005] font-[600] text-[14.5px] hover:bg-[#f2b558] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Request"}
            </button>

            {status === "success" && (
              <div className="mt-[14px] font-mono text-[13.5px] text-gold">
                Thanks — your request has been sent. Our team will reach out
                shortly.
              </div>
            )}
            {status === "error" && (
              <div className="mt-[14px] font-mono text-[13.5px] text-red-400">
                {errorMessage}
              </div>
            )}
          </form>

          <div className="bg-navy-panel border border-navy-line rounded-[12px] p-[34px]">
            <div className="flex gap-[16px] py-[16px] border-b border-navy-line">
              <div className="w-[38px] h-[38px] rounded-[7px] bg-navy-panel2 border border-navy-line flex items-center justify-center text-gold flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-[17px] h-[17px]"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-[12px] uppercase tracking-[0.04em] text-[#9aa0c2] mb-[3px]">
                  Call Us Anytime
                </div>
                <div className="text-[14.5px] text-white">+971 50 156 2488</div>
              </div>
            </div>

            <div className="flex gap-[16px] py-[16px] border-b border-navy-line">
              <div className="w-[38px] h-[38px] rounded-[7px] bg-navy-panel2 border border-navy-line flex items-center justify-center text-gold flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-[17px] h-[17px]"
                >
                  <path d="M22 6l-10 7L2 6" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-[12px] uppercase tracking-[0.04em] text-[#9aa0c2] mb-[3px]">
                  Email
                </div>
                <div className="text-[14.5px] text-white">
                  info@expertminers.com
                </div>
              </div>
            </div>

            <div className="flex gap-[16px] py-[16px] border-b border-navy-line">
              <div className="w-[38px] h-[38px] rounded-[7px] bg-navy-panel2 border border-navy-line flex items-center justify-center text-gold flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-[17px] h-[17px]"
                >
                  <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-[12px] uppercase tracking-[0.04em] text-[#9aa0c2] mb-[3px]">
                  Visit Our Location
                </div>
                <div className="text-[14.5px] text-white">
                  Warehouse 6, 19th street, Al noud. Al ain - Abu Dhabi, UAE
                </div>
              </div>
            </div>

            <div className="flex gap-[16px] py-[16px]">
              <div className="w-[38px] h-[38px] rounded-[7px] bg-navy-panel2 border border-navy-line flex items-center justify-center text-gold flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-[17px] h-[17px]"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-[12px] uppercase tracking-[0.04em] text-[#9aa0c2] mb-[3px]">
                  Hours
                </div>
                <div className="text-[14.5px] text-white">
                  10:00 AM – 8:00 PM · Available 24/7 for critical repairs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
