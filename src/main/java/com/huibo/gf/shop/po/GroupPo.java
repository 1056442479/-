package com.huibo.gf.shop.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 谢亮
 * 商品属性组
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupPo {
    //属性组编码
    private String groupCode;
    //属性组名称
    private String groupName;
    //属性组状态
    private String groupState;
    //属性组排序
    private String sortNo;
}
