import hashCircuit from "@/circuit/hash.json";
import squadCircuit from "@/circuit/squad.json";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

export async function getSquadHash(squad: number[]) {
  // @ts-ignore
  const backend = new BarretenbergBackend(hashCircuit);
  // @ts-ignore
  const noir = new Noir(hashCircuit, backend);
  const response = await noir.execute({ squad: squad });
  return response.returnValue;
}

export async function getSquadProof(squadHash: string, squad: number[]) {
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
