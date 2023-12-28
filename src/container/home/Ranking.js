'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from "./Ranking.module.css";
import { IoWater, IoWaterOutline } from "react-icons/io5";

const tab = ["레드", "화이트", "스파클링", "주정강화"];

const Ranking = () => {
  const [rank, setRank] = useState([]);
  const getData = async () => {
    try {
      const result = await axios.get('/api/product/rank');
      let copy = [...rank, result.data.data];
      setRank(copy);
      return copy;
    } catch (error) {
      console.log('와인 랭킹 데이터 가져오기 실패');
    }
  };

  const [newData, setNewData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let rankData = await getData();
      // 와인 랭킹 데이터 합침
      var newData = Object.values(rankData[0]).reduce(function (accumulator, currentArray) {
        return accumulator.concat(currentArray);
      }, []);
      setNewData(newData);
    };
    fetchData();
  }, []);

  const [currentTab, setCurrentTab] = useState(0);
  const [rankList, setRankList] = useState([]);
  useEffect(() => {
    const rankInfo = newData.filter((data) => data.type === currentTab + 1);
    setRankList(rankInfo);
  }, [currentTab]);

  // 당도 아이콘
  const sweetDraw = (score) => {
    let i = 0;
    let sweet = [];
    let num = Math.round(score);
    for (i = 0; i < num; i++) {
      sweet.push(<IoWater />);
    }
    for (i = 0; i < 5 - num; i++) {
      sweet.push(<IoWaterOutline />);
    }
    return sweet;
  }
  //산미 아이콘
  const acidDraw = (score) => {
    let i = 0;
    let acidity = [];
    let num = Math.round(score);
    for (i = 0; i < num; i++) {
      acidity.push(<IoWater />);
    }
    for (i = 0; i < 5 - num; i++) {
      acidity.push(<IoWaterOutline />);
    }
    return acidity;
  }

  return (
    <>
      <section className="ranking-sec">
        <div className="maxframe">
          <div className="title-sec">
            <h4>카테고리별 랭킹</h4>
            <span>CATECORY’S RANKING</span>
          </div>
          <div>
            <div className={styled.tablist}>
              <ul className={styled.tablistinner}>
                {tab.map((tabname, index) => (
                  <li
                    id={index}
                    key={index}
                    className={index === currentTab ? styled.active : ""}
                    onClick={() => setCurrentTab(index)}
                  >
                    {tabname}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styled.rank_wrap}>
            {rankList.map((data, index) => (
              <div id={index} key={index} className={styled.rankcard}>
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
                      {sweetDraw(data.sweet)}
                    </div>
                  </div>
                  <div className={styled.inner}>
                    <p>산도</p>
                    <div>
                      {acidDraw(data.acidity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Ranking;