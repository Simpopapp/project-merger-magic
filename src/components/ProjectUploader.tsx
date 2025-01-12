import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { useProject } from "@/contexts/ProjectContext";

export const ProjectUploader = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { registerProject } = useProject();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsProcessing(true);
      const files = event.target.files;
      
      if (!files) {
        toast({
          title: "Erro",
          description: "Nenhum arquivo selecionado",
          variant: "destructive",
        });
        return;
      }

      // Organize files by project folder
      const projects = Array.from(files).reduce((acc: Record<string, File[]>, file) => {
        const projectName = file.webkitRelativePath.split('/')[0];
        if (!acc[projectName]) acc[projectName] = [];
        acc[projectName].push(file);
        return acc;
      }, {});

      // Register each project
      Object.entries(projects).forEach(([projectName, projectFiles], index) => {
        registerProject({
          id: (index + 2).toString(), // Start from 2 since we have project 1
          name: projectName,
          routes: [{
            path: "/",
            component: () => (
              <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">{projectName}</h1>
                <div className="grid gap-4">
                  {projectFiles.map((file, i) => (
                    <div key={i} className="p-4 border rounded">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.webkitRelativePath}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          }]
        });
      });

      toast({
        title: "Sucesso",
        description: `${Object.keys(projects).length} projetos importados`,
      });
    } catch (error) {
      console.error("Error processing files:", error);
      toast({
        title: "Erro",
        description: "Erro ao processar os arquivos",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <label htmlFor="project-upload">
        <div className="flex flex-col items-center gap-2 p-8 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
          <Upload className="w-12 h-12 text-gray-400" />
          <p className="text-sm text-gray-600">Arraste pastas aqui ou clique para selecionar</p>
        </div>
        <input
          id="project-upload"
          type="file"
          // @ts-ignore
          webkitdirectory=""
          // @ts-ignore
          directory=""
          multiple
          className="hidden"
          onChange={handleFileUpload}
          disabled={isProcessing}
        />
      </label>
      {isProcessing && (
        <Button disabled>
          Processando...
        </Button>
      )}
    </div>
  );
};