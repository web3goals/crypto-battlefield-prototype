export function calculateBattleResult(
  userOneSquad: number[],
  userTwoSquad: number[]
): number {
  // Calculate health
  let userOneHealth =
    userOneSquad[0] * 6 + userOneSquad[1] * 4 + userOneSquad[2] * 2;
  let userTwoHealth =
    userTwoSquad[0] * 6 + userTwoSquad[1] * 4 + userTwoSquad[2] * 2;

  // Calculate attack
  let userOneAttack =
    userOneSquad[0] * 1 + userOneSquad[1] * 2 + userOneSquad[2] * 3;
  let userTwoAttack =
    userTwoSquad[0] * 1 + userTwoSquad[1] * 2 + userTwoSquad[2] * 3;

  // Calculate health after attack
  userOneHealth -= userTwoAttack;
  userTwoHealth -= userOneAttack;

  // Calculate result (1 - user one won, 2 - user two won, 3 - draw)
  let result = 3;
  if (userOneHealth > userTwoHealth) {
    result = 1;
  }
  if (userOneHealth < userTwoHealth) {
    result = 2;
  }

  return result;
}
