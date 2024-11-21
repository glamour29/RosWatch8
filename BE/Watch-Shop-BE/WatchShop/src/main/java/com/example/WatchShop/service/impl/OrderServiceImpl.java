package com.example.WatchShop.service.impl;

import com.example.WatchShop.model.*;
import com.example.WatchShop.model.dto.req.OrderReqDTO;
import com.example.WatchShop.model.dto.res.OrderDetailResDTO;
import com.example.WatchShop.model.dto.res.OrderResDTO;
import com.example.WatchShop.model.dto.res.UserResDTO;
import com.example.WatchShop.repository.CartRepository;
import com.example.WatchShop.repository.OrderDetailRepository;
import com.example.WatchShop.repository.OrderRepository;
import com.example.WatchShop.repository.ProductRepository;
import com.example.WatchShop.service.i_service.OrderService;
import com.example.WatchShop.service.i_service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.YearMonth;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final UserService userService;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    private static OrderDetailResDTO getOrderDetailResDTO(OrderDetail orderDetail) {
        OrderDetailResDTO orderDetailResDTO = new OrderDetailResDTO();
        orderDetailResDTO.setId(orderDetail.getId());
        orderDetailResDTO.setQuantity(orderDetail.getQuantity());
        orderDetailResDTO.setProducts(orderDetail.getProducts());
        orderDetailResDTO.setPrice(orderDetail.getProducts().getPrice());
        orderDetailResDTO.setCreateDate(orderDetail.getCreateDate());
        orderDetailResDTO.setUserId(orderDetail.getOrders().getUsers().getId());
        return orderDetailResDTO;
    }

    @Override
    public Orders save(Orders orders) {
        return orderRepository.save(orders);
    }

    @Override
    public Optional<Orders> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public List<UserResDTO> get5BestSellers() {
        List<Orders> allOrders = orderRepository.findAll();
        List<OrderDetail> orderDetails;
        Map<Long, Double> totalMoneyPaidByUser = new HashMap<>();
        Double totalMoney;
        Long userID;

        for (Orders allOrder : allOrders) {
            userID = allOrder.getUsers().getId();
            orderDetails = allOrder.getOrderDetails();
            totalMoney = orderDetails
                    .stream()
                    .map(x -> x.getProducts().getPrice())
                    .mapToDouble(Double::doubleValue)
                    .sum();

            if (totalMoneyPaidByUser.containsKey(userID)) {
                Double paidMoney = totalMoneyPaidByUser.get(userID);
                totalMoneyPaidByUser.put(userID, paidMoney + totalMoney);
            } else {
                totalMoneyPaidByUser.put(userID, totalMoney);
            }
        }

        List<Long> userIds = totalMoneyPaidByUser
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue())
                .limit(5)
                .map(Map.Entry::getKey)
                .toList();

        return userIds
                .stream()
                .map(x -> userService.getUserById(x).get())
                .map(UserResDTO::new)
                .toList();
    }

    @Override
    public List<Double> statisticalByMonthAndYear(int month, int year) {
        int daysInMonth = YearMonth.of(year, month).lengthOfMonth();
        List<Double> response3Forms = new ArrayList<>();
        List<Map<String, Object>> results = orderRepository.statistical(year, month);

        // create days of the month
        for (int i = 0; i < daysInMonth; i++) {
            response3Forms.add(0.0);
        }

        for (Map<String, Object> result : results) {
            Date orderDate = (Date) result.get("create_date");
            double total = (double) result.get("total");

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(orderDate);

            int date = calendar.get(Calendar.DAY_OF_MONTH);
            int index = date - 1;
            double newTotalPrice = response3Forms.get(index) + total;
            response3Forms.set(index, newTotalPrice);
        }

        return response3Forms;
    }

    @Override
    public double statisticalByMonthAndYear(int year) {
        try {
            return orderRepository.statistical(year);
        } catch (Exception e) {
            return 0;
        }
    }

    @Override
    public List<OrderResDTO> getAllOrder(HttpServletRequest request) {
        Users user = userService.getUserFromRequest(request).get();
        List<Orders> ordersList = null;

        if ("ROLE_USER".equals(user.getRoles().getName())) {
            ordersList = new ArrayList<>(user.getOrders());
        } else {
            ordersList = orderRepository.findAll();
        }

        List<OrderResDTO> orderResDTOList = new ArrayList<>();
        for (Orders orders : ordersList) {
            OrderResDTO orderResDTO = new OrderResDTO(orders);
            orderResDTOList.add(orderResDTO);
        }
        return orderResDTOList;
    }

    @Override
    public List<OrderDetailResDTO> getOrderDetailByOrderId(Long id) {
        Optional<Orders> ordersOptional = orderRepository.findById(id);

        if (ordersOptional.isEmpty()) {
            return null;
        }

        Orders orders = ordersOptional.get();
        List<OrderDetail> orderDetails = orders.getOrderDetails();
        List<OrderDetailResDTO> orderDetailResDTOList = new ArrayList<>();
        for (OrderDetail orderDetail : orderDetails) {
            OrderDetailResDTO orderDetailResDTO = getOrderDetailResDTO(orderDetail);
            orderDetailResDTOList.add(orderDetailResDTO);
        }

        return orderDetailResDTOList;
    }

    @Override
    public void addToOrder(OrderReqDTO orderReqDTO) {
        Users user = userService.getUserById(orderReqDTO.getUserId()).get();
        Optional<Carts> cart = cartRepository.findByUsers(user);
        // tao order tu cart
        Orders orders = new Orders();
        orders.setDate(new java.sql.Date(new java.util.Date().getTime()));

        // Create HD + Date
        orders.setOrderCode("HD" + new java.util.Date().getTime());
        orders.setStatus(orderReqDTO.getStatus());
        orders.setTotal(orderReqDTO.getTotal());
        orders.setUsers(user);
        orders.setCreateDate(new java.sql.Date(new java.util.Date().getTime()));
        Orders orders1 = orderRepository.save(orders);
        List<CartDetail> cartDetails = null;

        if (cart.isPresent()) {
            cartDetails = cart.get().getCartDetails();
        } else {
            cartDetails = new ArrayList<>();
        }

        OrderDetail orderDetail;
        for (CartDetail cartDetail : cartDetails) {
            orderDetail = new OrderDetail();
            orderDetail.setOrders(orders1);
            orderDetail.setProducts(cartDetail.getProducts());
            orderDetail.setQuantity(cartDetail.getQuantity());
            orderDetailRepository.save(orderDetail);
            // Tăng soldQuantity và giảm quantity của sản phẩm
            Products product = cartDetail.getProducts();
            product.setSoldQuantity(product.getSoldQuantity() + cartDetail.getQuantity());
            product.setQuantity(product.getQuantity() - cartDetail.getQuantity());
            productRepository.save(product);
        }
    }
}
