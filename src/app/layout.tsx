import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalaakars — Minimalist Architecture Studio in Kerala",
  description: "Boutique architecture studio based in Calicut, Kerala, specializing in climate-responsive designs that merge regional traditions with contemporary structural innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Kalaakars Architecture Studio",
              "image": "https://kalaakars.in/logo.svg",
              "@id": "",
              "url": "https://kalaakars.in",
              "telephone": "+914952700000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "S.M. Street",
                "addressLocality": "Kozhikode",
                "postalCode": "673001",
                "addressRegion": "KL",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 11.2508,
                "longitude": 75.7804
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://instagram.com/kalaakars",
                "https://linkedin.com/company/kalaakars"
              ]
            })
          }}
        />
      </head>

      <body>
        <div className="cursor-dot" id="cursor-dot"></div>
        <div className="cursor-outline" id="cursor-outline"></div>
        <script dangerouslySetInnerHTML={{
          __html: `
            const dot = document.getElementById('cursor-dot');
            const outline = document.getElementById('cursor-outline');
            window.addEventListener('mousemove', (e) => {
              const posX = e.clientX;
              const posY = e.clientY;
              dot.style.left = posX + 'px';
              dot.style.top = posY + 'px';
              outline.animate({
                left: posX + 'px',
                top: posY + 'px'
              }, { duration: 500, fill: 'forwards' });
            });
          `
        }} />
        {children}
      </body>
    </html>
  );
}
