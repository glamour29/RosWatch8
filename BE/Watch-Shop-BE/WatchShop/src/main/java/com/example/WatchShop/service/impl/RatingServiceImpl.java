package com.example.WatchShop.service.impl;

import com.example.WatchShop.model.Rating;
import com.example.WatchShop.model.dto.req.RatingReqDTO;
import com.example.WatchShop.repository.ProductRepository;
import com.example.WatchShop.repository.RatingRepository;
import com.example.WatchShop.repository.UsersRepository;
import com.example.WatchShop.service.i_service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;
    private final ProductRepository productRepository;
    private final UsersRepository usersRepository;

    @Override
    public Rating getRatingByUserIdAndProductId(Long idUser, Long idProduct) {
        return ratingRepository.findByUsersIdAndProductsId(idUser, idProduct);
    }

    @Override
    public Double getStarOfProduct(Long idProduct) {
        return ratingRepository
                .findAll()
                .stream()
                .filter(r -> r.getProducts().getId() == idProduct)
                .map(Rating::getStar)
                .collect(Collectors.averagingDouble(Double::doubleValue));
    }

    @Override
    public RatingReqDTO rate(RatingReqDTO ratingReqDTO) {
        Rating rating = ratingRepository.findByUsersIdAndProductsId(ratingReqDTO.getUserID(), ratingReqDTO.getProductID());
        if (rating != null) {
            rating.setStar(ratingReqDTO.getStar());
            return new RatingReqDTO(ratingRepository.save(rating));
        } else {
            Rating newRating = new Rating();
            newRating.setUsers(usersRepository.findById(ratingReqDTO.getUserID()).get());
            newRating.setProducts(productRepository.findById(ratingReqDTO.getProductID()).get());
            newRating.setStar(ratingReqDTO.getStar());
            return new RatingReqDTO(ratingRepository.save(newRating));
        }
    }

    @Override
    public List<Rating> findAllRating() {
        return ratingRepository.findAll();
    }
}
