"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--background)", borderBottom: "1px solid var(--border-color)" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 2rem" }}>
        <Link href="/" style={{ fontSize: "1.5rem", fontWeight: "bold", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          LuxeShop
        </Link>
        
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center", fontFamily: "var(--font-mono)", textTransform: "uppercase", fontSize: "0.875rem", letterSpacing: "0.05em" }}>
          <Link href="/products" style={{ transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary-hover)"} onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}>
            Products
          </Link>
          
          <Link href="/admin/add-product" style={{ border: "1px solid var(--border-color)", padding: "0.5rem 1rem", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "inherit"; }}>
            Add Product
          </Link>
          
          <Link href="/cart" style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartItemsCount > 0 && (
              <span style={{
                position: "absolute", top: "-8px", right: "-12px", background: "var(--foreground)", color: "var(--background)",
                padding: "2px 6px", fontSize: "0.75rem", fontWeight: "bold"
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
