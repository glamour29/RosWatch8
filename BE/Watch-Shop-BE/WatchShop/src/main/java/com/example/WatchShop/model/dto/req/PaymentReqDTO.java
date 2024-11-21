package com.example.WatchShop.model.dto.req;

import lombok.Data;

@Data
public class PaymentReqDTO {
    private long total;
    private String urlReturn;
}
