"use client";

import { useState, useCallback, useRef } from "react";
import {
  StarkZap,
  Amount,
  fromAddress,
  getPresets,
} from "starkzap";
import type { WalletInterface } from "starkzap";
import { STARKZAP_NETWORK, CARTRIDGE_POLICIES } from "@/lib/constants";
import { getStarkZapSDK, clearStarkZapSDK } from "@/lib/starkzap";

interface UseStarkZapReturn {
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
}

export function useStarkZap(): UseStarkZapReturn {
  const [wallet, setWallet] = useState<WalletInterface | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

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
      setWalletAddress(connectedWallet.address.toString());
      setIsConnected(true);

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
      
      // Handle the Cartridge initialization error specifically
      if (message.includes("Cartridge Controller failed to initialize")) {
         setError("Connection session error. Please refresh the page and try again.");
         clearStarkZapSDK();
      } else {
         setError(message);
      }
      
      console.error("Wallet connection error:", err);
    } finally {
      setIsConnecting(false);
    }
  }, [getSDK]);

  const disconnectWallet = useCallback(() => {
    clearStarkZapSDK();
    setWallet(null);
    setWalletAddress(null);
    setBalance(null);
    setIsConnected(false);
    setError(null);
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

  return {
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
  };
}
