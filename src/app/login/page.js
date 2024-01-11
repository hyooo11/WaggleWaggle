"use client";
import { useRouter } from "next/navigation";
import Button from "../../component/ui/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie } from "cookies-next";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const loginMsg = useSelector((state) => {
    if (state.user.loginMsg !== undefined) {
      return state.user.loginMsg;
    }
  });
  const router = useRouter();

  const schema = yup.object().shape({
    id: yup.string().required("id를 입력해주세요."),
    password: yup.string().required("비밀번호를 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const userData = data;
    dispatch(loginUser(userData));
  };

  return (
    <div className="maxframe sub_p_wrap px-72">
      <div className="sub_p_title center">
        <h2 className="">SING IN</h2>
        <span>로그인하기</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="table-form">
        <div className="tr-form">
          <label htmlFor="id" className="th-label">
            아이디
          </label>
          <div className="td-form">
            <input
              type="text"
              id="id"
              name="id"
              {...register("id")}
              className="form-control"
            />
          </div>
        </div>
        <span className="err-msg">{errors.id?.message}</span>
        <div className="tr-form">
          <label htmlFor="password" className="th-label">
            비밀번호
          </label>
          <div className="td-form">
            <input
              type="password"
              id="password"
              name="password"
              {...register("password")}
              className="form-control"
            />
          </div>
        </div>
        <span className="err-msg">{errors.password?.message}</span>
        <div>{loginMsg}</div>
        <div className="btn-area">
          <Button text={"뒤로가기"} onClick={() => router.back()}></Button>
          <Button type={"positive"} text={"로그인"} />
        </div>
      </form>
    </div>
  );
};

export default Login;
