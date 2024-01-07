"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const SignUp = () => {
  //input 입력값
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  //유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isPhoneNum, setIsPhoneNum] = useState(false);


  //유효성에 따른 메세지
  const [idCheck, setIdCheck] = useState("");
  const [nickNameCheck, setNickNameCheck] = useState("");


  const [idMsg, setIdMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [addressMsg, setAddressMsg] = useState("");
  const [phoneNumMsg, setPhoneNumMsg] = useState("");

   // 정규식 모음 객체
  const inputRegexs = {
    // 아이디 : 문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 3~20자 이내
    idRegex: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
    // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    // 닉네임 : 영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내
    nicknameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
  };




  const handleSignUp = async (e) => {
    e.preventDefault();

      try {
      // 회원가입 처리
      const response = await axios.post("/api/auth/join", {
        id: id,
        password: password,
        name: name,
        nickName: nickName,
        email: email,
        address: address,
        phone: phoneNum,
      });
  
      console.log(response);
      // 여기에 성공적으로 회원가입이 완료되었을 때의 동작 추가 가능
  
    } catch (error) {
      console.error(error);
      // 여기에 회원가입 처리 중 에러 발생 시의 동작 추가 가능
      // 예를 들어, 사용자에게 에러 메시지를 보여주거나 로깅 등
    }
  };


  const idCheckBtn = async () => 
    await axios
      .get("/api/auth/id-check?id=" + id ,{})
      .then(function(response){
        if(response.data.data.duplicate == false){
          return setIdCheck("사용 가능한 아이디 입니다.")
        } else if(response.data.data.duplicate == true){
          return setIdCheck("이미 사용중인 아이디 입니다.")
        }
      })
      .catch(function(error){
        console.log(error)
      })

      useEffect(()=>{
        idCheckBtn()
        console.log(idCheck)
      },[id])

  // const submitRequirements = {
  //    // 아래 조건을 모두 충족할 시 제출 버튼 활성화.
  //    inputValue.id && // 아이디가 입력되었는가?
  //    inputValue.validId && // 아이디가 정규식에 부합하는가?
  //    inputValue.nonIdDuplication && // 아이디가 중복되지 않았는가?
  //    inputValue.pw && // 비밀번호가 입력되었는가?
  //    inputValue.validPw && // 비밀번호가 정규식에 부합하는가?
  //    inputValue.pwCheck && // 비밀번호가 입력되었는가?
  //    inputValue.correctPwCheck && // 비밀번호 확인이 비밀번호화 일치하는가?
  //    inputValue.name && // 이름이 입력되었는가?
  //    inputValue.nickname && // 닉네임이 입력되었는는가?
  //    inputValue.nonNicknameDuplication && // 닉네입이 중복되지 않았는가?
  //    inputValue.emailId && // 이메일 아이디를 입력하였는가?
  //    inputValue.emailAddress && // 이메일 도메인 주소를  선택하였는가?
  //    inputValue.validEmail && // 이메일이 인증되었는가? (추후 리팩토링 예정)
  //    inputValue.agree; // 정보제공에 동의 하였는가
  // }
  
  
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
        </div>
        <div>{idMsg}</div>
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
          <label htmlFor="passwordconfirm" className="text-lg min-w-40 font-semibold">
            비밀번호 확인
          </label>
          <input
            type="password"
            onChange={(e) => {setPasswordConfirm(e.target.value);}}
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
          {/* <button type="submit" className="h-full min-w-32 ml-2 rounded-md bg-primary text-white">중복확인</button> */}
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
          <button 
            type="submit"
            onClick={handleSignUp}
            className="min-w-40 py-4 mx-2 bg-primary rounded-full text-white"
            disabled={true}
          >회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
