"use client";

import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

import circuit from "@/circuit/circuit.json";

export default function SandboxPage() {
  async function test() {
    try {
      console.log("test");
      // @ts-ignore
      const backend = new BarretenbergBackend(circuit);
      // @ts-ignore
      const noir = new Noir(circuit, backend);
      const x = 2;
      const input = { x, y: 2 };
      const proof = await noir.generateProof(input);
      console.log("proof", proof);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={test}>&gt; Test</button>
    </main>
  );
}
