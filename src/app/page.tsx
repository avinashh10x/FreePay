"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Github, ArrowRight, LinkIcon, Share2, Coins, CheckCircle2 } from "lucide-react";
import { FreePayLogo } from "@/components/FreePayLogo";
export default function LandingPage() {
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#0e0e0e] text-white font-sans selection:bg-[#f3b005]/30 overflow-x-hidden">

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[60%] h-[500px] rounded-full bg-[#f3b005] opacity-[0.05] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[600px] rounded-full bg-[#f3b005] opacity-[0.03] blur-[100px] pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full bg-[#0e0e0e]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-[#262626]">
        <div className="w-[85%] max-w-7xl mx-auto h-20 flex items-center justify-between">
          <FreePayLogo className="scale-90 origin-left" />

          <div className="flex items-center">
            <Link href="/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              transition={{duration: 0.2}}
                className="bg-[#f3b005] hover:bg-[#e0a005] text-black text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-widest px-4 py-2.5 rounded-md transition-all shadow-lg shadow-[#f3b005]/10 cursor-pointer"
              >
                Create Link
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="w-[85%] max-w-7xl mx-auto flex-1 flex flex-col pt-16 pb-32 z-10">
        <motion.div variants={containerVars} initial="hidden" animate="visible" className="flex flex-col gap-24">

          {/* Section 1 & 2: Hero */}
          <section className="min-h-[70vh] flex flex-col items-center justify-center text-center pt-10 lg:pt-16">

            {/* HERO TEXT */}
            <div className="flex-1 max-w-3xl flex flex-col items-center justify-center space-y-6">

              {/* Pre-title */}
              <motion.div variants={itemVars} className="mb-2">
                <span className="inline-flex items-center rounded-full border border-[#f3b005]/30 bg-[#f3b005]/10 px-3 py-1 text-[10px] md:text-xs font-mono font-bold text-[#f3b005] uppercase tracking-widest">
                  Powered by Starknet L2 ⚡
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div variants={itemVars}>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                  Get Paid in Crypto <br className="hidden md:block" />
                  via a{" "}
                  <span className="bg-gradient-to-r from-[#ffbe35] to-[#f3b004] bg-clip-text text-transparent">
                    Simple Link
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={itemVars}
                className="text-[#adaaaa] text-base md:text-xl max-w-xl leading-relaxed"
              >
                Create a payment link and receive payments instantly using Starknet.
                No setup. No friction.
              </motion.p>

              {/* CTA Group */}
              <motion.div variants={itemVars} className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/create">
                  <motion.div
                    className="inline-flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-br from-[#f3b005] to-[#e0a005] text-black font-semibold h-[48px] rounded-md shadow-md whitespace-nowrap"
                    initial={{ paddingLeft: "24px", paddingRight: "24px" }}
                    whileHover={{ paddingLeft: "48px", paddingRight: "48px" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    Create Payment Link
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
                <Link href="/pay">
                  <motion.div
                    className="inline-flex cursor-pointer items-center justify-center gap-2 h-[48px] px-8 rounded-md bg-[#171717] border border-[#262626] text-[#adaaaa] hover:text-[#f3b005] hover:border-[#f3b005] transition-all font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Execute Payment
                  </motion.div>
                </Link>
              </motion.div>

            </div>

          </section>

          {/* Section 3: Demo Video Placeholder */}
          <motion.section variants={itemVars} className="w-full rounded-2xl border border-[#262626] bg-[#111111] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative group">
            <div className="w-full pb-[56.25%] relative bg-[#171717]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                {/* Replace this div with your <video> or <iframe> tag later */}
                <div className="w-20 h-20 rounded-full bg-[#f3b005]/10 flex items-center justify-center border border-[#f3b005]/20 group-hover:scale-110 group-hover:bg-[#f3b005]/20 transition-all cursor-pointer">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#f3b005] border-b-[12px] border-b-transparent ml-2" />
                </div>
                <span className="text-[11px] font-mono text-[#666] uppercase tracking-widest font-bold">
                  Dummy Video Space (16:9 Landscape)
                </span>
              </div>
            </div>
          </motion.section>

          {/* Section 4: How it Works */}
          <section className="relative space-y-16 py-24 border-t border-[#262626] overflow-hidden">
            {/* Section Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f3b005]/[0.02] rounded-full blur-[120px] pointer-events-none" />

            <motion.div variants={itemVars} className="text-center space-y-4 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">How it Works</h2>
              <p className="text-[#adaaaa] max-w-lg mx-auto">Get paid in three simple steps using Starknet's high-performance infrastructure.</p>
            </motion.div>

            <motion.div variants={itemVars} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="group relative bg-[#131313]/40 backdrop-blur-xl border border-[#262626] hover:border-[#f3b005]/30 rounded-3xl p-10 transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f3b005] opacity-0 group-hover:opacity-[0.05] blur-[50px] transition-opacity duration-500" />
                <div className="text-[10px] font-mono text-[#f3b005] bg-[#f3b005]/10 px-4 py-1.5 rounded-full uppercase tracking-widest font-bold mb-8">
                  Step 01
                </div>
                <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-[#262626] group-hover:border-[#f3b005]/20 flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[#f3b005]/5">
                  <LinkIcon className="w-8 h-8 text-[#f3b005]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Create Link</h3>
                <p className="text-[#adaaaa] text-sm leading-relaxed">
                  Enter payment details and metadata. Connect your wallet to automatically set the target.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-[#131313]/40 backdrop-blur-xl border border-[#262626] hover:border-[#f3b005]/30 rounded-3xl p-10 transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden md:mt-12">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f3b005] opacity-0 group-hover:opacity-[0.05] blur-[50px] transition-opacity duration-500" />
                <div className="text-[10px] font-mono text-[#f3b005] bg-[#f3b005]/10 px-4 py-1.5 rounded-full uppercase tracking-widest font-bold mb-8">
                  Step 02
                </div>
                <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-[#262626] group-hover:border-[#f3b005]/20 flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[#f3b005]/5">
                  <Share2 className="w-8 h-8 text-[#f3b005]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Share Anywhere</h3>
                <p className="text-[#adaaaa] text-sm leading-relaxed">
                  Distribute your link via WhatsApp, Socials or QR. No app required for payer execution.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-[#131313]/40 backdrop-blur-xl border border-[#262626] hover:border-[#f3b005]/30 rounded-3xl p-10 transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden md:mt-24">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f3b005] opacity-0 group-hover:opacity-[0.05] blur-[50px] transition-opacity duration-500" />
                <div className="text-[10px] font-mono text-[#f3b005] bg-[#f3b005]/10 px-4 py-1.5 rounded-full uppercase tracking-widest font-bold mb-8">
                  Step 03
                </div>
                <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-[#262626] group-hover:border-[#f3b005]/20 flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[#f3b005]/5">
                  <Coins className="w-8 h-8 text-[#f3b005]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Receive Funds</h3>
                <p className="text-[#adaaaa] text-sm leading-relaxed">
                  Payments settle instantly via Starknet. Funds are deposited directly to your non-custodial wallet.
                </p>
              </div>

            </motion.div>
          </section>

          {/* Section 5: Features / Value */}
          <section className="space-y-6">
            <motion.div variants={itemVars} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#131313] border border-[#262626]">
                <CheckCircle2 className="w-5 h-5 text-[#f3b005]" />
                <span className="font-semibold text-sm text-[#e4e1e9]">No signup required</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#131313] border border-[#262626]">
                <CheckCircle2 className="w-5 h-5 text-[#f3b005]" />
                <span className="font-semibold text-sm text-[#e4e1e9]">Global payments</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#131313] border border-[#262626]">
                <CheckCircle2 className="w-5 h-5 text-[#f3b005]" />
                <span className="font-semibold text-sm text-[#e4e1e9]">Powered by Starknet</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#131313] border border-[#262626]">
                <CheckCircle2 className="w-5 h-5 text-[#f3b005]" />
                <span className="font-semibold text-sm text-[#e4e1e9]">Gasless transactions</span>
              </div>
            </motion.div>
          </section>

        </motion.div>
      </main>

      {/* Section 6: Footer */}
      <footer className="w-full bg-[#0e0e0e] border-t border-[#262626] py-12 mt-auto">
        <div className="w-[85%] max-w-7xl mx-auto flex flex-col items-center justify-center gap-4 text-center">
          <div className="text-[11px] font-mono text-[#f3b005] uppercase tracking-widest font-bold">
            Built for Starkzap Challenge
          </div>
          <div className="text-sm font-sans flex gap-1  text-[#adaaaa]">
            Created by  <Link href="https://github.com/Avinashh10x" target="_blank" className="text-sm text-[#adaaaa] hover:text-[#f3b005] transition-colors flex items-center gap-2">
              Avinash
            </Link>
          </div>
          <div className="mt-2">
            <Link href="https://github.com/avinashh10x/FreePay.git" target="_blank" className="text-sm text-[#adaaaa] hover:text-[#f3b005] transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" /> GitHub Repository
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
