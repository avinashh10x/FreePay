"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import {
  StarkZap,
  Amount,
  fromAddress,
  getPresets,
} from "starkzap";
import type { WalletInterface } from "starkzap";
import { STARKZAP_NETWORK, CARTRIDGE_POLICIES } from "@/lib/constants";
import { getStarkZapSDK, clearStarkZapSDK } from "@/lib/starkzap";

interface UseStarkZapContextValue {
  wallet: WalletInterface | null;
  isConnecting: boolean;
  isConnected: boolean;
  walletAddress: string | null;
  balance: string | null;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendPayment: (
    recipientAddress: string,
    amount: string,
    tokenSymbol?: string
  ) => Promise<{ hash: string; explorerUrl: string }>;
  isSending: boolean;
  isInitializing: boolean;
}

const StarkZapContext = createContext<UseStarkZapContextValue | undefined>(undefined);

export function StarkZapProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletInterface | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const hasAttemptedAutoConnect = useRef(false);

  const getSDK = useCallback(() => {
    return getStarkZapSDK();
  }, []);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const sdk = getSDK();

      const connectedWallet = await sdk.connectCartridge({
        policies: [...CARTRIDGE_POLICIES],
      });

      setWallet(connectedWallet);
      const address = connectedWallet.address.toString();
      setWalletAddress(address);
      setIsConnected(true);
      
      // Store in localStorage for persistence
      localStorage.setItem("starkzap-connected", "true");
      localStorage.setItem("starkzap-address", address);

      try {
        const presets = getPresets(connectedWallet.getChainId());
        const bal = await connectedWallet.balanceOf(presets.STRK);
        setBalance(bal.toFormatted(true));
      } catch (balErr) {
        console.error("Failed to fetch balance:", balErr);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to connect wallet";
      
      if (message.includes("Cartridge Controller failed to initialize")) {
         setError("Connection session error. Please refresh the page and try again.");
         clearStarkZapSDK();
      } else {
         setError(message);
      }
      
      localStorage.removeItem("starkzap-connected");
      localStorage.removeItem("starkzap-address");
      console.error("Wallet connection error:", err);
    } finally {
      setIsConnecting(false);
    }
  }, [getSDK]);

  // Handle auto-connect on mount
  useEffect(() => {
    const handleInitialConnect = async () => {
      if (!hasAttemptedAutoConnect.current) {
        hasAttemptedAutoConnect.current = true;
        const wasConnected = localStorage.getItem("starkzap-connected") === "true";
        if (wasConnected) {
          try {
            await connectWallet();
          } catch (err) {
            console.error("Auto-connect failed:", err);
          }
        }
        setIsInitializing(false);
      }
    };

    handleInitialConnect();
  }, [connectWallet]);

  const disconnectWallet = useCallback(() => {
    clearStarkZapSDK();
    setWallet(null);
    setWalletAddress(null);
    setBalance(null);
    setIsConnected(false);
    setError(null);
    localStorage.removeItem("starkzap-connected")
    localStorage.removeItem("starkzap-address")
  }, []);

  const sendPayment = useCallback(
    async (
      recipientAddress: string,
      amount: string,
      tokenSymbol: string = "STRK"
    ): Promise<{ hash: string; explorerUrl: string }> => {
      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      setIsSending(true);
      setError(null);

      try {
        const presets = getPresets(wallet.getChainId());
        const token =
          tokenSymbol === "ETH" ? presets.ETH : presets.STRK;

        const parsedAmount = Amount.parse(amount, token);
        const recipient = fromAddress(recipientAddress);

        const tx = await wallet.transfer(token, [
          { to: recipient, amount: parsedAmount },
        ]);

        await tx.wait();

        return {
          hash: tx.hash,
          explorerUrl: tx.explorerUrl,
        };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Transaction failed";
        setError(message);
        throw err;
      } finally {
        setIsSending(false);
      }
    },
    [wallet]
  );

  return (
    <StarkZapContext.Provider
      value={{
        wallet,
        isConnecting,
        isConnected,
        walletAddress,
        balance,
        error,
        connectWallet,
        disconnectWallet,
        sendPayment,
        isSending,
        isInitializing,
      }}
    >
      {children}
    </StarkZapContext.Provider>
  );
}

export function useStarkZapContext() {
  const context = useContext(StarkZapContext);
  if (context === undefined) {
    throw new Error("useStarkZapContext must be used within a StarkZapProvider");
  }
  return context;
}
