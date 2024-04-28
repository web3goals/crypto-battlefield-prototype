"use client";

import EntityList from "@/components/entity-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SiteConfigContracts, siteConfig } from "@/config/site";
import useUsersLoader from "@/hooks/useUsersLoaders";
import { addressToShortAddress } from "@/lib/converters";
import { User } from "@/types/user";

export default function LeaderboardPage() {
  const contracts = siteConfig.contracts.scrollSepolia;
  const { users } = useUsersLoader(contracts);

  return (
    <div className="container py-10 lg:px-80">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Leaderboard</h2>
        <p className="text-muted-foreground">
          Find out who the best of the best are
        </p>
      </div>
      <Separator className="my-6" />
      <EntityList
        entities={users}
        renderEntityCard={(user, index) => (
          <LeaderboardUserCard
            key={index}
            index={index}
            user={user}
            contracts={contracts}
          />
        )}
        noEntitiesText="No users 👤"
      />
    </div>
  );
}

function LeaderboardUserCard(props: {
  index: number;
  user: User;
  contracts: SiteConfigContracts;
}) {
  return (
    <div className="w-full flex flex-row gap-4 border rounded px-4 py-6">
      {/* Icon */}
      <div>
        <Avatar className="size-16">
          <AvatarImage src="" alt="Battle" />
          <AvatarFallback className="text-2xl bg-primary">
            {props.index == 0 ? "🥇" : "🎖️"}
          </AvatarFallback>
        </Avatar>
      </div>
      {/* Content */}
      <div className="w-full flex flex-col gap-3">
        <p className="text-lg">
          <a
            href={`${props.contracts.chain.blockExplorers?.default?.url}/address/${props.user.address}`}
            target="_blank"
            className="underline underline-offset-4"
          >
            {addressToShortAddress(props.user.address)}
          </a>
        </p>
        <div className="flex flex-col md:flex-row md:gap-2">
          <p className="min-w-[80px] text-sm text-muted-foreground">Battles:</p>
          <p className="text-sm">{props.user.battles}</p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-2">
          <p className="min-w-[80px] text-sm text-muted-foreground">
            Victories:
          </p>
          <p className="text-sm">{props.user.victories} </p>
          <p className="text-sm text-muted-foreground">
            ({((props.user.victories / props.user.battles) * 100).toFixed(2)}
            %)
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-2">
          <p className="min-w-[80px] text-sm text-muted-foreground">Defeats:</p>
          <p className="text-sm">{props.user.defeats}</p>
          <p className="text-sm text-muted-foreground">
            ({((props.user.defeats / props.user.battles) * 100).toFixed(2)}
            %)
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-2">
          <p className="min-w-[80px] text-sm text-muted-foreground">Draws:</p>
          <p className="text-sm">{props.user.draws}</p>
          <p className="text-sm text-muted-foreground">
            ({((props.user.draws / props.user.battles) * 100).toFixed(2)}
            %)
          </p>
        </div>
      </div>
    </div>
  );
}
