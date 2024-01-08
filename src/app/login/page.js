"use client";

import { useRouter } from "next/navigation";
import Button from "../../component/ui/Button";

const Login = () => {
  const router = useRouter();
  return (
    <div className="maxframe sub_p_wrap px-72">
      <div className="sub_p_title center">
        <h2 className="">SING IN</h2>
        <span>로그인하기</span>
      </div>
      <form className="table-form">
        <div className="tr-form">
          <label htmlFor="id" className="th-label">
            <span className="req">아이디</span>
          </label>
          <div className="td-form">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="tr-form">
          <label htmlFor="id" className="th-label">
            <span className="req">비밀번호</span>
          </label>
          <div className="td-form">
            <input type="password" className="form-control" />
          </div>
        </div>
        <div className="btn-area">
          <Button text={"뒤로가기"} onClick={() => router.back()}></Button>
          <Button type={"positive"} text={"로그인"} />
        </div>
      </form>
    </div>
  );
};

export default Login;
