export const SiteMap = {
  mainCategory: [
    {
      id: "00",
      engName: "Product",
      korName: "상품리스트",
      url: "/product?page=1",
      subCategory: [
        {
          id: "00-00",
          engName: "red",
          korName: "레드",
          url: "/product?page=1&type=1",
        },
        {
          id: "00-01",
          engName: "white",
          korName: "화이트",
          url: "/product?page=1&type=2",
        },
        {
          id: "00-02",
          engName: "rose",
          korName: "로제",
          url: "/product?page=1&type=3",
        },
        {
          id: "00-03",
          engName: "sparkling",
          korName: "스파클링",
          url: "/product?page=1&type=4",
        },
        {
          id: "00-04",
          engName: "fortified alcohol",
          korName: "주정강화",
          url: "/product?page=1&type=5",
        },
      ],
    },
    {
      id: "01",
      engName: "Community",
      korName: "커뮤니티",
      url: "/community",
    },
  ],
  auth: {
    logoutState: [
      { id: "00", engName: "login", korName: "로그인", url: "/auth/login" },
      {
        id: "01",
        engName: "signup",
        korName: "회원가입",
        url: "/auth/signup",
      },
    ],
    loginState: [
      { id: "00", engName: "logout", korName: "로그아웃" },
      { id: "01", engName: "mypage", korName: "마이페이지" },
    ],
  },
};
