package com.huibo.gf.shop.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductThreePo {
    //编号
    private String catCode ;
    //名称
    private String catName;
    //上级大类名称
    private String pcatName	;
    //分类级别
    private String  catLvl;
    //分类路劲
    private String catRoute;
    //数量单位
    private String unit;
    //分类描述
    private String catDesc;
    //鉴定图意
    private String  evalPicDef;
    //排序
    private String sortNo;
    //显示
    private String isShow;
}
