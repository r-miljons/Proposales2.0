import { TypographyH1, TypographyP } from "@/components/ui/Typography";

export default function Authorize() {
  return (
    <main className="flex-1 w-full max-w-screen-xl mx-auto p-4 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
      <TypographyH1>The Proposales Challenge Project</TypographyH1>
      <TypographyP className="max-w-2xl text-center text-muted-foreground">
        The idea of this project was born out of using the existing platform with the intended goal of creating a proposal for an imaginary corporate client.
      </TypographyP>
    </main>
  );
}
