"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const handleSignUp = async (e) =>
    await axios
      .post("/api/auth/join", {
        id: id,
        password: password,
        name: name,
        nickName: nickName,
        email: email,
        address: address,
        phone: phoneNum,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


  const idCheck = async () => 
    await axios
      .get("/api/auth/id-check?id=" + id ,{})
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })
  
  
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
            onChange={(e) => {setId(e.target.value);}}
            name="id"
            id="id"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="아이디 입력"
          />
          <button
            onClick={(e)=>{e.preventDefault(); idCheck()}}
            className="h-full min-w-32 ml-2 rounded-md bg-primary text-white"
          >중복확인</button>
        </div>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="password" className="text-lg min-w-40 font-semibold">
            비밀번호
          </label>
          <input
            type="password"
            onChange={(e) => {setPassword(e.target.value);}}
            name="password"
            id="password"
            autoComplete="password"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="비밀번호 입력"
          />
        </div>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="username" className="text-lg min-w-40 font-semibold">
            이름
          </label>
          <input
            type="text"
            onChange={(e) => {setName(e.target.value);}}
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
            onChange={(e) => {setNickName(e.target.value);}}
            name="nickname"
            id="nickname"
            autoComplete="nickname"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="닉네임 입력"
          />
          <button type="submit" className="h-full min-w-32 ml-2 rounded-md bg-primary text-white">중복확인</button>
        </div>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="email" className="text-lg min-w-40 font-semibold">
            이메일
          </label>
          <input
            type="email"
            onChange={(e) => {setEmail(e.target.value);}}
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
            onChange={(e) => {setAddress(e.target.value);}}
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
            onChange={(e) => {setPhoneNum(e.target.value);}}
            name="phone"
            id="phone"
            autoComplete="phone"
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="휴대폰 번호 입력"
          />
        </div>
        <div className="flex justify-center">
          <button type="button" className="min-w-40 py-4 mx-2 border-gray-light border rounded-full text-primary">취소</button>
          <button type="submit" onClick={handleSignUp} className="min-w-40 py-4 mx-2 bg-primary rounded-full text-white">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
