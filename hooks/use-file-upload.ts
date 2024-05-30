import { ChangeEvent, useState } from "react";

interface FileWrapper {
  file: File;
  id: string;
  isSelected: boolean;
}

export const useFileUpload = () => {
  const [files, setFiles] = useState<FileWrapper[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
      const fileWrappers = Array.from(newFiles).map((file) => ({
        file,
        id: file.name,
        isSelected: false,
      }));

      const uniqueFileWrappers = fileWrappers.filter(
        (newFile) => !files.some((file) => file.id === newFile.id)
      );

      setFiles((prevFiles) => [...prevFiles, ...uniqueFileWrappers]);
    }
  };

  const updateFileSelection = (id: string, isSelected: boolean) => {
    setFiles(
      files.map((file) => (file.id === id ? { ...file, isSelected } : file))
    );
  };

  const deselectAllFiles = (selectedFileIds: string[]) => {
    setFiles(
      files.map((file) =>
        selectedFileIds.includes(file.id)
          ? file
          : { ...file, isSelected: false }
      )
    );
  };

  return { files, handleFileChange, updateFileSelection, deselectAllFiles };
};
