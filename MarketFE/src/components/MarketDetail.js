import React, { useState } from "react";
import StoreDetail from "./StoreDetail"; // 👈 추가 필요

const MarketDetail = ({ market, setSelectedMarket, storeList }) => {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <div style={{ padding: "20px", flex: 1 }}>
      <button
        onClick={() => {
          if (selectedStore) {
            setSelectedStore(null); // 점포 상세에서 점포 목록으로
          } else {
            setSelectedMarket(null); // 마켓 목록으로
          }
        }}
        style={{
          marginBottom: "16px",
          backgroundColor: "#e0e0e0",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        ← {selectedStore ? "시장 상세보기" : "시장 목록보기"}
      </button>

      {selectedStore ? (
        <StoreDetail
          store={selectedStore}
          onBack={() => setSelectedStore(null)}
        />
      ) : (
        <>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "#1e90ff",
            }}
          >
            {market.marketName}
          </h3>

          <p>
            🗺️ <strong>주소:</strong> {market.marketAddress}
          </p>
          <p>
            🏠 <strong>매장 수:</strong> {market.marketStoreCount}
          </p>
          <p>
            📞 <strong>전화번호:</strong> {market.marketPhoneNumber || "없음"}
          </p>
          <p>
            🌐 <strong>홈페이지:</strong>{" "}
            {market.marketHomePage ? (
              <a
                href={`https://${market.marketHomePage}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#1e90ff" }}
              >
                {market.marketHomePage}
              </a>
            ) : (
              "없음"
            )}
          </p>
          <p>
            🚻 <strong>화장실:</strong> {market.marketToliet ? "있음" : "없음"}
          </p>
          <p>
            🅿️ <strong>주차장:</strong> {market.marketParking ? "있음" : "없음"}
          </p>
          <p>
            🧺 <strong>취급품목:</strong>{" "}
            {market.marketItemsList || "정보 없음"}
          </p>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #eee",
              marginBottom: "20px",
            }}
          />
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "10px",
              marginTop: "20px",
              color: "#1e90ff",
            }}
          >
            입점 점포
          </h3>

          {storeList.length > 0 ? (
            storeList.map((store) => (
              <div
                key={store.storeId}
                onClick={() => setSelectedStore(store)}
                style={{
                  backgroundColor: "#fff",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: "600" }}>{store.storeName}</div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  {store.productCategoryName}
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "13px", color: "#999" }}>
              등록된 점포가 없습니다.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default MarketDetail;
