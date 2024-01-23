"use client";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/ui/Button";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const wineType = ["레드", "화이트", "로제", "스파클링", "주정강화"];
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ReviewEditor = () => {
  const router = useRouter();
  const [filePreview, setFilePreview] = useState("");

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const preview = watch("files");
  useEffect(() => {
    if (preview && preview.length > 0) {
      const file = preview[0];
      setFilePreview(URL.createObjectURL(file));
    }
  }, [preview]);

  const onSubmit = (data) => console.log(data);

  // console.log(watch("files"));
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
              <select {...register("wineType")} className="form-control">
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
          <label htmlFor="files" className="th-label">
            <span className="req">이미지 업로드</span>
          </label>
          <div className="td-form">
            <input
              type="file"
              id="files"
              name="files"
              {...register("files")}
              // className="hidden"
              accept="image/*"
              multiple
            />
          </div>
          <div>
            <img src={filePreview} />
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

        <div className="btn-area">
          <Button text={"뒤로가기"} onClick={() => router.back()}></Button>
          <Button type={"positive"} text={"발행"} />
        </div>
      </form>
    </div>
  );
};

export default ReviewEditor;
