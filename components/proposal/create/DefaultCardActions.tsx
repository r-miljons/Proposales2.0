import * as React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
type KeyOf<T> = Extract<keyof T, string>;

interface DefaultCardActionsProps<T> {
  item: T;
  onEdit: (item: T) => void;
  onRemove: (uuid: string) => void;
  uuidKey?: KeyOf<T>;
}

export function DefaultCardActions<T>({ item, onEdit, onRemove, uuidKey = "uuid" as KeyOf<T> }: DefaultCardActionsProps<T>) {
  return (
    <div className="flex flex-col gap-1 absolute right-2 top-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="shrink-0 text-muted-foreground hover:text-primary"
        onClick={e => {
          e.stopPropagation();
          onEdit(item);
        }}
        aria-label="Edit item"
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="shrink-0 text-muted-foreground hover:text-destructive"
        onClick={e => {
          e.stopPropagation();
          const uuid = (item as any)[uuidKey];
          onRemove(uuid);
        }}
        aria-label="Remove item"
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}
