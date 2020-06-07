package com.huibo.gf.shop.dao;

import com.huibo.gf.shop.po.ProductSmallPo;

import java.util.List;

public interface ProductSmallDao {
    List<ProductSmallPo> getAllProductSmall();

    List<ProductSmallPo> getProductSmallLimit(Integer start, Integer limit);

    List<ProductSmallPo> searchProductSmallByKeyWord(String keyWord);

    Integer deleteProductSmall(String[] productCode);

    Integer addProductSmall(ProductSmallPo smallPo);

    List<ProductSmallPo> getProductSmallByCode(String catCode);

    Integer editProductSmall(ProductSmallPo smallPo);

    List<ProductSmallPo> getProductSmallByBigName(String catName);

    List<ProductSmallPo> repeatSmallName(String smallName);
}
