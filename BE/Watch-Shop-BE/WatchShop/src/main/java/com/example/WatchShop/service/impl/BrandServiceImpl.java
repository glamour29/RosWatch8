package com.example.WatchShop.service.impl;

import com.example.WatchShop.model.Brands;
import com.example.WatchShop.model.dto.req.BrandReqDTO;
import com.example.WatchShop.repository.BrandRepository;
import com.example.WatchShop.service.i_service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    @Override
    public List<Brands> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Map<String, String> save(BrandReqDTO brand) {
        Calendar calendar = Calendar.getInstance();
        Brands brands = new Brands();
        brands.setName(brand.getName());
        brands.setCreateDate(new Date(calendar.getTime().getTime()));
        brandRepository.save(brands);

        return Map.of("status", "success",
                "data", "Brand added successfully!");
    }

    @Override
    public Map<String, String> save(Long id, BrandReqDTO brands) {
        Calendar calendar = Calendar.getInstance();
        Brands brands1 = brandRepository.findById(id).get();
        brands1.setName(brands.getName());
        brands1.setUpdateDate(new Date(calendar.getTime().getTime()));
        brandRepository.save(brands1);

        return Map.of("status", "success",
                "data", "Brand updated successfully!");
    }
}
