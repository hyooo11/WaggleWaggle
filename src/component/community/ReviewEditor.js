"use client";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/ui/Button";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import LocalStorage from "@/util/LocalStorage";
import axios from "axios";

const wineType = ["레드", "화이트", "로제", "스파클링", "주정강화"];
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ReviewEditor = ({ isEdit, originData }) => {
  const [fileData, setFileData] = useState([]);
  const [fileView, setFileView] = useState([]);

  console.log(originData);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const addFilesData = (e) => {
    const selectedPhoto = e.target.files[0];
    const photoURL = URL.createObjectURL(selectedPhoto);
    console.log(selectedPhoto);
    if (selectedPhoto) {
      setFileData((prevFile) => [...prevFile, selectedPhoto]);
      setFileView((prevView) => [...prevView, photoURL]);
    }
  };

  const removeFileData = (index) => {
    const updateFileData = [...fileData];
    const updateFileView = [...fileView];
    updateFileData.splice(index, 1);
    updateFileView.splice(index, 1);
    setFileData(updateFileData);
    setFileView(updateFileView);
  };

  const hashList = watch("hashList", []);

  const addHashtag = () => {
    const inputValue = watch("hashTag");
    if (inputValue.trim() !== "") {
      setValue("hashList", [...hashList, `#${inputValue}`]);
      setValue("inputValue", "");
    }
  };

  const removeHashtag = (index) => {
    const updatedHashtags = [...hashList];
    updatedHashtags.splice(index, 1);
    setValue("hashList", updatedHashtags);
  };
  useEffect(() => {
    if (originData && isEdit === true) {
      setValue("reviewTitle", originData.reviewTitle);
      setValue("wineType", originData.wineType);
      setValue("winePrice", originData.winePrice);
      setValue("starPoint", originData.starPoint);

      setValue("desc", originData.desc);
      setValue("hashTag", originData.hashTag);
      setFileView(originData.reviewImgs);
    }
  }, [originData]);

  const onSubmit = async (data) => {
    const userPid = LocalStorage.getItem("pid");
    const formData = new FormData();

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

    fileData.map((data) => {
      formData.append("files", data);
    });

    formData.append("review", JSON.stringify(newReviewPost));

    console.log(formData);

    await axios({
      method: "post",
      url: "/api/community/review",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">COMMUNITY</h2>
        <span>게시글 작성</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="table-form">
        <div className="tr-form">
          <label htmlFor="reviewTitle" className="th-label">
            <span className="req">제목</span>
          </label>
          <div className="td-form">
            <input
              type="text"
              id="reviewTitle"
              name="reviewTitle"
              {...register("reviewTitle")}
              className="form-control"
            />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="tr-form basis-1/4">
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
          <div className="tr-form basis-2/4">
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
          <div className="tr-form basis-1/4">
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
                  starRatedColor="orange"
                  changeRating={(newRating) => setValue("starPoint", newRating)}
                  numberOfStars={5}
                  name="starPoint"
                />
              )}
            />
          </div>
        </div>
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

          <ul className="image_preview">
            {fileView &&
              fileView.map((data, index) => (
                <li key={index} className="item">
                  <p className="imgs">
                    <img src={data} alt={`data-${index}`} />
                  </p>
                  <button
                    className="remove_btn"
                    onClick={() => removeFileData(index)}
                  >
                    삭제
                  </button>
                </li>
              ))}
          </ul>
        </div>
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
            />
            <span onClick={addHashtag}>Add Hashtag</span>
          </div>
          <div>
            {hashList.map((tag, index) => (
              <div key={index}>
                <span>{tag} </span>
                <span onClick={() => removeHashtag(index)}>Remove</span>
              </div>
            ))}
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
