package com.example.WatchShop.model.dto.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductReqDTO {
    private Long id;
    private String name;
    private Double price;
    private Double discount;
    private String description;
    private Integer quantity;
    private Integer soldQuantity = 0;
    private String model;
    private String color;
    private String origin;
    private Integer warrantyPeriod;
    private Double screenSize;
    private Double faceSize;
    private String faceMaterial;
    private String frameMaterial;
    private String wireMaterial;
    private Double productWeight;
    private Date createDate;
    private Date updateDate;
    private Long idBrand;
    private MultipartFile images;
}
