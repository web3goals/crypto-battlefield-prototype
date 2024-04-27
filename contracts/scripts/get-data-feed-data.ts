import hre, { ethers } from "hardhat";
import { CONTRACTS } from "./data/deployed-contracts";

async function main() {
  console.log("👟 Start script 'get-data-feed-data'");

  const network = hre.network.name;

  const battleContract = await ethers.getContractAt(
    "Battle",
    CONTRACTS[network].battle as `0x${string}`
  );
  const btcUsdLatestAnswer =
    await battleContract.getBtcUsdDataFeedLatestAnswer();
  console.log("btcUsdLatestAnswer:", btcUsdLatestAnswer);

  console.log("🏁 Script finished");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
