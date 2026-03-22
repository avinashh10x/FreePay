"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Wallet, Loader2, ArrowRight, Info, Zap, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { FreePayLogo } from "@/components/FreePayLogo";
import { useStarkZap } from "@/hooks/useStarkZap";
import Link from "next/link";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialAmount = searchParams.get("amount");
  const note = searchParams.get("note");
  const recipient = searchParams.get("to");

  const [customAmount, setCustomAmount] = React.useState("");
  const [customRecipient, setCustomRecipient] = React.useState("");
  const [uiHint, setUiHint] = React.useState<string | null>(null);

  const currentAmount = initialAmount || customAmount;
  const currentRecipient = recipient || customRecipient;

  const {
    connectWallet,
    isConnected,
    isConnecting,
    isSending,
    error,
    sendPayment,
    walletAddress,
    balance
  } = useStarkZap();

  const handlePay = async () => {
    if (!currentAmount) return;
    if (!currentRecipient) {
      toast.error("Invalid Configuration", {
        description: "Please provide a recipient target address.",
      });
      return;
    }

    setUiHint(null);

    try {
      const { hash } = await sendPayment(currentRecipient, currentAmount);
      toast.success("Payment successful!");
      router.push(`/success?tx=${hash}`);
    } catch (err: any) {
      const errStr = JSON.stringify(err, Object.getOwnPropertyNames(err), 2);

      if (errStr.includes("u256_sub Overflow") || errStr.includes("argent/multicall-failed")) {
        setUiHint("Insufficient funds detected. Please request tokens from the Sepolia Faucet.");
      } else {
        console.error("UNKNOWN TRANSACTION ERROR ===>", errStr);
        toast.error("Transaction Error", {
          description: err.message === "Transaction execution error"
            ? "The transfer failed to execute on the Starknet sequencer."
            : err.message || "An unknown network error occurred.",
        });
        toast.error("Payment failed. Try again.");
      }
    }
  };

  return (
    <div className="w-full border border-[#262626] bg-[#111111] overflow-hidden rounded-2xl shadow-xl animate-fadeIn">
      <div className="border-b border-[#222222] bg-[#1a1a1a] px-5 py-3 flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#888] uppercase tracking-widest font-bold flex items-center gap-2">
          <Zap className="w-3 h-3 text-[#f3b005]" /> Authorization Request
        </span>
        {!isConnected && (
          <span className="text-[10px] font-mono text-[#666] uppercase tracking-widest">
            Awaiting Wallet
          </span>
        )}
      </div>

      <div className="p-6 sm:p-8 space-y-7 flex flex-col items-center text-center">

        {/* Recipient Field */}
        <div className="w-full space-y-2">
          <p className="text-[11px] font-mono text-[#666] uppercase tracking-wider font-bold text-left">
            Recipient Address
          </p>
          <div className="relative group grayscale-[0.5] focus-within:grayscale-0 transition-all">
            <input
              type="text"
              placeholder="0x00...abc"
              value={currentRecipient}
              readOnly={!!recipient}
              onChange={(e) => setCustomRecipient(e.target.value)}
              className={`w-full bg-[#171717] border border-[#222] rounded-md px-4 py-3.5 text-xs font-mono text-white outline-none transition-all ${
                recipient ? "opacity-60 cursor-not-allowed border-[#333]" : "focus:border-[#f3b005] group-hover:border-[#333]"
              }`}
            />
            {recipient && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f3b005]/50 animate-pulse" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 w-full">
          <p className="text-[11px] font-mono text-[#666] uppercase tracking-wider font-bold text-left">
            Execution Value
          </p>
          {initialAmount ? (
            <div className="flex items-baseline justify-center gap-2 py-4 bg-[#171717] border border-[#222] rounded-md w-full">
              <span className="text-4xl font-bold tracking-tighter text-[#ececec]">
                {initialAmount}
              </span>
              <span className="text-lg font-mono font-bold text-[#f3b005]">
                STRK
              </span>
            </div>
          ) : (
            <div className="space-y-4 w-full">
              <div className="relative w-full mt-2">
                <input
                  type="number"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-[#171717] border border-[#222] rounded-md pl-4 pr-16 py-4 text-center text-2xl font-semibold text-white outline-none focus:border-[#f3b005] focus:bg-[#1a1a1a] transition-all"
                  min="0"
                  step="any"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-mono font-bold text-[#666]">
                  STRK
                </div>
              </div>
            </div>
          )}
        </div>

        {note && (
          <div className="w-full px-5 py-3 rounded-md bg-[#171717] border border-[#222]">
            <span className="block text-[10px] font-mono text-[#666] uppercase tracking-widest mb-1 font-bold text-left">Attached Metadata</span>
            <p className="text-sm text-[#ccc] font-sans text-left">
              "{note}"
            </p>
          </div>
        )}

        {recipient && (
          <div className="w-full px-5 py-3 rounded-md bg-[#171717] border border-[#222]">
            <span className="block text-[10px] font-mono text-[#666] uppercase tracking-widest mb-1 font-bold text-left">Target Contract Address</span>
            <p className="text-xs text-[#888] font-mono text-left truncate">
              {recipient}
            </p>
          </div>
        )}

        <div className="w-full h-px bg-[#222]" />

        {uiHint ? (
          <div className="w-full px-5 py-4 rounded-md bg-[#f3b005]/10 border border-[#f3b005]/30 flex flex-col gap-3 text-left animate-fadeIn">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#f3b005]" />
              <span className="font-mono text-xs text-[#f3b005] uppercase tracking-wider font-bold">System Halt</span>
            </div>
            <p className="text-sm text-[#ececec]">{uiHint}</p>
            <a
              href="https://starknet-faucet.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold hover:underline text-[#f3b005] uppercase tracking-widest"
            >
              Get free testnet STRK &rarr;
            </a>
          </div>
        ) : null}

        {!isConnected ? (
          <div className="w-full space-y-3">
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full h-[48px] cursor-pointer bg-[#ececec] hover:bg-white disabled:bg-[#333] disabled:text-[#666] disabled:cursor-not-allowed text-black font-semibold text-sm px-6 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Wallet className="w-5 h-5 text-black" />
              )}
              {isConnecting ? "AUTHORIZING..." : "CONNECT WALLET"}
            </button>
            <p className="text-[10px] font-mono font-bold text-[#666] uppercase tracking-widest">
              Cartridge Controller Compatible
            </p>
          </div>
        ) : (
          <div className="w-full space-y-4">
            <div className="w-full py-3 px-4 rounded-md bg-[#171717] border border-[#f3b005]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#f3b005] shrink-0" />
                <span className="text-xs font-mono font-bold text-[#ececec] uppercase tracking-widest">Active Link</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono text-[#888] truncate max-w-[120px]">
                  {walletAddress}
                </span>
                {balance && (
                  <span className="text-[11px] font-mono font-bold text-[#f3b005]">
                    Bal: {balance} STRK
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={isSending || !currentAmount || parseFloat(currentAmount) <= 0}
              className="w-full h-[48px] font-bold bg-[#f3b005] hover:bg-[#d49903] disabled:bg-[#333] disabled:text-[#666] disabled:cursor-not-allowed text-black text-sm px-6 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : currentAmount ? (
                <>
                  Pay {currentAmount} STRK
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                "Enter valid amount"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PayPage() {
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
          <Suspense fallback={<div className="text-[#888] font-mono text-sm animate-pulse text-center w-full block">Loading execution context...</div>}>
            <PaymentContent />
          </Suspense>
        </div>

        <div className="mt-12 text-center text-[10px] text-[#444] font-mono tracking-widest uppercase flex items-center gap-2">
          <span>Starknet Native Engine</span>
        </div>
      </main>
    </div>
  );
}
