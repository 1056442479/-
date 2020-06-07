package com.huibo.gf.shop.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductBigPo {
    //大类编号
    private String catCode ;
    //大类名称
    private String catName;
    //大类排序号
    private String  catLvl;
    //路劲
    private String catRoute;
    //数量单位
    private String unit;
    //大类备注
    private String catDesc;
    //大类的鉴定图意
    private String  evalPicDef;
    private String sortNo;
    private String isShow;
}
