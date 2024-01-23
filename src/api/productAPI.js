import axios from "axios";

export const getProductDetail = async (winePid) => {
  const response = await axios.get(`/api/product/wine/detail?pid=${winePid}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
