package com.example.WatchShop.model.dto.req;

import com.example.WatchShop.model.CartDetail;
import com.example.WatchShop.model.Products;
import lombok.Data;

import java.sql.Date;

@Data
public class CartDetailResDTO {
    private long id;
    private int quantity;
    private Date createDate;
    private Date updateDate;
    private Products products;
    private Long cartId;

    public CartDetailResDTO(CartDetail cartDetail) {
        this.id = cartDetail.getId();
        this.quantity = cartDetail.getQuantity();
        this.createDate = cartDetail.getCreateDate();
        this.updateDate = cartDetail.getUpdateDate();
        this.cartId = cartDetail.getCarts().getId();
        this.products = cartDetail.getProducts();
    }
}
