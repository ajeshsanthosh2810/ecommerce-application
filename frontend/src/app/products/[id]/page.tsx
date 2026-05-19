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

  if (loading) return <div className="container" style={{ padding: "4rem", textAlign: "center" }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: "4rem", textAlign: "center" }}>Product not found</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: "4rem 1.5rem" }}>
      <div className="glass" style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
        <div style={{ flex: "1 1 500px", minWidth: "300px" }}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            style={{ width: "100%", height: "100%", minHeight: "400px", objectFit: "cover" }} 
          />
        </div>
        
        <div style={{ flex: "1 1 400px", padding: "3rem", display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{product.name}</h1>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)", marginBottom: "2rem" }}>
            ${product.price.toFixed(2)}
          </div>
          
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", flex: 1 }}>
            {product.description}
          </p>
          
          <div style={{ marginBottom: "2rem", color: product.stock > 0 ? "var(--success)" : "var(--danger)" }}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </div>
          
          <button 
            className="btn btn-primary" 
            style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
