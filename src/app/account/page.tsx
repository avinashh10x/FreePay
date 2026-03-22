"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Wallet, 
  Copy, 
  ExternalLink, 
  LogOut, 
  Zap, 
  History, 
  ShieldCheck,
  CreditCard
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useStarkZap } from "@/hooks/useStarkZap";
import { toast } from "sonner";


export default function AccountPage() {
  const { 
    isConnected, 
    walletAddress, 
    balance, 
    disconnectWallet, 
    connectWallet,
    isConnecting,
    isInitializing
  } = useStarkZap();

  if (isInitializing) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0c0c0c] items-center justify-center p-6 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#f3b005]/20 border-t-[#f3b005] animate-spin" />
          <p className="text-[10px] font-mono text-[#666] uppercase tracking-[0.2em]">Synchronizing Session</p>
        </div>
      </div>
    );
  }

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success("Address copied to clipboard");
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c0c] font-sans selection:bg-[#f3b005]/30">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[60%] h-[500px] rounded-full bg-[#f3b005] opacity-[0.03] blur-[80px] pointer-events-none" />
      
      <Navbar showBack={true} />

      <main className="flex flex-col items-center w-full max-w-2xl mx-auto z-10 animate-fadeIn pt-10 px-6 sm:px-12">

        {!isConnected ? (
          <div className="w-full bg-[#111111] border border-[#262626] rounded-3xl p-12 flex flex-col items-center text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-[#f3b005]/10 flex items-center justify-center border border-[#f3b005]/20 mb-4">
              <ShieldCheck className="w-10 h-10 text-[#f3b005]" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">Your Portfollio</h1>
              <p className="text-[#888] max-w-xs mx-auto">Connect your Starknet wallet to view your account details and payment history.</p>
            </div>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="mt-4 px-10 py-4 bg-[#f3b005] hover:bg-[#e0a005] text-black font-bold rounded-xl transition-all shadow-lg shadow-[#f3b005]/10 flex items-center gap-2"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"} <Zap className="w-4 h-4" fill="currentColor" />
            </button>
          </div>
        ) : (
          <div className="w-full space-y-8">
            
            {/* Profile Overview Card */}
            <div className="w-full bg-[#111111]/80 backdrop-blur-xl border border-[#262626] rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-8 sm:p-10 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f3b005] to-[#e0a005] flex items-center justify-center shadow-lg shadow-[#f3b005]/20">
                      <Wallet className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <h2 className="text-[11px] font-mono text-[#666] uppercase tracking-[0.2em] font-bold mb-1">Active Wallet</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-mono font-bold text-white tracking-tight">
                          {truncateAddress(walletAddress || "")}
                        </span>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={copyAddress}
                            className="p-2 hover:bg-white/5 rounded-md text-[#666] hover:text-[#f3b005] transition-colors"
                            title="Copy Address"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <Link 
                            href={`https://starkscan.co/contract/${walletAddress}`} 
                            target="_blank"
                            className="p-2 hover:bg-white/5 rounded-md text-[#666] hover:text-[#f3b005] transition-colors"
                            title="View on Explorer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={disconnectWallet}
                    className="self-start sm:self-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-mono font-bold uppercase tracking-widest rounded-lg border border-red-500/20 transition-all flex items-center gap-2"
                  >
                    Disconnect <LogOut className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-[#171717] border border-[#222] group hover:border-[#f3b005]/30 transition-all">
                    <span className="text-[10px] font-mono text-[#555] uppercase tracking-widest font-bold block mb-2">Available Balance</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{balance || "0.00"}</span>
                      <span className="text-sm font-mono text-[#f3b005] font-bold">STRK</span>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#171717] border border-[#222] group hover:border-[#f3b005]/30 transition-all">
                    <span className="text-[10px] font-mono text-[#555] uppercase tracking-widest font-bold block mb-2">Network Status</span>
                    <div className="flex items-center gap-2 text-green-500">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-bold uppercase font-mono tracking-tight text-white">Starknet Mainnet</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1a1a1a]/50 border-t border-[#222] px-8 py-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#444] uppercase tracking-widest">Cartridge Controller Secure</span>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500/50" />
                  <span className="text-[10px] font-mono text-green-500/70 uppercase tracking-widest">Authenticated</span>
                </div>
              </div>
            </div>

            {/* Features / Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/create" className="group">
                <div className="p-8 bg-[#111111] border border-[#262626] rounded-3xl hover:border-[#f3b005]/50 transition-all space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f3b005]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-[#f3b005]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Create New Link</h3>
                  <p className="text-sm text-[#666]">Generate a new payment request link easily.</p>
                </div>
              </Link>

              <div className="p-8 bg-[#111111] border border-[#262626] rounded-3xl opacity-50 cursor-not-allowed space-y-4 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded text-[#444] uppercase">Coming Soon</div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <History className="w-6 h-6 text-[#444]" />
                </div>
                <h3 className="text-lg font-bold text-white">Payment History</h3>
                <p className="text-sm text-[#444]">View your recent transactions on Starknet.</p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-6 bg-[#f3b005]/5 border border-[#f3b005]/10 rounded-2xl flex gap-4">
              <ShieldCheck className="w-6 h-6 text-[#f3b005] shrink-0" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[#f3b005] uppercase tracking-widest">Non-Custodial Security</h4>
                <p className="text-xs text-[#888] leading-relaxed">
                  FreePay does not store your private keys. Your session is secured within the browser and managed by Cartridge. 
                  Always verify transaction details before signing.
                </p>
              </div>
            </div>

          </div>
        )}

        <div className="mt-12 text-center text-[10px] text-[#444] font-mono tracking-widest uppercase flex items-center gap-2">
          <span>Starknet Native Protocol</span>
        </div>
      </main>
    </div>
  );
}
