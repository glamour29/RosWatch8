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
import java.util.stream.Collectors;

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
        log.info("loginUser email={}", usersDTO.getEmail());
        Optional<Users> userOpt = userService.getUserByEmail(usersDTO.getEmail());
        if (userOpt.isEmpty()) {
            log.warn("Login fail: user not found");
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "fail", "message", "Invalid email or password!"));
        }
        boolean passwordMatches = passwordEncoder.matches(usersDTO.getPassword(), userOpt.get().getPassword());
        if (!passwordMatches) {
            log.warn("Login fail: password mismatch for email={}", usersDTO.getEmail());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "fail", "message", "Invalid email or password!"));
        }
        Optional<Users> user = Optional.of(userOpt.get());
        if (Boolean.TRUE.equals(user.get().getIsDeleted())) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(Map.of("status", "fail", "message", "Account is disabled"));
        }
        userService.ensureUserHasRole(user.get());
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

    @GetMapping("/dev/bcrypt-hash")
    public ResponseEntity<Map<String, String>> getBcryptHash(@RequestParam(defaultValue = "123456") String password) {
        String hash = passwordEncoder.encode(password);
        log.info("Generated BCrypt hash for password length={}", password.length());
        return ResponseEntity.ok(Map.of(
                "password", password,
                "hash", hash,
                "sql", "UPDATE users SET password = N'" + hash + "' WHERE email = N'admin@gmail.com';"
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
                .map(UserResDTO::new)
                .collect(Collectors.toList());
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