"use client";

import { SiteConfigContracts } from "@/config/site";
import useBattlesLoader from "@/hooks/useBattlesLoader";
import { addressToShortAddress } from "@/lib/converters";
import { Battle } from "@/types/battle";
import Link from "next/link";
import { isAddressEqual, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import EntityList from "./entity-list";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function BattleList(props: { contracts: SiteConfigContracts }) {
  const { address } = useAccount();
  const { battles } = useBattlesLoader(address, props.contracts);

  return (
    <EntityList
      entities={battles}
      renderEntityCard={(battle, index) => (
        <BattleCard key={index} battle={battle} contracts={props.contracts} />
      )}
      noEntitiesText="No battles ⚔️"
    />
  );
}

function BattleCard(props: { battle: Battle; contracts: SiteConfigContracts }) {
  return (
    <div className="w-full flex flex-row gap-4 border rounded px-4 py-6">
      {/* Icon */}
      <div>
        <Avatar className="size-16">
          <AvatarImage src="" alt="Battle" />
          <AvatarFallback className="text-2xl bg-primary">⚔️</AvatarFallback>
        </Avatar>
      </div>
      {/* Content */}
      <div className="w-full flex flex-col gap-4">
        <p className="text-xl font-bold">Battle #{props.battle.id}</p>
        {props.battle.started != 0 && (
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="min-w-[80px] text-sm text-muted-foreground">
              Started:
            </p>
            <p className="text-sm">
              {new Date(props.battle.started * 1000).toLocaleString()}
            </p>
          </div>
        )}
        {props.battle.ended != 0 && (
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="min-w-[80px] text-sm text-muted-foreground">Ended:</p>
            <p className="text-sm">
              {new Date(props.battle.ended * 1000).toLocaleString()}
            </p>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:gap-3">
          <p className="min-w-[80px] text-sm text-muted-foreground">
            Initiator:
          </p>
          <div className="flex flex-col gap-4">
            <p className="text-sm">
              <a
                href={`${props.contracts.chain.blockExplorers?.default?.url}/address/${props.battle.userOne}`}
                target="_blank"
                className="underline underline-offset-4"
              >
                {addressToShortAddress(props.battle.userOne)}
              </a>
            </p>
            <BattleCardSquad squad={props.battle.userOneSquad} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-3">
          <p className="min-w-[80px] text-sm text-muted-foreground">
            Opponent:
          </p>
          {isAddressEqual(props.battle.userTwo, zeroAddress) ? (
            <p className="text-sm">Not joined</p>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-sm">
                <a
                  href={`${props.contracts.chain.blockExplorers?.default?.url}/address/${props.battle.userTwo}`}
                  target="_blank"
                  className="underline underline-offset-4"
                >
                  {addressToShortAddress(props.battle.userTwo)}
                </a>
              </p>
              <BattleCardSquad squad={props.battle.userTwoSquad} />
            </div>
          )}
        </div>
        {props.battle.result != 0 && (
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="min-w-[80px] text-sm text-muted-foreground">
              Winner:
            </p>
            <p className="text-sm">{props.battle.result == 1 && "Initiator"}</p>
            <p className="text-sm">{props.battle.result == 2 && "Opponent"}</p>
            <p className="text-sm">{props.battle.result == 3 && "Draw"}</p>
          </div>
        )}

        <Link href={`/battles/${props.contracts.chain.id}/${props.battle.id}`}>
          <Button className="w-full" variant="secondary">
            Open
          </Button>
        </Link>
      </div>
    </div>
  );
}

function BattleCardSquad(props: { squad: string[] }) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar className="size-10 rounded-lg">
          <AvatarImage src="/images/unit-btc-tank.png" alt="Unit Image" />
        </Avatar>
        <p className="text-sm text-muted-foreground">{props.squad[0] || "?"}</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar className="size-10 rounded-lg">
          <AvatarImage src="/images/unit-eth-fighter.png" alt="Unit Image" />
        </Avatar>
        <p className="text-sm text-muted-foreground">{props.squad[1] || "?"}</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar className="size-10 rounded-lg">
          <AvatarImage src="/images/unit-link-soldier.png" alt="Unit Image" />
        </Avatar>
        <p className="text-sm text-muted-foreground">{props.squad[2] || "?"}</p>
      </div>
    </div>
  );
}
