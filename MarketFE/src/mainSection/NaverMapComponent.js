import React, { useEffect, useRef, useState } from "react";

const NaverMapComponent = ({ markets }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedMarket, setSelectedMarket] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2ibsdwwsut";
    script.async = true;

    script.onload = () => {
      if (!window.naver) return;

      const center =
        markets.length > 0
          ? new window.naver.maps.LatLng(
              markets[0].marketLat,
              markets[0].marketLon
            )
          : new window.naver.maps.LatLng(37.5665, 126.978); // 기본 서울

      const map = new window.naver.maps.Map(mapRef.current, {
        center,
        zoom: 13,
      });

      mapInstanceRef.current = map;

      // 마커 생성
      markets.forEach((market) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            market.marketLat,
            market.marketLon
          ),
          map,
          title: market.marketName,
        });

        const infowindow = new window.naver.maps.InfoWindow({
          content: `<div style="padding:5px;">${market.marketName}</div>`,
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          infowindow.open(map, marker);
          setSelectedMarket(market); // 마켓 전체 객체 저장
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [markets]);

  // 윈도우 리사이즈 시 지도 리레이아웃
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current?.relayout) {
        mapInstanceRef.current.relayout();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 왼쪽 정보 패널 */}
      <div
        style={{
          width: "300px",
          background: "#f7f7f7",
          padding: "16px",
          borderRight: "1px solid #ccc",
          overflowY: "auto",
        }}
      >
        <h3>선택한 시장</h3>
        {selectedMarket ? (
          <div>
            <p>
              <strong>이름:</strong> {selectedMarket.marketName}
            </p>
            <p>
              <strong>유형:</strong> {selectedMarket.marketType}
            </p>
            <p>
              <strong>주소:</strong> {selectedMarket.marketAddress}
            </p>
            <p>
              <strong>매장 수:</strong> {selectedMarket.marketStoreCount}
            </p>
            <p>
              <strong>품목:</strong> {selectedMarket.marketItemsList}
            </p>
            <p>
              <strong>홈페이지:</strong>{" "}
              {selectedMarket.marketHomePage ? (
                <a
                  href={`https://${selectedMarket.marketHomePage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedMarket.marketHomePage}
                </a>
              ) : (
                "없음"
              )}
            </p>
            <p>
              <strong>화장실:</strong>{" "}
              {selectedMarket.marketToliet ? "있음" : "없음"}
            </p>
            <p>
              <strong>주차장:</strong>{" "}
              {selectedMarket.marketParking ? "있음" : "없음"}
            </p>
            <p>
              <strong>전화번호:</strong>{" "}
              {selectedMarket.marketPhoneNumber || "없음"}
            </p>
            <hr />
            <p>
              <strong>위도:</strong>{" "}
              {Number(selectedMarket.marketLat).toFixed(6)}
            </p>
            <p>
              <strong>경도:</strong>{" "}
              {Number(selectedMarket.marketLon).toFixed(6)}
            </p>
          </div>
        ) : (
          <p>마커를 클릭해보세요</p>
        )}
      </div>

      {/* 지도 + 상단바 */}
      <div style={{ flex: 1, position: "relative" }}>
        <div
          style={{
            height: "50px",
            backgroundColor: "#1e90ff",
            color: "white",
            display: "flex",
            alignItems: "center",
            paddingLeft: "16px",
            fontWeight: "bold",
            fontSize: "18px",
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

export default NaverMapComponent;
