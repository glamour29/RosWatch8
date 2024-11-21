package com.example.WatchShop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Date date;
    private String status;
    private Double total;
    private String orderCode;
    private Date createDate;
    private Date updateDate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users users;


    @OneToMany(mappedBy = "orders")
    @JsonBackReference
    private List<OrderDetail> orderDetails;
}
