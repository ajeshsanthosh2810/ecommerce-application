package com.ecommerce.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateOrderRequest {
    private String customerName;
    private String customerEmail;
    private String shippingAddress;
    private List<OrderItemRequest> items;
}
