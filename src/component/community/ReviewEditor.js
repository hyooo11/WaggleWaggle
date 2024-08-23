"use client";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getCookie } from "cookies-next";
import InputForm from "@/ui/InputForm";
import Button from "@/ui/Button";
import { postEditorHandler } from "@/api/communityAPI";
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});
const wineType = ["레드", "화이트", "로제", "스파클링", "주정강화"];

const ReviewEditor = ({ isEdit, originData, reviewPid }) => {
  const router = useRouter();
  const [fileData, setFileData] = useState([]);
  const [fileView, setFileView] = useState([]);
  const [editFileList, setEditFileList] = useState([]);
  const [fileDelete, setFileDelete] = useState([]);

  const schema = yup.object().shape({
    reviewTitle: yup.string().required("제목을 입력해주세요."),
    wineName: yup.string().required("와인 이름을 입력해주세요."),
    winePrice: yup.string().required("구매가격을 입력해주세요."),
    starPoint: yup.string().required("별점을 선택해주세요."),
    desc: yup.string().required("내용을 입력해주세요."),
  });

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  //신규 이미지 등록
  const addFilesData = (e) => {
    const selectedPhoto = e.target.files[0];
    const photoURL = URL.createObjectURL(selectedPhoto);
    if (fileView.length > 4) {
      alert("이미지는 5장 이하로 등록 가능합니다 :)");
      return;
    }
    if (selectedPhoto) {
      setFileData((prevFile) => [...prevFile, selectedPhoto]);
      setFileView((prevView) => [...prevView, photoURL]);
    }
  };

  //이미지 삭제
  const removeFileData = (index) => {
    const updateFileData = [...fileData];
    const updateFileView = [...fileView];
    updateFileData.splice(index, 1);
    updateFileView.splice(index, 1);
    setFileData(updateFileData);
    setFileView(updateFileView);
  };

  const hashList = watch("hashList", []);
  const addHashtag = (e) => {
    const inputValue = watch("hashTag");
    if (e.keyCode === 13 && inputValue.trim() !== "") {
      setValue("hashList", [...hashList, `${inputValue}`]);
      setValue("hashTag", "");
    }
  };

  const removeHashtag = (index) => {
    const updatedHashtags = [...hashList];
    updatedHashtags.splice(index, 1);
    setValue("hashList", updatedHashtags);
  };

  //기존이미지 & 삭제된 이미지 데이터 저장
  useEffect(() => {
    if (originData && isEdit === true) {
      const originFile = originData.reviewImgs.filter((data) => data !== null);
      setEditFileList(originFile.filter((value) => fileView.includes(value)));
      setFileDelete(originFile.filter((value) => !fileView.includes(value)));
    }
  }, [fileView]);

  //수정 페이지 기존 데이터
  useEffect(() => {
    if (originData && isEdit === true) {
      setValue("reviewTitle", originData.reviewTitle);
      setValue("wineType", originData.wineType);
      setValue("wineName", originData.wineName);
      setValue("winePrice", originData.winePrice);
      setValue("starPoint", originData.starPoint);
      setValue("desc", originData.desc);
      setValue("hashList", originData.hashTag);
      setFileView(originData.reviewImgs.filter((data) => data !== null));
    }
  }, [originData]);

  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const onSubmit = async (data) => {
    const userPid = getCookie("pid");
    const formData = new FormData();
    //수정이미지 null값 추가
    const newEditFileList = editFileList.concat(
      Array(5 - editFileList.length).fill(null)
    );
    const editReviewPost = {
      reviewId: reviewPid,
      reviewTitle: data.reviewTitle,
      wineType: data.wineType,
      wineName: data.wineName,
      winePrice: data.winePrice,
      starPoint: data.starPoint,
      desc: data.desc,
      hashTag: data.hashList,
      reviewImgs: newEditFileList,
    };

    const newReviewPost = {
      reviewTitle: data.reviewTitle,
      wineType: data.wineType,
      wineName: data.wineName,
      winePrice: data.winePrice,
      starPoint: data.starPoint,
      desc: data.desc,
      writerId: userPid,
      hashTag: data.hashList,
    };

    if (fileData.length > 0) {
      fileData.map((data) => {
        formData.append("files", data);
      });
    }
    if (isEdit === true) {
      formData.append("review", JSON.stringify(editReviewPost));
    } else {
      formData.append("review", JSON.stringify(newReviewPost));
    }
    if (fileDelete.length > 0) {
      formData.append("deleteUrl", fileDelete);
    }

    const method = `${isEdit === true ? "put" : "post"}`;
    postEditorHandler(method, formData)
      .then(function (response) {
        alert("작성이 완료되었습니다 :)");
        router.push("/community");
        router.replace("/community");
      })
      .catch(function (error) {
        alert("작성오류 입니다. 다시 시도해주세요.");
        console.log(error);
      });
  };
  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">COMMUNITY</h2>
        <span>게시글 작성</span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => checkKeyDown(e)}
        className="table-form review_editor"
      >
        <InputForm
          label={"제목"}
          type={"text"}
          name={"reviewTitle"}
          register={register}
        />
        <span className="err-msg">{errors.reviewTitle?.message}</span>
        <div className="flex flex-row">
          <div className=" basis-1/4">
            <div className="tr-form">
              <label htmlFor="wineType" className="th-label">
                <span className="req">와인타입</span>
              </label>
              <div className="td-form">
                <select
                  name="wineType"
                  {...register("wineType")}
                  className="form-control"
                >
                  {wineType.map((data, index) => {
                    return (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className=" basis-2/4">
            <div className="tr-form">
              <label htmlFor="wineName" className="th-label">
                <span className="req">와인이름</span>
              </label>
              <div className="td-form">
                <input
                  type="text"
                  id="wineName"
                  name="wineName"
                  {...register("wineName")}
                  className="form-control"
                />
              </div>
            </div>
            <span className="err-msg">{errors.wineName?.message}</span>
          </div>
          <div className="basis-1/4">
            <div className="tr-form ">
              <label htmlFor="winePrice" className="th-label">
                <span className="req">구매가격</span>
              </label>
              <div className="td-form">
                <input
                  type="number"
                  id="winePrice"
                  name="winePrice"
                  {...register("winePrice")}
                  className="form-control"
                />
              </div>
            </div>
            <span className="err-msg">{errors.winePrice?.message}</span>
          </div>
        </div>
        <div className="tr-form">
          <label htmlFor="starPoint" className="th-label">
            <span className="req">별점</span>
          </label>
          <div className="td-form">
            <Controller
              name="starPoint"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <StarRatings
                  rating={field.value}
                  starRatedColor="rgb(255, 224, 140)"
                  starEmptyColor="rgb(234, 234, 234)"
                  starDimension="30px"
                  starSpacing="2px"
                  changeRating={(newRating) => setValue("starPoint", newRating)}
                  numberOfStars={5}
                  isAggregateRating={false}
                  name="starPoint"
                />
              )}
            />
          </div>
        </div>
        <span className="err-msg">{errors.starPoint?.message}</span>
        <div className="tr-form">
          <label htmlFor="files" className="th-label">
            <span className="req">이미지 업로드</span>
          </label>
          <div className="td-form">
            <input
              {...register("files")}
              type="file"
              accept="image/*"
              onChange={addFilesData}
            />
          </div>
        </div>

        <div className="tr-form">
          <label htmlFor="files" className="th-label"></label>
          {fileView.length > 0 ? (
            <ul className="image_preview">
              {fileView.map((data, index) => (
                <li key={index} className="item">
                  <p className="imgs">
                    <img src={data} alt={`data-${index}`} />
                  </p>
                  <span
                    className="remove_btn"
                    onClick={() => removeFileData(index)}
                  >
                    <img src="/media/icon/close-btn.png" alt="삭제버튼" />
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no_image_data">이미지를 선택하세요</p>
          )}
        </div>
        <span className="err-msg">{errors.reviewImgs?.message}</span>
        <div className="tr-form">
          <label htmlFor="desc" className="th-label">
            <span className="req">내용</span>
          </label>
          <div className="td-form">
            <textarea
              type="text"
              id="desc"
              name="desc"
              {...register("desc")}
              className="form-control"
            />
          </div>
        </div>
        <span className="err-msg">{errors.desc?.message}</span>
        <div className="hashtag_area">
          <div className="tr-form">
            <label htmlFor="hashTag" className="th-label">
              <span className="req">해시태그</span>
            </label>
            <div className="td-form">
              <input
                type="text"
                id="hashTag"
                name="hashTag"
                {...register("hashTag")}
                className="form-control"
                laceholder="Enter hashtags"
                onKeyUp={addHashtag}
              />
            </div>
          </div>
          <span className="err-msg">{errors.hashTag?.message}</span>
          <div className="tr-form hash_view">
            <label className="th-label"></label>
            <div className="td-form">
              <div className="td-form">
                {hashList.map((tag, index) => (
                  <div key={index} className="item_list">
                    <span>{tag} </span>
                    <span onClick={() => removeHashtag(index)}>
                      <img src="/media/icon/close-btn.png" alt="삭제버튼" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="btn-area">
          <Button text={"뒤로가기"} onClick={() => router.back()}></Button>
          <Button type={"positive"} text={"발행"} />
        </div>
      </form>
    </div>
  );
};

export default ReviewEditor;
