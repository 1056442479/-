package com.huibo.gf.appraisal.controller;


import com.huibo.gf.appraisal.po.IdentifyPo;
import com.huibo.gf.appraisal.service.IdentifyService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @author 谢亮
 */
@RestController
public class IdentifyController {
    @Resource
    private IdentifyService identifyService;

    /**
     * 分页获取鉴定记录
     * @return 鉴定信息
     */
    @RequestMapping("/getAllIdentify")
    public Map<String,Object> getAllIdentify(Integer page, Integer limit){
        return this.identifyService.getAllIdentify(page,limit);
    }
    /**
     * 获取鉴定记录
     * @return 鉴定信息
     */
    @RequestMapping("/getAllIdentifyInformation")
    public Map<String,Object> getAllIdentifyInformation(){
        return this.identifyService.getAllIdentifyInformation();
    }
    /**
     * 新增鉴定记录信息
     * @return 数值
     */
    @RequestMapping("/addIdentify")
    public Map<String,Object> addIdentify(IdentifyPo identifyPo){
        return this.identifyService.addIdentify(identifyPo);
    }
    /**
     * 更距商品编码查询鉴定人
     * @param  goodsId 商品编码
     * @return 数值
     */
    @RequestMapping("/getIdentifyPeopleByGoodsId")
    public Map<String,Object> getIdentifyPeopleByGoodsId(String goodsId){
        return this.identifyService.getIdentifyPeopleByGoodsId(goodsId);
    }
    /**
     * 更距鉴定编码查询鉴定信息
     * @param  identifyId 鉴定编码
     * @return 鉴定信息
     */
    @RequestMapping("/repeatIdentifyCode")
    public Map<String,Object> repeatIdentifyCode(String identifyId){
        return this.identifyService.repeatIdentifyCode(identifyId);
    }


}
