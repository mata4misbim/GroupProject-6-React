import { PRODUCTS } from "../mock-db/products";
import React, { useState } from "react";

export default function SearchBar() {
  const [input, setInput] = useState("");

  const q = input.trim().toLowerCase();
  const results = q
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q),
      )
    : [];

  const showResults = input.trim().length > 0;

  return (
    <div>
      <div className="search-box">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "20px" }}
        >
          search
        </span>
        <input
          type="text"
          placeholder="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {showResults && (
        <div className="results-list">
          {results.length === 0 ? (
            <div className="no-results">ไม่พบสินค้าที่ตรงกับ "{input}"</div>
          ) : (
            results.map((product) => (
              <div key={product.id} className="result-item">
                <div className="result-info">
                  <div className="result-title">{product.title}</div>
                  <div className="result-desc">{product.description}</div>
                </div>
                <span className={`type-badge ${product.type}`}>
                  {product.type}
                </span>
                <span className="result-price">
                  ฿{product.price.toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
