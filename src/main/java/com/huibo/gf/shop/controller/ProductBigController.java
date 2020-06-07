package com.huibo.gf.shop.controller;

import com.huibo.gf.shop.po.ProductBigPo;
import com.huibo.gf.shop.service.ProductBigService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ProductBigController {
    @Resource
    private ProductBigService productBigService;


    /**
     * 获取商品大类的信息
     * @return 商品大类的信息
     */
    @RequestMapping("/getAllProductBig")
    public Map<String,Object>  getAllProductBig(Integer page,Integer limit){
        return this.productBigService.getAllProductBig(page,limit);
    }
    /**
     * 验证商品大类的编码是否重复
     * @param catCode 商品大类的编码
     * @return 商品大类的信息
     */
    @RequestMapping("/repeatProductBigCode")
    public Map<String,Object>  repeatProductBigCode(String catCode){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.productBigService.repeatProductBigCode(catCode);
        map.put("result",i);
        return map;
    }
    /**
     * 更具大类名称获取大类的信息
     * @param catName 商品大类的名称
     * @return 商品大类的信息
     */
    @RequestMapping("/getProductByCatName")
    public Map<String,Object>  getProductByCatName(String catName){
        Map<String,Object> map = new HashMap<>(1);
        List<ProductBigPo> list = this.productBigService.getProductByCatName(catName);
        map.put("result",list);
        return map;
    }

    /**
     * 新增商品大类
     * @param  product 商品信息数组
     * @param  json  要添加商品的json字符串信息
     * @return 商品大类的信息
     */
    @RequestMapping("/addProductBig")
    public Map<String,Object>  addProductBig(@RequestParam(value = "product[]") String [] product,
                                             @RequestParam(value = "json") String json){
        Map<String,Object> map = new HashMap<>(1);

        Integer i = this.productBigService.addProductBig(product,json);
        map.put("result",i);
        return map;
    }
    /**
     * 修改商品大类
     * @param  product 商品信息数组
     * @param  json  要修改商品的json字符串信息
     * @return 商品大类的信息
     */
    @RequestMapping("/editProductBig")
    public Map<String,Object>  editProductBig(@RequestParam(value = "product[]") String [] product,
                                             @RequestParam(value = "json") String json){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.productBigService.editProductBig(product,json);
        map.put("result",i);
        return map;
    }


    /**
     * 删除商品大类
     * @param productCode 商品编号数组
     * @return 商品大类的信息
     */
    @RequestMapping("/deleteProductBig")
    public Map<String,Object>  deleteProductBig(@RequestParam(value = "productCode[]") String [] productCode){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.productBigService.deleteProductBig(productCode);
        map.put("result",i);
        return map;
    }

    /**
     * 查询商品大类
     * @param keyWord 关键字
     * @return 商品大类的信息
     */
    @RequestMapping("/searchProductBigByKeyWord")
    public Map<String,Object>  searchProductBigByKeyWord( String keyWord,Integer page,Integer limit){
        return this.productBigService.searchProductBigByKeyWord(keyWord,page,limit);
    }
    /**
     * 查询商品大类信息
     * @param whcode 编码
     * @return 商品大类的信息
     */
    @RequestMapping("/getProductByCode")
    public Map<String,Object>  getProductByCode( String whcode){
        Map<String,Object> map = new HashMap<>(1);
        List<ProductBigPo> productBigPos = this.productBigService.getProductByCode(whcode);
        map.put("result",productBigPos);
        return map;
    }


}
