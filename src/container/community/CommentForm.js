"use client";
import { useState } from "react";
import style from "./CommentForm.module.css";

const NewCommentForm = ({ newCommentHandler }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    newCommentHandler(comment);
    setComment("");
  };
  return (
    <form onSubmit={handleSubmit} className={style.NewCommentForm}>
      <p className={style.input_box}>
        <input
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </p>
      <button type="submit">댓글 등록</button>
    </form>
  );
};

const EditCommentForm = ({
  prevDesc,
  commentId,
  editCommentHandler,
  setCommentEditBtn,
}) => {
  const [comment, setComment] = useState(prevDesc);

  const handleSubmit = (e) => {
    e.preventDefault();
    editCommentHandler(comment, commentId);
    setComment("");
    setCommentEditBtn(!commentId);
  };
  return (
    <form onSubmit={handleSubmit} className={style.NewCommentForm}>
      <p className={style.input_box}>
        <input
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </p>
      <button type="submit">수정</button>
    </form>
  );
};

const ReplyCommentForm = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // newCommentHandler(comment);
    setComment("");
  };
  return (
    <form onSubmit={handleSubmit} className={style.NewCommentForm}>
      <p className={style.input_box}>
        <input
          placeholder="대댓글을 입력하세요"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </p>
      <button type="submit">대댓글 등록</button>
    </form>
  );
};

export { NewCommentForm, EditCommentForm, ReplyCommentForm };
