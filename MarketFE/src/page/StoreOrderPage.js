import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import axios from "axios";
import NavBar from "./NavBar";
import testImage from "../test.png";

const ProductDetailPage = () => {
  const location = useLocation();
  const { productPriceId } = location.state || {};
  const [storeDetail, setStoreDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/cost/detail/${productPriceId}`)
      .then((res) => {
        setStoreDetail(res.data);
      })
      .catch((err) => {
        console.error("해당 점포의 해당 상품 정보 불러오기 실패", err);
      });
  }, []);

  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    // alert(`주문 완료: ${product.name} ${quantity}개`);
    alert("주문 완료");
  };

  return (
    <>
      <NavBar />

      <Container className="py-5">
        {storeDetail.map((store, idx) => (
          <Row className="g-4" key={idx}>
            {/* 이미지 */}
            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={testImage}
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </Card>
            </Col>

            {/* 상세 정보 */}
            <Col md={9}>
              <Card className="border-0">
                <Card.Body>
                  <h5 className="mb-3 fw-semibold">
                    {store.storeName}{" "}
                    <span className="text-secondary fs-6">
                      ({store.marketAdress})
                    </span>
                  </h5>

                  <p>
                    {store.productName}{" "}
                    <span style={{ fontSize: "13px", color: "#666" }}>
                      {store.productDescription}{" "}
                    </span>
                  </p>

                  <h4 className="fw-bold text-dark mb-4">
                    {store.productPriceCost.toLocaleString()}원
                  </h4>

                  {/* 수량 조절 */}
                  <div className="d-flex align-items-center mb-4">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      −
                    </Button>
                    <span className="mx-3 fs-5">{quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-100 fw-bold"
                    onClick={handleOrder}
                  >
                    주문하기
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default ProductDetailPage;
