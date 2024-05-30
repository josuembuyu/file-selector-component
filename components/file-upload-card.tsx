import { Trash } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { useRef } from "react";
import { useOpenSelector } from "@/hooks/use-open-selector";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  id: string;
  action: "select" | "delete";
  isSelected?: boolean;
  onChange?: (checked: boolean) => void;
  onDelete?: (fileId: string) => void;
};

export const FileUploadCard = ({
  name,
  id,
  action,
  isSelected,
  onChange,
  onDelete,
}: Props) => {
  const { onOpen } = useOpenSelector();
  const labelRef = useRef<HTMLLabelElement>(null);
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleClick = () => {
    if (action === "select") {
      if (labelRef.current) {
        labelRef.current.click();
      }
    }

    if (action === "delete") {
      onOpen();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="h-9 w-full px-3 inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer"
    >
      <label
        htmlFor={id}
        ref={labelRef}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          {
            "pointer-events-none": action === "delete",
            "cursor-pointer": action === "select",
          }
        )}
      >
        {name}
      </label>

      {action === "select" && (
        <Checkbox checked={isSelected} onCheckedChange={onChange} id={id} />
      )}

      {action === "delete" && (
        <button
          onClick={handleDelete}
          className="text-gray-500 hover:text-red-500"
        >
          <Trash className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
