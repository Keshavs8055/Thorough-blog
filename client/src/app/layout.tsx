import AuthProvider from "@/components/common/authProvider";
import Loading from "@/components/common/loading";
import Toast from "@/components/common/toast";
import Layout from "@/components/Layout";
import Navbar from "@/components/navbar/navbar";
import "@/styles/globals.css";
import { Metadata } from "next";
import { EB_Garamond } from "next/font/google";

const bodyFont = EB_Garamond({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: {
    default: "Thorough - A Blog",
    template: "%s - Thorough",
  },
  description: "A blog to see posts",
};

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
      <head>
        <link
          rel="icon"
          href="/ico.png"
          sizes="any"
        />
      </head>
      <body className="text-ink antialiased">
        <AuthProvider>
          <Navbar />
          <Layout>
            <div className="">{children}</div>
          </Layout>
          <Loading />
          <Toast />
        </AuthProvider>
      </body>
    </html>
  );
}
