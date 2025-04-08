import React from "react";

const markets = [
  { name: "장위전통시장", region: "성북구", price: "1,200원", featured: true },
  { name: "마천시장", region: "송파구", price: "1,100원" },
  { name: "백련시장", region: "서대문구", price: "1,250원" },
];

const ComparePage = () => {
  return (
    <div className="container py-5">
      {/* 상단 바 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          🥬 <span className="align-middle">배추 가격 비교</span>
        </h2>
        <select className="form-select w-auto">
          <option>정렬: 최신순</option>
          <option>가격 낮은순</option>
          <option>가격 높은순</option>
        </select>
      </div>

      {/* 카드 리스트 */}
      <div className="row g-4">
        {markets.map((market, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                {market.featured && (
                  <span className="badge bg-success mb-2">추천</span>
                )}
                <h5 className="card-title fw-bold">{market.name}</h5>
                <p className="card-text text-muted mb-1">{market.region}</p>
                <p className="card-text fs-5 fw-semibold text-success">
                  {market.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePage;
