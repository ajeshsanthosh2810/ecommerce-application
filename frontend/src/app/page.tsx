"use client";

import { useEffect, useState } from "react";
import { api } from "../services/api";
import ProductCard from "../components/product/ProductCard";
import { Product } from "../types";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ 
        padding: "6rem 2rem", 
        textAlign: "center",
        background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
      }}>
        <div className="container">
          <h1 style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>
            Elevate Your Lifestyle
          </h1>
          <p style={{ fontSize: "1.25rem", maxWidth: "800px", margin: "0 auto 2.5rem auto" }}>
            Discover our curated collection of premium products designed to bring elegance and functionality into your everyday life.
          </p>
          <Link href="/products" className="btn btn-primary" style={{ fontSize: "1.125rem", padding: "1rem 2rem" }}>
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: "4rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
          <div>
            <h2 style={{ fontSize: "2.5rem" }}>Trending Now</h2>
            <p>The most wanted items this week</p>
          </div>
          <Link href="/products" style={{ color: "var(--primary)", fontWeight: "bold" }}>
            View All &rarr;
          </Link>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid var(--card-bg)", borderTopColor: "var(--primary)", animation: "spin 1s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div className="glass" style={{ padding: "2rem", textAlign: "center", color: "var(--danger)" }}>
            {error}
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
            gap: "2rem" 
          }}>
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}