import React from "react";
import { useNavigate } from "react-router-dom";

const MarketList = ({ markets, searchTerm, setSearchTerm, onMarketClick }) => {
  const filteredMarkets = markets.filter((m) =>
    m.marketName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const products = [
    { id: 1, label: "🥬 배추" },
    { id: 2, label: "🌿 시금치" },
    { id: 3, label: "🧅 양파" },
    { id: 4, label: "🍉 수박" },
    { id: 5, label: "🍓 딸기" },
    { id: 6, label: "🐖 돼지고기" },
    { id: 7, label: "🐂 소고기" },
    { id: 8, label: "🐄 우유" },
    { id: 9, label: "🐟 고등어" },
    { id: 10, label: "🦈 갈치" },
    { id: 11, label: "🦪 굴" },
  ];

  return (
    <>
      <div style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1e90ff" }}>
          서울시 전통시장
        </h2>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            paddingBottom: "10px",
          }}
        >
          {products.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/compare/${item.id}`)}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #c2d4ee",
                borderRadius: "20px",
                padding: "6px 14px",
                fontSize: "13px",
                color: "#1e293b",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="시장명을 검색해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "90%",
            marginTop: "10px",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "10px 20px" }}>
        {filteredMarkets.map((market) => (
          <div
            key={market.marketId}
            onClick={() => onMarketClick(market)}
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "10px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              cursor: "pointer",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{market.marketName}</div>
            <div style={{ color: "#666", fontSize: "13px" }}>
              {market.marketAddress}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MarketList;
