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
      setMessage({ text: "Success: Record inserted into database.", type: "success" });
      
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
      setMessage({ text: "Error: Write operation failed.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: "4rem 1.5rem", maxWidth: "800px" }}>
      <h1 style={{ marginBottom: "2rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
        System Administration
      </h1>
      
      <div className="panel" style={{ padding: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Input New Product</h2>

        {message && (
          <div style={{ 
            padding: "1rem", 
            marginBottom: "2rem", 
            border: `1px solid ${message.type === "success" ? "var(--success)" : "var(--danger)"}`,
            color: message.type === "success" ? "var(--success)" : "var(--danger)",
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase"
          }}>
            &gt; {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="name" style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Product Name [String]</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange}
              style={{ padding: "1rem" }}
            />
          </div>

          <div style={{ display: "flex", gap: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
              <label htmlFor="price" style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Price [Float]</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                required 
                min="0" 
                step="0.01"
                value={formData.price} 
                onChange={handleChange}
                style={{ padding: "1rem" }}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
              <label htmlFor="stock" style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Stock [Integer]</label>
              <input 
                type="number" 
                id="stock" 
                name="stock" 
                required 
                min="0"
                value={formData.stock} 
                onChange={handleChange}
                style={{ padding: "1rem" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="categoryId" style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Category [UUID]</label>
            <select 
              id="categoryId" 
              name="categoryId" 
              value={formData.categoryId} 
              onChange={handleChange}
              style={{ padding: "1rem", appearance: "none" }}
            >
              {categories.length === 0 && <option value="">Loading categories...</option>}
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} style={{ color: "black" }}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="imageUrl" style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Image [URL]</label>
            <input 
              type="url" 
              id="imageUrl" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange}
              style={{ padding: "1rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="description" style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Description [Text]</label>
            <textarea 
              id="description" 
              name="description" 
              rows={4}
              value={formData.description} 
              onChange={handleChange}
              style={{ padding: "1rem", resize: "vertical" }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
            style={{ marginTop: "1rem", padding: "1.25rem", fontSize: "1.1rem" }}
          >
            {isLoading ? "Executing Insert..." : "Execute Insert"}
          </button>
        </form>
      </div>
    </div>
  );
}
