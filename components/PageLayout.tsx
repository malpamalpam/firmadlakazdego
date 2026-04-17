import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  bgImage?: string;
}

export default function PageLayout({ children, title, bgImage }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Section Headline */}
        <section
          className="section-headline text-center"
          style={{ backgroundImage: bgImage ? `url('${bgImage}')` : "linear-gradient(135deg, #4E459D, #00BBFF)" }}
        >
          <div className="container mx-auto px-5 relative z-10">
            <h1 className="text-white text-2xl md:text-4xl uppercase mb-0">{title}</h1>
          </div>
        </section>

        {children}
      </main>
      <Footer />
    </>
  );
}
