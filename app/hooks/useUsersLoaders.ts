import { SiteConfigContracts } from "@/config/site";
import { makeSubgraphQuery } from "@/lib/subgraph";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import useError from "./useError";

export default function useUsersLoader(contracts: SiteConfigContracts): {
  users: User[] | undefined;
} {
  const { handleError } = useError();
  const [users, setUsers] = useState<User[] | undefined>();

  useEffect(() => {
    // Clear data
    setUsers(undefined);
    // Prepare query
    const sortParams = `orderBy: battles, orderDirection: desc`;
    const paginationParams = `first: 10, skip: 0`;
    const query = `{
        users(${sortParams}, ${paginationParams}) {
          id
          battles
          victories
          defeats
          draws
        }
      }`;
    // Make query
    makeSubgraphQuery(contracts, query)
      .then((response) => {
        setUsers(
          response.users?.map((responseUser: any) => {
            const user: User = {
              address: responseUser.id as `0x${string}`,
              battles: responseUser.battles as number,
              victories: responseUser.victories as number,
              defeats: responseUser.defeats as number,
              draws: responseUser.draws as number,
            };
            return user;
          })
        );
      })
      .catch((error) => handleError(error, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contracts]);

  return { users };
}
