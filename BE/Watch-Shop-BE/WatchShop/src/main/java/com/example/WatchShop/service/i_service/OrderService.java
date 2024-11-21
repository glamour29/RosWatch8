package com.example.WatchShop.service.i_service;

import com.example.WatchShop.model.Orders;
import com.example.WatchShop.model.dto.req.OrderReqDTO;
import com.example.WatchShop.model.dto.res.OrderDetailResDTO;
import com.example.WatchShop.model.dto.res.OrderResDTO;
import com.example.WatchShop.model.dto.res.UserResDTO;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    Orders save(Orders orders);

    Optional<Orders> getOrderById(Long id);

    List<UserResDTO> get5BestSellers();

    List<Double> statisticalByMonthAndYear(int month, int year);

    double statisticalByMonthAndYear(int year);

    List<OrderResDTO> getAllOrder(HttpServletRequest request);

    List<OrderDetailResDTO> getOrderDetailByOrderId(Long id);

    void addToOrder(OrderReqDTO orderReqDTO);
}
