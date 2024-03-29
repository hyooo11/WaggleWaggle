"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { loginUser } from "@/redux/features/userSlice";
import InputForm from "@/ui/InputForm";
import Button from "@/ui/Button";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loginState = useAppSelector((state) => state.user);

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
  useEffect(() => {
    if (loginState.isLogin === true) {
      router.push("/");
      router.replace("/");
    }
  }, [loginState, router]);

  return (
    <div className="maxframe sub_p_wrap px-72">
      <div className="sub_p_title center">
        <h2 className="">SING IN</h2>
        <span>로그인하기</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="table-form">
        <InputForm
          label={"아이디"}
          type={"text"}
          name={"id"}
          register={register}
        />
        <span className="err-msg">{errors.id?.message}</span>
        <InputForm
          label={"비밀번호"}
          type={"password"}
          name={"password"}
          register={register}
        />
        <span className="err-msg">{errors.password?.message}</span>
        <div className="btn-area">
          <Button text={"뒤로가기"} onClick={() => router.back()}></Button>
          <Button type={"positive"} text={"로그인"} />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
