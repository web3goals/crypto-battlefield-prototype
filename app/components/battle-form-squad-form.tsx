import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function BattleFormSquadForm(props: {
  disabled?: boolean;
  onSubmit: (squad: number[]) => void;
}) {
  const [unitsOne, setUnitsOne] = useState(0);
  const [unitsTwo, setUnitsTwo] = useState(0);
  const [unitsThree, setUnitsThree] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <Button
        disabled={props.disabled || unitsOne + unitsTwo + unitsThree != 10}
        onClick={() => props.onSubmit([unitsOne, unitsTwo, unitsThree])}
      >
        {props.disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
      <UnitCard
        image="/images/unit-btc-tank.png"
        title="BTC Tank"
        health="6 points"
        attack="1 point"
        booster="Health x2 if the price is even number"
        amount={unitsOne}
        onAmountUpdate={(amount) => setUnitsOne(amount)}
        disabled={props.disabled}
      />
      <UnitCard
        image="/images/unit-eth-fighter.png"
        title="ETH Fighter"
        health="4 points"
        attack="2 point"
        booster="Health x2 if the price is odd number"
        amount={unitsTwo}
        onAmountUpdate={(amount) => setUnitsTwo(amount)}
        disabled={props.disabled}
      />
      <UnitCard
        image="/images/unit-link-soldier.png"
        title="LINK Soldier"
        health="2 points"
        attack="3 point"
        booster="Health x3 if the price ends at 5"
        amount={unitsThree}
        onAmountUpdate={(amount) => setUnitsThree(amount)}
        disabled={props.disabled}
      />
      <UnitCard
        image="/images/unit-doge-dog.png"
        title="DOGE Dog"
        health="1 points"
        attack="4 point"
        booster="Attack x3 if the price ends at 5"
        amount={0}
        onAmountUpdate={() => {}}
        disabled={props.disabled}
        notAvailable={true}
      />
    </div>
  );
}

function UnitCard(props: {
  image: string;
  title: string;
  health: string;
  attack: string;
  booster: string;
  amount: number;
  onAmountUpdate: (amount: number) => void;
  disabled?: boolean;
  notAvailable?: boolean;
}) {
  return (
    <div className="w-full flex flex-col gap-6 bg-card border rounded px-6 py-8">
      <UnitCardHeader
        image={props.image}
        title={props.title}
        health={props.health}
        attack={props.attack}
        booster={props.booster}
      />
      <Separator className="bg-muted" />
      <UnitCardActions
        amount={props.amount}
        onAmountUpdate={props.onAmountUpdate}
        disabled={props.disabled}
        notAvailable={props.notAvailable}
      />
    </div>
  );
}

function UnitCardHeader(props: {
  image: string;
  title: string;
  health: string;
  attack: string;
  booster: string;
}) {
  return (
    <div className="w-full flex flex-row gap-6">
      {/* Image */}
      <div>
        <Avatar className="size-36 rounded-lg">
          <AvatarImage src={props.image} alt="Icon" />
        </Avatar>
      </div>
      {/* Content */}
      <div className="w-full flex flex-col gap-3">
        <p className="text-xl font-bold">{props.title}</p>
        <div className="flex flex-col md:flex-row md:gap-3">
          <p className="min-w-[60px] text-sm text-muted-foreground">Health:</p>
          <p className="text-sm break-all">{props.health}</p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-3">
          <p className="min-w-[60px] text-sm text-muted-foreground">Attack:</p>
          <p className="text-sm break-all">{props.attack}</p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-3">
          <p className="min-w-[60px] text-sm text-muted-foreground">Booster:</p>
          <p className="text-sm break-all">{props.booster}</p>
        </div>
      </div>
    </div>
  );
}

function UnitCardActions(props: {
  amount: number;
  onAmountUpdate: (amount: number) => void;
  disabled?: boolean;
  notAvailable?: boolean;
}) {
  if (props.notAvailable) {
    return (
      <Button variant="secondary" disabled={true}>
        Not Available
      </Button>
    );
  }

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <Button
        variant="secondary"
        className="min-w-[120px]"
        disabled={props.disabled || props.amount == 0}
        onClick={() => props.onAmountUpdate(props.amount - 1)}
      >
        -
      </Button>
      <p className="text-sm font-extrabold">{props.amount} units</p>
      <Button
        variant="default"
        className="min-w-[120px]"
        disabled={props.disabled || props.amount == 10}
        onClick={() => props.onAmountUpdate(props.amount + 1)}
      >
        +
      </Button>
    </div>
  );
}
