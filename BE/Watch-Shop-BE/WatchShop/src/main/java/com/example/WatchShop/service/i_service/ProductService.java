package com.example.WatchShop.service.i_service;

import com.example.WatchShop.model.Products;
import com.example.WatchShop.model.dto.req.ProductReqDTO;
import com.example.WatchShop.model.dto.res.ProductDetailResDTO;

import java.util.List;

public interface ProductService {
    ProductDetailResDTO getProductById(Long id);

    int save(ProductReqDTO products);

    Products save(Products products);

    boolean removeProduct(Long id);

    List<ProductDetailResDTO> getAllProduct(Long brandID);

    List<ProductDetailResDTO> getTop5Product();
}
