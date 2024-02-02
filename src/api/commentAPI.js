import axios from "axios";

export const getCommentList = async (data) => {
  const response = await axios.get(`/api/comment?reviewId=${data}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const postComment = async (method, data, token) => {
  const response = await axios({
    method: method,
    url: "/api/comment",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    data: data,
  });
  return response;
};

export const likeComment = async (data, token) => {
  const response = await axios({
    method: "post",
    url: "/api/comment/like",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    data: { commentId: data },
  });
  return response;
};
