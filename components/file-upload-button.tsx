import { ChangeEvent, useRef } from "react";
import { Button } from "./ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";

type Props = {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const FileUploadButton = ({ handleFileChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Button onClick={handleUploadClick} variant="outline" className="w-full">
        Upload files
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
      />
    </>
  );
};
