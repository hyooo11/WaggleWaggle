"use client";
import { useState } from "react";
import style from "./CommentList.module.css";
import { EditCommentForm, ReplyCommentForm } from "./CommentForm";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CommentList = ({ comments, editCommentHandler }) => {
  const [commentEditBtn, setCommentEditBtn] = useState({});
  const [replyCommentBtn, setReplyCommentBtn] = useState({});

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
      {comments &&
        comments.map((data, index) => {
          return (
            <div key={data.commentId}>
              <div className={style.comment_box}>
                <figure>
                  <img src={data.writerProfile} />
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
                      editCommentHandler={editCommentHandler}
                      setCommentEditBtn={setCommentEditBtn}
                    />
                  ) : (
                    <p className={style.desc}>{data.comment}</p>
                  )}
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
                </div>
                <p className={style.like_btn}>
                  <span>
                    <FaRegHeart />
                  </span>
                  <span>좋아요</span>
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CommentList;
