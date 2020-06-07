package com.huibo.gf.shop.controller;

import com.huibo.gf.shop.po.ProductSmallPo;
import com.huibo.gf.shop.po.ProductThreePo;
import com.huibo.gf.shop.service.ProductThreeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ProductThreeController {
    @Resource
    private ProductThreeService productThreeService;


    /**
     * 获取商品小类的信息
     * @return 商品小类的信息
     */
    @RequestMapping("/getAllProductThree")
    public Map<String,Object> getAllProductSmall(Integer page, Integer limit,String pcatName){
        return this.productThreeService.getAllProductThree(page,limit,pcatName);
    }

    /**
     * 删除商品大类
     * @param productCode 商品编号数组
     * @return 商品大类的信息
     */
    @RequestMapping("/deleteProductThree")
    public Map<String,Object>  deleteProductBig(@RequestParam(value = "productCode[]") String [] productCode){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.productThreeService.deleteProductThree(productCode);
        map.put("result",i);
        return map;
    }

    /**
     * 查询商品小类
     * @param keyWord 关键字
     * @return 商品小类的信息
     */
    @RequestMapping("/searchProductThreeByKeyWord")
    public Map<String,Object>  searchProductThreeByKeyWord( String keyWord,Integer page,Integer limit,String pcatName){
        return this.productThreeService.searchProductThreeByKeyWord(keyWord,page,limit,pcatName);
    }
    /**
     * 更据编码获取商品小类的信息
     * @param  fcatName 商品信息小类名称
     * @return 商品小类的信息
     */
    @RequestMapping("/getProductSmall")
    public Map<String,Object>  getProductSmallByCode(String fcatName){
        Map<String,Object> map = new HashMap<>(1);
        List<ProductSmallPo> list = this.productThreeService.getProductSmallByCode(fcatName);
        map.put("result",list);
        return map;
    }
    /**
     * 更据编码获取三级商品的信息
     * @param  catCode 三级商品的信息编码
     * @return 三级商品的信息
     */
    @RequestMapping("/repeatProductThreeByCode")
    public Map<String,Object>  repeatProductThreeByCode(String catCode){
        Map<String,Object> map = new HashMap<>(1);
        List<ProductSmallPo> list = this.productThreeService.repeatProductThreeByCode(catCode);
        map.put("result",list);
        return map;
    }
    /**
     * 更据编码获取三级商品的信息
     * @param  catName 二级商品的名称
     * @return 三级商品的信息
     */
    @RequestMapping("/repeatProductThreeBySmallName")
    public Map<String,Object>  repeatProductThreeBySmallName(String catName){
        Map<String,Object> map = new HashMap<>(1);
        List<ProductThreePo> list = this.productThreeService.repeatProductThreeBySmallName(catName);
        map.put("result",list);
        return map;
    }
    /**
     * 更据名称获取三级商品的信息
     * @param  threeName 三级商品的名称
     * @return 三级商品的信息
     */
    @RequestMapping("/repeatProductThreeName")
    public Map<String,Object>  repeatProductThreeName(String threeName){
        Map<String,Object> map = new HashMap<>(1);
        List<ProductThreePo> list = this.productThreeService.repeatProductThreeName(threeName);
        map.put("result",list);
        return map;
    }

    /**
     * 新增商品三级
     * @param  threePo 商品信息三级信息
     * @return 商品三级的信息
     */
    @RequestMapping("/addProductThree")
    public Map<String,Object>  addProductThree(ProductThreePo threePo){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.productThreeService.addProductThree(threePo);
        map.put("result",i);
        return map;
    }
    /**
     * 修改商品小类
     * @param  threePo 三级商品的信息
     * @return 数值
     */
    @RequestMapping("/editProductThree")
    public Map<String,Object>  editProductThree(ProductThreePo threePo){
        Map<String,Object> map = new HashMap<>(1);
        threePo.setCatLvl("3");
        Integer i = this.productThreeService.editProductThree(threePo);
        map.put("result",i);
        return map;
    }

}
