import { ChangeEvent, useRef } from "react";
import { Button } from "./ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Upload } from "lucide-react";

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
      <Button
        onClick={handleUploadClick}
        variant="outline"
        className="w-full gap-7"
      >
        <p>Upload files</p>
        <Upload className="w-5 h-5 text-gray-600" />
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
