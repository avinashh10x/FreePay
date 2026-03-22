import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[#7c3aed] to-[#0566d9] text-white shadow-[0_8px_32px_rgba(124,58,237,0.3)] hover:shadow-[0_12px_40px_rgba(124,58,237,0.45)] hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-[#35343a] text-[#e4e1e9] hover:bg-[#3f3e44] shadow-none",
        ghost:
          "text-[#d2bbff] hover:bg-[#35343a]/40",
        outline:
          "border border-[#4a4455]/30 bg-transparent text-[#e4e1e9] hover:bg-[#35343a]/30",
        destructive:
          "bg-[#93000a] text-[#ffdad6] hover:bg-[#93000a]/80",
      },
      size: {
        default: "h-12 px-6 rounded-full",
        sm: "h-9 px-4 rounded-full text-xs",
        lg: "h-14 px-8 rounded-full text-base",
        xl: "h-16 px-10 rounded-full text-lg",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
