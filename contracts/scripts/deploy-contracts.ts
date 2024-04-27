import hre, { ethers } from "hardhat";
import { CONTRACTS } from "./data/deployed-contracts";

async function main() {
  console.log("👟 Start script 'deploy-contracts'");

  const network = hre.network.name;

  if (!CONTRACTS[network].squadVerifier) {
    const contractFactory = await ethers.getContractFactory(
      "contracts/SquadVerifier.sol:UltraVerifier"
    );
    const contract = await contractFactory.deploy();
    await contract.waitForDeployment();
    console.log(
      `Contract 'SquadVerifier' deployed to: ${await contract.getAddress()}`
    );
  }

  if (!CONTRACTS[network].battleVerifier) {
    const contractFactory = await ethers.getContractFactory(
      "contracts/BattleVerifier.sol:UltraVerifier"
    );
    const contract = await contractFactory.deploy();
    await contract.waitForDeployment();
    console.log(
      `Contract 'BattleVerifier' deployed to: ${await contract.getAddress()}`
    );
  }

  if (
    !CONTRACTS[network].battle &&
    CONTRACTS[network].squadVerifier &&
    CONTRACTS[network].battleVerifier
  ) {
    const contractFactory = await ethers.getContractFactory("Battle");
    const contract = await contractFactory.deploy(
      CONTRACTS[network].squadVerifier as `0x${string}`,
      CONTRACTS[network].battleVerifier as `0x${string}`
    );
    await contract.waitForDeployment();
    console.log(
      `Contract 'Battle' deployed to: ${await contract.getAddress()}`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
