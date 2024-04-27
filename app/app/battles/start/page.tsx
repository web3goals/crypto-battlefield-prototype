"use client";

import { BattleFormSquadForm } from "@/components/battle-form-squad-form";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { siteConfig } from "@/config/site";
import { battleAbi } from "@/contracts/abi/battle";
import useError from "@/hooks/useError";
import { getSquadHash, getSquadProof } from "@/lib/noir";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseEventLogs, toHex } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function StartBattlePage() {
  const router = useRouter();
  const { handleError } = useError();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  async function onSubmit(squad: number[]) {
    try {
      setIsFormSubmitting(true);
      // Check public client
      if (!publicClient) {
        throw new Error("Public client is not ready");
      }
      // Check wallet
      if (!address || !walletClient) {
        throw new Error("Wallet is not connected");
      }
      // Define contracts
      const contracts = siteConfig.contracts.scrollSepolia;
      // Calculate hash
      const squadHash = await getSquadHash(squad);
      // Calculate proof
      const squadProof = await getSquadProof(squadHash as string, squad);
      // Send request to create a battle
      let txHash;
      if (contracts.accountAbstractionSuported) {
        // TODO: Implement
      } else {
        txHash = await walletClient.writeContract({
          address: contracts.battle,
          abi: battleAbi,
          functionName: "start",
          args: [toHex(squadProof), squadHash as `0x${string}`],
          chain: contracts.chain,
        });
      }
      const txReceipt = await publicClient.waitForTransactionReceipt({
        hash: txHash as `0x${string}`,
      });
      const createTxLogs = parseEventLogs({
        abi: battleAbi,
        eventName: "Transfer",
        logs: txReceipt.logs,
      });
      const battleId = createTxLogs[0].args.tokenId;
      // Show success message
      toast({
        title: "Battle started ⚔️",
      });
      router.push(`/battles/${contracts.chain.id}/${battleId}`);
    } catch (error: any) {
      handleError(error, true);
      setIsFormSubmitting(false);
    }
  }

  return (
    <div className="container py-10 lg:px-96">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Squad</h2>
        <p className="text-muted-foreground">
          Choose 10 units for the battle (to unlock units, you need to have the
          associated tokens in your wallet)
        </p>
      </div>
      <Separator className="my-6" />
      <BattleFormSquadForm disabled={isFormSubmitting} onSubmit={onSubmit} />
    </div>
  );
}
