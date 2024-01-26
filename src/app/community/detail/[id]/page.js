"use client";
import { useEffect, useState } from "react";
import { getReviewDetail } from "@/api/communityAPI";
import CommunityDetail from "@/component/community/CommunityDetail";

const CommunityDetailPage = (props) => {
  const reviewPid = props.params.id;
  const [reviewDetail, setReviewDetail] = useState();
  useEffect(() => {
    getReviewDetail(reviewPid).then((response) => {
      setReviewDetail(response.data.data);
    });
  }, []);
  return (
    <div>
      <CommunityDetail reviewDetail={reviewDetail} />
    </div>
  );
};

export default CommunityDetailPage;
