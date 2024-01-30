"use client";
import { useEffect, useState } from "react";
import style from "./Comment.module.css";
import { getComment, postComment } from "@/api/commentAPI";
import { useAppSelector } from "@/redux/hook";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Comment = ({ reviewDetail }) => {
  const user = useAppSelector((state) => state.user);
  const [reviewId, setReviewId] = useState();
  const [commentList, setCommentList] = useState();
  const [reCommentBtn, setReCommentBtn] = useState(false);
  const [commentEdit, setCommentEdit] = useState({});
  const reCommnetState = (data) => {
    setReCommentBtn((prevItem) => ({
      ...prevItem,
      [data]: !reCommentBtn[data],
    }));
    // console.log(data);
  };
  const commentEditState = (data) => {
    setCommentEdit((prevItem) => ({ ...prevItem, [data]: !commentEdit[data] }));
  };

  useEffect(() => {
    if (reviewDetail) {
      const getReviewId = reviewDetail.reviewId;
      getComment(getReviewId)
        .then((response) => setCommentList(response.data.data))
        .catch((error) => console.log(error));
      setReviewId(reviewDetail.reviewId);
    }
  }, [reviewDetail]);

  return (
    <div className={style.Comment}>
      <div className={style.inner}>
        <div className={style.view}>
          {commentList &&
            commentList.map((data, index) => {
              return (
                <div key={data.commentId}>
                  <>
                    <div className={`${style.parent_} ${style.comment_box}`}>
                      <figure>
                        <img src={data.writerProfile} />
                      </figure>
                      <div className={style.txt_box}>
                        <div className={style.info_box}>
                          <p className={style.nickname}>{data.writerNick}</p>
                          <p className={style.date}>
                            {data.regiDate.slice(0, 10)}
                          </p>
                          <p
                            onClick={() => {
                              commentEditState(data.commentId);
                            }}
                            className={style.edit_btn}
                          >
                            수정
                          </p>
                        </div>
                        {/* 수정인풋 */}
                        {/* 액세스토큰, 게시글 id, 댓글id, 댓글내용, 태그한 작성자 id(N) */}
                        {commentEdit[data.commentId] ? (
                          <CommentInput type={"edit"} value={data.comment} />
                        ) : (
                          <p className={style.desc}>{data.comment}</p>
                        )}
                        <div className={style.sub_box}>
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
                                reCommnetState(data.commentId);
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
                    {/* 답글인풋 */}
                    {/* 액세스토큰, 게시글 id, 댓글내용, 부모댓글 id, 태그한 작성자 id(N) */}
                    {reCommentBtn[data.commentId] ? (
                      <CommentInput type={"reply"} />
                    ) : null}
                  </>
                  {data.child &&
                    data.child.map((data, index) => {
                      return (
                        <div key={data.commentId}>
                          <>
                            <div
                              className={`${style.child_} ${style.comment_box}`}
                            >
                              <figure>
                                <img src={data.writerProfile} />
                              </figure>
                              <div className={style.txt_box}>
                                <div className={style.info_box}>
                                  <p className={style.nickname}>
                                    {data.writerNick}
                                  </p>
                                  <p className={style.date}>
                                    {data.regiDate.slice(0, 10)}
                                  </p>
                                  <p
                                    onClick={() => {
                                      commentEditState(data.commentId);
                                    }}
                                    className={style.edit_btn}
                                  >
                                    수정
                                  </p>
                                </div>
                                {/* 수정인풋 */}
                                {/* 액세스토큰, 게시글 id, 댓글id, 댓글내용, 태그한 작성자 id(N) */}
                                {commentEdit[data.commentId] ? (
                                  <CommentInput
                                    type={"edit"}
                                    value={data.comment}
                                  />
                                ) : (
                                  <p className={style.desc}>{data.comment}</p>
                                )}
                              </div>
                              <p className={style.like_btn}>
                                <span>
                                  <FaRegHeart />
                                </span>
                                <span>좋아요</span>
                              </p>
                            </div>
                          </>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
        {/* 신규댓글등록인풋 */}
        {/* 액세스토큰, 게시글 id, 댓글내용 */}
        <CommentInput type={"main"} reviewId={reviewId} />
      </div>
    </div>
  );
};

export default Comment;
