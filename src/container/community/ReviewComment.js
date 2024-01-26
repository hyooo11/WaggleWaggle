"use client";
import { useEffect, useState } from "react";
import style from "./ReviewComment.module.css";
import { getComment } from "@/api/commentAPI";

const ReviewComment = ({ reviewDetail }) => {
  const [commentList, setCommentList] = useState();
  useEffect(() => {
    if (reviewDetail) {
      getComment(reviewDetail.reviewId)
        .then((response) => setCommentList(response.data.data))
        .catch((error) => console.log(error));
    }
  }, [reviewDetail]);
  console.log(commentList);

  return (
    <div className={style.ReviewComment}>
      <div className={style.comment_inner}>
        <div className={style.comment_view}>
          {commentList &&
            commentList.map((data, index) => {
              return (
                <div key={data.commentId}>
                  <div>{data.comment}</div>
                  <div className={style.child_comment}>
                    {data.child &&
                      data.child.map((data, index) => {
                        return <div key={data.commentId}>{data.comment}</div>;
                      })}
                  </div>
                </div>
              );
            })}
        </div>
        <div className={style.comment_input}></div>
      </div>
    </div>
  );
};

export default ReviewComment;
