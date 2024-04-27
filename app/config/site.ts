import { Chain, scrollSepolia } from "viem/chains";

export type SiteConfig = typeof siteConfig;

export type SiteConfigContracts = {
  chain: Chain;
  battle: `0x${string}`;
  entryPoint: `0x${string}`;
  paymaster: `0x${string}`;
  accountFactory: `0x${string}`;
  accountAbstractionSuported: boolean;
};

export const siteConfig = {
  emoji: "⚔️",
  name: "Crypto Battlefield",
  description:
    "A crypto game based on your skills, ZK proofs and the price of tokens",
  links: {
    github: "https://github.com/web3goals/crypto-battlefield-prototype",
  },
  contracts: {
    scrollSepolia: {
      chain: scrollSepolia,
      battle: "0x9cAAb0Bf70BD0e71307BfaBeb1E8eC092c81e493" as `0x${string}`,
      entryPoint: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      paymaster: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountFactory:
        "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountAbstractionSuported: false,
    } as SiteConfigContracts,
  },
};
