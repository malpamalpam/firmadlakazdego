import PageLayout from "@/components/PageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Firma Dla Kazdego",
  description: "Blog Firma Dla Kazdego - aktualnosci, porady i informacje dla przedsiebiorcow.",
};

const posts = [
  {
    title: "Jak zalozyc firme w Polsce w 2024 roku?",
    excerpt: "Kompletny przewodnik po zakladaniu dzialalnosci gospodarczej w Polsce. Krok po kroku od wyboru formy prawnej po rejestracj.",
    date: "15 marca 2024",
  },
  {
    title: "Karta pobytu dla cudzoziemca - co warto wiedziec?",
    excerpt: "Wszystko o karcie pobytu czasowego i stalego. Wymagane dokumenty, czas oczekiwania i najczestsze bledy.",
    date: "10 marca 2024",
  },
  {
    title: "Dofinansowania dla nowych firm - przeglaad programow",
    excerpt: "Aktualne programy dotacyjne dla poczatkujacych przedsiebiorcow. Unijne i krajowe zrodla finansowania.",
    date: "5 marca 2024",
  },
];

export default function BlogPage() {
  return (
    <PageLayout title="Blog">
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {posts.map((post, index) => (
                <article key={index} className="card-shadow p-6 md:p-8">
                  <div className="text-muted text-sm mb-2">{post.date}</div>
                  <h2 className="text-xl font-medium mb-3 hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-body mb-4">{post.excerpt}</p>
                  <span className="text-primary font-medium cursor-pointer hover:underline">
                    Czytaj dalej &rarr;
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
