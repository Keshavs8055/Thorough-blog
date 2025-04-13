import "@/styles/globals.css";

import { EB_Garamond } from "next/font/google";

const bodyFont = EB_Garamond({ subsets: ["latin"], weight: ["400", "700"] });
// const headingFont = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

export const metadata = { title: "Public Blog" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodyFont.className} bg-amber-50`}
    >
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
