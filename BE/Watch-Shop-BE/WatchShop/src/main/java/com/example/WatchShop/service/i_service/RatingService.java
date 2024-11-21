package com.example.WatchShop.service.i_service;

import com.example.WatchShop.model.Rating;
import com.example.WatchShop.model.dto.req.RatingReqDTO;

import java.util.List;

public interface RatingService {
    Rating getRatingByUserIdAndProductId(Long idUser, Long idProduct);

    Double getStarOfProduct(Long idProduct);

    RatingReqDTO rate(RatingReqDTO ratingReqDTO);

    List<Rating> findAllRating();
}
