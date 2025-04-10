import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const StoreDetail = ({ store, onBack }) => {
  const navigate = useNavigate();
  const [storeDetail, setStoreDetail] = useState([]);

  useEffect(() => {
    if (store) {
      axios
        .get(`http://localhost:8080/api/store/detail/${store.storeId}`)
        .then((res) => setStoreDetail(res.data))
        .catch((err) => console.error("점포 불러오기 실패", err));
    }
  }, [store]);

  return (
    <div>
      <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1e90ff" }}>
        {store.storeName}의 오늘의 가격
      </h3>
      {storeDetail.length > 0 ? (
        storeDetail.map((item, index) => (
          <div
            key={item.productPriceId}
            style={{
              borderBottom: "1px solid #e0e0e0",
              padding: "10px 0",
              marginBottom: index === storeDetail.length - 1 ? "0" : "10px",
            }}
          >
            <div style={{ fontWeight: "600" }}>
              {item.productName}{" "}
              <span style={{ fontSize: "13px", color: "#666" }}>
                {item.productDescription}{" "}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between", // 좌우 끝으로 배치
                alignItems: "center",
                fontSize: "14px",
                color: "#333",
              }}
            >
              <span>{item.productPriceCost.toLocaleString()}원</span>
              <Badge
                bg="primary"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/order", {
                    state: { productPriceId: item.productPriceId },
                  })
                }
              >
                Order
              </Badge>
            </div>
          </div>
        ))
      ) : (
        <p style={{ fontSize: "13px", color: "#888" }}>가격 정보 없음</p>
      )}
    </div>
  );
};

export default StoreDetail;
