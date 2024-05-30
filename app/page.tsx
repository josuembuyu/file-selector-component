"use client";

import { FileSelector } from "@/components/file-selector";
import { useFileSelector } from "@/hooks/use-file-selector";

export default function Home() {
  const { selectedFileIds, ...props } = useFileSelector();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-1/3">
        <FileSelector selectedFileIds={selectedFileIds} {...props} />
      </div>
    </div>
  );
}
