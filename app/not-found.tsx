import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-medium mb-6">Strona nie znaleziona</h2>
          <p className="text-body mb-8">Przepraszamy, strona ktorej szukasz nie istnieje.</p>
          <Link href="/" className="btn-secondary px-8 py-3">
            Wrocdo strony glownej
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
