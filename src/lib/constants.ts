export const APP_NAME = "FreePay";
export const APP_TAGLINE = "Create payment links in seconds";
export const APP_DESCRIPTION = "Generate crypto payment links and get paid instantly via Starknet";

// StarkZap Network Configuration
export const STARKZAP_NETWORK = "sepolia" as const; // Use "mainnet" for production

// Supported tokens on Sepolia testnet
export const SUPPORTED_TOKENS = [
  { symbol: "STRK", name: "Starknet Token" },
  { symbol: "ETH", name: "Ethereum" },
] as const;

export const DEFAULT_TOKEN = "STRK";

// Starknet Explorer URLs
export const EXPLORER_URLS = {
  sepolia: "https://sepolia.voyager.online",
  mainnet: "https://voyager.online",
} as const;

// Cartridge Controller policies for token transfers
export const CARTRIDGE_POLICIES = [
  { target: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d", method: "transfer" }, // STRK on Sepolia
  { target: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", method: "transfer" }, // ETH on Sepolia
] as const;
