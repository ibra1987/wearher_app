import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/app/_components/theme-provider";
import Header from "../_components/header/Header";
import "../globals.css";

import AppQueryClientProvider from "../query-client-provider";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppQueryClientProvider >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="max-w-6xl mx-auto flex flex-col min-h-screen">
                <Header />
                {children}
              </div>
            </ThemeProvider>
          </AppQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
