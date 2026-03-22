import { Navbar } from "@/components/Navbar";
import { CreatePaymentForm } from "@/components/CreatePaymentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Payment Link",
  description: "Generate a custom crypto payment link on Starknet. No middleman, instant execution.",
};

export default function CreateAppPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0c0c] font-sans selection:bg-[#f3b005]/30">

      <Navbar showBack={true} />

      <main className="flex flex-col items-center w-full max-w-xl mx-auto z-10 animate-fadeIn pt-10 px-6 sm:px-12">

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
