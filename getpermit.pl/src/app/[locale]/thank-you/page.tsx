import { setRequestLocale, getTranslations } from "next-intl/server";
import { ThankYouContent } from "@/components/home/ThankYouContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "thankYou" });
  return {
    title: t("title"),
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPageEN({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("thankYou");

  return (
    <ThankYouContent
      title={t("title")}
      subtitle={t("subtitle")}
      backHomeLabel={t("backHome")}
      locale={locale}
    />
  );
}
