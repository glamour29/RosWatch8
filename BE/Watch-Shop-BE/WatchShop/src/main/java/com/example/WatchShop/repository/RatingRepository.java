package com.example.WatchShop.repository;

import com.example.WatchShop.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findByUsersIdAndProductsId(Long userId, Long productId);
}
