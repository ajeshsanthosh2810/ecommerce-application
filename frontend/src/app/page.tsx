"use client";

import { useEffect, useState } from "react";

import { api } from "../services/api";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function HomePage() {

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    try {

      const response = await api.get("/products");

      setProducts(response.data);

    } catch (err) {

      console.error(err);

      setError("Failed to load products");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div style={{ padding: 40 }}>
        Loading products...
      </div>
    );

  }

  if (error) {

    return (
      <div style={{ padding: 40 }}>
        {error}
      </div>
    );

  }

  return (

    <div
      style={{
        padding: 40,
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          marginBottom: 30
        }}
      >
        Spring Boot Ecommerce
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20
        }}
      >

        {products.map((product) => (

          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 20
            }}
          >

            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: 10
              }}
            />

            <h3>{product.name}</h3>

            <p>₹{product.price}</p>

          </div>

        ))}

      </div>

    </div>

  );

}