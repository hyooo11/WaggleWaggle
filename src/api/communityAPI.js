import axios from "axios";

export const getReviewList = async () => {
  const response = await axios.get(`/api/community/review?page=1`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
