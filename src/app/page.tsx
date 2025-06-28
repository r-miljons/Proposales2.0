
import { TypographyH1, TypographyP } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { ProposalCard } from "@/components/proposal/Card";
import Link from "next/link";
import { Rocket } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 w-full max-w-screen-xl mx-auto p-4 py-20 flex flex-col items-start justify-start min-h-[60vh]">
      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        {/* Left side: Description and button */}
        <div className="flex flex-col items-start">
          <TypographyH1 className="!text-left">The Proposales Challenge Project</TypographyH1>
          <TypographyP className="max-w-2xl text-left text-muted-foreground">
            The idea of this project was born out of using the existing platform with the intended goal of creating a proposal for a 5 day team building trip to the Georgian Caucasus mountains for an imaginary corporate client.
          </TypographyP>
          {/* Yea or Nay SVGs - responsive, with light mode inversion */}
          <div className="mt-16 mb-8 self-center sm:self-start flex flex-col items-center">
            {/* Horizontal for md+ screens, vertical for small screens */}
            <div className="block sm:hidden w-40">
              <Image
                src="/images/yea-or-nay-vertical.svg"
                alt="Yea or Nay Vertical"
                width={160}
                height={160}
                className="w-full h-auto invert dark:invert-0 select-none"
                draggable={false}
                priority
              />
            </div>
            <div className="hidden sm:block w-[420px]">
              <Image
                src="/images/yea-or-nay-horizontal.svg"
                alt="Yea or Nay Horizontal"
                width={420}
                height={132}
                className="w-full h-auto invert dark:invert-0 select-none"
                draggable={false}
                priority
              />
            </div>
          </div>
        </div>
        {/* Right side: Card with image */}
        <div className="flex justify-start">
          <ProposalCard
            imageUrl="/images/Georgia-trinity-church.jpg"
            alt="Team building trip to the Georgian Caucasus mountains"
            days={5}
            title="Team building trip to the Georgian Caucasus mountains"
          />
        </div>
      </div>
    </main>
  );
}
