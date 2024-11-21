package com.example.WatchShop.model.dto.res;

import com.example.WatchShop.model.Rating;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingResDTO {
    private long id;
    private Double star;
    private Date createDate;
    private Date updateDate;
    private String userName;
    private String productName;

    public RatingResDTO(Rating rating) {
        this.id = rating.getId();
        this.star = rating.getStar();
        this.createDate = rating.getCreateDate();
        this.updateDate = rating.getUpdateDate();
        this.userName = rating.getUsers().getFullName();
        this.productName = rating.getProducts().getName();
    }
}
