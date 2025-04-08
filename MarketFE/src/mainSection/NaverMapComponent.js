import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MarketSidebar from "../components/MarketSidebar";

const ModernMarketMap = ({ markets }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [storeList, setStoreList] = useState([]);

  // 점포 리스트 가져오기
  useEffect(() => {
    if (selectedMarket) {
      axios
        .get(`http://localhost:8080/api/store/${selectedMarket.marketId}`)
        .then((res) => setStoreList(res.data))
        .catch((err) => console.error("점포 불러오기 실패", err));
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

      // 내 위치 마커
      if (userLocation) {
        new window.naver.maps.Marker({
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

      // 시장 마커
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

        markersRef.current.push({ market, marker, infowindow });
      });
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [markets, userLocation]);

  // 반응형 대응
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current?.relayout) {
        mapInstanceRef.current.relayout();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 마커 클릭시 지도 이동
  const handleMarketClick = (market) => {
    setSelectedMarket(market);
    const target = markersRef.current.find(
      (m) => m.market.marketId === market.marketId
    );
    if (target && mapInstanceRef.current) {
      mapInstanceRef.current.panTo(
        new window.naver.maps.LatLng(market.marketLat, market.marketLon)
      );
      target.infowindow.open(mapInstanceRef.current, target.marker);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <MarketSidebar
        selectedMarket={selectedMarket}
        setSelectedMarket={setSelectedMarket}
        markets={markets}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        storeList={storeList}
        onMarketClick={handleMarketClick}
      />

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
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              paddingBottom: "10px",
            }}
          >
            {[
              "🥬 배추",
              "🌿 시금치",
              "🧅 양파",
              "🍉 수박",
              "🍓 딸기",
              "🐖 돼지고기",
              "🐂 소고기",
              "🐄 우유",
              "🐟 고등어",
              "🦈 갈치",
              "🦪 굴",
            ].map((item) => (
              <button
                key={item}
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
                {item}
              </button>
            ))}
          </div>
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
