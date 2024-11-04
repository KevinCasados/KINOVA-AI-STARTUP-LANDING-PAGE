import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinova AI - Startup Landing Page",
  description: "Kinova AI Landing Page - Enhance your SEO visibility effortlessly with AI-driven tools for user-friendly optimization. Join the waitlist now.",
  keywords: ["AI SEO", "Kinova AI", "SEO optimization", "AI-driven SEO tools"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Kinova AI - Landing Page",
    description: "Join Kinova AI to elevate your site's visibility effortlessly with cutting-edge SEO tools.",
    url: "https://yourlandingpage.com",
    images: [
      {
        url: "https://yourlandingpage.com/link_to_og_image_here.jpg",
        width: 800,
        height: 600,
        alt: "Kinova AI SEO Tool",
      },
    ],
    siteName: "Kinova AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Enlace canónico */}
        <link rel="canonical" href="https://yourlandingpage.com" />
        
        {/* Datos estructurados JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kinova AI",
              "url": "https://yourlandingpage.com",
              "logo": "https://yourlandingpage.com/logo.jpg",
              "sameAs": [
                "https://www.facebook.com/yourpage",
                "https://www.instagram.com/yourpage",
                "https://www.linkedin.com/company/yourcompany"
              ]
            })
          }}
        />
      </head>
      <body 
        className={twMerge(inter.className, "bg-black text-white antialiased")}
      >
        {children}
      </body>
    </html>
  );
}