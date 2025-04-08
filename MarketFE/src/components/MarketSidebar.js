import React from "react";
import MarketList from "./MarketList";
import MarketDetail from "./MarketDetail";

const MarketSidebar = ({
  selectedMarket,
  setSelectedMarket,
  markets,
  searchTerm,
  setSearchTerm,
  storeList,
  onMarketClick,
}) => {
  return (
    <div
      style={{
        width: "340px",
        backgroundColor: "#f5f7fa",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {selectedMarket ? (
        <MarketDetail
          market={selectedMarket}
          setSelectedMarket={setSelectedMarket}
          storeList={storeList}
        />
      ) : (
        <MarketList
          markets={markets}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onMarketClick={onMarketClick}
        />
      )}
    </div>
  );
};

export default MarketSidebar;
