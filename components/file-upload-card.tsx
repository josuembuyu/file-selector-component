import { Loader2, Trash } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { useRef } from "react";
import { useOpenSelector } from "@/hooks/use-open-selector";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  id: string;
  action: "select" | "delete" | "loading";
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
      className="h-9 w-full px-3 gap-4 inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer overflow-hidden"
    >
      <div className="flex-1 min-w-0">
        <label
          htmlFor={id}
          ref={labelRef}
          className={cn(
            "block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 overflow-hidden text-ellipsis whitespace-nowrap",
            {
              "pointer-events-none": action === "delete",
              "cursor-pointer": action === "select",
            }
          )}
        >
          {name}
        </label>
      </div>

      {action === "select" && (
        <Checkbox checked={isSelected} onCheckedChange={onChange} id={id} />
      )}

      {action === "delete" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="text-gray-500 hover:text-red-500"
        >
          <Trash className="w-5 h-5" />
        </button>
      )}

      {action === "loading" && (
        <Loader2 className="animate-spin text-muted-foreground h-5 w-5" />
      )}
    </div>
  );
};
