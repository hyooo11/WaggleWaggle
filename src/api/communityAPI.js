import axios from "axios";

export const getReviewList = async (page) => {
  const response = await axios.get(`/api/community/review?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getReviewLastPage = async () => {
  const response = await axios.get("/api/community/review/last-page", {
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

export const postWrite = async (data) => {
  await axios({
    method: "post",
    url: "/api/community/review",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
