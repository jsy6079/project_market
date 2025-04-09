import React, { useState, useEffect } from "react";
import {
  Nav,
  Dropdown,
  Navbar,
  NavDropdown,
  Container,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import test from "../test.png";

const productNames = {
  1: "배추(1포기)",
  2: "시금치(100g)",
  3: "양파(1kg)",
  4: "수박(1개)",
  5: "딸기(100g)",
  6: "돼지고기(100g)",
  7: "소고기(100g)",
  8: "우유(1L)",
  9: "고등어(1마리)",
  10: "갈치(1마리)",
  11: "굴(1kg)",
};

const ComparePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productCostList, setProductCostList] = useState([]);
  const productName = productNames[id]; // id 가 1이면 배추
  const [sortOption, setSortOption] = useState("none"); // 디폴트 등록순으로 나열

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/cost/${id}?sort=${sortOption}`)
      .then((res) => {
        setProductCostList(res.data);
      })
      .catch((err) => {
        console.error("상품별 점포 가격 정보 불러오기 실패", err);
      });
  }, [id, sortOption]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>상품별 가격 비교</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="🥬농산물" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/compare/1")}>
                  배추
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/2")}>
                  시금치
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/3")}>
                  양파
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/4")}>
                  수박
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/5")}>
                  딸기
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="🐄축산물" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/compare/6")}>
                  돼지고기
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/7")}>
                  소고기
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/8")}>
                  우유
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="🐟수산물" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/compare/9")}>
                  고등어
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/10")}>
                  갈치
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/compare/11")}>
                  굴
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">
            <span className="align-middle">{productName} 가격 비교</span>
          </h4>
          <select
            className="form-select w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="none">등록 순</option>
            <option value="asc">가격 낮은순</option>
            <option value="desc">가격 높은순</option>
          </select>
        </div>

        <div className="row g-4">
          {productCostList.map((store, idx) => (
            <div className="col-md-4" key={idx}>
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={test}
                  className="img-fluid"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    {store.marketName}{" "}
                    <span className="text-muted">➤ {store.storeName}</span>
                  </Card.Title>
                  <Card.Text className="text-muted mb-1">
                    {store.marketAdress}
                  </Card.Text>
                  <Badge bg="primary">
                    {store.productPriceCost.toLocaleString()}원
                  </Badge>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ComparePage;
