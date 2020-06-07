package com.huibo.gf.shop.dao;

import com.huibo.gf.shop.po.ProductSmallPo;
import com.huibo.gf.shop.po.ProductThreePo;

import java.util.List;

public interface ProductThreeDao {
    List<ProductThreePo> getAllProductThree(String pcatName);

    List<ProductThreePo> getAllProductThreeLimit(Integer start, Integer limit,String pcatName);

    Integer deleteProductThree(String[] productCode);

    List<ProductThreePo> searchProductThreeByKeyWord(String keyWord, String pcatName);

    List<ProductSmallPo> getProductSmallByCode(String fcatName);

    List<ProductSmallPo> repeatProductThreeByCode(String catCode);

    Integer addProductThree(ProductThreePo threePo);

    Integer editProductThree(ProductThreePo threePo);

    List<ProductThreePo> repeatProductThreeBySmallName(String catName);

    List<ProductThreePo> repeatProductThreeName(String threeName);
}
