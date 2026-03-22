"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, Link2, Download } from "lucide-react";
import { toast } from "sonner";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";

interface PaymentLinkDisplayProps {
  link: string;
  amount?: string;
  note?: string;
}

export function PaymentLinkDisplay({
  link,
  amount,
  note,
}: PaymentLinkDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    const message = amount
      ? `Pay me ${amount} STRK${note ? ` for "${note}"` : ""} via FreePay: ${link}`
      : `Send me a payment${note ? ` for "${note}"` : ""} via FreePay: ${link}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full border border-[#262626] bg-[#111111] overflow-hidden rounded-2xl shadow-xl animate-fadeIn">
      <div className="border-b border-[#222222] bg-[#1a1a1a] px-5 py-3 flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#888] uppercase tracking-widest font-bold flex items-center gap-2">
          <Link2 className="w-3 h-3 text-[#f3b005]" /> Generated Vector
        </span>
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest font-bold">Active</span>
        </span>
      </div>
      <div className="p-6 sm:p-8 flex flex-col items-center gap-8">

        {/* Summary Info */}
        {(amount || note) && (
          <div className="w-full grid grid-cols-2 gap-4">
            {amount && (
              <div className="bg-[#171717] border border-[#222] rounded-md p-4 flex flex-col justify-center">
                <span className="text-[10px] font-mono text-[#666] uppercase tracking-widest mb-1 font-bold">Requested Output</span>
                <div className="text-xl font-bold text-[#ececec] font-sans">{amount} <span className="text-[#f3b005] text-sm">STRK</span></div>
              </div>
            )}
            {note && (
              <div className="bg-[#171717] border border-[#222] rounded-md p-4 flex flex-col justify-center">
                <span className="text-[10px] font-mono text-[#666] uppercase tracking-widest mb-1 font-bold">Metadata</span>
                <div className="text-sm text-[#ccc] font-sans truncate">{note}</div>
              </div>
            )}
          </div>
        )}

        {/* QR Code */}
        <div className="p-3 border border-[#333] rounded-3xl bg-white shadow-[0_0_30px_rgba(243,176,5,0.1)] transition-transform hover:scale-105 duration-300 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-700 ease-out">
          <QRCodeGenerator value={link} size={180} />
        </div>

        {/* Link Output */}
        <div className="w-full space-y-2">
          <label className="text-[11px] font-mono text-[#666] uppercase tracking-wider font-bold">Distribution Link</label>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <input
              readOnly
              value={link}
              className="w-full sm:flex-1 h-[48px] bg-[#171717] border border-[#222] rounded-md px-4 text-xs font-mono text-[#ccc] outline-none"
            />
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto h-[48px] flex items-center justify-center gap-2 bg-[#171717] border border-[#222] hover:border-[#f3b005] hover:text-[#f3b005] text-[#ececec] font-semibold text-xs px-6 rounded-md transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-green-500 animate-in zoom-in" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* WhatsApp Share */}
        <button
          onClick={handleWhatsAppShare}
          className="w-full h-[48px] flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 font-semibold font-mono text-xs px-6 rounded-md transition-colors"
        >
          <Share2 className="w-4 h-4" /> Share via WhatsApp
        </button>

      </div>
    </div>
  );
}
