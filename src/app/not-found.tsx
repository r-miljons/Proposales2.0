import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center">
      <Ghost className="mx-auto text-primary ghost-float" size={60} />
      <div>
        <h1 className="text-4xl text-primary font-bold mb-4">Page not found</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Hmmm... this page does not exist or has been moved to another address.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="default" size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2" /> Back to homepage
          </Link>
        </Button>
      </div>
    </main>
  );
}

