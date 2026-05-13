"use client";

import React from "react";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  confirmMessage: string;
  className?: string;
}

export default function DeleteButton({ confirmMessage, className }: DeleteButtonProps) {
  return (
    <button
      type="submit"
      className={className || "p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
