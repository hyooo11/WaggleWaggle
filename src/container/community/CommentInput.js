"use client";
import { useEffect, useState } from "react";
import style from "./CommentInput.module.css";
import { postComment } from "@/api/commentAPI";
import { useAppSelector } from "@/redux/hook";

const CommentInput = ({ type, value, reviewId }) => {
  const [commentDesc, setCommentDesc] = useState("");
  const user = useAppSelector((state) => state.user);
  const token = user.data.token;
  // console.log(getReviewId);

  const onComment = () => {
    if (dataType === "main") {
      const data = {
        reviewId: reviewId,
        comment: commentDesc,
      };
      postComment("post", data, token)
        .then((response) => {
          setCommentDesc("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (dataType === "edit") {
      console.log("edit입니다.");
    }
    if (dataType === "reply") {
      console.log("reply입니다.");
      const data = {
        reviewId: getReviewId,
        comment: commentDesc,
      };
    }
  };
  const dataType = ["main", "edit", "reply"].includes(type) ? type : "default";
  return (
    <div className={style.CommentInput}>
      <p className={style.txt_box}>
        <input
          onChange={(e) => {
            setCommentDesc(e.target.value);
          }}
          value={value}
        />
      </p>
      <button onClick={onComment} className={style.submit_btn}>
        등록
      </button>
    </div>
  );
};
export default CommentInput;
