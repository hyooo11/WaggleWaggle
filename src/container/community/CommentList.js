"use client";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, editCommentHandler, replyCommentHandler }) => {
  return (
    <>
      {comments &&
        comments.map((data, index) => {
          return (
            <div key={data.commentId}>
              <CommentItem
                data={data}
                editCommentHandler={editCommentHandler}
                replyCommentHandler={replyCommentHandler}
                type={"parent"}
              />
              {data.child &&
                data.child.map((data, index) => {
                  return (
                    <div key={data.commentId} className="pl-12">
                      <CommentItem
                        data={data}
                        editCommentHandler={editCommentHandler}
                        replyCommentHandler={replyCommentHandler}
                        type={"child"}
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
    </>
  );
};

export default CommentList;
