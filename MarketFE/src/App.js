import React, { useEffect, useState } from "react";
import axios from "axios";
import NaverMapComponent from "../src/mainSection/NaverMapComponent";

function App() {
  const [marketList, setMarketList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/market/")
      .then((res) => {
        setMarketList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("마켓 정보 불러오기 실패", err);
      });
  }, []);

  return (
    <div>
      <NaverMapComponent markets={marketList} />
    </div>
  );
}

export default App;
