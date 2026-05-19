"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="glass" style={{ margin: "1rem", position: "sticky", top: "1rem", zIndex: 100 }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem" }}>
        <Link href="/" style={{ fontSize: "1.5rem", fontWeight: "bold", background: "linear-gradient(to right, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          LuxeShop
        </Link>
        
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link href="/products" style={{ fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}>
            Products
          </Link>
          
          <Link href="/admin/add-product" style={{ fontSize: "0.875rem", color: "var(--accent)", border: "1px solid var(--accent)", padding: "0.25rem 0.75rem", borderRadius: "100px", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}>
            + Add Product
          </Link>
          
          <Link href="/cart" style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartItemsCount > 0 && (
              <span style={{
                position: "absolute", top: "-8px", right: "-12px", background: "var(--accent)", color: "white",
                borderRadius: "50%", padding: "2px 6px", fontSize: "0.75rem", fontWeight: "bold"
              }}>
                {cartItemsCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
