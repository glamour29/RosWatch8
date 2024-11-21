package com.example.WatchShop.model.dto.req;

import com.example.WatchShop.model.Rating;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingReqDTO {
    private Long userID;
    private Long productID;
    private Double star;

    public RatingReqDTO(Rating rating) {
        this.userID = rating.getUsers().getId();
        this.productID = rating.getProducts().getId();
        this.star = rating.getStar();
    }
}
