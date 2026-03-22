import { ZapPayLogo } from "@/components/ZapPayLogo";
import { CreatePaymentForm } from "@/components/CreatePaymentForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function CreateAppPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c0c] items-center p-6 sm:p-12 font-sans selection:bg-[#f3b005]/30">
      
      <main className="flex flex-col items-center w-full max-w-xl z-10 animate-fadeIn pt-10">
        <div className="w-full mb-8 flex items-center justify-between">
          <Link href="/" className="text-[#666] hover:text-white transition-colors flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4" /> Exit
          </Link>
          <ZapPayLogo className="scale-75 origin-right" />
        </div>

        <div className="w-full space-y-6">
          <CreatePaymentForm />
        </div>

        <div className="mt-12 text-center text-[10px] text-[#444] font-mono tracking-widest uppercase flex items-center gap-2">
          <span>Starknet Native Engine</span>
        </div>
      </main>
    </div>
  );
}
