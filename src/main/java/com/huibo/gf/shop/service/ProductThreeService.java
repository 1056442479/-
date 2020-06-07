package com.huibo.gf.shop.service;

import com.huibo.gf.shop.dao.ProductThreeDao;
import com.huibo.gf.shop.po.ProductSmallPo;
import com.huibo.gf.shop.po.ProductThreePo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductThreeService {
    @Resource
    private ProductThreeDao productThreeDao;

    public Map<String, Object> getAllProductThree(Integer page, Integer limit,String pcatName) {
        Map<String,Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        start = (page-1)*limit;
        /*安分页获取商品大类的信息*/
        List<ProductThreePo> limit1 = this.productThreeDao.getAllProductThreeLimit(start,limit,pcatName);
        /*获取所有商品大类的信息*/
        List<ProductThreePo> all= this.productThreeDao.getAllProductThree(pcatName);
        map.put("code",0);
        map.put("msg","");
        map.put("count",all.size());
        map.put("data",limit1);

        return  map;
    }

    public Integer deleteProductThree(String[] productCode) {
        return this.productThreeDao.deleteProductThree(productCode);
    }

    public Map<String, Object> searchProductThreeByKeyWord(String keyWord, Integer page, Integer limit, String pcatName) {
        //最终返回的list数据
        List<ProductThreePo> endlist = new ArrayList<>();
        Map<String,Object> map = new HashMap<>(1);
        //查询到的数据
        List<ProductThreePo> list = this.productThreeDao.searchProductThreeByKeyWord(keyWord,pcatName);

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

    public List<ProductSmallPo> getProductSmallByCode(String fcatName) {
        return this.productThreeDao.getProductSmallByCode(fcatName);
    }

    public List<ProductSmallPo> repeatProductThreeByCode(String catCode) {
        return this.productThreeDao.repeatProductThreeByCode(catCode);
    }

    public Integer addProductThree(ProductThreePo threePo) {
        return this.productThreeDao.addProductThree(threePo);
    }

    public Integer editProductThree(ProductThreePo threePo) {
        return this.productThreeDao.editProductThree(threePo);
    }

    public List<ProductThreePo> repeatProductThreeBySmallName(String catName) {
        return this.productThreeDao.repeatProductThreeBySmallName(catName);
    }

    public List<ProductThreePo> repeatProductThreeName(String threeName) {
        return this.productThreeDao.repeatProductThreeName(threeName);
    }
}
