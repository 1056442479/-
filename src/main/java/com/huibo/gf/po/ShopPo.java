package com.huibo.gf.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 门店资料实体类
 * @author 谢亮
 * @version 1.0
 * @date 2020/5/15
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShopPo {
    private Integer shopCode;
    private String shopName;
    private String contact;
    private String phone;
    private String address;
    private String shopState;
}
