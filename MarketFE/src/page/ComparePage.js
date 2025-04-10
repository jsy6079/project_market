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
import NavBar from "./NavBar";
import test from "../test.png";

const productNames = {
  1: "배추",
  2: "시금치",
  3: "양파",
  4: "수박",
  5: "딸기",
  6: "돼지고기",
  7: "소고기",
  8: "우유",
  9: "고등어",
  10: "갈치",
  11: "굴",
};

const ComparePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [productCostList, setProductCostList] = useState([]);
  const productName = productNames[id]; // id 가 1이면 배추
  const [sortOption, setSortOption] = useState("none"); // 디폴트 등록순으로 나열
  const productDescription =
    productCostList.length > 0 ? productCostList[0].productDescription : ""; // 상품 상세 설명

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
      <NavBar />
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">
            <span className="align-middle">
              {productName}{" "}
              <span style={{ fontSize: "20px", color: "#666" }}>
                {productDescription}{" "}
              </span>{" "}
              가격 비교
            </span>
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
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body
                  className="d-flex flex-column justify-content-between"
                  style={{ height: "160px" }}
                >
                  <div>
                    <Card.Title
                      className="fw-bold mb-2"
                      style={{ fontSize: "1rem" }}
                    >
                      {store.marketName}{" "}
                      <span className="text-muted">➤ {store.storeName}</span>
                    </Card.Title>

                    <Card.Text
                      className="text-muted mb-3 text-truncate"
                      style={{
                        maxHeight: "3em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                      }}
                    >
                      {store.marketAdress}
                    </Card.Text>
                  </div>

                  <div className="d-flex justify-content-end align-items-center gap-2">
                    <h5 className="fw-bold text-dark mb-0">
                      {store.productPriceCost.toLocaleString()}원
                    </h5>
                    <Badge
                      bg="primary"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("/order", {
                          state: { productPriceId: store.productPriceId },
                        })
                      }
                    >
                      Order
                    </Badge>
                  </div>
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
