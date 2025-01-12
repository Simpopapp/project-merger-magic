import React, { createContext, useContext, useState } from 'react';

interface Project {
  id: string;
  name: string;
  routes: {
    path: string;
    component: React.ComponentType;
  }[];
}

interface ProjectContextType {
  projects: Project[];
  activeProject: string;
  setActiveProject: (id: string) => void;
  registerProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<string>('1');

  const registerProject = (project: Project) => {
    setProjects(prev => {
      const exists = prev.find(p => p.id === project.id);
      if (exists) return prev;
      return [...prev, project];
    });
  };

  return (
    <ProjectContext.Provider value={{ projects, activeProject, setActiveProject, registerProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};