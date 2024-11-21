package com.example.WatchShop.model.dto.req;

import lombok.Data;

@Data
public class CartReqDTO {
    private Long userId;
    private Long productId;
    private Integer amount;
}
