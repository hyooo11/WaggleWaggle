"use client";
import { useState, useEffect } from "react";
import { getCommentList, postComment, likeComment } from "@/api/commentAPI";
import { useAppSelector } from "@/redux/hook";
import CommentList from "./CommentList";
import { NewCommentForm } from "./CommentForm";

const Comment = ({ reviewPid }) => {
  const [comments, setComments] = useState();
  const token = useAppSelector((state) => state.user.data.token);
  //댓글 초기리스트 api
  const getComment = () => {
    if (reviewPid) {
      getCommentList(reviewPid)
        .then((response) => setComments(response.data.data))
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    getComment();
  }, []);

  //새댓글 등록 api
  const newCommentHandler = (desc) => {
    const data = {
      reviewId: reviewPid,
      comment: desc,
    };
    postComment("post", data, token)
      .then(getComment)
      .catch((error) => console.log(error));
  };

  //댓글 수정 api
  const editCommentHandler = (desc, commentId, tagWriterId) => {
    const data = {
      reviewId: reviewPid,
      commentId: commentId,
      comment: desc,
      tagWriterId: tagWriterId,
    };
    postComment("put", data, token)
      .then(getComment)
      .catch((error) => console.log(error));
  };

  //대댓글 등록 api
  const replyCommentHandler = (desc, parentId, tagWriterId) => {
    const data = {
      reviewId: reviewPid,
      comment: desc,
      parentId: parentId,
      tagWriterId: tagWriterId,
    };
    postComment("post", data, token)
      .then(getComment)
      .catch((error) => console.log(error));
  };
  //댓글 좋아요 api
  const likeCommentHandler = (commentId) => {
    likeComment(commentId, token)
      .then(getComment)
      .catch((error) => console.log(error));
  };

  return (
    <div className="pt-10 border-t border-t-gray-200 mt-20">
      <CommentList
        comments={comments}
        editCommentHandler={editCommentHandler}
        replyCommentHandler={replyCommentHandler}
        likeCommentHandler={likeCommentHandler}
      />
      <NewCommentForm newCommentHandler={newCommentHandler} />
    </div>
  );
};

export default Comment;
