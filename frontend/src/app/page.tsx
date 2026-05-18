"use client";

import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function HomePage() {

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 40 }}>

      <h1>Spring Boot Ecommerce</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 20
      }}>

        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: 20
            }}
          >

            <img
              src={product.imageUrl}
              width="100%"
              height="200"
            />

            <h3>{product.name}</h3>

            <p>₹{product.price}</p>

          </div>
        ))}

      </div>

    </div>
  );
}
