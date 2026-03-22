"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, ExternalLink, ArrowLeft, Zap, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FreePayLogo } from "@/components/FreePayLogo";
import { EXPLORER_URLS, STARKZAP_NETWORK } from "@/lib/constants";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const txHash = searchParams.get("tx");

  const explorerUrl = txHash
    ? `${EXPLORER_URLS[STARKZAP_NETWORK]}/tx/${txHash}`
    : "#";

  useEffect(() => {
    if (!txHash) {
      router.push("/");
    }
  }, [txHash, router]);

  if (!txHash) return null;

  return (
    <div className="w-full border border-[#222222] bg-[#111111] overflow-hidden rounded-xl animate-fadeIn">
      <div className="border-b border-[#222222] bg-[#1a1a1a] px-5 py-3 flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#888] uppercase tracking-widest font-bold flex items-center gap-2">
          <Zap className="w-3 h-3 text-[#25D366]" /> Transaction Finalized
        </span>
        <span className="text-[10px] font-mono text-[#25D366] uppercase tracking-widest">
          Success
        </span>
      </div>
      <div className="p-6 sm:p-8 space-y-7 flex flex-col items-center text-center">

        <div className="w-16 h-16 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mb-2">
          <Check className="w-8 h-8 text-[#25D366]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#ececec]">
            Payment Submitted
          </h1>
          <p className="text-[#888] font-mono text-xs max-w-sm leading-relaxed">
            // The transfer was successfully dispatched to the Starknet sequencer.
          </p>
        </div>

        <div className="w-full px-5 py-4 rounded-md bg-[#171717] border border-[#222]">
          <span className="block text-[10px] font-mono text-[#666] uppercase tracking-widest mb-1 font-bold text-left">Transaction Hash</span>
          <p className="text-xs text-[#ececec] font-mono text-left break-all">
            {txHash}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#171717] border border-[#222] hover:border-[#f3b005] hover:text-[#f3b005] text-[#ececec] font-semibold text-xs px-6 py-4 rounded-md transition-colors uppercase tracking-widest font-mono"
            id="explorer-link"
          >
            Voyager <ExternalLink className="w-4 h-4" />
          </a>

          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 bg-[#f3b005] hover:bg-[#d49903] text-black font-semibold text-xs px-6 py-4 rounded-md transition-colors uppercase tracking-widest font-mono">
              Home <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c0c] items-center p-6 sm:p-12 font-sans selection:bg-[#f3b005]/30">

      <main className="flex flex-col items-center w-full max-w-xl z-10 animate-fadeIn pt-10">
        <div className="w-full mb-8 flex items-center justify-between">
          <Link href="/" className="text-[#666] hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
          <FreePayLogo className="scale-75 origin-right" />
        </div>

        <div className="w-full space-y-6">
          <Suspense fallback={<div className="text-[#888] font-mono text-sm animate-pulse text-center w-full block">Verifying state block...</div>}>
            <SuccessContent />
          </Suspense>
        </div>

        <div className="mt-12 text-center text-[10px] text-[#444] font-mono tracking-widest uppercase flex items-center gap-2">
          <span>Starknet Native Engine</span>
        </div>
      </main>
    </div>
  );
}
