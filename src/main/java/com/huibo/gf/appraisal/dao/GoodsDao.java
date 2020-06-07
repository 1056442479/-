package com.huibo.gf.appraisal.dao;

import com.huibo.gf.appraisal.po.AttrGoodsPo;
import com.huibo.gf.appraisal.po.GoodsPo;
import com.huibo.gf.shop.po.ProductBigPo;
import com.huibo.gf.shop.po.ProductSmallPo;
import com.huibo.gf.shop.po.ProductThreePo;

import java.util.List;

public interface GoodsDao {
    List<GoodsPo> getAllGoods();

    List<GoodsPo> getAllGoodsLimit(Integer start, Integer limit);

    List<ProductBigPo> searchGigBYGoodsId(String goodsCode);

    List<ProductSmallPo> searchSmallBYGoodsId(String goodsCode);

    List<ProductThreePo> searchThreeBYGoodsId(String goodsCode);

    List<GoodsPo> getGoodsByKeyWord( String goodsId, String goodsState, String inputUser, String startTime, String endTime);

    Integer deleteGoodsByCode(String[] goodsId,String state);

    List<GoodsPo> repeatGoodsId(String goodsId);

    String getSmallCodeBycatName(String good);

    String getThreeCodeBycatName(String good);

    String getBrandCodeByBrandName(String good);

    Integer addGoods(GoodsPo goodsPo);

    Integer insertAttr(String goodId, String attrValue, String attrCode);

    Integer deleteMidelByCode(String[] goodsId);

    List<AttrGoodsPo> getAttrByGoodsId(String goodsId);

    Integer editGoods(GoodsPo goodsPo);

    Integer editAttr(String goodId, String attrValue, String attrCode);


    Integer updateGoodsSate(String[] goodsId,String state);
}
