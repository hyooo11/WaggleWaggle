import ReviewDetail from "@/container/community/ReviewDetail";
import ReviewComment from "@/container/community/ReviewComment";

const CommunityDetail = ({ reviewDetail }) => {
  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">COMMUNITY</h2>
        <span>와구 회원님들과 함께하는 즐거운 와인이야기</span>
      </div>
      <div className="ProductDetail">
        <ReviewDetail reviewDetail={reviewDetail} />
        <ReviewComment />
      </div>
    </div>
  );
};

export default CommunityDetail;