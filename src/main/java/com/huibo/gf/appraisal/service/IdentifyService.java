package com.huibo.gf.appraisal.service;

import com.huibo.gf.appraisal.dao.IdentifyDao;
import com.huibo.gf.appraisal.po.IdentifyPo;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 谢亮
 */
@Service
public class IdentifyService {
    @Resource
    private IdentifyDao identifyDao;

    public Map<String, Object> getAllIdentify(Integer page, Integer limit) {
        Map<String,Object> map = new HashMap<>(1);
        //最终返回的list数据
        List<IdentifyPo> endlist = new ArrayList<>();
        String state = "已鉴定";
        /*获取所有品牌的信息*/
        List<IdentifyPo> list= this.identifyDao.getAllIdentify(state);
        page =(page-1)*limit;
        if(list.size()<limit){
            for (int i = 0; i <list.size() ; i++) {
                endlist.add(list.get(i));
            }
        }else {
            for (int i = page; i <list.size() ; i++) {
                if(i==limit+page || i>=list.size()){
                    break;
                }else {
                    endlist.add(list.get(i));
                }
            }
        }


        map.put("code",0);
        map.put("msg","");
        map.put("count",endlist.size());
        map.put("data",endlist);

        return  map;
    }

    public Map<String, Object> getAllIdentifyInformation() {
        Map<String,Object> map = new HashMap<>(1);
        String state = "已鉴定";
        /*获取所有品牌的信息*/
        List<IdentifyPo> list= this.identifyDao.getAllIdentify(state);
        map.put("result",list);
        return map;
    }

    public Map<String, Object> addIdentify(IdentifyPo identifyPo) {
        Map<String,Object> map = new HashMap<>(1);
        String state = "已鉴定";
        identifyPo.setIdentifyState(state);
        //改变商品的状态信息
        Integer s =  this.identifyDao.updateGoodsState(identifyPo.getGoodsId(),state);
        /*获取所有品牌的信息*/
       Integer i = this.identifyDao.addIdentify(identifyPo);
        map.put("result",i);
        return map;
    }

    public Map<String, Object> getIdentifyPeopleByGoodsId(String goodsId) {
        Map<String,Object> map = new HashMap<>(1);

        List<IdentifyPo> list= this.identifyDao.getIdentifyPeopleByGoodsId(goodsId);
        map.put("result",list);
        return map;
    }

    public Map<String, Object> repeatIdentifyCode(String identifyId) {
        Map<String,Object> map = new HashMap<>(1);
        List<IdentifyPo> list= this.identifyDao.repeatIdentifyCode(identifyId);
        map.put("result",list);
        return map;
    }
}
