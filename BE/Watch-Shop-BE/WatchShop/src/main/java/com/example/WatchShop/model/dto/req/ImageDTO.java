package com.example.WatchShop.model.dto.req;

import lombok.Data;

import java.sql.Date;

@Data
public class ImageDTO {
    private long id;
    private String source;
    private Date createDate;
    private Date updateDate;
}
