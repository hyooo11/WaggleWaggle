"use client";
import ReviewList from "@/container/community/ReviewList";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";

const Community = ({ reviewList, user }) => {
  const router = useRouter();
  const clickEdit = () => {
    if (user.isLogin === true) {
      router.push("/community/write");
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };
  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">COMMUNITY</h2>
        <span>와구 회원님들과 함께하는 즐거운 와인이야기</span>
        {user && (
          <Button
            text={"글쓰기"}
            type={"positive"}
            onClick={clickEdit}
          ></Button>
        )}
      </div>
      <div className="Product">
        <ReviewList reviewList={reviewList} />
      </div>
    </div>
  );
};

export default Community;
