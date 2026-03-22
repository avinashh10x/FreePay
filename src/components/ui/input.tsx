import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-2xl bg-[#0e0e13] px-5 text-base text-[#e4e1e9] placeholder:text-[#958da1] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/40 disabled:cursor-not-allowed disabled:opacity-50 font-[family-name:var(--font-geist-sans)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
