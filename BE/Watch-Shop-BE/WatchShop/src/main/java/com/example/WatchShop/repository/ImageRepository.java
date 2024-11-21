package com.example.WatchShop.repository;

import com.example.WatchShop.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Images, Long> {
    Images findBySource(String source);
}
