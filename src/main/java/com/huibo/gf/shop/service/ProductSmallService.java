package com.huibo.gf.shop.service;

import com.huibo.gf.shop.dao.ProductSmallDao;
import com.huibo.gf.shop.po.ProductSmallPo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductSmallService {
    @Resource
    private ProductSmallDao productSmallDao;

    public Map<String, Object> getAllProductSmall(Integer page, Integer limit) {
        Map<String,Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        start = (page-1)*limit;
        /*安分页获取商品小类的信息*/
        List<ProductSmallPo> limit1 = this.productSmallDao.getProductSmallLimit(start,limit);
        /*获取所有商品小类的信息*/
        List<ProductSmallPo> all= this.productSmallDao.getAllProductSmall();
        map.put("code",0);
        map.put("msg","");
        map.put("count",all.size());
        map.put("data",limit1);

        return  map;
    }

    public Map<String, Object> searchProductSmallByKeyWord(String keyWord, Integer page, Integer limit) {
        //最终返回的list数据
        List<ProductSmallPo> endlist = new ArrayList<>();
        Map<String,Object> map = new HashMap<>(1);
        //查询到的数据
        List<ProductSmallPo> list = this.productSmallDao.searchProductSmallByKeyWord(keyWord);

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

    public Integer deleteProductSmall(String[] productCode) {
        return this.productSmallDao.deleteProductSmall(productCode);
    }

    public Integer addProductSmall(ProductSmallPo smallPo) {
        return this.productSmallDao.addProductSmall(smallPo);
    }

    public List<ProductSmallPo> getProductSmallByCode(String catCode) {
        return this.productSmallDao.getProductSmallByCode(catCode);
    }

    public Integer editProductSmall(ProductSmallPo smallPo) {
        return this.productSmallDao.editProductSmall(smallPo);
    }

    public Map<String, Object> getProductAllSmallInformation() {
        Map<String,Object> map = new HashMap<>(1);
        /*获取所有商品小类的信息*/
        List<ProductSmallPo> all= this.productSmallDao.getAllProductSmall();
        map.put("result",all);
        return map;
    }

    public List<ProductSmallPo> getProductSmallByBigName(String catName) {
        return this.productSmallDao.getProductSmallByBigName(catName);
    }

    public List<ProductSmallPo> repeatSmallName(String smallName) {
        return this.productSmallDao.repeatSmallName(smallName);
    }
}
