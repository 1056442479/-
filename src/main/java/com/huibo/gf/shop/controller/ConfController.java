package com.huibo.gf.shop.controller;

import com.huibo.gf.shop.po.ChannelPo;
import com.huibo.gf.shop.po.ConfPo;
import com.huibo.gf.shop.service.ConfService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ConfController {
    @Resource
    private ConfService confService;

    /**
     * 更据属性组编码获取商品属性的配置信息
     * @return 商品属性的信息
     */
    @RequestMapping("/getConfByGroup")
    public Map<String,Object> getConfByGroup(String groupCode){
        Map<String,Object> map = new HashMap<>(1);
        List<ConfPo> list = this.confService.getConfByGroup(groupCode);

        /*安分页获取商品大类的信息*/
        map.put("code",0);
        map.put("msg","");
        map.put("count",list.size());
        map.put("data",list);
        map.put("result",list);
        return  map;
    }

    /**
     * 更据关键字获取商品属性的信息
     * @param keyWord 关键字
     * @return 商品组的信息
     */
    @RequestMapping("/searchConfByKeyWord")
    public Map<String,Object> searchConfByKeyWord(Integer page, Integer limit,String keyWord,String groupCode){
        return this.confService.searchConfByKeyWord(page,limit,keyWord,groupCode);
    }
    /**
     * 删除商品属性
     * @param confCode 商品属性编号数组
     * @return 数值
     */
    @RequestMapping("/deleteConf")
    public Map<String,Object>  deleteConf(@RequestParam(value = "confCode[]") String [] confCode){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.confService.deleteConf(confCode);
        map.put("result",i);
        return map;
    }
    /**
     * 新增商品属性
     * @param  confPo 商品属性信息
     * @return 数值
     */
    @RequestMapping("/addAttr")
    public Map<String,Object>  addAttr(@RequestParam(value = "json[]") String [] confPo){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.confService.addAttr(confPo);
        map.put("result",i);
        return map;
    }

    /**
     * 更据属性编码获取商品属性的配置信息
     * @param attrCode 属性编码
     * @return 商品属性的信息
     */
    @RequestMapping("/repeatAttrCode")
    public Map<String,Object> repeatAttrCode(String attrCode){
        Map<String,Object> map = new HashMap<>(1);
        List<ConfPo> list = this.confService.repeatAttrCode(attrCode);
        map.put("result",list);
        return  map;
    }
    /**
     * 修改商品属性
     * @param  confPo 商品属性信息
     * @return 数值
     */
    @RequestMapping("/editAttr")
    public Map<String,Object>  editAttr(ConfPo confPo){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.confService.editAttr(confPo);
        map.put("result",i);
        return map;
    }


}
