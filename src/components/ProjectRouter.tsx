import { useProject } from "@/contexts/ProjectContext";
import { useParams, Routes, Route } from "react-router-dom";

const ProjectRouter = () => {
  const { projects } = useProject();
  const { projectId } = useParams();

  const currentProject = projects.find(p => p.id === projectId);

  if (!currentProject) {
    return <div>Project not found</div>;
  }

  return (
    <Routes>
      {currentProject.routes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default ProjectRouter;