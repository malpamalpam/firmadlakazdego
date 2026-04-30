import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

interface ThankYouContentProps {
  title: string;
  subtitle: string;
  backHomeLabel: string;
  locale: string;
}

export function ThankYouContent({ title, subtitle, backHomeLabel, locale }: ThankYouContentProps) {
  return (
    <div className="bg-surface py-20 md:py-32">
      {/* GTM/Meta Pixel: miejsce na tagi konwersji */}
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
          <h1 className="mt-6 font-display text-3xl font-bold text-primary md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-primary/70">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href={`/${locale}`}>
              <Button variant="outline" size="lg">
                <ArrowLeft className="h-4 w-4" />
                {backHomeLabel}
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
