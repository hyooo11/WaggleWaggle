import axios from "axios";

export const getComment = async (data) => {
  const response = await axios.get(`/api/comment?reviewId=${data}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
