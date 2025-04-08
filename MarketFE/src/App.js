// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import NaverMapComponent from "../src/mainSection/NaverMapComponent";
// import ComparePage from "../src/page/ComparePage";

// function App() {
//   const [marketList, setMarketList] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/market/")
//       .then((res) => {
//         setMarketList(res.data);
//       })
//       .catch((err) => {
//         console.error("마켓 정보 불러오기 실패", err);
//       });
//   }, []);

//   return (
//     <div>
//       <NaverMapComponent markets={marketList} />
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import NaverMapComponent from "../src/mainSection/NaverMapComponent";
import ComparePage from "../src/page/ComparePage"; // 🥬 배추 비교 페이지

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
        {/* 기본 지도 페이지 */}
        <Route path="/" element={<NaverMapComponent markets={marketList} />} />

        {/* 품목 비교 페이지 예시 */}
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </Router>
  );
}

export default App;
