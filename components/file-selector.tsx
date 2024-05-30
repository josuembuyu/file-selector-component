import { useOpenSelector } from "@/hooks/use-open-selector";
import { Button } from "./ui/button";
import { FileSelectorSheet } from "./file-selector-sheet";
import { FileUploadCard } from "./file-upload-card";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Upload } from "lucide-react";

type Props = {
  selectedFileIds: string[];
  selectFiles: (fileIds: string[]) => void;
  removeFile: (fileId: string) => void;
};

export const FileSelector = ({
  selectedFileIds,
  selectFiles,
  removeFile,
}: Props) => {
  const { onOpen, onClose } = useOpenSelector();

  const { files, handleFileChange, updateFileSelection, deselectAllFiles } =
    useFileUpload();

  const handleFileDelete = (id: string) => {
    removeFile(id);
    updateFileSelection(id, false);
  };

  const handleCloseSheet = () => {
    onClose();
    deselectAllFiles(selectedFileIds);
  };

  return (
    <div className="space-y-4">
      <Button className="w-full gap-7" variant="outline" onClick={onOpen}>
        <p>Select files</p>
        <Upload className="w-5 h-5 text-gray-600" />
      </Button>

      <div className="grid grid-cols-2 gap-4">
        {selectedFileIds.map((file) => (
          <FileUploadCard
            key={file}
            name={file}
            id={file}
            onDelete={handleFileDelete}
            action="delete"
          />
        ))}
      </div>

      <FileSelectorSheet
        files={files}
        selectFiles={selectFiles}
        handleCloseSheet={handleCloseSheet}
        handleFileChange={handleFileChange}
        handleFileSelect={(checked, id) => updateFileSelection(id, checked)}
      />
    </div>
  );
};
