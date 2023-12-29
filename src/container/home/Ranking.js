'use client'
import axios from "axios";
import styled from "./Ranking.module.css";
import { useState, useEffect } from "react";
import { IoWater, IoWaterOutline } from "react-icons/io5";

const tab = [
  { label: '레드', values: 'red' },
  { label: '화이트', values: 'white' },
  { label: '스파클링', values: 'sparkling' },
  { label: '주정강화', values: 'port' }
]

const Ranking = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [rankData, setRankData] = useState([]);
  const [rankList, setRankList] = useState([]);

  const getListData = async () => {
    await axios.get('/api/product/rank')
      .then((result) => {
        let copy = result.data.data;
        setRankData(copy)
      })
      .catch((error) => {
        console.log('와인랭킹 데이터 가져오기 실패');
      })
  }

  useEffect(() => {
    getListData()
  }, [])

  useEffect(() => {
    const rankInfo = rankData[tab[currentTab].values]
    setRankList(rankInfo)
  }, [currentTab, rankData])

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

  if (rankList == undefined) {
    return null;
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
                    {tabname.label}
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