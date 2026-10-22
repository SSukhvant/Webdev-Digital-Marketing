import Footer from "@/constant/Footer/Footer";
import Header from "@/constant/Navbar/Header";
import BottomBar from "@/constant/BottomBar/BottomBar";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "The Smart Pixel | Digital Marketing & Web Development",
    template: "%s | The Smart Pixel",
  },
  description:
    "The Smart Pixel offers digital marketing, SEO, paid advertising, social media and web development services for businesses.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "The Smart Pixel",
    title: "The Smart Pixel | Digital Marketing & Web Development",
    description:
      "Digital marketing, SEO, paid advertising, social media and web development services from The Smart Pixel.",
  },
  twitter: {
    card: "summary",
    title: "The Smart Pixel | Digital Marketing & Web Development",
    description:
      "Digital marketing, SEO, paid advertising, social media and web development services from The Smart Pixel.",
  },
  verification: {
    other: {
      "fl-verify": "9be66eef7379e3946a735731ecf2c665",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Header />
        {children}
        <BottomBar />
        <Footer />
      </body>
    </html>
  );
}
