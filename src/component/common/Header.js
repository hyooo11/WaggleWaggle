"use client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginCheck, clearUser } from "../../store/userSlice";
import { useState, useEffect } from "react";
import LocalStorage from "../../util/localstorage";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import Link from "next/link";
import style from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const userPid = LocalStorage.getItem("pid");
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
            dispatch(loginCheck(response.data.data.reissueToken));
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("리프레시 토큰 없음");
      }
    };
    reissueToken();
  }, []);

  const user = useSelector((state) => {
    return state.user;
  });

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
