package com.huibo.gf.shop.controller;

import com.huibo.gf.shop.po.BrandPo;
import com.huibo.gf.shop.po.ProductBigPo;
import com.huibo.gf.shop.service.BrandService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class BrandController {
    @Resource
    private BrandService brandService;

    /**
     * 获取品牌的信息
     * @return 品牌的信息
     */
    @RequestMapping("/getAllBrand")
    public Map<String,Object> getAllBrand(Integer page, Integer limit){
        return this.brandService. getAllBrand(page,limit);
    }
    /**
     * 删除品牌的信息
     * @return 数值
     */
    @RequestMapping("/deleteBrand")
    public Map<String,Object> deleteChannel(@RequestParam(value = "brandCode[]") String [] brandCode){
        Map<String,Object> map=new HashMap<>(1);
        Integer i = this.brandService.deleteBrand(brandCode);
        map.put("result",i);
        return map;
    }
    /**
     * 查询渠道商的信息
     * @return 渠道商的信息
     */
    @RequestMapping("/searchKeyWordFromBrand")
    public Map<String,Object> searchKeyWordFromBrand(String keyWord,Integer page,Integer limit){
        return this.brandService.searchKeyWordFromBrand(keyWord,page,limit);
    }
    /**
     * 获取所有的商品大类的信息
     * @return 商品大类的信息
     */
    @RequestMapping("/getProductBig")
    public Map<String,Object> getProductBig(){
        return this.brandService.getProductBig();
    }

    /**
     * 验证编码是否重复
     * @return 数值
     */
    @RequestMapping("/repeatBrandCode")
    public Map<String,Object> repeatBrandCode( String  brandCode){
        Map<String,Object> map=new HashMap<>(1);
        Integer i = this.brandService.repeatBrandCode(brandCode);
        map.put("result",i);
        return map;
    }
    /**
     * 新增品牌管理
     * @return 数值
     */
    @RequestMapping("/addBrand")
    public Map<String,Object> addBrand(@RequestParam(value = "brand[]") String [] brand,
                                       @RequestParam(value = "catCode[]") String [] catCode){
        Map<String,Object> map=new HashMap<>(1);
       Integer i = this.brandService.addBrand(brand,catCode);
        map.put("result",i);
        return map;
    }

    /**
     * 更据编码获取品牌管理的信息
     * @param brandCode 编码
     * @return 品牌管理的信息
     */
    @RequestMapping("/getBrandInformation")
    public Map<String,Object> getBrandInformation( String  brandCode){
        Map<String,Object> map=new HashMap<>(1);
        List<BrandPo> list = this.brandService.getBrandInformation(brandCode);
        map.put("result",list);
        return map;
    }

    /**
     * 更据编码获取该品牌管理的商品大类的信息
     * @param brandCode 品牌管理编码
     * @return 商品大类信息
     */
    @RequestMapping("/getProductByBrandCode")
    public Map<String,Object> getProductByBrandCode( String  brandCode){
        Map<String,Object> map=new HashMap<>(1);
        List<ProductBigPo> list = this.brandService.getProductByBrandCode(brandCode);
        map.put("result",list);
        return map;
    }
    /**
     * 更据大类的编码获取该品牌管理的商品品牌的信息
     * @param catName 品牌管理名称
     * @return 商品品牌信息
     */
    @RequestMapping("/getProductByGigCode")
    public Map<String,Object> getProductByGigCode( String  catName){
        Map<String,Object> map=new HashMap<>(1);
        String code = this.brandService.getBigByCatName(catName);
        List<BrandPo> list = this.brandService.getProductByGigCode(code);
        map.put("result",list);
        return map;
    }
    /**
     * 更据品牌名称获取品牌的信息
     * @param brandName 品牌名称
     * @return 商品品牌信息
     */
    @RequestMapping("/repeatBrandName")
    public Map<String,Object> repeatBrandName( String  brandName){
        Map<String,Object> map=new HashMap<>(1);
        List<BrandPo> list = this.brandService.repeatBrandName(brandName);
        map.put("result",list);
        return map;
    }

    /**
     * 新增品牌管理
     * @return 数值
     */
    @RequestMapping("/updateBrand")
    public Map<String,Object> updateBrand(@RequestParam(value = "brand[]") String [] brand,
                                          @RequestParam(value = "addArr[]") String [] addArr,
                                          @RequestParam(value = "deleteArr[]") String [] deleteArr){
        Map<String,Object> map=new HashMap<>(1);

        Integer i = this.brandService.updateBrand(brand,addArr,deleteArr);
        map.put("result",i);
        return map;
    }


}
