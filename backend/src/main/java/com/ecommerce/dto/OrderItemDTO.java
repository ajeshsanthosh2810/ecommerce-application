package com.ecommerce.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItemDTO {
    private String productId;
    private Integer quantity;
    private BigDecimal priceAtTimeOfOrder;
}
