import axios from "axios";

export const getReviewList = async () => {
  const response = await axios.get("/api/community/review?page=2", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getReviewDetail = async (reviewPid) => {
  const response = await axios.get(
    `/api/community/review/detail?reviewId=${reviewPid}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
