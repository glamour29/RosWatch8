package com.example.WatchShop.model.dto.res;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Response1Form {
    private UserResDTO users;
    private long quantity;
}
