
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Membres from "./pages/Membres";
import Cotisations from "./pages/Cotisations";
import Prets from "./pages/Prets";
import Parametres from "./pages/Parametres";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = sessionStorage.getItem("user") !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-tontine-primary mb-2">Tontine Africa</h1>
          <p className="text-muted-foreground">Chargement de l'application...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/" 
                element={<ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute>} 
              />
              <Route 
                path="/dashboard" 
                element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
              />
              <Route 
                path="/membres" 
                element={<ProtectedRoute><Membres /></ProtectedRoute>} 
              />
              <Route 
                path="/cotisations" 
                element={<ProtectedRoute><Cotisations /></ProtectedRoute>} 
              />
              <Route 
                path="/prets" 
                element={<ProtectedRoute><Prets /></ProtectedRoute>} 
              />
              <Route 
                path="/parametres" 
                element={<ProtectedRoute><Parametres /></ProtectedRoute>} 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
