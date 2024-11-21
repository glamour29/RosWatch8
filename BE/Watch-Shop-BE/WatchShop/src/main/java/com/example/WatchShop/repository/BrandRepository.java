package com.example.WatchShop.repository;

import com.example.WatchShop.model.Brands;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brands, Long> {
    void removeById(Long id);
}
