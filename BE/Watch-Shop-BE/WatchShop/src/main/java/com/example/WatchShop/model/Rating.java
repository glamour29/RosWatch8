package com.example.WatchShop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Double star;
    private Date createDate;
    private Date updateDate;

    @OneToOne
    @JoinColumn(name = "idUser")
    private Users users;

    @OneToOne
    @JoinColumn(name = "idProduct")
    private Products products;
}
