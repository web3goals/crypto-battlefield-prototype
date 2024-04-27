import { BattleList } from "@/components/battle-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function BattlesPage() {
  return (
    <div className="container py-10 lg:px-80">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Battles</h2>
        <p className="text-muted-foreground">
          That you heroically won or shamefully lost
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col items-start gap-6">
        <Link href="/battles/start">
          <Button>Start Battle</Button>
        </Link>
        {Object.values(siteConfig.contracts).map((contracts, index) => (
          <BattleList key={index} contracts={contracts} />
        ))}
      </div>
    </div>
  );
}
