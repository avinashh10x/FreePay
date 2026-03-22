"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Github, ArrowRight, LinkIcon, Share2, Coins, CheckCircle2 } from "lucide-react";
import { ZapPayLogo } from "@/components/ZapPayLogo";
import { CreatePaymentForm } from "@/components/CreatePaymentForm";

export default function LandingPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          <ZapPayLogo className="scale-90 origin-left" />

          <div className="flex items-center gap-6">
            <Link href="/create">
              <button
                className="text-[11px] font-mono uppercase tracking-widest text-[#adaaaa] hover:text-[#f3b005] transition-colors"
              >
                Create Link
              </button>
            </Link>
            <Link href="https://github.com" target="_blank" className="text-[11px] font-mono uppercase tracking-widest text-[#adaaaa] hover:text-[#f3b005] transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" /> GitHub
            </Link>
          </div>
        </div>
      </nav>

      <main className="w-[85%] max-w-7xl mx-auto flex-1 flex flex-col pt-16 pb-32 z-10">
        <motion.div variants={containerVars} initial="hidden" animate="visible" className="flex flex-col gap-24">

          {/* Section 1 & 2: Hero + Payment Form */}
          <section className="min-h-[80vh] flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between pt-10 lg:pt-16">

            {/* LEFT: HERO */}
            <div className="flex-1 max-w-2xl flex flex-col justify-center space-y-6">

              {/* Heading */}
              <motion.div variants={itemVars}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
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
                className="text-gray-400 text-base md:text-lg max-w-lg leading-relaxed"
              >
                Create a payment link and receive payments instantly using Starknet.
                No setup. No friction.
              </motion.p>

              {/* CTA */}
              <motion.div variants={itemVars} className="pt-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-[#f3b005] to-[#e0a005] text-black font-semibold h-[48px] px-6 rounded-md transition-all hover:scale-105 shadow-md"
                >
                  Create Payment Link
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>

            </div>

            {/* RIGHT: FORM */}
            <motion.div
              variants={itemVars}
              className="w-full max-w-md"
              ref={formRef}
            >
              <CreatePaymentForm />
            </motion.div>

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
          <section className="space-y-12 py-12 border-t border-[#262626]">
            <motion.div variants={itemVars} className="text-left md:text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#ffffff]">How it Works</h2>
            </motion.div>

            <motion.div variants={itemVars} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

              {/* Step 1 */}
              <div className="bg-[#131313] border border-[#262626] rounded-2xl p-8 space-y-5 relative z-10 text-left md:text-center flex flex-col items-start md:items-center">
                <div className="w-14 h-14 bg-[#262626] border border-[#484847] rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <LinkIcon className="w-6 h-6 text-[#f3b005]" />
                </div>
                <h3 className="text-xl font-bold text-[#ffffff]">1. Create a payment link</h3>
                <p className="text-[#adaaaa] text-sm">Fill out the amount and metadata. Connect your wallet for lightning-fast setup.</p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#131313] border border-[#262626] rounded-2xl p-8 space-y-5 relative z-10 text-left md:text-center flex flex-col items-start md:items-center md:mt-8">
                <div className="w-14 h-14 bg-[#262626] border border-[#484847] rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <Share2 className="w-6 h-6 text-[#f3b005]" />
                </div>
                <h3 className="text-xl font-bold text-[#ffffff]">2. Share it with anyone</h3>
                <p className="text-[#adaaaa] text-sm">Copy the URL or scan the dynamic QR code natively from the interface.</p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#131313] border border-[#262626] rounded-2xl p-8 space-y-5 relative z-10 text-left md:text-center flex flex-col items-start md:items-center md:mt-16">
                <div className="w-14 h-14 bg-[#262626] border border-[#484847] rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <Coins className="w-6 h-6 text-[#f3b005]" />
                </div>
                <h3 className="text-xl font-bold text-[#ffffff]">3. Get paid instantly</h3>
                <p className="text-[#adaaaa] text-sm">Transactions settle immediately via Starknet's high speed L2 execution.</p>
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
          <div className="text-sm font-sans text-[#adaaaa]">
            Created by Raavan
          </div>
          <div className="mt-2">
            <Link href="https://github.com" target="_blank" className="text-sm text-[#adaaaa] hover:text-[#f3b005] transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" /> GitHub Repository
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
