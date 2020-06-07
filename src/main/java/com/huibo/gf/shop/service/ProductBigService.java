package com.huibo.gf.shop.service;

import com.huibo.gf.shop.dao.ProductBigDao;
import com.huibo.gf.shop.po.ProductBigPo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductBigService {
    @Resource
    private ProductBigDao productBigDao;

    public Map<String, Object> getAllProductBig(Integer page, Integer limit) {
        Map<String,Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        start = (page-1)*limit;
        /*安分页获取商品大类的信息*/
        List<ProductBigPo> roles = this.productBigDao.getProduct(start,limit);
        /*获取所有商品大类的信息*/
        List<ProductBigPo> allRoles= this.productBigDao.getAllProduct();
        map.put("code",0);
        map.put("msg","");
        map.put("count",allRoles.size());
        map.put("data",roles);

        return  map;
    }

    public Integer repeatProductBigCode(String catCode) {
        return this.productBigDao.repeatProductBigCode(catCode);
    }

    public Integer addProductBig(String [] product, String json) {
        ProductBigPo productBigPo = new ProductBigPo();
        productBigPo.setCatCode(product[0]);
        productBigPo.setCatName(product[1]);
        productBigPo.setCatLvl(product[2]);
        productBigPo.setCatDesc(product[3]);
        productBigPo.setEvalPicDef(json);
        return  this.productBigDao.addProductBig(productBigPo);
    }

    public Integer deleteProductBig(String[] productCode) {
        return this.productBigDao.deleteProductBig(productCode);
    }

    public Map<String,Object> searchProductBigByKeyWord(String keyWord,Integer page,Integer limit) {
        //最终返回的list数据
        List<ProductBigPo> endlist = new ArrayList<>();
        Map<String,Object> map = new HashMap<>(1);
        //查询到的数据
        List<ProductBigPo> list = this.productBigDao.searchProductBigByKeyWord(keyWord);

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

    public List<ProductBigPo> getProductByCode(String whcode) {
        return this.productBigDao.getProductByCode(whcode);
    }

    public Integer editProductBig(String[] product, String json) {
        ProductBigPo productBigPo = new ProductBigPo();
        productBigPo.setCatCode(product[0]);
        productBigPo.setCatName(product[1]);
        productBigPo.setCatLvl(product[2]);
        productBigPo.setCatDesc(product[3]);
        productBigPo.setEvalPicDef(json);
        return  this.productBigDao.editProductBig(productBigPo);
    }

    public List<ProductBigPo> getProductByCatName(String catName) {
        return this.productBigDao.getProductByCatName(catName);
    }
}
