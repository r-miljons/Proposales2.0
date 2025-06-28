"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import React from "react";

interface DeclineDialogProps {
  onClose?: () => void;
}

export const DeclineDialog: React.FC<DeclineDialogProps> = ({ onClose }) => {
  const [open, setOpen] = React.useState(true);
  const [step, setStep] = React.useState<"preparing" | "ready">("preparing");

  React.useEffect(() => {
    if (!open) return;
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStep("ready"), 3000));
    timers.push(setTimeout(() => {
      if (onClose) onClose();
      window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
    }, 6000));
    return () => timers.forEach(clearTimeout);
  }, [open, onClose]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showClose={false}
        className="flex flex-col items-center gap-4 select-none pointer-events-auto"
        onInteractOutside={e => e.preventDefault()}
        onEscapeKeyDown={e => e.preventDefault()}
        tabIndex={-1}
      >
        <DialogHeader className="w-full flex flex-col items-center">
          <Loader2 className="animate-spin size-8 mb-2 text-primary" />
          <DialogTitle className="text-center w-full text-lg font-medium">So you have chosen this path...</DialogTitle>
          <DialogDescription className="text-center w-full">
            {step === "preparing" ? "Preparing your response." : "Get ready!"}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}


