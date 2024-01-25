"use client";
import ReviewList from "@/container/community/ReviewList";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";
import { getReviewList, getReviewLastPage } from "@/api/communityAPI";
import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";

const Community = () => {
  const router = useRouter();
  const [reviewList, setReviewList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState([]);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    getReviewList(page).then((response) => setRenderList(response.data.data));
    getReviewLastPage().then((response) => setLastPage(response.data.data));
  }, []);

  console.log(page);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + Math.ceil(scrollTop) >= offsetHeight - 10) {
        setPage((prevPage) => prevPage + 1);
        getReviewList(page).then((response) =>
          setReviewList(response.data.data)
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setRenderList((prevRenderList) => [...prevRenderList, ...reviewList]);
  }, [page]);

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
        <ReviewList renderList={renderList} />
      </div>
    </div>
  );
};

export default Community;
