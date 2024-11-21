package com.example.WatchShop.service.i_service;

import com.example.WatchShop.model.dto.req.CartDetailResDTO;
import com.example.WatchShop.model.dto.req.CartReqDTO;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface CartService {

    List<CartDetailResDTO> getcartDetail(HttpServletRequest request);

    void removeAllProductInCart(Long idUser);

    CartDetailResDTO deleteFromCart(CartReqDTO cartReqDTO);
}
