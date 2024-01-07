"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const SignUp = () => {
  //input 입력값
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    name: "",
    nickName: "",
    email: "",
    address: "",
    phoneNum: "",
  });
  //input 입력 값에 따른 메세지
  const [formMsg, setFormMsg] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    name: "",
    nickName: "",
    email: "",
    address: "",
    phoneNum: "",
  });

  // console.log(setFormMsg())

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = async () => {
    // 정규식 모음 객체
    const inputRegexs = {
      // 아이디 : 문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 3~20자 이내
      idRegex: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
      // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
      pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
      // 닉네임 : 영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내
      nicknameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
    };

    await axios
      .get("/api/auth/id-check?id=" + formData.id, {})
      .then(function (response) {
        if (response.data.data.duplicate == false) {
          return setFormMsg({ ...formMsg, id: "사용 가능한 아이디 입니다." });
        } else if (response.data.data.duplicate == true) {
          return setFormMsg({ ...formMsg, id: "이미 사용중인 아이디 입니다." });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // if (!inputRegexs.idRegex.test(formData.id)) {
    //   setFormMsg({...formMsg, id: "제대로해라"})
    // } else {
    //   setFormMsg({...formMsg, id: "올바른 형식임"})
    // }
  };

  useEffect(() => {
    validateForm();
    console.log(formMsg);
  }, [formData]);

  return (
    <div className="container mx-auto max-w-screen-lg">
      <h2 className="text-3xl font-bold">회원가입하기</h2>
      <form>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="id" className="text-lg min-w-40 font-semibold">
            아이디
          </label>
          <input
            type="text"
            value={formData.id}
            onChange={handleChange}
            name="id"
            id="id"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="아이디 입력"
          />
        </div>
        <p>{formMsg.id}</p>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="password" className="text-lg min-w-40 font-semibold">
            비밀번호
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            id="password"
            autoComplete="password"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="비밀번호 입력"
          />
        </div>
        <div className="flex items-center my-4 h-14">
          <label
            htmlFor="passwordconfirm"
            className="text-lg min-w-40 font-semibold"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            name="passwordConfirm"
            id="passwordConfirm"
            // autoComplete="passwordConfirm"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="비밀번호 확인"
          />
        </div>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="username" className="text-lg min-w-40 font-semibold">
            이름
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            name="username"
            id="username"
            autoComplete="username"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="이름 입력"
          />
        </div>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="nickname" className="text-lg min-w-40 font-semibold">
            닉네임
          </label>
          <input
            type="text"
            value={formData.nickName}
            onChange={handleChange}
            name="nickname"
            id="nickname"
            autoComplete="nickname"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="닉네임 입력"
          />
          {/* <button type="submit" className="h-full min-w-32 ml-2 rounded-md bg-primary text-white">중복확인</button> */}
        </div>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="email" className="text-lg min-w-40 font-semibold">
            이메일
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            id="email"
            autoComplete="email"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="이메일 입력"
          />
        </div>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="address" className="text-lg min-w-40 font-semibold">
            주소
          </label>
          <input
            type="address"
            value={formData.address}
            onChange={handleChange}
            name="address"
            id="address"
            autoComplete="address"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="주소 입력"
          />
        </div>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="phone" className="text-lg min-w-40 font-semibold">
            휴대폰
          </label>
          <input
            type="phone"
            value={formData.phoneNum}
            onChange={handleChange}
            name="phone"
            id="phone"
            autoComplete="phone"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="휴대폰 번호 입력"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            // onClick={handleSignUp}
            className="min-w-40 py-4 mx-2 bg-primary rounded-full text-white"
            disabled={true}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
