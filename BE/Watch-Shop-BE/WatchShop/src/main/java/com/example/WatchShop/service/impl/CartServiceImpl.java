package com.example.WatchShop.service.impl;

import com.example.WatchShop.model.CartDetail;
import com.example.WatchShop.model.Carts;
import com.example.WatchShop.model.Users;
import com.example.WatchShop.model.dto.req.CartDetailResDTO;
import com.example.WatchShop.model.dto.req.CartReqDTO;
import com.example.WatchShop.repository.CartDetailRepository;
import com.example.WatchShop.repository.CartRepository;
import com.example.WatchShop.service.i_service.CartService;
import com.example.WatchShop.service.i_service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserService userService;
    private final CartDetailRepository cartDetailRepository;

    @Override
    public List<CartDetailResDTO> getcartDetail(HttpServletRequest request) {
        Optional<Users> optionalUsers = userService.getUserFromRequest(request);

        if (optionalUsers.isEmpty()) {
            return null;
        }

        Users user = optionalUsers.get();
        Carts c = cartRepository.findByUsersId(user.getId());

        if (c == null) {
            return new ArrayList<>();
        }

        Iterator<CartDetail> iteratorCartDetailIterator = c.getCartDetails().iterator();
        List<CartDetailResDTO> cartDetailResDTOS = new ArrayList<>();
        CartDetailResDTO dto = null;

        while (iteratorCartDetailIterator.hasNext()) {
            CartDetail cartDetail = iteratorCartDetailIterator.next();
            dto = new CartDetailResDTO(cartDetail);
            cartDetailResDTOS.add(dto);
        }

        return cartDetailResDTOS;
    }

    @Override
    public void removeAllProductInCart(Long idUser) {
        Carts cart = cartRepository.findByUsersId(idUser);
        List<CartDetail> cartDetail = cart.getCartDetails();

        for (CartDetail c : cartDetail) {
            cartDetailRepository.deleteById(c.getId());
        }
    }

    @Override
    public CartDetailResDTO deleteFromCart(CartReqDTO cartReqDTO) {
        Users user = userService.getUserById(cartReqDTO.getUserId()).get();
        Carts cart = cartRepository.findByUsersId(user.getId());
        Optional<CartDetail> cartDetail = cart
                .getCartDetails()
                .stream()
                .filter(c -> c.getProducts().getId() == cartReqDTO.getProductId())
                .findFirst();

        if (cartDetail.isEmpty()) {
            return null;
        }

        cartDetailRepository.deleteById(cartDetail.get().getId());

        return new CartDetailResDTO(cartDetail.get());
    }
}
