import { useEffect } from 'react';
import { useProject } from '@/contexts/ProjectContext';

interface RegisterProjectOptions {
  id: string;
  name: string;
  routes: {
    path: string;
    component: React.ComponentType;
  }[];
}

export const useRegisterProject = (options: RegisterProjectOptions) => {
  const { registerProject } = useProject();

  useEffect(() => {
    registerProject(options);
  }, []);
};