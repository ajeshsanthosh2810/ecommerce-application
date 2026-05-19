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
      className="panel"
      style={{
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s ease",
        borderColor: isHovered ? "var(--border-hover)" : "var(--border-color)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} style={{ display: "block", borderBottom: "1px solid", borderColor: isHovered ? "var(--border-hover)" : "var(--border-color)", transition: "border-color 0.2s ease" }}>
        <img
          src={product.imageUrl || "https://via.placeholder.com/400x300"}
          alt={product.name}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            filter: isHovered ? "none" : "grayscale(50%)",
            transition: "filter 0.3s ease",
            display: "block"
          }}
        />
      </Link>
      
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <Link href={`/products/${product.id}`}>
          <h3 style={{ marginBottom: "0.5rem", color: isHovered ? "var(--primary)" : "var(--foreground)", transition: "color 0.2s" }}>
            {product.name}
          </h3>
        </Link>
        
        <p style={{ fontSize: "0.875rem", marginBottom: "1.5rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.description}
        </p>
        
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "1.25rem", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
            ${product.price.toFixed(2)}
          </span>
          
          <button 
            className="btn btn-primary"
            style={{ padding: "0.5rem 1rem" }}
            onClick={() => addToCart(product)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
