import { ChangeEvent, useState } from "react";

interface FileWrapper {
  file: File;
  id: string;
  isSelected: boolean;
  isLoading?: boolean;
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
        isLoading: true,
      }));

      const uniqueFileWrappers = fileWrappers.filter(
        (newFile) => !files.some((file) => file.id === newFile.id)
      );

      setFiles((prevFiles) => [...prevFiles, ...uniqueFileWrappers]);

      setTimeout(() => {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            uniqueFileWrappers.some((newFile) => newFile.id === file.id)
              ? { ...file, isLoading: false }
              : file
          )
        );
      }, 2000);
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
