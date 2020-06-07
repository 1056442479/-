package com.huibo.gf.shop.dao;

import com.huibo.gf.shop.po.ConfPo;

import java.util.List;

public interface ConfDao {
    List<ConfPo> getConfByGroup(String groupCode);

    List<ConfPo> searchConfByKeyWord(String keyWord,String groupCode);

    Integer deleteConf(String[] confCode);

    Integer addAttr(ConfPo confPo);

    List<ConfPo> repeatAttrCode(String attrCode);

    Integer editAttr(ConfPo confPo);

}
