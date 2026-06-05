import type { Metadata } from "next"
import { Bodoni_Moda, Montserrat } from "next/font/google"
import "./globals.css"

const playfair = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Renaissance Detailing | Sydney Mobile Car Detailing & Ceramic Coating",
  description:
    "Sydney's premier mobile car detailing and ceramic coating specialists. We come to you — anywhere across Sydney, 7 days a week.",
  keywords: "car detailing sydney, ceramic coating sydney, mobile detailing, paint correction sydney",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
