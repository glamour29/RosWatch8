package com.example.WatchShop.model.dto.res;

import com.example.WatchShop.model.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResDTO {
    private Long id;
    private String fullName;
    private Date birthDate;
    private String address;
    private String email;
    private String phone;
    private String roles;
    private boolean isDeleted;

    public UserResDTO(Users users) {
        this.id = users.getId();
        this.fullName = users.getFullName();
        this.birthDate = users.getBirthDate();
        this.address = users.getAddress();
        this.email = users.getEmail();
        this.phone = users.getPhone();
        this.roles = users.getRoles().getName();
        this.isDeleted = users.getIsDeleted();
    }
}
