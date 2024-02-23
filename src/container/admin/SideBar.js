import { SiPhpmyadmin } from "react-icons/si";

const SideBar = () => {
  return (
    <div className="gloval-nav">
      <div className="nav_header">
        <h1>
          <SiPhpmyadmin />
          <span>Admin</span>
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
        <li>와인리스트 관리</li>
        <li>회원 관리</li>
      </ul>
    </div>
  );
};
export default SideBar;
