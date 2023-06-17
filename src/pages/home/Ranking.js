import axios from 'axios'
import { useState, useEffect } from 'react'
// import React, { useEffect, useState } from "react";
// import styled from "./Ranking.module.css";
// import { IoWater, IoWaterOutline } from "react-icons/io5";
// import { drawStar } from "../util/util";


const Ranking = () => {
   // const [currentTab, setCurrentTab] = useState(0);
   // const [rankList, setRankList] = useState([]);
   // const [fullRank, setFullRank] = useState(props);

   // useEffect(() => {
   //    setRankList(Object.values(fullRank)[currentTab]);
   // }, [currentTab]);
   const [rank, setRank] = useState('');

   const getData = async () => {
      try {
         const result = await axios.get('/api/product/rank');
         let copy = [...rank, result.data.data];
         setRank(copy);
         return copy;
      } catch (error) {
         console.log('실패함');
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         let rankData = await getData();
         console.log(rankData);
      };
      fetchData();
   }, []);

   return (
      <div>
         {/* <section>
            <div className="maxframe">
               <div className="sub_tit__">
                  <h4>카테고리별 랭킹</h4>
                  <span>CATECORY’S RANKING</span>
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
                              {tabname}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               <div className={styled.rank_wrap}>
                  {rankList.map((data, index) => (
                     <Link
                        href={{
                           pathname: `/product/detail/${data.engName}`,
                           query: {
                              id: data.pid,
                              winename: data.engName,
                           },
                        }}
                     >
                        <div id={index} key={index} className={styled.rankcard}>
                           <figure>
                              <Image
                                 width={index === 0 ? 500 : 217}
                                 height={index === 0 ? 500 : 217}
                                 src={data.imageUrl}
                                 alt={`${data.pdname}_썸네일`}
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
                                    {drawStar(data.sweet, <IoWater />, <IoWaterOutline />)}
                                 </div>
                              </div>
                              <div className={styled.inner}>
                                 <p>산도</p>
                                 <div>
                                    {drawStar(data.acidity, <IoWater />, <IoWaterOutline />)}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section> */}
      </div>
   )
}

export default Ranking;