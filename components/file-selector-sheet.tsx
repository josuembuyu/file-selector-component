import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useOpenSelector } from "@/hooks/use-open-selector";
import { Button } from "@/components/ui/button";
import { FileUploadButton } from "@/components/file-upload-button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { FileUploadCard } from "./file-upload-card";
import { ChangeEvent } from "react";
interface FileWrapper {
  file: File;
  id: string;
  isSelected: boolean;
}

type Props = {
  files: FileWrapper[];
  handleFileSelect: (checked: boolean, id: string) => void;
  handleCloseSheet: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectFiles: (fileIds: string[]) => void;
};

export const FileSelectorSheet = ({
  files,
  handleFileSelect,
  handleFileChange,
  selectFiles,
  handleCloseSheet,
}: Props) => {
  const { isOpen, onClose } = useOpenSelector();

  const checkedFiles = files.filter((file) => file.isSelected);

  return (
    <Sheet open={isOpen} onOpenChange={handleCloseSheet}>
      <SheetContent className="gap-y-4 flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Select files</SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto max-h-[40rem]">
          {files.length === 0 ? (
            <p className="text-center py-3 text-gray-700 text-sm">
              No files uploaded, please upload
            </p>
          ) : (
            <div className="space-y-2.5">
              {files.map((file) => (
                <FileUploadCard
                  key={file.id}
                  name={file.file.name}
                  id={file.id}
                  isSelected={file.isSelected}
                  action="select"
                  onChange={(checked) => {
                    handleFileSelect(checked, file.id);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <FileUploadButton handleFileChange={handleFileChange} />
          <Button
            onClick={() => selectFiles(checkedFiles.map((file) => file.id))}
            disabled={checkedFiles.length === 0}
            className="w-full bg-violet-600 hover:bg-violet-500"
          >
            Add files ({checkedFiles.length} selected)
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
