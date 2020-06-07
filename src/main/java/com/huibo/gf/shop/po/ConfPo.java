package com.huibo.gf.shop.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 谢亮
 * 商品属性实体类
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfPo {
    //属性编码
    private String attrCode;
    //属性组编码
    private String groupCode;
    //属性名称
    private String attrName;
    //属性类型，01 唯一属性，02 单选属性，03 多选属性'
    private String attrType;
    // 可选值列表，'各个属性项以逗号隔开',
    private String options;
    //排序
    private String sortNo;
}
