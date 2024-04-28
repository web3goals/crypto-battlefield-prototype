import { SiteConfigContracts } from "@/config/site";
import { makeSubgraphQuery } from "@/lib/subgraph";
import { Battle } from "@/types/battle";
import { useEffect, useState } from "react";
import useError from "./useError";

export default function useBattlesLoader(
  user: `0x${string}` | undefined,
  contracts: SiteConfigContracts
): { battles: Battle[] | undefined } {
  const { handleError } = useError();
  const [battles, setBattles] = useState<Battle[] | undefined>();

  useEffect(() => {
    // Clear data
    setBattles(undefined);
    if (!user) {
      return;
    }
    // Prepare query
    const filterParams1 = `where: {userOne: "${user.toLowerCase()}"}`;
    const filterParams2 = `where: {userTwo: "${user.toLowerCase()}"}`;
    const paginationParams = `first: 10, skip: 0`;
    const query = `{
        battles1:battles(${filterParams1}, ${paginationParams}) {
          id
          userOne
          userOneSquad
          userTwo
          userTwoSquad
          result
          started
          ended
        }
        battles2:battles(${filterParams2}, ${paginationParams}) {
          id
          userOne
          userOneSquad
          userTwo
          userTwoSquad
          result
          started
          ended
        }
      }`;
    // Make query
    makeSubgraphQuery(contracts, query)
      .then((response) => {
        setBattles(
          [...response.battles1, ...response.battles2]?.map(
            (responseBattle: any) => {
              const battle: Battle = {
                id: responseBattle.id as string,
                userOne: responseBattle.userOne as `0x${string}`,
                userOneSquad: responseBattle.userOneSquad as string[],
                userTwo: responseBattle.userTwo as `0x${string}`,
                userTwoSquad: responseBattle.userTwoSquad as string[],
                result: Number(responseBattle.result),
                started: Number(responseBattle.started),
                ended: Number(responseBattle.ended),
              };
              return battle;
            }
          )
        );
      })
      .catch((error) => handleError(error, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, contracts]);

  return { battles };
}
