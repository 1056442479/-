package com.huibo.gf.shop.service;

import com.huibo.gf.shop.dao.GroupDao;
import com.huibo.gf.shop.po.ConfPo;
import com.huibo.gf.shop.po.GroupPo;
import com.huibo.gf.shop.po.ProductBigPo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GroupService {
    @Resource
    private GroupDao groupDao;

    public Map<String, Object> getAllAttributes(Integer page, Integer limit) {
        Map<String,Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        start = (page-1)*limit;
        /*安分页获取商品大类的信息*/
        List<GroupPo> roles = this.groupDao.getAllGroupLimit(start,limit);
        /*获取所有商品大类的信息*/
        List<GroupPo> allRoles= this.groupDao.getAllGroup();
        map.put("code",0);
        map.put("msg","");
        map.put("count",allRoles.size());
        map.put("data",roles);

        return  map;
    }

    public List<ProductBigPo> getProductBigByGroup(String groupCode) {
        return this.groupDao.getProductBigByGroup(groupCode);
    }

    public Map<String, Object> searchAttributesByKeyWord(Integer page, Integer limit, String keyWord) {
        List<GroupPo> endlist = new ArrayList<>();
        Map<String,Object> map = new HashMap<>(1);
        //查询到的数据
        List<GroupPo> list = this.groupDao.searchAttributesByKeyWord(keyWord);

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

    public List<GroupPo> repeatGroupCode(String groupCode) {
        return this.groupDao.repeatGroupCode(groupCode);
    }

    public Integer addGroup(String[] group, String[] catCode) {
        GroupPo groupPo = new GroupPo();
        groupPo.setGroupCode(group[0]);
        groupPo.setGroupName(group[1]);
        groupPo.setSortNo(group[2]);
        groupPo.setGroupState(group[3]);
        Integer i = this.groupDao.addGroup(groupPo);
        //向中间表添加商品大类的信息
        if(catCode.length==1 && "无数据".equals(catCode[0])){

        }else {
            for (int j = 0; j <catCode.length ; j++) {
                Integer mid = this.groupDao.addProductBigByGroupCode(group[0],catCode[j]);
            }

        }

        return i;
    }

    public Integer editGroup(String[] group, String[] add, String[] delete) {
        GroupPo groupPo = new GroupPo();
        groupPo.setGroupCode(group[0]);
        groupPo.setGroupName(group[1]);
        groupPo.setSortNo(group[2]);
        groupPo.setGroupState(group[3]);
        Integer i = this.groupDao.editGroup(groupPo);
        //向中间表添加商品大类的信息
        if(add.length==1 && "无数据".equals(add[0])){

        }else {
            for (int j = 0; j <add.length ; j++) {
                Integer mid = this.groupDao.addProductBigByGroupCode(group[0],add[j]);
            }
        }

        if(delete.length==1 && "无数据".equals(delete[0])){

        }else {
            for (int j = 0; j <delete.length ; j++) {
                Integer mid = this.groupDao.deleteProductBigByGroupCode(group[0],delete[j]);
            }
        }
        return i;
    }

    public Integer deleteGroup(String[] groupCode) {
        Integer i = this.groupDao.deleteGroup(groupCode);
        //删除属性表的属性组的信息
        this.groupDao.deleteGroupFromGCmid(groupCode);
        //删除中间表的属性组的信息
        this.groupDao.deleteGroupFromMid(groupCode);
        return i;
    }

    public List<ProductBigPo> getCatByGigCode(String catName) {
        return this.groupDao.getCatByGigCode(catName);
    }

    public List<GroupPo> getGroupCodeByGigCode(String[] arr) {
        return this.groupDao.getGroupCodeByGigCode(arr);
    }

    public List<ConfPo> getConfByGroup(String[] gcodes) {
        return this.groupDao.getConfByGroup(gcodes);
    }
}
