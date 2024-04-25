import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import hashCircuit from "../../circuit/lib/export/hash.json";
import squadCircuit from "../../circuit/squad/target/circuit.json";

async function getSquadHash(squad: number[]) {
  // @ts-ignore
  const backend = new BarretenbergBackend(hashCircuit);
  // @ts-ignore
  const noir = new Noir(hashCircuit, backend);
  const response = await noir.execute({ squad: squad });
  return response.returnValue;
}

async function getSquadProof(squadHash: string, squad: number[]) {
  // @ts-ignore
  const backend = new BarretenbergBackend(squadCircuit);
  // @ts-ignore
  const noir = new Noir(squadCircuit, backend);
  const response = await noir.generateProof({
    squad_hash: squadHash,
    squad: squad,
  });
  return response.proof;
}

async function initFixture() {
  // Get signers
  const [deployer, userOne, userTwo] = await ethers.getSigners();
  // Deploy contracts
  const squadContractFactory = await ethers.getContractFactory("UltraVerifier");
  const squadContract = await squadContractFactory.deploy();
  const battleContractFactory = await ethers.getContractFactory("Battle");
  const battleContract = await battleContractFactory.deploy(
    squadContract.getAddress()
  );
  return {
    deployer,
    userOne,
    userTwo,
    battleContract,
  };
}

describe("Battle", function () {
  it("Should support the main flow", async function () {
    const { userOne, userTwo, battleContract } = await loadFixture(initFixture);
    // Start battle
    const userOneSquad = [2, 3, 5];
    const userOneSquadHash = await getSquadHash(userOneSquad);
    const userOneSquadProof = await getSquadProof(
      userOneSquadHash as string,
      userOneSquad
    );
    await expect(
      battleContract
        .connect(userOne)
        .start(userOneSquadProof, userOneSquadHash as string)
    ).to.be.not.reverted;
    const battleId = (await battleContract.nextTokenId()) - 1n;
    // Join battle
    const userTwoSquad = [5, 4, 1];
    await expect(battleContract.connect(userTwo).join(battleId, userTwoSquad))
      .to.be.not.reverted;
  });
});
