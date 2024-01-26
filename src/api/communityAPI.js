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

export const postEditorHandler = async (method, data) => {
  const response = await axios({
    method: method,
    url: "/api/community/review",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  });
  return response;
};
