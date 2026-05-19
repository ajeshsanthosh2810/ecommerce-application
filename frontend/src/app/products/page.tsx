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
      <h1 style={{ marginBottom: "2rem" }}>All Products</h1>
      
      <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", overflowX: "auto", paddingBottom: "1rem" }}>
        <button 
          className={`btn ${selectedCategory === null ? 'btn-primary' : ''}`}
          style={{ 
            background: selectedCategory === null ? 'var(--primary)' : 'var(--card-bg)',
            border: "1px solid var(--border-color)",
            whiteSpace: "nowrap"
          }}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className={`btn ${selectedCategory === category.id ? 'btn-primary' : ''}`}
            style={{ 
              background: selectedCategory === category.id ? 'var(--primary)' : 'var(--card-bg)',
              border: "1px solid var(--border-color)",
              whiteSpace: "nowrap"
            }}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>Loading...</div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
          gap: "2rem" 
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", color: "var(--border-color)" }}>
              No products found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
