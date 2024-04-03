import axios from "axios";

export const getBestReview = async () => {
  const response = await axios.get("/api/community/best-review", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getProductRank = async () => {
  const response = await axios.get("/api/product/rank", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
