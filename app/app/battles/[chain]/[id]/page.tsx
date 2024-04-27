"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { SiteConfigContracts } from "@/config/site";
import { battleAbi } from "@/contracts/abi/battle";
import useError from "@/hooks/useError";
import useSiteConfigContracts from "@/hooks/useSiteConfigContracts";
import { calculateBattleResult } from "@/lib/battle";
import { addressToShortAddress } from "@/lib/converters";
import { getBattleResultProof } from "@/lib/noir";
import { cn } from "@/lib/utils";
import { LocalSquad } from "@/types/local-squad";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isAddressEqual, toHex, zeroAddress } from "viem";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWalletClient,
} from "wagmi";

export default function BattlePage({
  params,
}: {
  params: { chain: number; id: string };
}) {
  const { contracts } = useSiteConfigContracts(params.chain);
  const [localSquad, setLocalSquad] = useState<LocalSquad | undefined>();

  const {
    data: battleParams,
    isFetched: isBattletParamsFetched,
    refetch: refetchBattleParams,
  } = useReadContract({
    address: contracts.battle,
    abi: battleAbi,
    functionName: "getParams",
    args: [BigInt(params.id)],
    chainId: contracts.chain.id,
  });

  const { data: battleOwner, isFetched: isBattleOwnerFetched } =
    useReadContract({
      address: contracts.battle,
      abi: battleAbi,
      functionName: "ownerOf",
      args: [BigInt(params.id)],
      chainId: contracts.chain.id,
    });

  useEffect(() => {
    const localSquad = localStorage.getItem(
      `squad_${params.chain}_${params.id}`
    );
    if (localSquad) {
      setLocalSquad(JSON.parse(localSquad) as LocalSquad);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container py-10 lg:px-64 xl:px-80">
      {isBattletParamsFetched && isBattleOwnerFetched ? (
        <>
          <SquadsSection
            battle={params.id}
            userOne={battleOwner as `0x${string}`}
            userOneSquad={
              localSquad?.squad ||
              (battleParams?.userOneSquad as bigint[]).map((unit) =>
                Number(unit)
              )
            }
            userOneSquadHash={localSquad?.hash || "0x0"}
            userTwo={battleParams?.userTwo as `0x${string}`}
            userTwoSquad={(battleParams?.userTwoSquad as bigint[]).map((unit) =>
              Number(unit)
            )}
            result={Number(battleParams?.result as bigint)}
            contracts={contracts}
            onUpdate={() => refetchBattleParams()}
          />
          <Separator className="my-8" />
          <JournalSection
            userOne={battleOwner as `0x${string}`}
            userTwo={battleParams?.userTwo as `0x${string}`}
            result={Number(battleParams?.result as bigint)}
            btcUsdPrice={Number(battleParams?.btcUsd as bigint)}
            ethUsdPrice={Number(battleParams?.ethUsd as bigint)}
            linkUsdPrice={Number(battleParams?.linkUsd as bigint)}
            started={Number(battleParams?.started as bigint)}
            joined={Number(battleParams?.joined as bigint)}
            ended={Number(battleParams?.ended as bigint)}
            contracts={contracts}
          />
        </>
      ) : (
        <Skeleton className="w-full h-8" />
      )}
    </div>
  );
}

function SquadsSection(props: {
  battle: string;
  userOne: `0x${string}`;
  userOneSquad: number[];
  userOneSquadHash: `0x${string}`;
  userTwo: `0x${string}`;
  userTwoSquad: number[];
  result: number;
  onUpdate: () => void;
  contracts: SiteConfigContracts;
}) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:justify-between md:gap-4">
      <SquadCard
        title="Initiator"
        user={props.userOne}
        userSquad={props.userOneSquad}
        winner={props.result === 1}
        contracts={props.contracts}
      />
      <SquadsMiddleDetails
        battle={props.battle}
        userOne={props.userOne}
        userOneSquad={props.userOneSquad}
        userOneSquadHash={props.userOneSquadHash}
        userTwo={props.userTwo}
        userTwoSquad={props.userTwoSquad}
        result={props.result}
        contracts={props.contracts}
        onUpdate={props.onUpdate}
      />
      {isAddressEqual(props.userTwo, zeroAddress) ? (
        <JoinCard battle={props.battle} contracts={props.contracts} />
      ) : (
        <SquadCard
          title="Opponent"
          user={props.userTwo}
          userSquad={props.userTwoSquad}
          winner={props.result === 2}
          contracts={props.contracts}
        />
      )}
    </div>
  );
}

