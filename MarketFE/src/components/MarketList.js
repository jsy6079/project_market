import React from "react";

const MarketList = ({ markets, searchTerm, setSearchTerm, onMarketClick }) => {
  const filteredMarkets = markets.filter((m) =>
    m.marketName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1e90ff" }}>
          서울시 전통시장
        </h2>
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
