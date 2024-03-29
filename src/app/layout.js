import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Google Cloud Console",
  description: "Google Cloud Console clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
     
             {children}
            <Toaster richColors position="top-center" />
          
        </div>
      </body>
    </html>
  );
}
