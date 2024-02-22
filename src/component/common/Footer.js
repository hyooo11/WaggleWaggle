"use client";
import style from "./Footer.module.css";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes("admin")) return null;
  return (
    <div className={style.Footer}>
      <p>
        본 사이트는 상업적 용도가 아닌 포트폴리오 목적으로 제작된 개인의
        창작물입니다.
      </p>
    </div>
  );
};
export default Footer;
