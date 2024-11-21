package com.example.WatchShop.model.dto.req;

import lombok.Data;

@Data
public class OrderReqDTO {
    private Long orderId;
    private Long userId;
    private Long cartId;
    private String status;
    private int quantity;
    private Double total;
    private String orderCode;
}
