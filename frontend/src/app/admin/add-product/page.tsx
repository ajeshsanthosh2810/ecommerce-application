"use client";

import { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { Category } from "../../../types";

export default function AddProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: ""
  });

  useEffect(() => {
    // Fetch categories so the user can select one from a dropdown
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
        if (response.data.length > 0) {
          setFormData(prev => ({ ...prev, categoryId: response.data[0].id }));
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        imageUrl: formData.imageUrl,
        categoryId: formData.categoryId || null
      };

      await api.post("/products", payload);
      setMessage({ text: "Product added successfully!", type: "success" });
      
      // Reset form
      setFormData(prev => ({
        ...prev,
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: ""
      }));
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to add product. Please check your backend connection.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: "4rem 1.5rem", maxWidth: "800px" }}>
      <h1 style={{ marginBottom: "2rem" }}>Admin: Add New Product</h1>
      
      <div className="glass" style={{ padding: "2.5rem" }}>
        {message && (
          <div style={{ 
            padding: "1rem", 
            marginBottom: "2rem", 
            borderRadius: "8px",
            backgroundColor: message.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
            border: `1px solid ${message.type === "success" ? "var(--success)" : "var(--danger)"}`,
            color: message.type === "success" ? "var(--success)" : "var(--danger)"
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="name" style={{ fontWeight: 600 }}>Product Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange}
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "rgba(0,0,0,0.2)", color: "white" }}
              placeholder="e.g. Premium Wireless Headphones"
            />
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
              <label htmlFor="price" style={{ fontWeight: 600 }}>Price ($) *</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                required 
                min="0" 
                step="0.01"
                value={formData.price} 
                onChange={handleChange}
                style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "rgba(0,0,0,0.2)", color: "white" }}
                placeholder="0.00"
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
              <label htmlFor="stock" style={{ fontWeight: 600 }}>Initial Stock *</label>
              <input 
                type="number" 
                id="stock" 
                name="stock" 
                required 
                min="0"
                value={formData.stock} 
                onChange={handleChange}
                style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "rgba(0,0,0,0.2)", color: "white" }}
                placeholder="100"
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="categoryId" style={{ fontWeight: 600 }}>Category</label>
            <select 
              id="categoryId" 
              name="categoryId" 
              value={formData.categoryId} 
              onChange={handleChange}
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "rgba(0,0,0,0.2)", color: "white" }}
            >
              {categories.length === 0 && <option value="">Loading categories...</option>}
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} style={{ color: "black" }}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="imageUrl" style={{ fontWeight: 600 }}>Image URL</label>
            <input 
              type="url" 
              id="imageUrl" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange}
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "rgba(0,0,0,0.2)", color: "white" }}
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="description" style={{ fontWeight: 600 }}>Description</label>
            <textarea 
              id="description" 
              name="description" 
              rows={4}
              value={formData.description} 
              onChange={handleChange}
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "rgba(0,0,0,0.2)", color: "white", resize: "vertical" }}
              placeholder="Describe the product..."
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
            style={{ marginTop: "1rem", padding: "1rem", fontSize: "1.1rem" }}
          >
            {isLoading ? "Adding Product..." : "Add Product to Store"}
          </button>
        </form>
      </div>
    </div>
  );
}
