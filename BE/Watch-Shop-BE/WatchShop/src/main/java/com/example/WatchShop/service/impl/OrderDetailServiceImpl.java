package com.example.WatchShop.service.impl;

import com.example.WatchShop.model.OrderDetail;
import com.example.WatchShop.repository.OrderDetailRepository;
import com.example.WatchShop.service.i_service.OrderDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;

    @Override
    public OrderDetail save(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }
}
