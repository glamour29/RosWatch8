package com.example.WatchShop.repository;

import com.example.WatchShop.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    String TOP_USER_BUY_THE_MOST = "SELECT TOP(:top) od.user_id, SUM(dt.quantity) as quantity " +
            "FROM orders od " +
            "INNER JOIN order_detail dt ON dt.id_order = od.id " +
            "INNER JOIN users us ON us.id = od.user_id " +
            "GROUP BY od.user_id " +
            "ORDER BY quantity DESC";

    Optional<Users> findByEmail(String email);

    //check email in DB
    boolean existsByEmail(String email);

    @Query(value = TOP_USER_BUY_THE_MOST, nativeQuery = true)
    List<Map<String, Object>> topUserBuyTheMost(@Param("top") int top);
}