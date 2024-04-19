import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { StoreProvider } from "./storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex",
  description:
    "Pokedex, para ver todos os pokemons conhecidos, catalogados e suas evoluções",
  authors: {
    name: "Anderson Dias Farias",
    url: "https://adfdeveloper.com.br/",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
