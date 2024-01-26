"use client";

import ReviewEditor from "@/component/community/ReviewEditor";
import { getReviewDetail } from "@/api/communityAPI";
import { useState, useEffect } from "react";

const EditPage = (props) => {
  const [originData, setOriginData] = useState();
  const reviewPid = props.params.id;
  useEffect(() => {
    getReviewDetail(reviewPid).then((response) => {
      setOriginData(response.data.data);
    });
  }, []);
  return (
    <div>
      <ReviewEditor
        isEdit={true}
        originData={originData}
        reviewPid={reviewPid}
      />
    </div>
  );
};

export default EditPage;
