"use client";

import React from "react";
import { Zap } from "lucide-react";
import Image from "next/image";

export function FreePayLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className=" rounded-md bg-[#f3b005]/10 border border-[#f3b005]/30 flex items-center justify-center overflow-hidden">
        {/* <Zap className="w-4 h-4 text-[#f3b005]" fill="#f3b005" /> */}
        <Image src="/logo.png" alt="Logo" width={20} height={20} className="rounded-none"  />
      </div>
      <span className="text-xl font-bold text-white tracking-widest font-mono uppercase ">
        Free<span className="text-[#f3b005]">Pay</span>
      </span>
    </div>
  );
}
