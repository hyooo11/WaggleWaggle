"use client";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/ui/Button";
import StarRatings from "react-star-ratings";
import { useState } from "react";

const wineType = ["레드", "화이트", "로제", "스파클링", "주정강화"];
const ReviewEditor = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
    // 여기에서 평가를 서버로 보내거나 다른 필요한 작업을 수행할 수 있습니다.
  };
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => console.log(data);

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
          <label htmlFor="reviewImage" className="th-label">
            <span className="req">이미지 업로드</span>
          </label>
          <div className="td-form">
            <input
              type="file"
              id="reviewImage"
              name="reviewImage"
              className="form-control"
            />
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
