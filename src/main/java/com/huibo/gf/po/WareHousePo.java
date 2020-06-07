package com.huibo.gf.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WareHousePo {
    private Integer whCode;
    private String whName;
    private String contact;
    private String phone;
    private String address;
    private String whState;
}
