package com.huibo.gf.appraisal.controller;

import com.huibo.gf.appraisal.po.AppraisePo;
import com.huibo.gf.appraisal.service.AppraiseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @author 谢亮
 * 商品估价
 */
@RestController
public class AppraiseController {
    @Resource
    private AppraiseService appraiseService;

    /**
     * 分页获取评估记录
     * @return 评估信息
     */
    @RequestMapping("/getAllAppraise")
    public Map<String,Object> getAllAppraise(Integer page,Integer limit){
        return this.appraiseService.getAllAppraise(page,limit);
    }


    /**
     * 获取评估记录
     * @return 评估信息
     */
    @RequestMapping("/getAllAppraiseInformation")
    public Map<String,Object> getAllAppraiseInformation(){
        return this.appraiseService.getAllAppraiseInformation();
    }
    /**
     * 新增评估记录信息
     * @return 数值
     */
    @RequestMapping("/addApprise")
    public Map<String,Object> addIdentify(AppraisePo appraisePo){
        return this.appraiseService.addApprise(appraisePo);
    }
    /**
     * 更具评估编码获取对应的信息
     * @param appriseId 评估的编码
     * @return 评估信息
     */
    @RequestMapping("/repeatAppraiseCode")
    public Map<String,Object> repeatAppraiseCode(String appriseId){
        return this.appraiseService.repeatAppraiseCode(appriseId);
    }
    /**
     * 更具商品的编码获取评估信息
     * @param goodsId 商品的编码
     * @return 评估信息
     */
    @RequestMapping("/getAppraisePeopleByGoodsId")
    public Map<String,Object> getAppraisePeopleByGoodsId(String goodsId){
        return this.appraiseService.getAppraisePeopleByGoodsId(goodsId);
    }

}
