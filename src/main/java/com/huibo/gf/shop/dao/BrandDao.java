package com.huibo.gf.shop.dao;

import com.huibo.gf.shop.po.BrandPo;
import com.huibo.gf.shop.po.ProductBigPo;

import java.util.List;

public interface BrandDao {
    List<BrandPo> getAllBrand();

    List<BrandPo> getAllBrandLimit(Integer start, Integer limit);

    Integer deleteBrandFromMiddle(String[] brandCode);

    Integer deleteBrand(String[] brandCode);

    List<BrandPo> searchKeyWordFromBrand(String keyWord);

    Integer repeatBrandCode(String brandCode);

    Integer addBrand(BrandPo brandPo);

    void addBrandFromMid(String brandCode, String catCode);

    List<BrandPo> getBrandInformation(String brandCode);

    List<ProductBigPo> getProductByBrandCode(String brandCode);

    Integer updateBrand(BrandPo brandPo);


    Integer deleteBrandProductFromMiddle(String brandCode, String catCode);

    List<BrandPo> getProductByGigCode(String catCode);

    String getBigByCatName(String catName);

    List<BrandPo> repeatBrandName(String brandName);
}
