"use client";

import Link from "next/link";
import style from "./Header.module.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [pageState, setPageState] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") {
      console.log("Main");
      setPageState("MainPage");
    } else {
      setPageState("SubPage");
    }
  }, [pathname]);

  const [isScroll, setIsScroll] = useState();
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const scroll = scrollY > 0;
    setIsScroll(scroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${style.header} ${isScroll ? style.fixed : ""} ${
        pageState === "MainPage" ? style.MainPage : style.SubPage
      }`}
    >
      <div className="maxframe">
        <div className={style.navRight}>
          <Link
            href="/"
            className={`${style.logo} ${isScroll ? style.fixed : ""}`}
          >
            WAGU
          </Link>
          <nav className={`${style.gnb} ${isScroll ? style.fixed : ""}`}>
            <Link href="/product">PRODUCT</Link>
            <Link href="/community">COMMUNITY</Link>
            <Link href="/qna">QnA</Link>
            <Link href="/notice">NOTICE</Link>
          </nav>
        </div>
        <div className={`${style.navLight} ${isScroll ? style.fixed : ""}`}>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
