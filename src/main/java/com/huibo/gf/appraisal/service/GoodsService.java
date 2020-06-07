package com.huibo.gf.appraisal.service;

import com.huibo.gf.appraisal.dao.GoodsDao;
import com.huibo.gf.appraisal.po.AttrGoodsPo;
import com.huibo.gf.appraisal.po.GoodsPo;
import com.huibo.gf.shop.dao.ProductBigDao;
import com.huibo.gf.shop.po.ProductBigPo;
import com.huibo.gf.shop.po.ProductSmallPo;
import com.huibo.gf.shop.po.ProductThreePo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 谢亮
 */
@Service
public class GoodsService {
    @Resource
    private GoodsDao goodsDao;
    @Resource
    private ProductBigDao productBigDao;

    public Map<String, Object> getAllGoods(Integer page, Integer limit) {
        Map<String,Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        if (limit == null ) {
            limit=10;
        }
        start = (page-1)*limit;
        /*安分页获取品牌的信息*/
        List<GoodsPo> goods = this.goodsDao.getAllGoodsLimit(start,limit);
        /*获取所有品牌的信息*/
        List<GoodsPo> allGoods= this.goodsDao.getAllGoods();
        map.put("code",0);
        map.put("msg","");
        map.put("count",allGoods.size());
        map.put("data",goods);

        return  map;
    }

    public Map<String, Object> getClassificationByGoodsCode(String goodsCode) {
        Map<String,Object> map = new HashMap<>(1);
        /*更距编码获取商品打类的信息*/
        List<ProductBigPo> bigPoList = this.goodsDao.searchGigBYGoodsId(goodsCode);
        /*更距编码获取商品小类的信息*/
        List<ProductSmallPo> smallPoList = this.goodsDao.searchSmallBYGoodsId(goodsCode);
        /*更距编码获取商品三级的信息*/
        List<ProductThreePo> threePoList = this.goodsDao.searchThreeBYGoodsId(goodsCode);
        map.put("big",bigPoList);
        map.put("small",smallPoList);
        map.put("three",threePoList);
        return map;
    }

    public Map<String, Object> searchKeyWordFromGoods(Integer page, Integer limit, String goodsId, String goodsState, String inputUser, String startTime, String endTime) {
        Map<String,Object> map= new HashMap<>(1);
        //最终返回的list数据
        List<GoodsPo> endlist = new ArrayList<>();
        if("全部".equals(goodsState)){
            goodsState="";
        }
        List<GoodsPo> list = this.goodsDao.getGoodsByKeyWord(goodsId,goodsState,inputUser,startTime,endTime);
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

    public Map<String, Object> deleteGoodsByCode(String[] goodsId) {
        Map<String,Object> map= new HashMap<>(1);
        String state = "";
        Integer i = this.goodsDao.deleteGoodsByCode(goodsId,state);
        //删除中间属性的字段表
        Integer M = this.goodsDao.deleteMidelByCode(goodsId);
        map.put("result",i);
        return map;
    }

    public Map<String, Object> repeatGoodsId(String goodsId) {
        Map<String,Object> map= new HashMap<>(1);
        List<GoodsPo> list = this.goodsDao.repeatGoodsId(goodsId);
        map.put("result",list);
        return map;
    }

    public Map<String, Object> addGoods(String[] goods, String[] attr, String json,String [] attrCode) throws ParseException {
        Map<String,Object> map= new HashMap<>(1);
        GoodsPo goodsPo = new GoodsPo();
        goodsPo.setGoodsId(goods[0]);
        goodsPo.setShopCode(goods[1]);
        goodsPo.setInputUser(goods[2]);
        //录入日期
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(goods[3]);
        goodsPo.setInputDate(date);
        //大类编号
        List<ProductBigPo> productByCatName = productBigDao.getProductByCatName(goods[4]);
        goodsPo.setCatCode(productByCatName.get(0).getCatCode());
        //获取小类的编码
        String smallCode = this.goodsDao.getSmallCodeBycatName(goods[5]);
        goodsPo.setSubCatCode(smallCode);
        goodsPo.setDetailCatCode(goods[6]);
        goodsPo.setGoodsName(goods[7]);
        goodsPo.setBrandCode(goods[8]);
        goodsPo.setArticleNumber(goods[9]);
        goodsPo.setFirstPrice(goods[10]);
        goodsPo.setGoodsDesc(goods[11]);
        goodsPo.setGoodsDef(json);
        Integer i = this.goodsDao.addGoods(goodsPo);
        //添加属性的信息
        if(attr.length==1 &&"无数据".equals(attr[0])){

        }else {
            for (int j = 0; j <attr.length ; j++) {
                Integer num = this.goodsDao.insertAttr(goods[0],attr[j],attrCode[j]);
            }
        }

        map.put("result",i);
        return map;
    }

    public Map<String, Object> getAttrByGoodsId(String goodsId) {
        Map<String,Object> map= new HashMap<>(1);
        List<AttrGoodsPo> attrGoodsPos = this.goodsDao.getAttrByGoodsId(goodsId);
        map.put("result",attrGoodsPos);
        return map;
    }

    public Map<String, Object> editGoods(String[] goods, String[] attr, String json, String[] attrCode) throws ParseException {
        Map<String,Object> map= new HashMap<>(1);
        GoodsPo goodsPo = new GoodsPo();
        goodsPo.setGoodsId(goods[0]);
        goodsPo.setShopCode(goods[1]);
        goodsPo.setInputUser(goods[2]);
        //录入日期
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(goods[3]);
        goodsPo.setInputDate(date);
        //大类编号
        List<ProductBigPo> productByCatName = productBigDao.getProductByCatName(goods[4]);
        goodsPo.setCatCode(productByCatName.get(0).getCatCode());
        //获取小类的编码
        String smallCode = this.goodsDao.getSmallCodeBycatName(goods[5]);
        goodsPo.setSubCatCode(smallCode);
        goodsPo.setDetailCatCode(goods[6]);
        goodsPo.setGoodsName(goods[7]);
        goodsPo.setBrandCode(goods[8]);
        goodsPo.setArticleNumber(goods[9]);
        goodsPo.setFirstPrice(goods[10]);
        goodsPo.setGoodsDesc(goods[11]);
        goodsPo.setGoodsDef(json);
        Integer i = this.goodsDao.editGoods(goodsPo);
        //删除中间表的属性信息
        String [] arr = {goods[0]};
        Integer num = this.goodsDao.deleteMidelByCode(arr);
        //添加属性的信息
        if(attr.length==1 &&"无数据".equals(attr[0])){

        }else {
            for (int j = 0; j <attr.length ; j++) {
                Integer num1 = this.goodsDao.insertAttr(goods[0],attr[j],attrCode[j]);
            }
        }

        map.put("result",i);
        return map;
    }

    public Map<String, Object> updateGoodsSate(String[] goodsId) {
        Map<String,Object> map= new HashMap<>(1);
        String state = "待鉴定";
        Integer i = this.goodsDao.updateGoodsSate(goodsId,state);
        map.put("result",i);
        return map;
    }
}
