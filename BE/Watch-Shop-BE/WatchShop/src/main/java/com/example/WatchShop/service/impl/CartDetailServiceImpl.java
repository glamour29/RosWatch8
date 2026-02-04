package com.example.WatchShop.service.impl;

import com.example.WatchShop.model.CartDetail;
import com.example.WatchShop.model.Carts;
import com.example.WatchShop.model.Products;
import com.example.WatchShop.model.Users;
import com.example.WatchShop.model.dto.req.CartDetailResDTO;
import com.example.WatchShop.model.dto.req.CartReqDTO;
import com.example.WatchShop.repository.CartDetailRepository;
import com.example.WatchShop.repository.CartRepository;
import com.example.WatchShop.repository.ProductRepository;
import com.example.WatchShop.service.i_service.CartDetailService;
import com.example.WatchShop.service.i_service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartDetailServiceImpl implements CartDetailService {
    private final CartDetailRepository cartDetailRepository;
    private final UserService userService;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    @Override
    public CartDetail save(CartDetail cartDetail) {
        return cartDetailRepository.save(cartDetail);
    }

    @Override
    public CartDetailResDTO addToCart(CartReqDTO cartReqDTO) {
        Optional<Users> optionalUsers = userService.getUserById(cartReqDTO.getUserId());

        if (optionalUsers.isEmpty()) {
            return null;
        }

        Users user = optionalUsers.get();
        Carts cart = cartRepository.findByUsersId(user.getId());
        if (cart == null) {
            Carts createCart = new Carts();
            createCart.setUsers(user);
            cart = cartRepository.save(createCart);
        }

        Optional<CartDetail> cartDetail;
        List<CartDetail> cartDetails = cart.getCartDetails();

        if (cartDetails != null) {
            cartDetail = cartDetails
                    .stream()
                    .filter(c -> c.getProducts().getId() == cartReqDTO.getProductId())
                    .findFirst();
        } else {
            cartDetail = Optional.empty();
        }

        CartDetail cartDetail1;
        if (cartDetail.isPresent()) {
            cartDetail1 = cartDetail.get();
            if (cartReqDTO.getAmount() != null) {
                cartDetail1.setQuantity(
                        Math.min(
                                cartDetail1.getQuantity() + cartReqDTO.getAmount(),
                                cartDetail1.getProducts().getQuantity()
                        )
                );
            } else {
                cartDetail1.setQuantity(cartDetail1.getQuantity() + 1);
            }
        } else {
            Products products = productRepository.findById(cartReqDTO.getProductId()).get();
            cartDetail1 = new CartDetail();
            cartDetail1.setCarts(cart);
            cartDetail1.setProducts(products);
            cartDetail1.setQuantity(cartReqDTO.getAmount());
        }
        CartDetail savedCartDetail = cartDetailRepository.save(cartDetail1);

        return new CartDetailResDTO(savedCartDetail);
    }
}
