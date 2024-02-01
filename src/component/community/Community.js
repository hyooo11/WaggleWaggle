"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { getReviewList, getReviewLastPage } from "@/api/communityAPI";
import ReviewList from "@/container/community/ReviewList";
import Button from "@/ui/Button";

const Community = () => {
  const router = useRouter();
  const [reviewList, setReviewList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [lastPage, setLastPage] = useState([]);
  const page = useRef(1);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    getReviewList(page.current).then((response) =>
      setRenderList(response.data.data)
    );
    getReviewLastPage().then((response) => setLastPage(response.data.data));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (
        page.current <= lastPage &&
        window.innerHeight + Math.ceil(scrollTop) >= offsetHeight - 10
      ) {
        page.current++;
        getReviewList(page.current).then((response) => {
          setReviewList(response.data.data);
          setRenderList((prevRenderList) => [
            ...prevRenderList,
            ...response.data.data,
          ]);
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reviewList, renderList, lastPage]);

  return (
    <div className="maxframe sub_p_wrap">
      <div className="sub_p_title">
        <h2 className="">COMMUNITY</h2>
        <span>와구 회원님들과 함께하는 즐거운 와인이야기</span>
        {user && (
          <Button
            text={"글쓰기"}
            type={"positive"}
            onClick={() => {
              router.push("/community/write");
            }}
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
