import Toast from "@/components/common/toast";
import Navbar from "@/components/navbar/navbar";
import "@/styles/globals.css";
import { EB_Garamond } from "next/font/google";

const bodyFont = EB_Garamond({ subsets: ["latin"], weight: ["400", "700"] });
// const headingFont = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodyFont.className} bg-gray-100`}
    >
      <body className="text-ink antialiased">
        <Navbar />
        <div className="">{children}</div>
        <Toast />
      </body>
    </html>
  );
}
