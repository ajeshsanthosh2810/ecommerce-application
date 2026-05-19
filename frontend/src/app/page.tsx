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
        setError("System Offline. Verify backend connection.");
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
        padding: "8rem 2rem", 
        borderBottom: "1px solid var(--border-color)",
        background: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMzMzMiLz48L3N2Zz4=') repeat",
      }}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <h1 style={{ fontSize: "5rem", marginBottom: "2rem" }}>
              The Sovereign<br/>Commerce Platform
            </h1>
            <p style={{ fontSize: "1.25rem", margin: "0 0 3rem 0", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--foreground)" }}>
              High-performance goods. Minimalist execution.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/products" className="btn btn-primary" style={{ padding: "1.25rem 2.5rem", fontSize: "1rem" }}>
                Initialize Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: "6rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "3rem", margin: 0 }}>Terminal Output</h2>
          </div>
          <Link href="/products" style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em", borderBottom: "1px solid var(--primary)", paddingBottom: "0.25rem" }}>
            Query All Records
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: "4rem 0", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
            &gt; Loading database records...
          </div>
        ) : error ? (
          <div className="panel" style={{ padding: "2rem", color: "var(--danger)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
            &gt; ERROR: {error}
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
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