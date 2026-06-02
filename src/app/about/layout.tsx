import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="pt-16">
        <div className="fixed top-6 right-6 z-[60]">
          <ThemeToggle />
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
}
