import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description: "real time weather app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} bg-gradient-to-r from-cyan-500 to-blue-500`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
