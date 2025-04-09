import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import NaverMapComponent from "../src/mainSection/NaverMapComponent";
import ComparePage from "../src/page/ComparePage";

function App() {
  const [marketList, setMarketList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/market/")
      .then((res) => {
        setMarketList(res.data);
      })
      .catch((err) => {
        console.error("마켓 정보 불러오기 실패", err);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NaverMapComponent markets={marketList} />} />
        <Route path="/compare/:id" element={<ComparePage />} />
      </Routes>
    </Router>
  );
}

export default App;
