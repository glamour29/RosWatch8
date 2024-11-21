package com.example.WatchShop.repository;

import com.example.WatchShop.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    String STATISTICAL = "SELECT od.create_date, dt.quantity * b.price AS total " +
            "FROM orders od " +
            "INNER JOIN order_detail dt ON dt.id_order = od.id " +
            "INNER JOIN products b ON b.id = dt.id_product " +
            "WHERE od.status = 'accepted' AND month(od.create_date) = :month AND year(od.create_date) = :year";
    String TOP_USER_BUY_THE_MOST = "SELECT TOP(:top) od.user_id, SUM(dt.quantity) as quantity " +
            "FROM orders od " +
            "INNER JOIN order_detail dt ON dt.id_order = od.id " +
            "INNER JOIN users us ON us.id = od.user_id " +
            "GROUP BY od.user_id " +
            "ORDER BY quantity DESC";
    String STATISTICAL_YEAR = "SELECT SUM(dt.quantity * b.price) AS total " +
            "FROM orders od " +
            "INNER JOIN order_detail dt ON dt.id_order = od.id " +
            "INNER JOIN products b ON b.id = dt.id_product " +
            "WHERE od.status = 'accepted' AND year(od.create_date) = :year";

    Orders findByUsersId(Long id);

    @Query(value = STATISTICAL, nativeQuery = true)
    List<Map<String, Object>> statistical(@Param("year") int year, @Param("month") int month);

    @Query(value = TOP_USER_BUY_THE_MOST, nativeQuery = true)
    List<Map<String, Long>> topUserBuyTheMost(@Param("top") int top);

    @Query(value = STATISTICAL_YEAR, nativeQuery = true)
    double statistical(@Param("year") int year);
}
