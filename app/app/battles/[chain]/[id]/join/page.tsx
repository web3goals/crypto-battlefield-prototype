"use client";

import { BattleFormSquadForm } from "@/components/battle-form-squad-form";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { battleAbi } from "@/contracts/abi/battle";
import useError from "@/hooks/useError";
import useSiteConfigContracts from "@/hooks/useSiteConfigContracts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function JoinBattlePage({
  params,
}: {
  params: { chain: number; id: string };
}) {
  const router = useRouter();
  const { handleError } = useError();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { contracts } = useSiteConfigContracts(params.chain);
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
      // Send request to join the battle
      let txHash;
      if (contracts.accountAbstractionSuported) {
        // TODO: Implement
      } else {
        txHash = await walletClient.writeContract({
          address: contracts.battle,
          abi: battleAbi,
          functionName: "join",
          args: [BigInt(params.id), squad.map((unit) => BigInt(unit))],
          chain: contracts.chain,
        });
      }
      await publicClient.waitForTransactionReceipt({
        hash: txHash as `0x${string}`,
      });
      // Show success message
      toast({
        title: "Joined the battle ⚔️",
      });
      router.push(`/battles/${params.chain}/${params.id}`);
    } catch (error: any) {
      handleError(error, true);
      setIsFormSubmitting(false);
    }
  }

  return (
    <div className="container py-10 lg:px-80 xl:px-96">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Squad</h2>
        <p className="text-muted-foreground">
          Choose 10 units for the{" "}
          <a
            href={`/battles/${params.chain}/${params.id}`}
            target="_blank"
            className="underline underline-offset-4"
          >
            battle #{params.id}
          </a>{" "}
          (to unlock units, you need to have the associated tokens in your
          wallet)
        </p>
      </div>
      <Separator className="my-6" />
      <BattleFormSquadForm disabled={isFormSubmitting} onSubmit={onSubmit} />
    </div>
  );
}
