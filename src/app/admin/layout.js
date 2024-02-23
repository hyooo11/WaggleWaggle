import "./globals.css";
import SideBar from "@/container/admin/SideBar";

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
                <h2 class="_page_name">톡스앤필 - 지점패키지</h2>
                <div className="contact__">
                  <p className="cont">010-2835-2732</p>
                  <p className="cont">tlsgywls1107@gmail.com</p>
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
