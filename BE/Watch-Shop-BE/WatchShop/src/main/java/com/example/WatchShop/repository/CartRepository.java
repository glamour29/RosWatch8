package com.example.WatchShop.repository;

import com.example.WatchShop.model.Carts;
import com.example.WatchShop.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Carts, Long> {
    Carts findByUsersId(Long id);

    Optional<Carts> findByUsers(Users users);
}
