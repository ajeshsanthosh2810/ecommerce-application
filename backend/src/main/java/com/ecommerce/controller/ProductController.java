package com.ecommerce.controller;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {

    private final ProductService service;

    @GetMapping
    public List<ProductDTO> getProducts() {
        return service.getProducts();
    }
    
    @GetMapping("/{id}")
    public ProductDTO getProductById(@PathVariable String id) {
        return service.getProductById(id);
    }

    @PostMapping
    public ProductDTO create(@RequestBody ProductDTO productDTO) {
        return service.create(productDTO);
    }
}
