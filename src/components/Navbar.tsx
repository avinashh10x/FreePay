"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { User, PlusCircle, ArrowLeft } from "lucide-react";
import { FreePayLogo } from "./FreePayLogo";

interface NavbarProps {
  showBack?: boolean;
}

export function Navbar({ showBack = false }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="w-full bg-[#0e0e0e]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-[#262626]">
      <div className="w-[85%] max-w-7xl mx-auto h-16 md:h-20 flex items-center justify-between">
        
        {/* Left Side: Logo & Back Link */}
        <div className="flex items-center gap-3">
          {showBack && !isHome && (
            <Link 
              href="/" 
              className="p-2 hover:bg-[#f3b005]/5 rounded-full transition-colors text-[#666] hover:text-[#f3b005] group"
              title="Return Home"
            >
              <ArrowLeft className="w-5 h-5 transition-transform" />
            </Link>
          )}
          <Link href="/" className="transition-all hover:opacity-80 active:scale-[0.98]">
             <FreePayLogo className="scale-[0.8] md:scale-90 origin-left" />
          </Link>
        </div>

        {/* Right Side: Action Links */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/create">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 md:px-5 md:py-2.5 rounded-xl font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                pathname === "/create" 
                  ? "bg-[#f3b005] text-black shadow-sm" 
                  : "bg-[#171717] text-[#888] hover:text-white border border-[#222] hover:border-[#333]"
              }`}
            >
              <PlusCircle className="w-4 h-4 md:w-3.5 md:h-3.5" />
              <span className="hidden md:inline">Create Link</span>
            </motion.button>
          </Link>

          <Link href="/account">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 md:px-5 md:py-2.5 rounded-xl font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                pathname === "/account" 
                  ? "bg-[#f3b005] text-black shadow-sm" 
                  : "bg-[#171717] text-[#888] hover:text-white border border-[#222] hover:border-[#333]"
              }`}
            >
              <User className="w-4 h-4 md:w-3.5 md:h-3.5" />
              <span className="hidden md:inline">Account</span>
            </motion.button>
          </Link>
        </div>

      </div>
    </nav>
  );
}
