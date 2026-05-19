"use client";

import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Product } from "../../../types";
import { useCart } from "../../../context/CartContext";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${params.id}`);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) return <div className="container" style={{ padding: "4rem", fontFamily: "var(--font-mono)" }}>&gt; Fetching detailed telemetry...</div>;
  if (!product) return <div className="container" style={{ padding: "4rem", fontFamily: "var(--font-mono)", color: "var(--danger)" }}>&gt; ERROR 404: Product not found in database.</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: "4rem 1.5rem" }}>
      <div className="panel" style={{ display: "flex", flexWrap: "wrap", padding: 0 }}>
        <div style={{ flex: "1 1 500px", minWidth: "300px", borderRight: "1px solid var(--border-color)" }}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ width: "100%", height: "100%", minHeight: "500px", objectFit: "cover", display: "block" }} 
          />
        </div>
        
        <div style={{ flex: "1 1 400px", padding: "4rem", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--border-hover)", marginBottom: "1rem" }}>ID: {product.id}</div>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>{product.name}</h1>
          <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-mono)", marginBottom: "3rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "2rem" }}>
            ${product.price.toFixed(2)}
          </div>
          
          <p style={{ fontSize: "1.1rem", marginBottom: "3rem", flex: 1, color: "var(--foreground)" }}>
            {product.description}
          </p>
          
          <div style={{ marginBottom: "2rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", color: product.stock > 0 ? "var(--success)" : "var(--danger)" }}>
            &gt; STATUS: {product.stock > 0 ? `Available (${product.stock} units)` : "Depleted"}
          </div>
          
          <button 
            className="btn btn-primary" 
            style={{ width: "100%", padding: "1.25rem", fontSize: "1.1rem" }}
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Execute Add to Cart" : "Action Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}
