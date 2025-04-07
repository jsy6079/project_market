import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const ModernMarketMap = ({ markets }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedMarket, setSelectedMarket] = useState(null); // 시장 선택
  const [searchTerm, setSearchTerm] = useState(""); // 시장 검색
  const [userLocation, setUserLocation] = useState(null); // 내 위치
  const [storeList, setStoreList] = useState([]); // 점포

  // 점포 리스트
  useEffect(() => {
    if (selectedMarket) {
      axios
        .get(`http://localhost:8080/api/store/${selectedMarket.marketId}`)
        .then((res) => {
          setStoreList(res.data);
        })
        .catch((err) => {
          console.error("점포 불러오기 실패", err);
        });
    }
  }, [selectedMarket]);

  // 내 위치 요청
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("위치 권한 에러:", error);
        }
      );
    }
  }, []);

  // 지도 초기화 및 마커 렌더링
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2ibsdwwsut";
    script.async = true;

    script.onload = () => {
      if (!window.naver) return;

      const defaultCenter = new window.naver.maps.LatLng(37.5665, 126.978);

      const center = userLocation
        ? new window.naver.maps.LatLng(userLocation.lat, userLocation.lon)
        : markets.length
        ? new window.naver.maps.LatLng(
            markets[0].marketLat,
            markets[0].marketLon
          )
        : defaultCenter;

      const map = new window.naver.maps.Map(mapRef.current, {
        center,
        zoom: 13,
      });

      mapInstanceRef.current = map;
      markersRef.current = [];

      // 내 위치 마커 렌더링
      if (userLocation) {
        const userMarker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            userLocation.lat,
            userLocation.lon
          ),
          map: map,
          icon: {
            content: `
              <div style="
                background-color:rgb(255, 64, 30);
                border: 2px solid white;
                border-radius: 50%;
                width: 16px;
                height: 16px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              "></div>
            `,
            size: new window.naver.maps.Size(16, 16),
            anchor: new window.naver.maps.Point(8, 8),
          },
          title: "내 위치",
        });
      }

      // 시장 마커 렌더링
      markets.forEach((market) => {
        const position = new window.naver.maps.LatLng(
          market.marketLat,
          market.marketLon
        );

        const marker = new window.naver.maps.Marker({
          position,
          map,
          title: market.marketName,
          icon: {
            content: `
              <div style="
                background-color:rgb(255, 64, 30);
                border: 2px solid white;
                border-radius: 50%;
                width: 28px;
                height: 28px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 14px;
                font-weight: 600;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
              " title="${market.marketName}">
                <span>M</span>
              </div>
            `,
            size: new window.naver.maps.Size(28, 28),
            anchor: new window.naver.maps.Point(14, 14),
          },
        });

        // 말풍선 창
        const infowindow = new window.naver.maps.InfoWindow({
          content: `
            <div style="
              background: white;
              padding: 14px 16px;
              border-radius: 10px;
              box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
              font-size: 14px;
              color: #333;
              min-width: 180px;
              font-family: 'Inter', sans-serif;
            ">
              <div style="font-weight: 600; font-size: 15px; margin-bottom: 6px; color: #1e90ff;">
                ${market.marketName}
              </div>
              <div style="color: #666;">${market.marketAddress}</div>
              <div style="margin-top: 6px; font-size: 12px; color: #888;">
                운영 형태: ${market.marketType}
              </div>
            </div>
          `,
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          infowindow.open(map, marker);
          setSelectedMarket(market);
        });

        markersRef.current.push({ market, marker });
      });
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [markets, userLocation]); // userLocation 들어오면 다시 렌더링

  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current?.relayout) {
        mapInstanceRef.current.relayout();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 마커 중심으로 맵 이동
  const handleMarketClick = (market) => {
    setSelectedMarket(market);
    const target = markersRef.current.find(
      (m) => m.market.marketId === market.marketId
    );
    if (target && mapInstanceRef.current) {
      mapInstanceRef.current.panTo(
        new window.naver.maps.LatLng(market.marketLat, market.marketLon)
      );
    }
  };

  // 검색 필터링
  const filteredMarkets = markets.filter((m) =>
    m.marketName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* 사이드바 */}
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
          <div style={{ padding: "20px", flex: 1 }}>
            <button
              onClick={() => setSelectedMarket(null)}
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
              ← 목록으로
            </button>

            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#1e90ff",
              }}
            >
              {selectedMarket.marketName}
            </h3>

            <p>
              🗺️ <strong>주소:</strong> {selectedMarket.marketAddress}
            </p>
            <p>
              🏠 <strong>매장 수:</strong> {selectedMarket.marketStoreCount}
            </p>
            <p>
              📞 <strong>전화번호:</strong>{" "}
              {selectedMarket.marketPhoneNumber || "없음"}
            </p>
            <p>
              🌐 <strong>홈페이지:</strong>{" "}
              {selectedMarket.marketHomePage ? (
                <a
                  href={`https://${selectedMarket.marketHomePage}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#1e90ff" }}
                >
                  {selectedMarket.marketHomePage}
                </a>
              ) : (
                "없음"
              )}
            </p>
            <p>
              🚻 <strong>화장실:</strong>{" "}
              {selectedMarket.marketToliet ? "있음" : "없음"}
            </p>
            <p>
              🅿️ <strong>주차장:</strong>{" "}
              {selectedMarket.marketParking ? "있음" : "없음"}
            </p>
            <p>
              🧺 <strong>취급품목:</strong>{" "}
              {selectedMarket.marketItemsList || "정보 없음"}
            </p>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#1e90ff",
              }}
            >
              {selectedMarket.marketName} 입점 점포
            </h3>
            {storeList.length > 0 ? (
              storeList.map((store) => (
                <div
                  key={store.storeId}
                  style={{
                    backgroundColor: "#fff",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ fontWeight: "600", color: "#1e90ff" }}>
                    {store.storeName}
                  </div>
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
          </div>
        ) : (
          <>
            <div style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1e90ff",
                }}
              >
                전통시장 리스트
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
                  onClick={() => handleMarketClick(market)}
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
        )}
      </div>
      {/* 상단 영역 */}
      <div style={{ flex: 1, position: "relative" }}>
        <div
          style={{
            height: "50px",
            backgroundColor: "#1e90ff",
            color: "white",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          서울시 전통시장 지도
        </div>
        <div
          ref={mapRef}
          style={{ width: "100%", height: "calc(100% - 50px)" }}
        />
      </div>
    </div>
  );
};

export default ModernMarketMap;
