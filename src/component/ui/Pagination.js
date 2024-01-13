import { useState, useEffect } from "react";
import Link from "next/link";
import style from "./pagination.module.css";

const Pagination = ({
  totalItems, // 데이터의 총 개수
  itemCountPerPage, // 페이지 당 보여줄 데이터 개수
  pageCount, // 보여줄 페이지 개수
  currentPage, // 현재 페이지
}) => {
  const totalPages = Math.ceil(totalItems / itemCountPerPage); // 총 페이지 개수
  const [start, setStart] = useState(1); // 시작 페이지
  const noPrev = start === 1; //이전 페이지가 없는 경우
  const noNext = start + pageCount - 1 >= totalPages; // 다음 페이지가 없는 경우

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div className={style.Pagination}>
      <ul>
        <li className={`${style.move} ${noPrev && style.visible}`}>
          <Link href={`?page=${start - 1}`}>이전</Link>
        </li>
        {[...Array(pageCount)].map(
          (_, i) =>
            start + i <= totalPages && (
              <li key={i}>
                <Link href={`?page=${start + i}`}>
                  <span
                    className={`${style.page} ${
                      currentPage === start + i && style.active
                    }`}
                  >
                    {start + i}
                  </span>
                </Link>
              </li>
            )
        )}
        <li className={`${style.move} ${noNext && style.visible}`}>
          <Link href={`?page=${start + pageCount}`}>다음</Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
