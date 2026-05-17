"use client";

import React, { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteButtonProps {
  confirmMessage: string;
  className?: string;
  actionFn?: (id: any) => Promise<void>;
  id?: string | number;
}

export default function DeleteButton({ confirmMessage, className, actionFn, id }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    if (!window.confirm(confirmMessage)) {
      e.preventDefault();
      return;
    }

    if (actionFn && id !== undefined) {
      e.preventDefault();
      startTransition(async () => {
        try {
          await actionFn(id);
          toast.success("Berhasil dihapus!");
        } catch (error) {
          toast.error("Gagal menghapus.");
        }
      });
    }
  };

  return (
    <button
      type={actionFn ? "button" : "submit"}
      className={className || "p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"}
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
    </button>
  );
}
