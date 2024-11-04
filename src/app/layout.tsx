
import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import Provider from "@/Provider";

export const metadata: Metadata = {
  title: "Ifce Conecta",
  description: "Sistema para comunicação do Instituto Federal do Ceará",
};

const roboto = Roboto({
    weight: '400', // Specify the font weight (e.g., '400' for normal)
    subsets: ['latin'], // Choose the character subsets (e.g., Latin)
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className}  antialiased`}
      >
      <Provider>
        {children}
      </Provider>
      </body>
    </html>
  );
}
