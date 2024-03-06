"use client";
import style from "./Footer.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RxGithubLogo } from "react-icons/rx";
import { SiNotion } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes("admin")) return null;
  return (
    <div className={style.Footer}>
      <p className={style.logo}>Waggle Waggle</p>
      <div className={style.link_btn}>
        <Link href="https://github.com/hyooo11/" target="_blank">
          <RxGithubLogo />
        </Link>
        <Link href="https://github.com/hyooo11/" target="_blank">
          <SiNotion />
        </Link>
        <Link
          href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=tlsgywls1107@gmail.com"
          target="_blank"
        >
          <SiGmail />
        </Link>
        <Link href="https://github.com/hyooo11/" target="_blank">
          <FaInstagram />
        </Link>
      </div>
      <p>
        본 사이트는 상업적 용도가 아닌 포트폴리오 목적으로 제작된 개인의
        창작물입니다.
      </p>
      <div className={style.copyright}>
        <FaRegCopyright /> <span>2024. Shin hyo jin All rights reserved.</span>
      </div>
    </div>
  );
};
export default Footer;
