import StoreProvider from "../redux/StoreProvider";
// import store from "../redux/store";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../component/common/Header.js";
import Footer from "../component/common/Footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "waggle waggle",
  description: "와인 입문자들을 위한 사람들의 놀이터 와글와글",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
