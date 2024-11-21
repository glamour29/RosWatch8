package com.example.WatchShop.service.i_service;

import com.example.WatchShop.model.CartDetail;
import com.example.WatchShop.model.dto.req.CartDetailResDTO;
import com.example.WatchShop.model.dto.req.CartReqDTO;

public interface CartDetailService {
    CartDetail save(CartDetail cartDetail);

    CartDetailResDTO addToCart(CartReqDTO cartReqDTO);
}
