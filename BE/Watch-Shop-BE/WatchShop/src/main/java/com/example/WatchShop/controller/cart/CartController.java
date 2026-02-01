package com.example.WatchShop.controller.cart;

import com.example.WatchShop.model.dto.req.CartDetailResDTO;
import com.example.WatchShop.model.dto.req.CartReqDTO;
import com.example.WatchShop.service.i_service.CartDetailService;
import com.example.WatchShop.service.i_service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {
    private final CartService cartService;
    private final CartDetailService cartDetailService;

    @GetMapping("/")
    public ResponseEntity<?> getCarts(HttpServletRequest request) {
        log.info("getCarts");
        List<CartDetailResDTO> cartDetailResDTOS = cartService.getcartDetail(request);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of(
                        "status", "success",
                        // Map.of không chấp nhận value null, nên đảm bảo luôn trả về list (rỗng nếu không có item)
                        "data", cartDetailResDTOS != null ? cartDetailResDTOS : List.of()
                ));
    }

    @PostMapping("/")
    public ResponseEntity<?> addToCart(@Valid @RequestBody CartReqDTO cartReqDTO) {
        log.info("addToCart");
        CartDetailResDTO savedCartDetail = cartDetailService.addToCart(cartReqDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", savedCartDetail));
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteFromCart(@Valid @RequestBody CartReqDTO cartReqDTO) {
        log.info("deleteFromCart");
        CartDetailResDTO cartDetailResDTO = cartService.deleteFromCart(cartReqDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", cartDetailResDTO));
    }

    @DeleteMapping("/all/{idUser}")
    public ResponseEntity<?> deleteAllProductInCart(@PathVariable Long idUser) {
        log.info("deleteAllProductInCart");
        cartService.removeAllProductInCart(idUser);

        return ResponseEntity
                .status(HttpStatus.OK)
                .build();
    }
}
