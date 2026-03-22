"use client";

import React from "react";
import { Zap } from "lucide-react";

export function ZapPayLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-md bg-[#f3b005]/10 border border-[#f3b005]/30 flex items-center justify-center">
        <Zap className="w-4 h-4 text-[#f3b005]" fill="#f3b005" />
      </div>
      <span className="text-xl font-bold text-white tracking-widest font-mono uppercase">
        Zap<span className="text-[#f3b005]">Pay</span>
      </span>
    </div>
  );
}
