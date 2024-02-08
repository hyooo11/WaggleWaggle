import ReviewDetail from "@/container/community/ReviewDetail";
import Comment from "@/container/community/Comment";
import { getCookie } from "cookies-next";

const CommunityDetail = ({ reviewDetail, reviewPid }) => {
  const userPid = getCookie("pid");
  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">COMMUNITY</h2>
        <span>회원님들과 함께하는 즐거운 와인이야기</span>
      </div>
      <div className="ProductDetail">
        <ReviewDetail reviewDetail={reviewDetail} userPid={userPid} />
        <Comment reviewPid={reviewPid} />
      </div>
    </div>
  );
};

export default CommunityDetail;
