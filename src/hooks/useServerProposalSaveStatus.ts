// src/hooks/useServerProposalSaveStatus.ts
import { useEffect, useState } from "react";
import { SERVER_PROPOSAL_SAVE_STATUS_KEY } from "@/app/api/client/config/keyLocations";
import type { ServerProposalSaveStatus } from "@/types/server-proposal-save-status";

export function useServerProposalSaveStatus() {
  const [status, setStatus] = useState<ServerProposalSaveStatus | null>(() => {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(SERVER_PROPOSAL_SAVE_STATUS_KEY);
    if (!item) return null;
    try {
      return JSON.parse(item) as ServerProposalSaveStatus;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStatusUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (
        customEvent.detail?.key === SERVER_PROPOSAL_SAVE_STATUS_KEY &&
        typeof customEvent.detail?.value === 'string'
      ) {
        try {
          setStatus(JSON.parse(customEvent.detail.value));
        } catch {
          setStatus(null);
        }
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === SERVER_PROPOSAL_SAVE_STATUS_KEY) {
        if (e.newValue) {
          try {
            setStatus(JSON.parse(e.newValue));
          } catch {
            setStatus(null);
          }
        } else {
          setStatus(null);
        }
      }
    };
    window.addEventListener('server-proposal-save-status-updated', handleStatusUpdate);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('server-proposal-save-status-updated', handleStatusUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return status;
}