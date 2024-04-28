export type Battle = {
  id: string;
  userOne: `0x${string}`;
  userOneSquad: string[];
  userTwo: `0x${string}`;
  userTwoSquad: string[];
  result: number;
  started: number;
  ended: number;
};
