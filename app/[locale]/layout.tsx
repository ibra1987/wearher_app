import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "../_components/header/Header";
import "../globals.css";
import {Readex_Pro} from "next/font/google"


const  readexPro =  Readex_Pro({
  subsets: ["arabic"],
  weight: ["200","300","400","600","700"],
})
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params
  if (!routing.locales.includes(locale as "fr" | "ar")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${locale === "ar" ? readexPro.className : ""}`}>
        <NextIntlClientProvider messages={messages}>
            
              <div className="  overflow-hidden px-4 mx-auto flex flex-col min-h-screen  bg-gray-200">
                <Header />
                {children}
              </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
