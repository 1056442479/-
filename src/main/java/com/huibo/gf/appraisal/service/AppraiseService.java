package com.huibo.gf.appraisal.service;

import com.huibo.gf.appraisal.dao.AppraiseDao;
import com.huibo.gf.appraisal.po.AppraisePo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 谢亮
 *
 */
@Service
public class AppraiseService {
    @Resource
    private AppraiseDao appraiseDao;

    public Map<String, Object> getAllAppraiseInformation() {
        Map<String,Object> map = new HashMap<>(1);
        /*获取所有评估的信息*/
        List<AppraisePo> list= this.appraiseDao.getAllAppraiseInformation();
        map.put("result",list);
        return map;
    }

    public Map<String, Object> getAllAppraise(Integer page,Integer limit) {
        Map<String,Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        if (limit == null ) {
            limit=10;
        }
        start = (page-1)*limit;
        /*安分页获取品牌的信息*/
        List<AppraisePo> goods = this.appraiseDao.getAllAppraiseLimit(start,limit);
        /*获取所有品牌的信息*/
        List<AppraisePo> all= this.appraiseDao.getAllAppraiseInformation();
        map.put("code",0);
        map.put("msg","");
        map.put("count",all.size());
        map.put("data",goods);

        return  map;
    }

    public Map<String, Object> addApprise(AppraisePo appraisePo) {
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.appraiseDao.addApprise(appraisePo);
        if(i>0){
            String state = "已评估";
            Integer num = this.appraiseDao.editGoodsState(appraisePo.getGoodsId(),state);
        }
        map.put("result",i);
        return map;
    }

    public Map<String, Object> repeatAppraiseCode(String appriseId) {
        Map<String,Object> map = new HashMap<>(1);
        List<AppraisePo> list = this.appraiseDao.repeatAppraiseCode(appriseId);
        map.put("result",list);
        return  map;
    }

    public Map<String, Object> getAppraisePeopleByGoodsId(String goodsId) {
        Map<String,Object> map = new HashMap<>(1);
        List<AppraisePo> list = this.appraiseDao.getAppraisePeopleByGoodsId(goodsId);
        map.put("result",list);
        return  map;
    }
}
