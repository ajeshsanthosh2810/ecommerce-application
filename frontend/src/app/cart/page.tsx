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
      alert("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container animate-fade-in" style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
        <div className="glass" style={{ padding: "4rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "4rem", color: "var(--success)", marginBottom: "1rem" }}>✓</div>
          <h1 style={{ marginBottom: "1rem" }}>Order Confirmed!</h1>
          <p style={{ marginBottom: "2rem" }}>Thank you for your purchase. We will process it shortly.</p>
          <Link href="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: "4rem 1.5rem" }}>
      <h1 style={{ marginBottom: "3rem" }}>Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="glass" style={{ padding: "4rem", textAlign: "center" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Your cart is empty.</p>
          <Link href="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 600px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {items.map(item => (
              <div key={item.product.id} className="glass" style={{ display: "flex", padding: "1.5rem", gap: "1.5rem", alignItems: "center" }}>
                <img src={item.product.imageUrl} alt={item.product.name} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
                <div style={{ flex: 1 }}>
                  <Link href={`/products/${item.product.id}`}>
                    <h3 style={{ marginBottom: "0.5rem" }}>{item.product.name}</h3>
                  </Link>
                  <div style={{ color: "var(--accent)", fontWeight: "bold" }}>${item.product.price.toFixed(2)}</div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="btn" style={{ padding: "0.5rem", background: "var(--card-bg)", border: "1px solid var(--border-color)" }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="btn" style={{ padding: "0.5rem", background: "var(--card-bg)", border: "1px solid var(--border-color)" }}>+</button>
                </div>
                
                <button onClick={() => removeFromCart(item.product.id)} style={{ background: "none", border: "none", color: "var(--danger)", cursor: "pointer", padding: "0.5rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="glass" style={{ flex: "1 1 350px", padding: "2rem", position: "sticky", top: "100px" }}>
            <h2 style={{ marginBottom: "2rem" }}>Order Summary</h2>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", color: "var(--border-color)" }}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", color: "var(--border-color)" }}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr style={{ borderColor: "var(--border-color)", margin: "1.5rem 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", fontSize: "1.25rem", fontWeight: "bold" }}>
              <span>Total</span>
              <span style={{ color: "var(--accent)" }}>${total.toFixed(2)}</span>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Quick Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
