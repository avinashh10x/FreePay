import { StarkZap } from "starkzap";
import { STARKZAP_NETWORK } from "./constants";

let sdkInstance: StarkZap | null = null;

export function getStarkZapSDK(): StarkZap {
  if (!sdkInstance) {
    sdkInstance = new StarkZap({ network: STARKZAP_NETWORK });
  }
  return sdkInstance;
}

export function clearStarkZapSDK() {
  sdkInstance = null;
}
