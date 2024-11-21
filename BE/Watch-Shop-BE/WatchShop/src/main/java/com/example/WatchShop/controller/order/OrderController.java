package com.example.WatchShop.controller.order;

import com.example.WatchShop.model.Orders;
import com.example.WatchShop.model.dto.req.OrderReqDTO;
import com.example.WatchShop.model.dto.res.OrderDetailResDTO;
import com.example.WatchShop.model.dto.res.OrderResDTO;
import com.example.WatchShop.service.i_service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/order")
@RequiredArgsConstructor
@Slf4j
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/")
    public ResponseEntity<?> getOrder(HttpServletRequest request) {
        log.info("getOrder");
        List<OrderResDTO> orderResDTOList = orderService.getAllOrder(request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", orderResDTOList));
    }

    @GetMapping("/order-detail/{id}")
    public ResponseEntity<?> getOrderDetailByOrderId(@PathVariable("id") Long id) {
        log.info("getOrderDetailByOrderId");
        List<OrderDetailResDTO> orderDetailResDTOList = orderService.getOrderDetailByOrderId(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", orderDetailResDTOList));
    }

    @PostMapping("/")
    public ResponseEntity<?> addToOrder(@RequestBody OrderReqDTO orderReqDTO) {
        log.info("addToOrder");
        orderService.addToOrder(orderReqDTO);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Insert Successfully");
    }

    @PutMapping("/")
    public ResponseEntity<?> updateOrder(@RequestBody OrderReqDTO orderReqDTO) {
        log.info("updateOrder");
        Optional<Orders> orderOptional = orderService.getOrderById(orderReqDTO.getOrderId());
        if (orderOptional.isPresent()) {
            Orders orders = orderOptional.get();
            orders.setStatus(orderReqDTO.getStatus());
            orderService.save(orders);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Update Status Successfully");
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .build();
        }
    }
}
