"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductDetail = (props) => {
  const winePid = props.params.id;
  const [wineDetail, setWineDetail] = useState("");

  const getDatailData = async () => {
    await axios
      .get(`/api/product/wine/detail?pid=${winePid}`)
      .then((result) => {
        setWineDetail(result.data);
      })
      .catch((error) => {
        console.log("디테일 실패");
      });
  };

  useEffect(() => {
    getDatailData();
  }, []);

  return (
    <div>
      <div>
        <figure>{wineDetail && <img src={wineDetail.data.imageUrl} />}</figure>
      </div>
    </div>
  );
};

export default ProductDetail;
