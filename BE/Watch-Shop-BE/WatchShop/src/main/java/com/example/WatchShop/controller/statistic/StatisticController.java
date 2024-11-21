package com.example.WatchShop.controller.statistic;

import com.example.WatchShop.model.Rating;
import com.example.WatchShop.model.dto.res.ProductStatisticalResDTO;
import com.example.WatchShop.model.dto.res.Response1Form;
import com.example.WatchShop.model.dto.res.UserResDTO;
import com.example.WatchShop.repository.ProductRepository;
import com.example.WatchShop.service.i_service.OrderService;
import com.example.WatchShop.service.i_service.RatingService;
import com.example.WatchShop.service.i_service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/statistical")
@RequiredArgsConstructor
@Slf4j
public class StatisticController {
    private final ProductRepository productRepository;
    private final OrderService orderService;
    private final UserService userService;
    private final RatingService ratingService;

    @GetMapping("/top-5-best-sellers")
    public ResponseEntity<?> get5BestSellers() {
        log.info("get5BestSellers");
        List<ProductStatisticalResDTO> bestSellers = productRepository
                .findAll()
                .stream()
                .filter(products -> products.getSoldQuantity() > 0)
                .map(ProductStatisticalResDTO::new)
                .sorted(Comparator.comparing(ProductStatisticalResDTO::getQuantitySold, Comparator.reverseOrder()))
                .limit(5)
                .toList();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", bestSellers));
    }

    @GetMapping("/top-5-best-customers")
    public ResponseEntity<?> get5BestCustomer() {
        log.info("get5BestCustomer");
        List<UserResDTO> bestCustomers = orderService.get5BestSellers();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", bestCustomers));
    }

    @GetMapping(path = "/{month}/{year}")
    public ResponseEntity<List<Double>> statistical(@PathVariable(name = "month") int month, @PathVariable(name = "year") int year) {
        log.info("statistical");
        List<Double> statistical = orderService.statisticalByMonthAndYear(month, year);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(statistical);
    }

    @GetMapping(path = "/top-buy-the-most")
    public ResponseEntity<List<Response1Form>> getTopBuyTheMost() {
        log.info("getTopBuyTheMost");
        List<Response1Form> result = userService.topUserBuyTheMost(5);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }

    @GetMapping(path = "/year/{year}")
    public ResponseEntity<Double> statistical(@PathVariable(name = "year") int year) {
        log.info("statistical");
        double statistical = orderService.statisticalByMonthAndYear(year);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(statistical);
    }

    @GetMapping(path = "/best-rating")
    public ResponseEntity<List<ProductStatisticalResDTO>> getTopBestRating() {
        log.info("getTopBestRating");
        List<ProductStatisticalResDTO> ratings = ratingService
                .findAllRating()
                .stream()
                .sorted(Comparator.comparing(Rating::getStar, Comparator.reverseOrder()))
                .limit(5)
                .map(ProductStatisticalResDTO::new)
                .toList();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ratings);
    }
}
