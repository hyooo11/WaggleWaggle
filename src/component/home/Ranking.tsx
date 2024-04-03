"use client";
import { getProductRank } from "@/api/homeAPI";
import { useState, useEffect } from "react";
import styled from "./Ranking.module.css";
import { IoWater, IoWaterOutline } from "react-icons/io5";
import Link from "next/link";
import ScoreDraw from "@/ui/ScoreDraw";

interface ProductRankingType {
  pid: number;
  rank: number;
  type: number;
  korName: string;
  price: number;
  imageUrl: string;
  sweet: number;
  acidity: number;
}
interface ProductRankingDataType {
  red: ProductRankingType[];
  white: ProductRankingType[];
  sparkling: ProductRankingType[];
  port: ProductRankingType[];
}

const tab = [
  { label: "레드", values: "red" },
  { label: "화이트", values: "white" },
  { label: "스파클링", values: "sparkling" },
  { label: "주정강화", values: "port" },
];

const Ranking = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [rankData, setRankData] = useState<ProductRankingDataType[]>();
  const [rankList, setRankList] = useState<ProductRankingType[]>();

  useEffect(() => {
    getProductRank().then((response) => {
      setRankData(response.data.data);
    });
  }, []);

  useEffect(() => {
    const rankInfo = rankData && rankData[tab[currentTab].values];
    setRankList(rankInfo);
  }, [currentTab, rankData]);

  if (rankList === undefined) {
    return null;
  }

  return (
    <section className="ranking-sec">
      <div className="maxframe">
        <div className="title-sec">
          <h4>카테고리별 랭킹</h4>
          <span>Catecory's Ranking</span>
        </div>
        <div>
          <div className={styled.tablist}>
            <ul className={styled.tablistinner}>
              {tab.map((tabname, index) => (
                <li
                  key={index}
                  className={index === currentTab ? styled.active : ""}
                  onClick={() => setCurrentTab(index)}
                >
                  {tabname.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styled.rank_wrap}>
          {rankList &&
            rankList.map((data, index) => (
              <div key={index} className={styled.rankcard}>
                <Link href={`product/detail/${data.pid}`}>
                  <figure>
                    <img
                      width={index === 0 ? 500 : 217}
                      height={index === 0 ? 500 : 217}
                      src={data.imageUrl}
                      alt={`${data.korName}_썸네일`}
                    />
                  </figure>
                  <div className={styled.txt_area}>
                    <div className={styled.rank_txt}>
                      <span>RANK</span>
                      <p>{`0${index + 1}`}</p>
                    </div>
                    <p
                      className={[
                        styled.winename,
                        index > 0 ? styled.smallWinename : "",
                      ].join(" ")}
                    >
                      {data.korName}
                    </p>
                    <p className={styled.price}>{data.price}</p>
                  </div>
                  <div className={styled.tasty_area}>
                    <div className={styled.inner}>
                      <p>당도</p>
                      <div>
                        <ScoreDraw
                          score={data.sweet}
                          fillIcon={IoWater}
                          outLineIcon={IoWaterOutline}
                        />
                      </div>
                    </div>
                    <div className={styled.inner}>
                      <p>산도</p>
                      <div>
                        <ScoreDraw
                          score={data.acidity}
                          fillIcon={IoWater}
                          outLineIcon={IoWaterOutline}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Ranking;
