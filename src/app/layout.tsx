"use client";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

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
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&family=JetBrains+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Kalaakars Architecture Studio",
              "image": "https://kalaakaars.in/logo.svg",
              "@id": "",
              "url": "https://kalaakaars.in",
              "telephone": "+917306358793",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Opposite Hill Fort Auditorium Gate, Pathanapuram, Areekode",
                "addressLocality": "Malappuram",
                "postalCode": "673639",
                "addressRegion": "KL",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 11.2384,
                "longitude": 76.0464
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
                "https://instagram.com/kalaakaars_architecture",
                "https://linkedin.com/company/kalaakaars-architecture"
              ]
            })
          }}
        />
      </head>

      <body style={{ overflowX: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
             {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}

