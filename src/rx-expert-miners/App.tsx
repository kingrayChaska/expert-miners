import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useApprovalNotifications } from "@/hooks/useApprovalNotifications";
import { supabase } from "@/services/supabase";
import AppRoutes from "@/routes/AppRoutes";

const queryClient = new QueryClient();

function NotificationListener() {
  useApprovalNotifications();
  return null;
}

function AuthInvalidator() {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, []);
  return null;
}

const App = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('rx-theme');
    const isDark = stored ? stored === 'dark' : true;
    if (wrapperRef.current) wrapperRef.current.classList.toggle('dark', isDark);
  }, []);

  return (
    <div ref={wrapperRef} className="data-bridge-app">
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Sonner theme="dark" />
              <AuthInvalidator />
              <NotificationListener />
              <AppRoutes />
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
