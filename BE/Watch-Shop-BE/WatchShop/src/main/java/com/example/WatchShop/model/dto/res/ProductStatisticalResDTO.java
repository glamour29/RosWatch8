package com.example.WatchShop.model.dto.res;

import com.example.WatchShop.model.Products;
import com.example.WatchShop.model.Rating;
import lombok.Data;

@Data
public class ProductStatisticalResDTO {
    private String productName;
    private Integer quantitySold;
    private Double star;

    public ProductStatisticalResDTO(Products products) {
        this.productName = products.getName();
        this.quantitySold = products.getSoldQuantity();
    }

    public ProductStatisticalResDTO(Rating rating) {
        this.productName = rating.getProducts().getName();
        this.star = rating.getStar();
    }
}
