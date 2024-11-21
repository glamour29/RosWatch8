package com.example.WatchShop.model.dto.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsersReqDTO {
    private String fullName;
    private Date birthDate;
    private String address;
    @NotBlank
    private String password;
    @NotBlank
    private String email;
    private String phone;
}
