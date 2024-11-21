package com.example.WatchShop.controller.brand;

import com.example.WatchShop.model.Brands;
import com.example.WatchShop.model.dto.req.BrandReqDTO;
import com.example.WatchShop.service.i_service.BrandService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/brands")
@RequiredArgsConstructor
@Slf4j
public class BrandController {
    private final BrandService brandService;

    @GetMapping("/")
    public ResponseEntity<?> getAllBrand() {
        log.info("getAllBrand");
        List<Brands> brandsList = brandService.getAllBrands();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", brandsList));
    }

    @PostMapping("/")
    public ResponseEntity<?> addBrand(@RequestBody BrandReqDTO brand) {
        log.info("addBrand");
        Map<String, String> result = brandService.save(brand);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBrand(@PathVariable("id") Long id, @RequestBody BrandReqDTO brands) {
        log.info("updateBrand");
        Map<String, String> result = brandService.save(id, brands);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }
}
