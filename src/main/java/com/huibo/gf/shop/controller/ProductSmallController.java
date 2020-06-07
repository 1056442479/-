package com.huibo.gf.shop.controller;

import com.huibo.gf.shop.po.ProductSmallPo;
import com.huibo.gf.shop.service.ProductSmallService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ProductSmallController {
    @Resource
    private ProductSmallService productSmallService;

    /**
     * 获取商品小类的信息
     * @return 商品小类的信息
     */
    @RequestMapping("/getAllProductSmall")
    public Map<String,Object> getAllProductSmall(Integer page, Integer limit){
        return this.productSmallService.getAllProductSmall(page,limit);
    }
    /**
     * 获取所有商品小类的信息
     * @return 商品小类的信息
     */
    @RequestMapping("/getProductAllSmallInformation")
    public Map<String,Object> getProductAllSmallInformation(Integer page, Integer limit){
        return this.productSmallService.getProductAllSmallInformation();
    }


    /**
     * 查询商品小类
     * @param keyWord 关键字
     * @return 商品小类的信息
     */
    @RequestMapping("/searchProductSmallByKeyWord")
    public Map<String,Object>  searchProductSmallByKeyWord( String keyWord,Integer page,Integer limit){
        return this.productSmallService.searchProductSmallByKeyWord(keyWord,page,limit);
    }
    /**
     * 删除商品大类
     * @param productCode 商品编号数组
     * @return 商品大类的信息
     */
    @RequestMapping("/deleteProductSmall")
    public Map<String,Object>  deleteProductBig(@RequestParam(value = "productCode[]") String [] productCode){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.productSmallService.deleteProductSmall(productCode);
        map.put("result",i);
        return map;
    }
    /**
     * 新增商品小类
     * @param  smallPo 商品信息小类信息
     * @return 商品小类的信息
     */
    @RequestMapping("/addProductSmall")
    public Map<String,Object>  addProductSmall(ProductSmallPo smallPo){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.productSmallService.addProductSmall(smallPo);
        map.put("result",i);
        return map;
    }
    /**
     * 更据编码获取商品小类的信息
     * @param  catCode 商品信息小类编码
     * @return 商品小类的信息
     */
    @RequestMapping("/getProductSmallByCode")
    public Map<String,Object>  getProductSmallByCode(String catCode){
        Map<String,Object> map = new HashMap<>(1);
        List<ProductSmallPo> list = this.productSmallService.getProductSmallByCode(catCode);
        map.put("result",list);
        return map;
    }

    /**
     * 更据大类的名称获取所有商品小类的信息
     * @param  catName 商品大类的名称
     * @return 商品小类的信息
     */
    @RequestMapping("/getProductSmallByBigName")
    public Map<String,Object>  getProductSmallByBigName(String catName){
        Map<String,Object> map = new HashMap<>(1);
        List<ProductSmallPo> list = this.productSmallService.getProductSmallByBigName(catName);
        map.put("result",list);
        return map;
    }
    /**
     * 更据小类的名称获取所有商品小类的信息
     * @param  smallName 商品小类类的名称
     * @return 商品小类的信息
     */
    @RequestMapping("/repeatSmallName")
    public Map<String,Object>  repeatSmallName(String smallName){
        Map<String,Object> map = new HashMap<>(1);
        List<ProductSmallPo> list = this.productSmallService.repeatSmallName(smallName);
        map.put("result",list);
        return map;
    }


    /**
     * 修改商品小类
     * @param  smallPo 商品小类的信息
     * @return 数值
     */
    @RequestMapping("/editProductSmall")
    public Map<String,Object>  editProductSmall(ProductSmallPo smallPo){
        Map<String,Object> map = new HashMap<>(1);
        smallPo.setCatLvl("2");
        Integer i = this.productSmallService.editProductSmall(smallPo);
        map.put("result",i);
        return map;
    }


}
