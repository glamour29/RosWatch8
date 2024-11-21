package com.example.WatchShop.model.dto.res;

import com.example.WatchShop.model.Images;
import com.example.WatchShop.model.Products;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResDTO {
    private long id;
    private String name;
    private Double price;
    private Double star;
    private List<String> imageSource;

    public ProductResDTO(Products product) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.imageSource = product
                .getImages()
                .stream()
                .map(Images::getSource)
                .toList();
    }
}
