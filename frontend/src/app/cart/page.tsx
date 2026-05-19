"use client";

import { useCart } from "../../context/CartContext";
import { api } from "../../services/api";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    try {
      const orderData = {
        customerName: "Test User",
        customerEmail: "test@example.com",
        shippingAddress: "123 Test St",
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      };
      
      await api.post("/orders", orderData);
      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Checkout failed. Please verify backend connection.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container animate-fade-in" style={{ padding: "8rem 1.5rem", display: "flex", justifyContent: "center" }}>
        <div className="panel" style={{ padding: "4rem", maxWidth: "600px", width: "100%", border: "1px solid var(--success)" }}>
          <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-mono)", color: "var(--success)", marginBottom: "2rem", textTransform: "uppercase" }}>&gt; Transaction complete</div>
          <h1 style={{ marginBottom: "2rem" }}>Order Confirmed</h1>
          <p style={{ marginBottom: "3rem", color: "var(--foreground)" }}>Data successfully written to database. Awaiting fulfillment.</p>
          <Link href="/products" className="btn btn-primary" style={{ width: "100%" }}>Return to Index</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: "4rem 1.5rem" }}>
      <h1 style={{ marginBottom: "3rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>Current Cart State</h1>
      
      {items.length === 0 ? (
        <div className="panel" style={{ padding: "4rem", textAlign: "center" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>&gt; Buffer is empty</p>
          <Link href="/products" className="btn btn-primary">Initialize Selection</Link>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 600px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {items.map(item => (
              <div key={item.product.id} className="panel" style={{ display: "flex", padding: "1.5rem", gap: "1.5rem", alignItems: "center" }}>
                <img src={item.product.imageUrl} alt={item.product.name} style={{ width: "120px", height: "120px", objectFit: "cover", filter: "grayscale(100%)" }} />
                <div style={{ flex: 1 }}>
                  <Link href={`/products/${item.product.id}`}>
                    <h3 style={{ marginBottom: "0.5rem" }}>{item.product.name}</h3>
                  </Link>
                  <div style={{ fontFamily: "var(--font-mono)" }}>${item.product.price.toFixed(2)}</div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="btn" style={{ padding: "0.5rem 1rem" }}>-</button>
                  <span style={{ fontFamily: "var(--font-mono)", margin: "0 1rem" }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="btn" style={{ padding: "0.5rem 1rem" }}>+</button>
                </div>
                
                <button onClick={() => removeFromCart(item.product.id)} className="btn" style={{ border: "1px solid var(--danger)", color: "var(--danger)" }}>
                  DEL
                </button>
              </div>
            ))}
          </div>
          
          <div className="panel" style={{ flex: "1 1 350px", padding: "2rem", position: "sticky", top: "100px" }}>
            <h2 style={{ marginBottom: "2rem" }}>Execution Summary</h2>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontFamily: "var(--font-mono)", color: "var(--border-hover)" }}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontFamily: "var(--font-mono)", color: "var(--border-hover)" }}>
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <hr style={{ borderColor: "var(--border-color)", margin: "1.5rem 0", borderStyle: "solid" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3rem", fontSize: "1.5rem", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: "100%", padding: "1.25rem", fontSize: "1.1rem" }}
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Executing..." : "Commit Transaction"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
