package com.example.WatchShop.controller.product;

import com.example.WatchShop.model.dto.req.ProductReqDTO;
import com.example.WatchShop.model.dto.res.ProductDetailResDTO;
import com.example.WatchShop.service.i_service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/product")
@RequiredArgsConstructor
@Slf4j
public class ProductController {
    private final ProductService productService;

    @GetMapping("/")
    ResponseEntity<?> getAllProduct(@RequestParam(value = "brandId", required = false) Long brandID) {
        log.info("getAllProduct");
        List<ProductDetailResDTO> productDetailResDTOS = productService.getAllProduct(brandID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", productDetailResDTOS));
    }

    @GetMapping("/top5")
    ResponseEntity<?> getTop5Product() {
        log.info("getTop5Product");
        List<ProductDetailResDTO> productDetailResDTOS = productService.getTop5Product();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", productDetailResDTOS));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") Long id) {
        log.info("getProductById");
        ProductDetailResDTO productDetailResDTO = productService.getProductById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productDetailResDTO);
    }

    @PostMapping("/")
    public ResponseEntity<?> addProduct(@ModelAttribute ProductReqDTO products) {
        log.info("addProduct");
        int status = productService.save(products);
        if (status == 1) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
        if (status == 2) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .build();
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
        log.info("deleteProduct");
        if (!productService.removeProduct(id)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success"));
    }
}
