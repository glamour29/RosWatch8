package com.example.WatchShop.controller.user;

import com.example.WatchShop.model.Users;
import com.example.WatchShop.model.dto.req.UsersReqDTO;
import com.example.WatchShop.model.dto.res.UserResDTO;
import com.example.WatchShop.service.i_service.JwtService;
import com.example.WatchShop.service.i_service.UserService;
import com.example.WatchShop.util.PasswordUtils;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
@Slf4j
public class UsersController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UsersReqDTO usersDTO) {
        log.info("registerUser");
        if (userService.existsByEmail(usersDTO.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("status", "fail",
                            "message", "Email already existed!"));
        }
        userService.addUsers(usersDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "message", "User register successfully."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UsersReqDTO usersDTO) {
        log.info("loginUser");
        Optional<Users> user = userService.getUsersByEmailAndPassword(usersDTO.getEmail(), usersDTO.getPassword());
        if (user.isEmpty() || user.get().getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "fail", "message", "Invalid email or password!"));
        }
        // Generate access token
        String accessToken = jwtService.generateToken(user.get(), user.get().getAuthorities());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", new UserResDTO(user.get()),
                        "accessToken", accessToken,
                        "userID", user.get().getId(),
                        "isDeleted", user.get().getIsDeleted()
                ));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Object> forgotPassword(@RequestBody Map<String, String> email) throws MessagingException {
        log.info("forgotPassword");
        Optional<Users> user = userService.getUserByEmail(email.get("email"));

        if (user.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Invalid email or email has not been registered!");
        }

        String password = PasswordUtils.generateRandomPassword(12);
        user.get()
                .setPassword(passwordEncoder.encode(password));
        userService.save(user.get());
        userService.sendRecoverPassword(user.get(), password);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Please check your email to get recovery password!");
    }

    @PostMapping("/change-password")
    public ResponseEntity<Object> changePassword(HttpServletRequest request, @RequestBody Map<String, String> passwords) {
        log.info("changePassword");
        Users user = userService.getUserFromRequest(request).get();
        if (userService.isCorrectPassword(user, passwords.get("currentPassword"))) {
            String newPassword = passwordEncoder.encode(passwords.get("newPassword"));
            user.setPassword(newPassword);
            userService.save(user);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Change password successfully!");
        }
        return ResponseEntity
                .status(HttpStatus.PRECONDITION_FAILED)
                .body("Your current password is not correct. Please try again!");
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUser() {
        log.info("getAllUser");
        List<Users> usersList = userService.findAllUser();
        List<UserResDTO> userResDTOS = usersList
                .stream()
//        .filter(users -> users.getRoles().getName().equals("ROLE_USER"))
                .map(UserResDTO::new)
                .toList();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", userResDTOS));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserDetail(@PathVariable("id") Long id) {
        log.info("getUserDetail");
        Users user = userService.getUserById(id).get();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "data", new UserResDTO(user)));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@RequestBody UsersReqDTO usersDTO, @PathVariable("id") Long id) {
        log.info("updateUser");
        Users updateUsers = userService.updateUsers(usersDTO, id);
        if (updateUsers == null) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Map.of("status", "fail",
                            "message", "Users update failed"));
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "message", "Users update successfully"));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        log.info("deleteUser");
        Users users = userService.deleteById(id);
        if (users == null) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "fail",
                            "message", "Users delete failed"));
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("status", "success",
                        "message", "Users delete successfully"));
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<?> updateRole(@PathVariable Long id) {
        log.info("update role user");
        userService.updateRole(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}