function SquadsMiddleDetails(props: {
  battle: string;
  userOne: `0x${string}`;
  userOneSquad: number[];
  userOneSquadHash: string;
  userTwo: `0x${string}`;
  userTwoSquad: number[];
  result: number;
  contracts: SiteConfigContracts;
  onUpdate: () => void;
}) {
  const { handleError } = useError();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  async function onSubmit() {
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
      // Check caller
      if (!isAddressEqual(props.userOne, address)) {
        throw new Error("The battle can only be ended by the initiator");
      }
      // Check user one data
      if (props.userOneSquad.length === 0 || props.userOneSquadHash === "0x0") {
        throw new Error("Failed to load initiator's squad data");
      }
      // Calculate battle result
      const battleResult = calculateBattleResult(
        props.userOneSquad,
        props.userTwoSquad
      );
      // Calculate battle result proof
      const battleResultProof = await getBattleResultProof(
        props.userOneSquadHash,
        props.userOneSquad,
        props.userTwoSquad,
        battleResult
      );
      // Send request to end the battle
      let txHash;
      if (props.contracts.accountAbstractionSuported) {
        // TODO: Implement
      } else {
        txHash = await walletClient.writeContract({
          address: props.contracts.battle,
          abi: battleAbi,
          functionName: "end",
          args: [
            BigInt(props.battle),
            props.userOneSquad.map((unit) => BigInt(unit)),
            BigInt(battleResult),
            toHex(battleResultProof),
          ],
          chain: props.contracts.chain,
        });
      }
      await publicClient.waitForTransactionReceipt({
        hash: txHash as `0x${string}`,
      });
      // Show success message
      toast({
        title: "Battle ended ⚔️",
      });
      props.onUpdate();
    } catch (error: any) {
      handleError(error, true);
      setIsFormSubmitting(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-lg">Battle #{props.battle}</p>
      <p className="text-primary text-4xl font-extrabold mt-1">VS</p>
      {!isAddressEqual(props.userTwo, zeroAddress) && props.result === 0 && (
        <Button disabled={isFormSubmitting} className="mt-4" onClick={onSubmit}>
          {isFormSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}{" "}
          End
        </Button>
      )}
    </div>
  );
}

function SquadCard(props: {
  title: string;
  user: `0x${string}`;
  userSquad: number[];
  winner?: boolean;
  contracts: SiteConfigContracts;
}) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center bg-card border rounded px-4 py-4",
        props.winner ? "border-4 border-primary" : ""
      )}
    >
      <p className="text-lg font-bold">
        {props.title}
        {props.winner && <span className="text-primary"> · Winner</span>}
      </p>
      <p>
        <a
          href={`${props.contracts.chain.blockExplorers?.default?.url}/address/${props.user}`}
          target="_blank"
          className="text-sm text-muted-foreground underline underline-offset-4"
        >
          {addressToShortAddress(props.user)}
        </a>
      </p>
      <div className="flex flex-row mt-4 gap-4">
        <div className="flex flex-col items-center gap-1">
          <Avatar className="size-16 rounded-lg">
            <AvatarImage src="/images/unit-btc-tank.png" alt="Unit Image" />
          </Avatar>
          <p className="text-sm text-muted-foreground">
            {typeof props.userSquad?.[0] === "number"
              ? props.userSquad?.[0]
              : "?"}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Avatar className="size-16 rounded-lg">
            <AvatarImage src="/images/unit-eth-fighter.png" alt="Unit Image" />
          </Avatar>
          <p className="text-sm text-muted-foreground">
            {typeof props.userSquad?.[1] === "number"
              ? props.userSquad?.[1]
              : "?"}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Avatar className="size-16 rounded-lg">
            <AvatarImage src="/images/unit-link-soldier.png" alt="Unit Image" />
          </Avatar>
          <p className="text-sm text-muted-foreground">
            {typeof props.userSquad?.[2] === "number"
              ? props.userSquad?.[2]
              : "?"}
          </p>
        </div>
      </div>
    </div>
  );
}

