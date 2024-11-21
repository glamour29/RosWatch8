package com.example.WatchShop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "name", columnDefinition = "nvarchar(255)", unique = true)
    private String name;
    private Double price;
    private Double discount;
    @Column(columnDefinition = "nvarchar(1000)")
    private String description;
    private Integer quantity;
    private Integer soldQuantity = 0;
    @Column(columnDefinition = "nvarchar(255)")
    private String model;
    @Column(columnDefinition = "nvarchar(255)")
    private String color;
    @Column(columnDefinition = "nvarchar(255)")
    private String origin;
    private Integer warrantyPeriod;
    private Double screenSize;
    private Double faceSize;
    @Column(columnDefinition = "nvarchar(255)")
    private String faceMaterial;
    @Column(columnDefinition = "nvarchar(255)")
    private String frameMaterial;
    @Column(columnDefinition = "nvarchar(255)")
    private String wireMaterial;
    private Double productWeight;
    private Date createDate;
    private Date updateDate;
    @ManyToOne
    @JoinColumn(name = "idBrand")
    private Brands brands;

    @OneToMany(mappedBy = "products", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Images> images;

    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<CartDetail> cartDetails;
}
