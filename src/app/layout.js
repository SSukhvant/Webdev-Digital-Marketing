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
  title: "Digital Marketing Agency | The Smart Pixel",
  description: "Web development and digital marketing services, including SEO, social media and paid campaigns.",
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
