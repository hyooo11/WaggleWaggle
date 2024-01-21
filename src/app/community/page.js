import CommunityList from "../../container/community/CommunityList";

const Community = () => {
  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">COMMUNITY</h2>
        <span>와구 회원님들과 함께하는 즐거운 와인이야기</span>
      </div>
      <div className="Product">
        <CommunityList />
      </div>
    </div>
  );
};

export default Community;
