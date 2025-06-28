"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import React from "react";
import { AuthenticateDialog } from "@/components/ui/authenticate-dialog";

interface DeclineDialogProps {
  onClose?: () => void;
}

export const DeclineDialog: React.FC<DeclineDialogProps> = ({ onClose }) => {
  const [open, setOpen] = React.useState(true);
  const [step, setStep] = React.useState<"preparing" | "ready">("preparing");
  const [showAccept, setShowAccept] = React.useState(false);
  const [showAuthDialog, setShowAuthDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStep("ready"), 3000));
    timers.push(setTimeout(() => setShowAccept(true), 4000)); // Accept button fades in after 4s
    return () => timers.forEach(clearTimeout);
  }, [open]);

  const handleAccept = () => {
    setShowAuthDialog(true);
  };

  const handleAuthContinue = (apiKey: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAuthDialog(false);
      setOpen(false);
      if (onClose) onClose();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showClose={false}
        className="flex flex-col items-center gap-4 select-none pointer-events-auto"
        onInteractOutside={e => e.preventDefault()}
        onEscapeKeyDown={e => e.preventDefault()}
        tabIndex={-1}
      >
        {step === "preparing" ? (
          <DialogHeader className="w-full flex flex-col items-center">
            <Loader2 className="animate-spin size-8 mb-2 text-primary" />
            <DialogTitle className="text-center w-full text-lg font-medium">So you have chosen this path...</DialogTitle>
            <DialogDescription className="text-center w-full">
              Preparing your response.
            </DialogDescription>
          </DialogHeader>
        ) : (
          <div className="w-full flex flex-col items-center">
            <DialogTitle className="text-center w-full text-lg font-medium mb-2">So you have chosen this path...</DialogTitle>
            <div className="w-full aspect-video max-w-[560px] rounded-lg overflow-hidden shadow-lg mt-2">
              <iframe
                src="https://www.youtube.com/embed/xvFZjo5PgG0?autoplay=1&controls=0&modestbranding=1&rel=0&fs=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
            <div className="w-full flex justify-center mt-6">
              <button
                type="button"
                onClick={handleAccept}
                className={`flex items-center gap-2 px-6 py-2 w-full justify-center rounded-md font-semibold bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] shadow transition-opacity duration-[10s] ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--success))] hover:bg-[hsl(142,71%,35%)] opacity-0 ${showAccept ? 'opacity-100' : ''}`}
                aria-label="Accept"
                tabIndex={showAccept ? 0 : -1}
                style={{ pointerEvents: showAccept ? 'auto' : 'none' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Accept
              </button>
            </div>
            <AuthenticateDialog
              open={showAuthDialog}
              onOpenChange={setShowAuthDialog}
              onContinue={handleAuthContinue}
              loading={loading}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


