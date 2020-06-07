package com.huibo.gf.shop.service;

import com.huibo.gf.shop.dao.ConfDao;
import com.huibo.gf.shop.po.ConfPo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConfService {
    @Resource
    private ConfDao confDao;

    public List<ConfPo> getConfByGroup(String groupCode) {
        return this.confDao.getConfByGroup(groupCode);
    }

    public Map<String, Object> searchConfByKeyWord(Integer page, Integer limit, String keyWord,String groupCode) {
        List<ConfPo> endlist = new ArrayList<>();
        Map<String,Object> map = new HashMap<>(1);
        //查询到的数据
        List<ConfPo> list = this.confDao.searchConfByKeyWord(keyWord,groupCode);

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
        //layUI分页必须返回的数据
        map.put("code",0);
        map.put("msg","");
        map.put("count",list.size());
        map.put("data",endlist);
        return  map;

    }

    public Integer deleteConf(String[] confCode) {
        return this.confDao.deleteConf(confCode);
    }

    public Integer addAttr(String [] confPo) {
        ConfPo conf = new ConfPo();
        conf.setAttrCode(confPo[0]);
        conf.setGroupCode(confPo[1]);
        conf.setAttrName(confPo[2]);
        conf.setAttrType(confPo[3]);
        conf.setOptions(confPo[4]);
        conf.setSortNo(confPo[5]);
        return this.confDao.addAttr(conf);
    }

    public List<ConfPo> repeatAttrCode(String attrCode) {
        return this.confDao.repeatAttrCode(attrCode);
    }

    public Integer editAttr(ConfPo confPo) {
        return this.confDao.editAttr(confPo);
    }
}
