package com.huibo.gf.shop.dao;

import com.huibo.gf.shop.po.ProductBigPo;

import java.util.List;

public interface ProductBigDao {
    List<ProductBigPo> getProduct(Integer start, Integer limit);

    List<ProductBigPo> getAllProduct();

    Integer repeatProductBigCode(String catCode);

    Integer addProductBig(ProductBigPo productBigPo);

    Integer deleteProductBig(String[] productCode);


    List<ProductBigPo> searchProductBigByKeyWord(String keyWord);

    List<ProductBigPo> getProductByCode(String whcode);

    Integer editProductBig(ProductBigPo productBigPo);

    List<ProductBigPo> getProductByCatName(String catName);
}
