"use client";

import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const { ready, authenticated, login } = usePrivy();

  return (
    <div className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 lg:h-[calc(100vh-4rem)]">
      {/* Text with button */}
      <section className="flex flex-col items-center py-8">
        <h1 className="text-4xl font-extrabold tracking-tighter text-center md:text-5xl">
          Form squads and battle against real opponents
        </h1>
        <h2 className="text-2xl font-normal tracking-tight text-center text-muted-foreground mt-4">
          A crypto game based on your skills, ZK proofs and the price of tokens
        </h2>
        {ready && authenticated && (
          <Link href="/battles">
            <Button className="mt-6" size="lg">
              Let’s go!
            </Button>
          </Link>
        )}
        {ready && !authenticated && (
          <Button className="mt-6" size="lg" onClick={login}>
            Let’s go!
          </Button>
        )}
      </section>
      {/* Image */}
      <section className="flex flex-col items-center max-w-[580px]">
        <Image
          src="/images/units.png"
          alt="Units"
          priority={false}
          width="100"
          height="100"
          sizes="100vw"
          className="w-full"
        />
      </section>
    </div>
  );
}
