import style from "./Footer.module.css";

const Footer = () => {
  // if (window.location.pathname === "/admin") return null;
  return (
    <div className={style.Footer}>
      <p>
        본 사이트는 상업적 용도가 아닌 포트폴리오 목적으로 제작된 개인의
        창작물입니다. if (window.location.pathname === "/admin") return null;
      </p>
    </div>
  );
};
export default Footer;
