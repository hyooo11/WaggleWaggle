"use client";
import style from "./CommentList.module.css";
import CommentInput from "./CommentInput";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const CommentList = ({ data, boxStyle, reCommnet }) => {
  const [reCommentBtn, setReCommentBtn] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const reCommnetState = () => {
    reCommentBtn ? setReCommentBtn(false) : setReCommentBtn(true);
  };
  const commentEditState = () => {
    commentEdit ? setCommentEdit(false) : setCommentEdit(true);
  };

  return (
    <div>
      <div className={`${boxStyle} ${style.comment_box}`}>
        <figure>
          <img src={data.writerProfile} />
        </figure>
        <div className={style.txt_box}>
          <div className={style.info_box}>
            <p className={style.nickname}>{data.writerNick}</p>
            <p className={style.date}>{data.regiDate.slice(0, 10)}</p>
            <p onClick={commentEditState} className={style.edit_btn}>
              수정
            </p>
          </div>
          {/* 수정인풋 */}
          {/* 액세스토큰, 게시글 id, 댓글id, 댓글내용, 태그한 작성자 id(N) */}
          {commentEdit ? (
            <CommentInput type={"edit"} value={data.comment} />
          ) : (
            <p className={style.desc}>{data.comment}</p>
          )}
          <div className={style.sub_box}>
            {reCommnet ? (
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
                <p className={style.re_comment} onClick={reCommnetState}>
                  답글쓰기
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <p className={style.like_btn}>
          <span>
            <FaRegHeart />
          </span>
          <span>좋아요</span>
        </p>
      </div>
      {/* 답글인풋 */}
      {/* 액세스토큰, 게시글 id, 댓글내용, 부모댓글 id, 태그한 작성자 id(N) */}
      {reCommentBtn ? <CommentInput type={"reply"} /> : null}
    </div>
  );
};

export default CommentList;
