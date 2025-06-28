import { FC } from "react";
import { Linkedin } from "lucide-react";

const Footer: FC = () => {
  return (
    <footer className="w-full bg-background py-6 flex items-center justify-center text-muted-foreground shadow-t">
      <a
        href="https://www.linkedin.com/in/daniel-renars-miljons/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:text-primary transition-colors"
        aria-label="Daniel Renars Miljons LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
        <span className="font-medium">Daniel Renars Miljons</span>
      </a>
      <span className="mx-2">&copy; 2025</span>
    </footer>
  );
};

export default Footer;
