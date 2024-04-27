"use client";

import testCircuit from "@/circuit/test.json";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";

export default function SandboxPage() {
  async function test() {
    try {
      console.log("test");
      // @ts-ignore
      const backend = new BarretenbergBackend(testCircuit);
      // @ts-ignore
      const noir = new Noir(testCircuit, backend);
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
