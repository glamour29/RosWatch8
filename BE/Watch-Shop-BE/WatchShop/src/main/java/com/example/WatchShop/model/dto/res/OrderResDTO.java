package com.example.WatchShop.model.dto.res;

import com.example.WatchShop.model.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResDTO {
    private long id;
    private String username;
    private String address;
    private String status;
    private String orderCode;
    private double totalAmount;
    private Date createDate;

    public OrderResDTO(Orders orders) {
        this.id = orders.getId();
        this.username = orders.getUsers().getFullName();
        this.address = orders.getUsers().getAddress();
        this.status = orders.getStatus();
        this.orderCode = orders.getOrderCode();
        this.totalAmount = orders.getTotal();
        this.createDate = orders.getCreateDate();
    }
}
