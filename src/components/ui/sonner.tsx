"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#1b1b20] group-[.toaster]:text-[#e4e1e9] group-[.toaster]:border-[#4a4455]/40 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#ccc3d8]",
          actionButton:
            "group-[.toast]:bg-[#7c3aed] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-[#35343a] group-[.toast]:text-[#e4e1e9]",
          error:
            "group-[.toaster]:bg-[#93000a]/20 group-[.toaster]:text-[#ffb4ab] group-[.toaster]:border-[#93000a]/40",
          success:
            "group-[.toaster]:bg-green-400/10 group-[.toaster]:text-green-400 group-[.toaster]:border-green-400/20",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
