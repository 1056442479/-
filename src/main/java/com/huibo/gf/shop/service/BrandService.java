package com.huibo.gf.shop.service;

import com.huibo.gf.shop.dao.BrandDao;
import com.huibo.gf.shop.dao.ProductBigDao;
import com.huibo.gf.shop.po.BrandPo;
import com.huibo.gf.shop.po.ProductBigPo;
import lombok.Data;
import org.springframework.security.web.PortResolverImpl;
import org.springframework.stereotype.Service;
import sun.nio.cs.ext.MacArabic;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class BrandService {
    @Resource
    private BrandDao brandDao;
    @Resource
    private ProductBigDao productBigDao;

    public Map<String, Object> getAllBrand(Integer page, Integer limit) {
        Map<String,Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        start = (page-1)*limit;
        /*安分页获取品牌的信息*/
        List<BrandPo> roles = this.brandDao.getAllBrandLimit(start,limit);
        /*获取所有品牌的信息*/
        List<BrandPo> allRoles= this.brandDao.getAllBrand();
        map.put("code",0);
        map.put("msg","");
        map.put("count",allRoles.size());
        map.put("data",roles);

        return  map;
    }

    public Integer deleteBrand(String[] brandCode) {
        Integer i = this.brandDao.deleteBrandFromMiddle(brandCode);
        return this.brandDao.deleteBrand(brandCode);
    }

    public Map<String, Object> searchKeyWordFromBrand(String keyWord, Integer page, Integer limit) {
        //最终返回的list数据
        List<BrandPo> endlist = new ArrayList<>();
        Map<String,Object> map = new HashMap<>(1);
        //查询到的数据
        List<BrandPo> list = this.brandDao.searchKeyWordFromBrand(keyWord);

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

    public Map<String, Object> getProductBig() {
        Map<String,Object> map = new HashMap<>(1);
        List<ProductBigPo> allProduct = this.productBigDao.getAllProduct();
        map.put("result",allProduct);
        return map;
    }

    public Integer repeatBrandCode(String brandCode) {
        return this.brandDao.repeatBrandCode(brandCode);
    }

    public Integer addBrand(String[] brand, String[] catCode) {
        BrandPo brandPo = new BrandPo();
        brandPo.setBrandCode(brand[0]);
        brandPo.setBrandName(brand[1]);
        brandPo.setFletter(brand[2]);
        brandPo.setSortNo(brand[3]);
        brandPo.setIsShow(brand[4]);
        if(catCode.length==1 && "无数据".equals(catCode[0])){

        }else {
            for (int i = 0; i <catCode.length ; i++) {
                this.brandDao.addBrandFromMid(brand[0],catCode[i]);
            }

        }
        return this.brandDao.addBrand(brandPo);
    }

    public List<BrandPo> getBrandInformation(String brandCode) {
        return this.brandDao.getBrandInformation(brandCode);
    }

    public List<ProductBigPo> getProductByBrandCode(String brandCode) {
        return this.brandDao.getProductByBrandCode(brandCode);
    }

    public Integer updateBrand(String[] brand, String[] addArr, String[] deleteArr) {
        BrandPo brandPo = new BrandPo();
        brandPo.setBrandCode(brand[0]);
        brandPo.setBrandName(brand[1]);
        brandPo.setFletter(brand[2]);
        brandPo.setSortNo(brand[3]);
        brandPo.setIsShow(brand[4]);
        //增加中间表的数据
        if(addArr.length==1 && "无数据".equals(addArr[0])){

        }else {
            for (int i = 0; i <addArr.length ; i++) {
                this.brandDao.addBrandFromMid(brand[0],addArr[i]);
            }
        }
        //删除中间表的数据
        if(deleteArr.length==1 && "无数据".equals(deleteArr[0])){

        }else {
            for (int i = 0; i <deleteArr.length ; i++) {
                Integer integer = this.brandDao.deleteBrandProductFromMiddle(brand[0],deleteArr[i]);
            }

        }
        return this.brandDao.updateBrand(brandPo);
    }

    public List<BrandPo> getProductByGigCode(String catCode) {
        return this.brandDao.getProductByGigCode(catCode);
    }

    public String getBigByCatName(String catName) {
        return this.brandDao.getBigByCatName(catName);
    }

    public List<BrandPo> repeatBrandName(String brandName) {
        return this.brandDao.repeatBrandName(brandName);
    }
}
