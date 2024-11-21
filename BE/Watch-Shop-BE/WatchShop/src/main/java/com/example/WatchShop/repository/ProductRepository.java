package com.example.WatchShop.repository;

import com.example.WatchShop.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long> {
    List<Products> findAllByBrandsId(Long brandId);

    int countByName(String name);
}
