import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

/* ── Self-hosted Google Fonts via next/font (no render-blocking <link>) ── */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-mono",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Kalaakars Architecture Studio — Malappuram, Kerala",
  description:
    "Premium architecture studio specializing in modern resort projects, residential villas, and craftwork interiors. 8 years of excellence in the field of modern architecture.",
  openGraph: {
    title: "Kalaakars Architecture Studio",
    description: "Mastering the balance of Style, Comfort & Function.",
    url: "https://kalaakaars.in",
    siteName: "Kalaakars Architecture",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrains.variable} ${cormorant.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Kalaakars Architecture Studio",
              image: "https://kalaakaars.in/logo.svg",
              "@id": "",
              url: "https://kalaakaars.in",
              telephone: "+917306358793",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Opposite Hill Fort Auditorium Gate, Pathanapuram, Areekode",
                addressLocality: "Malappuram",
                postalCode: "673639",
                addressRegion: "KL",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 11.2384,
                longitude: 76.0464,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
              sameAs: [
                "https://instagram.com/kalaakaars_architecture",
                "https://linkedin.com/company/kalaakaars-architecture",
              ],
            }),
          }}
        />
      </head>

      <body style={{ overflowX: "hidden" }}>{children}</body>
    </html>
  );
}
