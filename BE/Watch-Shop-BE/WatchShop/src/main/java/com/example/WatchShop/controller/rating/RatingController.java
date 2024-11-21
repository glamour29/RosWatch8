package com.example.WatchShop.controller.rating;

import com.example.WatchShop.model.Rating;
import com.example.WatchShop.model.dto.req.RatingReqDTO;
import com.example.WatchShop.model.dto.res.RatingResDTO;
import com.example.WatchShop.service.i_service.RatingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/rating")
@RequiredArgsConstructor
@Slf4j
public class RatingController {
    private final RatingService ratingService;

    @GetMapping("/")
    ResponseEntity<?> getRating(@RequestParam("userId") Long userId, @RequestParam("productId") Long productId) {
        log.info("getRating");
        Rating rating = ratingService.getRatingByUserIdAndProductId(userId, productId);
        if (rating != null) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Map.of("status", "success",
                            "data", new RatingResDTO(rating)));
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "failed",
                        "data", new RatingResDTO()));
    }

    @PutMapping("/")
    ResponseEntity<?> getRating(@RequestBody RatingReqDTO ratingReqDTO) {
        log.info("getRating");
        RatingReqDTO rate = ratingService.rate(ratingReqDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", rate));
    }
}
