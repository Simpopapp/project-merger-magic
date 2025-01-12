import { useProject } from "@/contexts/ProjectContext";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectTabs = () => {
  const { projects, activeProject, setActiveProject } = useProject();
  const navigate = useNavigate();

  const handleTabChange = (projectId: string) => {
    setActiveProject(projectId);
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-4">
        <Tabs value={activeProject} onValueChange={handleTabChange}>
          <TabsList>
            {projects.map((project) => (
              <TabsTrigger key={project.id} value={project.id}>
                {project.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectTabs;