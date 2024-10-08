"use client";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  loginCheck,
  clearUser,
  setAccessToken,
} from "@/redux/features/userSlice";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import Link from "next/link";
import style from "./Header.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { Desktop, Mobile } from "@/util/MediaQuery";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { SiteMap } from "@/constants/SiteMap";

const Header = () => {
  const [pageState, setPageState] = useState<string>("");
  const [isScroll, setIsScroll] = useState<boolean>();
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [mount, setMount] = useState<boolean>(false);
  const pathname = usePathname();
  useEffect(() => {
    setMount(true);
  }, []);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => {
    return state.user;
  });

  const router = useRouter();
  const query = useSearchParams();
  const userPid = getCookie("pid");
  const refreshToken = getCookie("refreshToken");

  useEffect(() => {
    //로그인할때 받은 리프레시토큰을 가져와서
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

  useEffect(() => {
    if (pathname === "/") {
      setPageState("MainPage");
    } else {
      setPageState("SubPage");
    }
  }, [pathname]);

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

  if (pathname.includes("admin")) return null;
  return (
    <header
      className={`${style.HeaderWrapper} ${isScroll && style.fixed} ${
        pageState === "MainPage" ? "" : style.SubPage
      }`}
    >
      {mount && (
        <div className={`${style.HeaderWrap} maxframe`}>
          <h1 className={`${style.logo} ${isScroll && style.fixed}`}>
            <Link href="/">Waggle Waggle</Link>
          </h1>

          <Desktop>
            <div className={style.navMenu}>
              <nav className={`${style.gnb} ${isScroll && style.fixed}`}>
                {SiteMap.mainCategory.map((data, _) => {
                  return (
                    <Link href={data.url} key={data.id}>
                      {data.engName}
                    </Link>
                  );
                })}
              </nav>
              <div>
                {/* 로그아웃 상태 */}
                {!user.isLogin && (
                  <div
                    className={`${style.navLight} ${isScroll && style.fixed}`}
                  >
                    {SiteMap.auth.logoutState.map((data, _) => {
                      return (
                        <Link href={data.url} key={data.id}>
                          {data.engName}
                        </Link>
                      );
                    })}
                  </div>
                )}
                {/* 로그인상태 */}
                {user.isLogin && (
                  <div
                    className={`${style.navLight} ${isScroll && style.fixed}`}
                  >
                    <button
                      onClick={() => {
                        alert("서비스 준비중입니다 :)");
                      }}
                    >
                      <figure>
                        <img
                          src={
                            user.data.memberInfo?.profileImg === null
                              ? "/media/img/default_profile.jpeg"
                              : user.data.memberInfo?.profileImg
                          }
                          alt="프로필 이미지"
                        />
                      </figure>
                      마이페이지
                    </button>
                    <button
                      onClick={() => {
                        dispatch(clearUser());
                      }}
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Desktop>

          <Mobile>
            <div className={style.ham_menu}>
              <div
                onClick={() => {
                  setMobileNav(!mobileNav);
                }}
                className={style.ham_btn}
              >
                {mobileNav ? <IoClose /> : <IoIosMenu />}
              </div>
              {mobileNav ? <MobileNav setMobileNav={setMobileNav} /> : ""}
            </div>
          </Mobile>
        </div>
      )}
    </header>
  );
};

const MobileNav = ({ setMobileNav }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => {
    return state.user;
  });
  return (
    <div
      onClick={() => {
        setMobileNav(false);
      }}
      className={style.toggle_nav_wrap}
    >
      <div className={style.toggle_nav}>
        <div className={style.top}></div>
        <div>
          <div className={style.navLight}>
            {user.isLogin ? (
              <div className={style.menu}>
                <button
                  onClick={() => {
                    alert("서비스 준비중입니다 :)");
                  }}
                >
                  <figure className={style.profile}>
                    <img
                      src={
                        user.data.memberInfo?.profileImg === null
                          ? "/media/img/default_profile.jpeg"
                          : user.data.memberInfo?.profileImg
                      }
                      alt="프로필 이미지"
                    />
                  </figure>
                  마이페이지
                </button>
                <button
                  onClick={() => {
                    dispatch(clearUser());
                  }}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className={style.menu}>
                <Link href="/auth/login">로그인</Link>
                <Link href="/auth/signup">회원가입</Link>
              </div>
            )}
          </div>
          <nav className={style.nav}>
            <Link href="/product?page=1">PRODUCT</Link>
            <Link href="/community">COMMUNITY</Link>
            <Link href="/store">STORE</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
