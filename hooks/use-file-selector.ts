import { useState } from "react";
import { useOpenSelector } from "./use-open-selector";
import { useFileUpload } from "./use-file-upload";
import { useToast } from "@/components/ui/use-toast";

export const useFileSelector = () => {
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const { onClose } = useOpenSelector();
  const { toast } = useToast();

  const selectFiles = (fileIds: string[]) => {
    setSelectedFileIds(fileIds);

    toast({
      title: "Files selected succefully",
    });

    onClose();
  };

  const addFile = (fileId: string) => {
    setSelectedFileIds((prev) => [...prev, fileId]);
  };

  const removeFile = (fileId: string) => {
    setSelectedFileIds((prev) => prev.filter((id) => id !== fileId));
  };

  return {
    selectedFileIds,
    selectFiles,
    addFile,
    removeFile,
  };
};
