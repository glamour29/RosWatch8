package com.example.WatchShop.service.i_service;

import com.example.WatchShop.model.Brands;
import com.example.WatchShop.model.dto.req.BrandReqDTO;

import java.util.List;
import java.util.Map;

public interface BrandService {
    List<Brands> getAllBrands();

    Map<String, String> save(BrandReqDTO brands);

    Map<String, String> save(Long id, BrandReqDTO brands);
}
