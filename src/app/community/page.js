"use client";
import Community from "@/component/community/Community";
import { getReviewList } from "@/api/communityAPI";
import { useEffect, useState } from "react";

const CommunityPage = () => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    getReviewList().then((response) => setReviewList(response.data.data));
  }, []);

  return <Community reviewList={reviewList} />;
};

export default CommunityPage;
