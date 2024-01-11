"use client";

import Link from "next/link";
import style from "./Header.module.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCookie } from "cookies-next";
import { loginCheck, clearUser, setToken } from "../../store/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  console.log(user);

  // const reissueToken = () => {
  //   const token = getCookie("token");
  //   if (token !== undefined && token !== null) {
  //     dispatch(loginCheck(token));
  //     console.log("토큰 있어염");
  //     //유효한 토큰인지 확인
  //     const tokenState = useSelector((state) => {
  //       return state.user;
  //     });
  //     console.log(tokenState);
  //   } else {
  //     console.log("토큰없졍염");
  //     //토큰 재발급 요청
  //   }
  // };

  const TokenState = () => {
    const token = getCookie("token");

    if (token) {
      dispatch(loginCheck(token));
    } else {
      const userPid = localStorage.getItem("pid");
      const userRefreshToken = localStorage.getItem("refreshToken");
      const reissueToken = async () => {
        await axios
          .post("/api/auth/refresh", {
            pid: JSON.parse(userPid),
            refreshToken: JSON.stringify(userRefreshToken),
          })
          .then(function (response) {
            dispatch(loginCheck(response.data.data.reissueToken));
            dispatch(
              setToken(
                userPid,
                response.data.data.reissueToken,
                userRefreshToken
              )
            );
          })
          .catch(function (error) {
            console.log(error);
          });
        reissueToken;
      };
    }
  };

  useEffect(() => {
    TokenState();
  }, []);

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
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
