import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProjectTabs from "./components/ProjectTabs";
import ProjectRouter from "./components/ProjectRouter";
import { ProjectProvider } from "./contexts/ProjectContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProjectProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ProjectTabs />
          <Routes>
            <Route path="/project/:projectId/*" element={<ProjectRouter />} />
            <Route path="/" element={<Navigate to="/project/1" replace />} />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;