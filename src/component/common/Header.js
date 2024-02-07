"use client";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  loginCheck,
  clearUser,
  setAccessToken,
} from "../../redux/features/userSlice";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import Link from "next/link";
import style from "./Header.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => {
    return state.user;
  });

  // console.log(user.data.memberInfo.profileImg);
  const router = useRouter();
  const query = useSearchParams();

  const userPid = getCookie("pid");
  const refreshToken = getCookie("refreshToken");

  // console.log(userPid, refreshToken);

  useEffect(() => {
    //로그인할떄 받은 리프레시토큰을 가져와서
    const reissueToken = async () => {
      if (userPid && refreshToken) {
        await axios
          .post("/api/auth/refresh", {
            pid: userPid,
            refreshToken: refreshToken,
          })
          .then((response) => {
            const newReissueToken = response.data.data.reissueToken;
            dispatch(loginCheck(newReissueToken));
            dispatch(setAccessToken({ newToken: newReissueToken }));
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("리프레시 토큰 없음");
      }
    };
    reissueToken();
  }, [userPid, refreshToken, dispatch]);

  const [pageState, setPageState] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") {
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

  //middleware
  useEffect(() => {
    if (query.get("alert")) {
      alert(query.get("alert"));
      router.push("/auth/login");
    }
  }, [query, router]);

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
            WAGU1
          </Link>
          <nav className={`${style.gnb} ${isScroll ? style.fixed : ""}`}>
            <Link href="/product?page=1">PRODUCT</Link>
            <Link href="/community">COMMUNITY</Link>
            {/* <Link href="/qna">QnA</Link> */}
            {/* <Link href="/notice">NOTICE</Link> */}
          </nav>
        </div>
        {user.isLogin ? (
          <div className={`${style.navLight} ${isScroll ? style.fixed : ""}`}>
            <button
              onClick={() => {
                dispatch(clearUser());
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className={`${style.navLight} ${isScroll ? style.fixed : ""}`}>
            <Link href="/auth/login">로그인</Link>
            <Link href="/auth/signup">회원가입</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
