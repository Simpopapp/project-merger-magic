import { ProjectUploader } from "@/components/ProjectUploader";

const Index = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">
        Mesclador de Projetos
      </h1>
      <ProjectUploader />
    </div>
  );
};

export default Index;