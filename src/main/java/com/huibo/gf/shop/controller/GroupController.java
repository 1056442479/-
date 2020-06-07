package com.huibo.gf.shop.controller;

import com.huibo.gf.shop.dao.BrandDao;
import com.huibo.gf.shop.po.BrandPo;
import com.huibo.gf.shop.po.ConfPo;
import com.huibo.gf.shop.po.GroupPo;
import com.huibo.gf.shop.po.ProductBigPo;
import com.huibo.gf.shop.service.GroupService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class GroupController {
    @Resource
    private GroupService groupService;

    /**
     * 获取商品组的信息
     * @return 商品组的信息
     */
    @RequestMapping("/getAllAttributes")
    public Map<String,Object> getAllAttributes(Integer page, Integer limit){
        return this.groupService.getAllAttributes(page,limit);
    }
    /**
     * 更据属性组获取大类的信息
     * @return 商品大类的信息
     */
    @RequestMapping("/getProductBigByGroup")
    public Map<String,Object> getProductBigByGroup(String groupCode){
        Map<String,Object> map = new HashMap<>(1);
        List<ProductBigPo> list = this.groupService.getProductBigByGroup(groupCode);
        map.put("result",list);
        return map;
    }
    /**
     * 更据关键字获取商品组的信息
     * @param keyWord 关键字
     * @return 商品组的信息
     */
    @RequestMapping("/searchAttributesByKeyWord")
    public Map<String,Object> searchAttributesByKeyWord(Integer page, Integer limit,String keyWord){
        return this.groupService.searchAttributesByKeyWord(page,limit,keyWord);
    }
    /**
     * 更据编码获取属性组的信息
     * @return 商品组的信息
     */
    @RequestMapping("/repeatGroupCode")
    public Map<String,Object> repeatGroupCode(String groupCode){
        Map<String,Object> map = new HashMap<>(1);
        List<GroupPo> list = this.groupService.repeatGroupCode(groupCode);
        map.put("result",list);
        return map;
    }
    /**
     * 新增商品组信息
     * @param catCode 大类的编码数组
     * @param  group 商品组的信息
     * @return 商品组的信息
     */
    @RequestMapping("/addGroup")
    public Map<String,Object> addGroup(@RequestParam(value = "json[]") String [] group,
                                       @RequestParam(value = "catCode[]") String [] catCode){
        Map<String,Object> map = new HashMap<>(1);
       Integer i = this.groupService.addGroup(group,catCode);
        map.put("result",i);
        return map;
    }
    /**
     * 修改商品组信息
     * @param add 要增加的大类的编码数组
     * @param delete 要删除的大类的编码数组
     * @param  group 商品组的信息
     * @return 商品组的信息
     */
    @RequestMapping("/editGroup")
    public Map<String,Object> editGroup(@RequestParam(value = "group[]") String [] group,
                                       @RequestParam(value = "add[]") String [] add,
                                        @RequestParam(value = "delete[]") String [] delete ){
        Map<String,Object> map = new HashMap<>(1);


        Integer i = this.groupService.editGroup(group,add,delete);
        map.put("result",i);
        return map;
    }
    /**
     * 删除商品组信息
     * @param  groupCode 商品组的编码数组
     * @return 数值
     */
    @RequestMapping("/deleteGroup")
    public Map<String,Object> deleteGroup(@RequestParam(value = "groupCode[]") String [] groupCode){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.groupService.deleteGroup(groupCode);
        map.put("result",i);
        return map;
    }
    /**
     * 更据大类的名称获取该商品的属性组的信息
     * @param  catName 大类的名称
     * @return 数值
     */
    @RequestMapping("/getGroupCodeByGigCode")
    public Map<String,Object> getGroupCodeByGigCode( String catName){
        Map<String,Object> map = new HashMap<>(1);
        //获取大类的信息
        List<ProductBigPo> groupPos = this.groupService.getCatByGigCode(catName);
        String [] arr = new String[groupPos.size()];
        for (int i = 0; i <groupPos.size() ; i++) {
            arr[i] = groupPos.get(i).getCatCode();
        }
        //获取属性组的信息
        List<GroupPo> code = this.groupService.getGroupCodeByGigCode(arr);
        String [] gcodes = new String[code.size()];
        for (int i = 0; i <code.size() ; i++) {
            gcodes[i]=code.get(i).getGroupCode();
        }
        List<ConfPo> confPos = new ArrayList<>();
        if(gcodes.length>0){
            //获取商品属性配置信息
           confPos  = this.groupService.getConfByGroup(gcodes);
        }
        map.put("result",confPos);
        return map;
    }

}
