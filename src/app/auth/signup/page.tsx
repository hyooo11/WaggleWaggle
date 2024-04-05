"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DaumPostcode from "react-daum-postcode";
import InputForm from "@/ui/InputForm";
import { SignUpInputType } from "@/types";
import Modal from "@/ui/Modal";
import Button from "@/ui/Button";

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

const SignUpPage = () => {
  const router = useRouter();
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
      .test("uniqueId", "이미 사용 중인 아이디입니다.", async function (value) {
        const response = await axios.get(`/api/auth/id-check?id=${value}`);
        return !response.data.data.duplicate;
      }),
    password: yup
      .string()
      .required("비밀번호는 필수 값 입니다.")
      .matches(validateForm.pwRegex, {
        message:
          "비밀번호 영소문자, 숫자, 특수문자(@#$%^&+=!)가 포함되어야 하며 최소 8자 이상 입력하세요.",
      }),
    name: yup
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
        async function (value) {
          const response = await axios.get(
            `/api/auth/nickname-check?nickName=${value}`
          );
          return !response.data.data.duplicate;
        }
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
  } = useForm<SignUpInputType>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignUpInputType> = async (data) => {
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
        alert("회원가입 되었습니다 :)");
        router.push("/");
        router.replace("/");
      })
      .catch(function (error) {
        alert("회원가입 실패입니다. 다시 시도해주세요.");
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

    setAddressInput(fullAddress);
    setModalState(false);
  };

  return (
    <div className="maxframe sub_p_wrap lg:px-60 md:px-4 px-4">
      <div className="sub_p_title center">
        <h2 className="">SING UP</h2>
        <span>회원정보입력</span>
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
        <InputForm
          label={"이름"}
          type={"text"}
          name={"name"}
          register={register}
        />
        <span className="err-msg">{errors.name?.message}</span>
        <InputForm
          label={"닉네임"}
          type={"text"}
          name={"nickName"}
          register={register}
        />
        <span className="err-msg">{errors.nickName?.message}</span>
        <InputForm
          label={"이메일"}
          type={"email"}
          name={"email"}
          register={register}
        />
        <span className="err-msg">{errors.email?.message}</span>

        <div className="tr-form">
          <label htmlFor="address" className="th-label">
            <span className="req">주소</span>
          </label>
          <div className="td-form">
            <input
              type="address"
              id="address"
              // name="address"
              {...register("address")}
              value={addressInput}
              placeholder="주소검색하기"
              onClick={() => {
                setModalState(true);
              }}
              className="form-control"
            />
          </div>
        </div>
        <span className="err-msg">{errors.address?.message}</span>
        <InputForm
          label={"휴대폰 번호"}
          type={"tel"}
          name={"phone"}
          register={register}
        />
        <span className="err-msg">{errors.phone?.message}</span>
        <div className="btn-area">
          <Button text={"뒤로가기"} onClick={() => router.back()}></Button>
          <Button type={"positive"} text={"회원가입"} />
        </div>

        {modalState && (
          <Modal closeModal={closeModal}>
            <DaumPostcode onComplete={handleComplete} />
          </Modal>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;
