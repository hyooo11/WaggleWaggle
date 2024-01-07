"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DaumPostcode from "react-daum-postcode";
import Modal from "../../ui/Modal";
import { useState } from "react";

const validateForm = {
  // 아이디 : 영소문자 숫자 조합, 3~20자 이내
  idRegex: /^[a-z0-9]{3,20}$/,
  // 비밀번호 : 최소 8자 이상, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
  pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
  // 이름 : 영어 대/소문자, 한글만 입력가능, 1글자 이상
  nameRegex: /^[가-힣a-zA-Z]{1,}$/,
  // 닉네임 : 영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내
  nicknameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
  // 이메일
  emailRegex: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
  // 핸드폰
  phoneRegex: /^\d{2,3}-\d{3,4}-\d{4}$/,
};

const SignUp = () => {
  const [modalState, setModalState] = useState(false);
  const closeModal = () => setModalState(false);
  const [addressInput, setAddressInput] = useState("");

  const schema = yup.object().shape({
    id: yup
      .string()
      .required("id는 필수 값 입니다.")
      .matches(validateForm.idRegex, {
        message: "아이디는 영소문자, 숫자로 조합하여 3~20자 이내로 작성하세요.",
      })
      .test(
        "uniqueId",
        "이미 사용 중인 아이디입니다.",
        async (value) =>
          await axios.get(`/api/auth/id-check?id=${value}`).then((res) => {
            return !res.data.data.duplicate;
          })
      ),
    password: yup
      .string()
      .required("비밀번호는 필수 값 입니다.")
      .matches(validateForm.pwRegex, {
        message:
          "비밀번호 영소문자, 숫자, 특수문자(@#$%^&+=!)가 포함되어야 하며 최소 8자 이상 입력하세요.",
      }),
    // passwordConfirm: yup
    //   .string()
    //   .required("비밀번호를 확인해 주세요")
    //   .test("matchPassword", "비밀번호가 일치하지 않습니다.", function (value) {
    //     return value === this.resolve(yup.ref("password"));
    //   }),
    username: yup
      .string()
      .required("이름을 입력해 주세요.")
      .matches(validateForm.nameRegex, {
        message:
          "이름은 특수문자와 숫자를 제외한 영문자 또는 한글만 입력 가능합니다.",
      }),
    nickName: yup
      .string()
      .required("닉네임을 입력해 주세요.")
      .matches(validateForm.nicknameRegex, {
        message:
          "영어 대/소문자, 숫자, 한글 자모음 조합 2~10자 이내로 작성해주세요.",
      })
      .test(
        "uniqueNickName",
        "이미 사용 중인 닉네임 입니다.",
        async (value) =>
          await axios
            .get(`/api/auth/nickname-check?nickName=${value}`)
            .then((res) => {
              return !res.data.data.duplicate;
            })
      ),
    email: yup
      .string()
      .required("이메일을 입력해 주세요")
      .matches(validateForm.emailRegex, {
        message: "이메일 형식에 맞게 작성해주세요 ex) example@example.con",
      }),
    address: yup.string().required("주소를 입력해 주세요"),
    // addressDetail: yup.string().required("상세주소를 입력해 주세요"),
    phone: yup.string().required("휴대푠 번호를 입력해 주세요"),
    // .matches(validateForm.phoneRegex, {
    //   message: "휴대폰 번호 형식에 맞게 입력해주세요.",
    // }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    await axios({
      method: "post",
      url: "/api/auth/join",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: data.id,
        password: data.password,
        name: data.name,
        nickName: data.nickName,
        email: data.email,
        address: data.address,
        phone: data.phone,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 다음 주소 api
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log(fullAddress);
    setAddressInput(fullAddress);
    setModalState(false);
  };

  return (
    <div className="container mx-auto max-w-screen-lg">
      <h2 className="text-3xl font-bold">회원가입하기</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="id" className="text-lg min-w-40 font-semibold">
            아이디
          </label>
          <input
            type="text"
            id="id"
            name="id"
            {...register("id")}
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
          />
          <span>{errors.id?.message}</span>
        </div>
        <div className="flex items-center my-4 h-14">
          <label htmlFor="password" className="text-lg min-w-40 font-semibold">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password")}
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
          />
          <span>{errors.password?.message}</span>
        </div>

        {/* <div className="flex items-center my-4 h-14">
          <label
            htmlFor="passwordConfirm"
            className="text-lg min-w-40 font-semibold"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            {...register("passwordConfirm")}
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
          />
          <span>{errors.passwordConfirm?.message}</span>
        </div> */}

        <div className="flex items-center my-4 h-14">
          <label htmlFor="username" className="text-lg min-w-40 font-semibold">
            이름
          </label>
          <input
            type="text"
            id="username"
            name="username"
            {...register("username")}
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
          />
          <span>{errors.username?.message}</span>
        </div>

        <div className="flex items-center my-4 h-14">
          <label htmlFor="nickName" className="text-lg min-w-40 font-semibold">
            닉네임
          </label>
          <input
            type="text"
            id="nickName"
            name="nickName"
            {...register("nickName")}
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
          />
          <span>{errors.nickName?.message}</span>
        </div>

        <div className="flex items-center my-4 h-14">
          <label htmlFor="email" className="text-lg min-w-40 font-semibold">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email")}
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="이메일 입력"
          />
          <span>{errors.email?.message}</span>
        </div>

        <div className="flex items-center my-4 h-14">
          <label htmlFor="address" className="text-lg min-w-40 font-semibold">
            주소
          </label>
          <input
            type="address"
            id="address"
            name="address"
            {...register("address")}
            value={addressInput}
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="주소검색하기"
            onClick={() => {
              setModalState(true);
            }}
          />
          <span>{errors.email?.message}</span>
        </div>

        {/* <div className="flex items-center my-4 h-14">
          <label
            htmlFor="addressDetail"
            className="text-lg min-w-40 font-semibold"
          >
            상세주소
          </label>
          <input
            type="address"
            id="addressDetail"
            name="addressDetail"
            {...register("addressDetail")}
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
            placeholder="상세주소 입력"
          />
          <span>{errors.email?.message}</span>
        </div> */}

        <div className="flex items-center my-4 h-14">
          <label htmlFor="phone" className="text-lg min-w-40 font-semibold">
            휴대폰 번호
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            {...register("phone")}
            className="w-full h-full max-w-md border-gray-light border rounded-md py-1 px-2"
          />
          <span>{errors.phone?.message}</span>
        </div>
        <button
          type="submit"
          className="min-w-40 py-4 mx-2 bg-primary rounded-full text-white"
        >
          회원가입
        </button>

        {modalState && (
          <Modal closeModal={closeModal}>
            <DaumPostcode onComplete={handleComplete} />
          </Modal>
        )}
      </form>
    </div>
  );
};

export default SignUp;
