import "./globals.css";
import SideBar from "@/container/admin/SideBar";
import { SiGmail } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head />
      <body>
        <div className="gloval-wrap">
          <div className="gloval-twotone">
            <div className="__top"></div>
            <div className="__bottom"></div>
          </div>
          <div className="gloval-page">
            <SideBar />
            <div className="gloval-content-wrap">
              <div className="gloval-content-top">
                <h2 class="_page_name">대시보드</h2>
                <div className="contact__">
                  <p className="cont">
                    <span className="icon">
                      <FaPhone />
                    </span>
                    <span>010-2835-2732</span>
                  </p>
                  <p className="cont">
                    <span className="icon">
                      <SiGmail />
                    </span>
                    <span>tlsgywls1107@gmail.com</span>
                  </p>
                </div>
              </div>
              <main className="gloval-content">{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
