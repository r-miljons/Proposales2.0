import { Header } from "@/components/headers";
import Footer from "@/components/footer/Footer";


export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="max-w-screen-xl mx-auto flex-1 flex flex-col p-4 md:px-8 md:py-16 lg:px-16 xl:px-32">
          {children}
        </main>
        <Footer />
    </div>
  );
}