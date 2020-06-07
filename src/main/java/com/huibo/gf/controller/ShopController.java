package com.huibo.gf.controller;


import com.huibo.gf.po.ShopPo;
import com.huibo.gf.po.WareHousePo;
import com.huibo.gf.service.ShopService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 门店资料控制层
 * @author 谢亮
 * @version 1.0
 * @date 2020/5/15
 */
@RestController
public class ShopController {
    @Resource
    private ShopService shopService;

    /**
     * 获取门店信息
     * @param page 当前页
     * @param limit 页数
     * @return 集合
     */
    @RequestMapping("/getAllShopInformation")
    public Map<String,Object> getAllShopInformation(Integer page,Integer limit){
        return  this.shopService.getAllShopInformation(page,limit);
    }
    /**
     * 获取仓库信息
     * @param page 当前页
     * @param limit 页数
     * @return 集合
     */
    @RequestMapping("/getAllWhInformation")
    public Map<String,Object> getAllWhInformation(Integer page,Integer limit){
        return  this.shopService.getAllWhInformation(page,limit);
    }


    /**
     * 获取该门店所有的仓库信息
     * @return
     */
    @RequestMapping("/getWhNames")
    public Map<String,Object> getWhNames(String shopecode){
        return  this.shopService.getWhNames(shopecode);
    }
    /**
     * 获取该仓库的所有的门店信息
     * @return
     */
    @RequestMapping("/getShopNames")
    public Map<String,Object> getShopNames(String whcode){
        return  this.shopService.getShopNames(whcode);
    }
    /**
     * 获取所有的仓库信息
     * @return
     */
    @RequestMapping("/getAllWhNames")
    public Map<String,Object> getAllWhNames(){
        return  this.shopService.getAllWhNames();
    }
    /**
     * 获取所有的门店信息
     * @return
     */
    @RequestMapping("/getAllShopNames")
    public Map<String,Object> getAllShopNames(){
        return  this.shopService.getAllShopNames();
    }

    /**
     * 验证门店的编码是否重复
     * @return
     */
    @RequestMapping("/repeatShopCode")
    public Map<String,Object>  repeatShopCode(String shopCode){
        Map<String,Object> map = new HashMap<>(1);
        List<ShopPo> list =  this.shopService. repeatShopCode(shopCode);
        map.put("result",list);
        return  map;
    }
    /**
     * 验证仓库的编码是否重复
     * @return
     */
    @RequestMapping("/repeatWhCode")
    public Map<String,Object>  repeatWhCode(String whCode){
        Map<String,Object> map = new HashMap<>(1);
        Integer i =  this.shopService. repeatWhCode(whCode);
        map.put("result",i);
        return  map;
    }

    /**
     * 增加门店信息
     * @param shop 门店信息
     * @param house 仓库的id值
     * @return 数值
     */
    @RequestMapping("/addShop")
    public Map<String,Object>addShop(@RequestParam(value = "shop[]") String[] shop,
                                       @RequestParam(value = "house[]") String[] house){
        Map<String,Object> map = new HashMap<>(1);
        Integer i =  this.shopService.addShop(shop,house);
        map.put("result",i);
        return  map;
    }
    /**
     * 增加门店信息
     * @param house 仓库信息
     * @return 数值
     */
    @RequestMapping("/addHouse")
    public Map<String,Object>addHouse(WareHousePo house){
        Map<String,Object> map = new HashMap<>(1);
        Integer i =  this.shopService.addHouse(house);
        map.put("result",i);
        return  map;
    }


    /**
     * 更据code数组删除对应的门店信息
     * @param shopCode 门店code数组
     * @return 数值
     */
    @RequestMapping("/deleteShop")
    public Map<String,Object>deleteShop(@RequestParam(value = "shopCode[]") String[] shopCode){
        Map<String,Object> map = new HashMap<>(1);
        Integer i =  this.shopService.deleteShop(shopCode);

        map.put("result",i);
        return  map;
    }
    /**
     * 更据code数组删除对应的仓库信息
     * @param whCode 仓库code数组
     * @return 数值
     */
    @RequestMapping("/deleteWhByCode")
    public Map<String,Object>deleteWhByCode(@RequestParam(value = "whCode[]") String[] whCode){
        Map<String,Object> map = new HashMap<>(1);
        Integer i =  this.shopService.deleteWhByCode(whCode);
        map.put("result",i);
        return  map;
    }

    /**
     * 修改门店信息
     * @param shop 门店信息
     * @param add 要增加的仓库信息
     * @param delete 要删除的仓库信息
     * @return 数值
     */
    @RequestMapping("/editShop")
    public Map<String,Object>editShop(@RequestParam(value = "shop[]") String[] shop,
                                     @RequestParam(value = "add[]") String[] add,
                                      @RequestParam(value = "delete[]") String[] delete){
        Map<String,Object> map = new HashMap<>(1);
        Integer i =  this.shopService.editShop(shop,add,delete);
        map.put("result",i);
        return  map;
    }

    /**
     * 修改门店信息
     * @param house 仓库信息
     * @return 数值
     */
    @RequestMapping("/editWh")
    public Map<String,Object>editWh(WareHousePo house){
        Map<String,Object> map = new HashMap<>(1);
        Integer i =  this.shopService.editWh(house);
        map.put("result",i);
        return  map;
    }

    /**
     * 查询门店信息
     * @return 数值
     */
    @RequestMapping("/searchKeyWord")
    public Map<String,Object>searchKeyWord(Integer page,Integer limit,String state,String keyWord){
        return  this.shopService.searchKeyWord(page,limit,state,keyWord);
    }
    /**
     * 查询门店信息
     * @return 数值
     */
    @RequestMapping("/searchKeyWordFromWh")
    public Map<String,Object>searchKeyWordFromWh(Integer page,Integer limit,String state,String keyWord){
        return  this.shopService.searchKeyWordFromWh(page,limit,state,keyWord);
    }

}
