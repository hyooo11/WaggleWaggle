"use client";
import Community from "@/component/community/Community";
import { getReviewList } from "@/api/communityAPI";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";

const CommunityPage = () => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    getReviewList().then((response) => setReviewList(response.data.data));
  }, []);

  const user = useAppSelector((state) => state.user);

  return <Community reviewList={reviewList} user={user} />;
};

export default CommunityPage;
