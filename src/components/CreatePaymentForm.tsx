"use client";

import React, { useState, useCallback } from "react";
import { Zap, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useStarkZap } from "@/hooks/useStarkZap";
import { PaymentLinkDisplay } from "@/components/PaymentLinkDisplay";

export function CreatePaymentForm() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [recipient, setRecipient] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const { connectWallet, walletAddress, isConnected } = useStarkZap();

  React.useEffect(() => {
    if (walletAddress) {
      setRecipient(walletAddress);
    }
  }, [walletAddress]);

  const handleGenerate = useCallback(() => {
    if (!recipient.trim()) return;

    const params = new URLSearchParams();
    params.set("to", recipient.trim());

    if (amount.trim()) {
      const parsed = parseFloat(amount);
      if (isNaN(parsed) || parsed <= 0) {
        return;
      }
      params.set("amount", amount.trim());
    }

    if (note.trim()) {
      params.set("note", note.trim());
    }

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const queryString = params.toString();
    const link = `${baseUrl}/pay${queryString ? `?${queryString}` : ""}`;

    setGeneratedLink(link);
    toast.success("Link generated successfully");
  }, [amount, note, recipient]);

  const handleReset = useCallback(() => {
    setAmount("");
    setNote("");
    setRecipient("");
    setGeneratedLink(null);
  }, []);

  const isValid =
    recipient.trim().length > 0 &&
    (!amount.trim() || (!isNaN(parseFloat(amount)) && parseFloat(amount) > 0));

  if (generatedLink) {
    return (
      <div className="space-y-6 w-full animate-fadeIn">
        <PaymentLinkDisplay
          link={generatedLink}
          amount={amount || undefined}
          note={note || undefined}
        />
        <button
          onClick={handleReset}
          className="w-full text-[11px] font-mono text-[#666] uppercase hover:text-[#ececec] transition-colors tracking-widest"
        >
          Create Another Link
        </button>
      </div>
    );
  }

  return (
    <div className="w-full border border-[#262626] bg-[#111111] overflow-hidden rounded-2xl shadow-xl animate-fadeIn">
      <div className="border-b border-[#222222] bg-[#1a1a1a] px-5 py-3 flex items-center justify-between">
         <span className="text-[10px] font-mono text-[#888] uppercase tracking-widest font-bold flex items-center gap-2">
           <Zap className="w-3 h-3 text-[#f3b005]"/> System Parameters
         </span>
      </div>
      <div className="p-6 sm:p-8 space-y-7">
        
        {/* Recipient Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="recipient" className="text-[11px] font-mono text-[#666] uppercase tracking-wider font-bold">
              Target Address *
            </label>
            {!isConnected ? (
              <button 
                onClick={connectWallet}
                className="text-[10px] font-mono cursor-pointer text-[#f3b005] hover:text-[#d49903] flex items-center gap-1 font-bold transition-colors uppercase tracking-widest"
                title="Connect Cartridge to automatically fill your address"
              >
                <Wallet className="w-3 h-3" /> Connect Wallet
              </button>
            ) : (
              <div className="flex items-center gap-1 text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-1 rounded-sm uppercase tracking-widest font-bold">
                <Wallet className="w-3 h-3" /> Connected: {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </div>
            )}
          </div>
          <input
            id="recipient"
            type="text"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full h-[48px] bg-[#171717] border border-[#222] rounded-md px-4 text-sm font-mono text-white outline-none focus:border-[#f3b005] focus:bg-[#1a1a1a] transition-all"
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="amount" className="text-[11px] font-mono text-[#666] uppercase tracking-wider font-bold">
              Value
            </label>
            <span className="text-[10px] font-mono text-[#444] uppercase tracking-widest">
              Leave blank for flexible amount
            </span>
          </div>
          <div className="relative">
             <input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="any"
              className="w-full h-[48px] bg-[#171717] border border-[#222] rounded-md pl-4 pr-16 text-sm font-mono text-white outline-none focus:border-[#f3b005] focus:bg-[#1a1a1a] transition-all"
             />
             <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#666] uppercase tracking-widest font-bold">
               STRK
             </div>
          </div>
        </div>

        {/* Note Input */}
        <div className="space-y-2">
          <label htmlFor="note" className="text-[11px] font-mono text-[#666] uppercase tracking-wider font-bold">
            Metadata String
          </label>
          <input
            id="note"
            type="text"
            placeholder="e.g., Pizza"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={100}
            className="w-full h-[48px] bg-[#171717] border border-[#222] rounded-md px-4 text-sm text-white outline-none focus:border-[#f3b005] focus:bg-[#1a1a1a] transition-all"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!isValid}
          className="w-full h-[48px] bg-[#f3b005] hover:bg-[#d49903] disabled:bg-[#333] disabled:text-[#666] disabled:cursor-not-allowed text-black font-bold text-sm px-6 rounded-md transition-colors flex items-center justify-center gap-2 mt-2"
        >
          Generate Link <Zap className="w-4 h-4" fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
