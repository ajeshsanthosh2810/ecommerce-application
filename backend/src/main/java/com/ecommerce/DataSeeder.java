package com.ecommerce;

import com.ecommerce.entity.Category;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            Category electronics = new Category(null, "Electronics", "Gadgets and Devices", "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
            Category clothing = new Category(null, "Clothing", "Apparel and Fashion", "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
            categoryRepository.saveAll(List.of(electronics, clothing));

            if (productRepository.count() == 0) {
                Product p1 = new Product(null, "Premium Wireless Headphones", "Noise-cancelling over-ear headphones with 30-hour battery life.", new BigDecimal("299.99"), 50, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", electronics);
                Product p2 = new Product(null, "Smartphone Pro Max", "Latest 5G smartphone with advanced camera system.", new BigDecimal("1099.00"), 30, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", electronics);
                Product p3 = new Product(null, "Classic Leather Jacket", "Genuine leather jacket with a timeless design.", new BigDecimal("199.50"), 20, "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", clothing);
                Product p4 = new Product(null, "Minimalist Watch", "Elegant timepiece with leather strap.", new BigDecimal("149.99"), 100, "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", electronics);
                
                productRepository.saveAll(List.of(p1, p2, p3, p4));
            }
        }
    }
}
