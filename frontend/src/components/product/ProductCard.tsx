"use client";

import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass"
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "translateY(-5px)" : "none",
        boxShadow: isHovered ? "0 10px 25px rgba(0,0,0,0.5)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} style={{ overflow: "hidden" }}>
        <img
          src={product.imageUrl || "https://via.placeholder.com/400x300"}
          alt={product.name}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </Link>
      
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <Link href={`/products/${product.id}`}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}>
            {product.name}
          </h3>
        </Link>
        
        <p style={{ fontSize: "0.875rem", color: "var(--border-color)", marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.description}
        </p>
        
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--accent)" }}>
            ${product.price.toFixed(2)}
          </span>
          
          <button 
            className="btn btn-primary"
            style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
