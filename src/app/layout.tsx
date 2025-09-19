import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Azkar - Islamic Remembrance & Tasbih Counter",
  description: "A comprehensive platform for Islamic remembrance (Azkar) with digital tasbih counter and progress tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
