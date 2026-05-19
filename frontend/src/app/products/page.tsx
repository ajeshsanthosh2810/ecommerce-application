"use client";

import { useEffect, useState } from "react";
import { api } from "../../services/api";
import ProductCard from "../../components/product/ProductCard";
import { Product, Category } from "../../types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories")
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.categoryId === selectedCategory)
    : products;

  return (
    <div className="container animate-fade-in" style={{ padding: "4rem 1.5rem" }}>
      <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "2rem", marginBottom: "3rem" }}>
        <h1 style={{ margin: 0 }}>Product Index</h1>
        <p style={{ marginTop: "0.5rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Query results from the database</p>
      </div>
      
      <div style={{ display: "flex", gap: "1rem", marginBottom: "4rem", overflowX: "auto", paddingBottom: "1rem" }}>
        <button 
          className="btn"
          style={{ 
            background: selectedCategory === null ? 'var(--primary)' : 'transparent',
            color: selectedCategory === null ? 'var(--background)' : 'var(--primary)',
          }}
          onClick={() => setSelectedCategory(null)}
        >
          All Classes
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className="btn"
            style={{ 
              background: selectedCategory === category.id ? 'var(--primary)' : 'transparent',
              color: selectedCategory === category.id ? 'var(--background)' : 'var(--primary)',
            }}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>&gt; Executing query...</div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "2rem" 
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="panel" style={{ gridColumn: "1 / -1", padding: "4rem", textAlign: "center", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
              &gt; 0 records found for this parameter.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
