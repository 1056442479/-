package com.huibo.gf.shop.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrandPo {
    private String brandCode;
    private String brandName;
    //首字母
    private String fletter;
    private String brandDesc;
    // 1 显示
    // 0 隐藏',
    private String isShow;
    //排序
    private String sortNo;

}
