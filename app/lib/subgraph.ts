import { SiteConfigContracts } from "@/config/site";
import axios from "axios";

export async function makeSubgraphQuery(
  contracts: SiteConfigContracts,
  query: string
) {
  try {
    const response = await axios.post(contracts.subgraph, { query: query });
    if (response.data.errors) {
      throw new Error(JSON.stringify(response.data.errors));
    }
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      `Could not query the subgraph: ${JSON.stringify(error.message)}`
    );
  }
}
