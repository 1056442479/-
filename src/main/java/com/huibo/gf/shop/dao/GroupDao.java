package com.huibo.gf.shop.dao;

import com.huibo.gf.shop.po.ConfPo;
import com.huibo.gf.shop.po.GroupPo;
import com.huibo.gf.shop.po.ProductBigPo;

import java.util.List;

public interface GroupDao {
    List<GroupPo> getAllGroup();

    List<GroupPo> getAllGroupLimit(Integer start, Integer limit);

    List<ProductBigPo> getProductBigByGroup(String groupCode);

    List<GroupPo> searchAttributesByKeyWord(String keyWord);


    List<GroupPo> repeatGroupCode(String groupCode);

    Integer addGroup(GroupPo groupPo);

    Integer addProductBigByGroupCode(String groupCode, String catCode);

    Integer editGroup(GroupPo groupPo);

    Integer deleteProductBigByGroupCode(String groupCode, String catCode);

    Integer deleteGroup(String[] groupCode);

    void deleteGroupFromGCmid(String[] groupCode);

    void deleteGroupFromMid(String[] groupCode);

    List<ProductBigPo> getCatByGigCode(String catName);

    List<GroupPo> getGroupCodeByGigCode(String[] arr);

    List<ConfPo> getConfByGroup(String[] gcodes);
}
