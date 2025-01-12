import { useProject } from "@/contexts/ProjectContext";
import { useParams, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import { ProjectUploader } from "./ProjectUploader";

const ProjectRouter = () => {
  const { projects } = useProject();
  const { projectId } = useParams();

  const currentProject = projects.find(p => p.id === projectId);

  if (!currentProject) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Project Merger</h1>
        <p className="text-gray-600 mb-8">
          Para começar, faça upload dos seus projetos arrastando as pastas para a área abaixo
          ou clicando para selecionar.
        </p>
        <ProjectUploader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      {currentProject.routes?.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default ProjectRouter;