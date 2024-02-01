"use client";
import { useState } from "react";
import { EditCommentForm, ReplyCommentForm } from "./CommentForm";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import style from "./CommentItem.module.css";

const CommentItem = ({
  data,
  editCommentHandler,
  replyCommentHandler,
  type,
}) => {
  const inputType = ["parent", "child"].includes(type) ? type : "default";
  // console.log(inputType);

  const [commentEditBtn, setCommentEditBtn] = useState({});
  const [replyCommentBtn, setReplyCommentBtn] = useState({});

  const itemStyle = style[inputType];

  // console.log(itemStyle);

  const editToggle = (data) => {
    setCommentEditBtn((prevItem) => ({
      ...prevItem,
      [data]: !commentEditBtn[data],
    }));
  };

  const replyToggle = (data) => {
    setReplyCommentBtn((prevItem) => ({
      ...prevItem,
      [data]: !replyCommentBtn[data],
    }));
  };

  return (
    <>
      <div className={`${style.comment_box} ${itemStyle}`}>
        <figure>
          <img src={data.writerProfile} alt={`${data.nickname}님의 프로필`} />
        </figure>
        <div className={style.txt_box}>
          <div className={style.top_box}>
            <p className={style.nickname}>{data.writerNick}</p>
            <p className={style.date}>{data.regiDate.slice(0, 10)}</p>
            <p
              onClick={() => {
                editToggle(data.commentId);
              }}
              className={style.edit_btn}
            >
              수정
            </p>
          </div>
          {commentEditBtn[data.commentId] ? (
            <EditCommentForm
              prevDesc={data.comment}
              commentId={data.commentId}
              tagWriterId={data.tagWriterId}
              editCommentHandler={editCommentHandler}
              setCommentEditBtn={setCommentEditBtn}
            />
          ) : (
            <p className={style.desc}>{data.comment}</p>
          )}
          {type === "parent" ? (
            <div className={style.bottom_box}>
              <div>
                <p>
                  {data.child !== null ? (
                    <>
                      답글 <span>{data.child.length}</span>개
                    </>
                  ) : (
                    <>
                      답글 <span>0</span>개
                    </>
                  )}
                </p>
                <p
                  className={style.re_comment}
                  onClick={() => {
                    replyToggle(data.commentId);
                  }}
                >
                  답글쓰기
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <p className={style.like_btn}>
          <span>
            <FaRegHeart />
          </span>
          <span>좋아요</span>
        </p>
      </div>
      {replyCommentBtn[data.commentId] ? (
        <ReplyCommentForm
          replyCommentHandler={replyCommentHandler}
          parentId={data.commentId}
          tagWriterId={data.writerId}
          commentId={data.commentId}
          setReplyCommentBtn={setReplyCommentBtn}
        />
      ) : null}
    </>
  );
};
export default CommentItem;
