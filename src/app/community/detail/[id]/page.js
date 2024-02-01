"use client";
import { useEffect, useState } from "react";
import { getReviewDetail } from "@/api/communityAPI";
import CommunityDetail from "@/component/community/CommunityDetail";

const CommunityDetailPage = (props) => {
  const [reviewDetail, setReviewDetail] = useState();
  const reviewPid = props.params.id;
  useEffect(() => {
    getReviewDetail(reviewPid).then((response) => {
      setReviewDetail(response.data.data);
    });
  }, [reviewPid]);
  return (
    <div>
      <CommunityDetail reviewDetail={reviewDetail} reviewPid={reviewPid} />
    </div>
  );
};

export default CommunityDetailPage;
