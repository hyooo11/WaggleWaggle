"use client";
import { SiPhpmyadmin } from "react-icons/si";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="gloval-nav">
      <div className="nav_header">
        <h1>
          <Link href="/admin">
            <SiPhpmyadmin />
            <span>Admin</span>
          </Link>
        </h1>
        <div className="__inner">
          <div className="thumbnail">
            <img src="/media/img/default_profile.jpeg" alt="기본 사진" />
          </div>
          <div className="user_txt">
            <span className="__name">신효진</span>
            <span className="__belong">관리자</span>
          </div>
        </div>
      </div>
      <ul className="nav_body">
        <li>
          <Link href="/admin/product">와인리스트 관리</Link>
        </li>
        <li>
          <Link href="/admin/member">회원 관리</Link>
        </li>
      </ul>
    </div>
  );
};
export default SideBar;