function JoinCard(props: { battle: string; contracts: SiteConfigContracts }) {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-card border rounded px-4 py-4">
      <p className="text-lg font-bold">Opponent</p>
      <Link href={`/battles/${props.contracts.chain.id}/${props.battle}/join`}>
        <Button className="mt-4">Join</Button>
      </Link>
    </div>
  );
}

function JournalSection(props: {
  userOne: `0x${string}`;
  userTwo: `0x${string}`;
  btcUsdPrice: number;
  ethUsdPrice: number;
  linkUsdPrice: number;
  started: number;
  joined: number;
  ended: number;
  result: number;
  contracts: SiteConfigContracts;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* TODO: Implement journal record for a draw case */}
      {(props.result == 1 || props.result == 2) && (
        <JournalRecord
          icon="☠️"
          content={
            <p className="font-light">
              <span className="font-extrabold">
                {addressToShortAddress(props.userOne)}
              </span>{" "}
              ended the battle that was won by{" "}
              <span className="font-extrabold">
                {addressToShortAddress(
                  props.result === 1 ? props.userOne : props.userTwo
                )}
              </span>{" "}
              under the conditions that the price of BTC was{" "}
              <span className="font-extrabold">
                {props.btcUsdPrice.toString().slice(0, -2)},
                {props.btcUsdPrice.toString().slice(-2)} USD
              </span>
              , the price of ETH was{" "}
              <span className="font-extrabold">
                {props.ethUsdPrice.toString().slice(0, -2)},
                {props.ethUsdPrice.toString().slice(-2)} USD
              </span>
              , the price of LINK was{" "}
              <span className="font-extrabold">
                {props.linkUsdPrice.toString().slice(0, -2)},
                {props.linkUsdPrice.toString().slice(-2)} USD
              </span>
            </p>
          }
          date={new Date(props.ended * 1000).getTime()}
        />
      )}
      {!isAddressEqual(props.userTwo, zeroAddress) && (
        <JournalRecord
          icon="⚔️"
          content={
            <p className="font-light">
              <span className="font-extrabold">
                {addressToShortAddress(props.userTwo)}
              </span>{" "}
              joined the battle
            </p>
          }
          date={new Date(props.joined * 1000).getTime()}
        />
      )}
      <JournalRecord
        icon="🗡️"
        content={
          <p className="font-light">
            <span className="font-extrabold">
              {addressToShortAddress(props.userOne)}
            </span>{" "}
            started the battle with a hidden squad, providing a ZK Proof
          </p>
        }
        date={new Date(props.started * 1000).getTime()}
      />
    </div>
  );
}

function JournalRecord(props: {
  icon: string;
  content: React.ReactNode;
  date?: number;
}) {
  return (
    <div className="w-full flex flex-row gap-4 bg-card border rounded px-4 py-4">
      {/* Icon */}
      <div>
        <Avatar className="size-12">
          <AvatarImage src="" alt="Record" />
          <AvatarFallback className="text-xl bg-primary">
            {props.icon}
          </AvatarFallback>
        </Avatar>
      </div>
      {/* Content */}
      <div>
        {props.content}
        {props.date && (
          <p className="text-sm text-muted-foreground mt-2">
            {new Date(props.date).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
