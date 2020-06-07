package com.huibo.gf.service;

import com.huibo.gf.bo.ShopBo;
import com.huibo.gf.dao.ShopDao;
import com.huibo.gf.po.RolePo;
import com.huibo.gf.po.ShopPo;
import com.huibo.gf.po.UserPo;
import com.huibo.gf.po.WareHousePo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import static java.util.regex.Pattern.*;

/**
 * 门店资料业务层
 * @author 谢亮
 * @version 1.0
 * @date 2020/5/15
 */
@Service
public class ShopService {
    @Resource
    private ShopDao shopDao;

    public Map<String,Object> getAllShopInformation(Integer page,Integer limit) {
        Map<String, Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        start = (page - 1) * limit;
        /*安分页获取用户的信息*/
        List<ShopPo> shop = this.shopDao.getShop(start, limit);
        /*获取所有门店的信息*/
        List<ShopPo> allShop = this.shopDao.getAllShop();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", allShop.size());
        map.put("data", shop);

        return map;
    }

    public Map<String, Object> getAllWhInformation(Integer page, Integer limit) {
        Map<String, Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        start = (page - 1) * limit;
        /*安分页获取用户的信息*/
        List<WareHousePo> house = this.shopDao.getHouse(start, limit);
        /*获取所有门店的信息*/
        String state = "启用";
        List<WareHousePo> allHouse= this.shopDao.getAllWhNames(state);
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", allHouse.size());
        map.put("data", house);

        return map;
    }

    public Map<String, Object> getAllWhNames() {
        Map<String, Object> map = new HashMap<>(1);
        String state ="启用";
        List<WareHousePo> wareHousePos = this.shopDao.getAllWhNames(state);
        map.put("result",wareHousePos);
        return map;
    }

    public Map<String, Object> getWhNames(String shopecode) {
        Map<String, Object> map = new HashMap<>(1);
        List<WareHousePo> wareHousePos = this.shopDao.getWhNames(shopecode);
        map.put("result",wareHousePos);
        return map;
    }

    public Map<String, Object> getShopNames(String whcode) {
        Map<String, Object> map = new HashMap<>(1);
        List<ShopPo> shopPos = this.shopDao.getShopNames(whcode);
        map.put("result",shopPos);
        return map;
    }

    public List<ShopPo> repeatShopCode(String shopCode) {
        return this.shopDao.repeatShopCode(shopCode);
    }
    public Integer repeatWhCode(String whCode) {
        return this.shopDao.repeatWhCode(whCode);
    }

    public Integer addShop(String shop[], String house[]) {
        ShopPo shopPo = new ShopPo();
        Integer shopCode = Integer.valueOf(shop[0]);
        shopPo.setShopCode(shopCode);
        shopPo.setShopName(shop[1]);
        shopPo.setContact(shop[2]);
        shopPo.setPhone(shop[3]);
        shopPo.setAddress(shop[4]);
        shopPo.setShopState(shop[5]);
        Integer i = this.shopDao.addShop(shopPo);
        //增加该门店的仓库
        if(house.length!=1 && !"无数据".equals(house[0])){
            for (int j = 0; j <house.length ; j++) {
                Integer k = this.shopDao.addShopHouse(shopCode,house[j]);
            }
        }
        return i;
    }

    public Integer deleteShop(String[] shopCode) {
        //删除中间表的对应信息
        this.shopDao.deleteShopForMid(shopCode);
        return this.shopDao.deleteShop(shopCode);
    }

    public Integer editShop(String[] shop, String[] add, String[] delete) {
        ShopPo shopPo = new ShopPo();
        Integer shopCode = Integer.valueOf(shop[0]);
        shopPo.setShopCode(shopCode);
        shopPo.setShopName(shop[1]);
        shopPo.setContact(shop[2]);
        shopPo.setPhone(shop[3]);
        shopPo.setAddress(shop[4]);
        shopPo.setShopState(shop[5]);
        Integer i= this.shopDao.editShop(shopPo);
        //要向中间表添加的门店信息
        String [] houseCode = new String[add.length];
        //要向中间表删除的门店信息
        String [] deleteCode = new String[delete.length];
        if(add.length==1 && "无数据".equals(add[0])){

        }else {
            for (int j = 0; j <add.length ; j++) {
                houseCode[j]=this.shopDao.selectWhCode(add[j]);
            }
            //向中间表添加仓库信息
            for (int j = 0; j <houseCode.length ; j++) {
                int k =  this.shopDao.addShopHouse(shopCode,houseCode[j]);
            }
        }
        if(delete.length==1 && "无数据".equals(delete[0])){

        }else {
            for (int j = 0; j <delete.length ; j++) {
                deleteCode[j]=this.shopDao.selectWhCode(delete[j]);
            }
            //向中间表删除仓库信息
            int k =  this.shopDao.deleteWh(shopCode,deleteCode);
        }
        return i;
    }
//    门店查询
    public Map<String, Object> searchKeyWord(Integer page, Integer limit, String state, String keyWord) {
        Map<String, Object> map = new HashMap<>(1);
        ShopPo shopPo = new ShopPo();
        //最终返回的list数据
        List<ShopPo> endlist = new ArrayList<>();
        //起始数据
        page =(page-1)*limit;
        if("全部".equals(state)){
            state="";
        }
        shopPo.setShopState(state);
        if(keyWord!=""){
            Pattern pattern = compile("[0-9]*");
            boolean matches = pattern.matcher(keyWord).matches();
            if(matches && keyWord.length()==11){
                shopPo.setPhone(keyWord);
            }else if(matches) {
                shopPo.setShopCode(Integer.valueOf(keyWord));
            }else if (matches==false){
                shopPo.setContact(keyWord);
            }
        }
        /*安分页获取用户的信息*/
        List<ShopPo> shop = this.shopDao.searchKeyWord(shopPo);
        if(shop.size()<=limit){
            for (int i = 0; i <shop.size() ; i++) {
                endlist.add(shop.get(i));
            }
        }else {
            for (int i = page; i <shop.size() ; i++) {
                if(i==limit+page || i>=shop.size()){
                    break;
                }else {
                    endlist.add(shop.get(i));
                }
            }
        }
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", endlist.size());
        map.put("data", endlist);
        return map;
    }

    //仓库查询
    public Map<String, Object> searchKeyWordFromWh(Integer page, Integer limit, String state, String keyWord) {
        Map<String, Object> map = new HashMap<>(1);
        WareHousePo housePo = new WareHousePo();
        //最终返回的list数据
        List<WareHousePo> endlist = new ArrayList<>();
        //起始数据
        page =(page-1)*limit;
        if("全部".equals(state)){
            state="";
        }
        housePo.setWhState(state);
        if(keyWord!=""){
            Pattern pattern = compile("[0-9]*");
            boolean matches = pattern.matcher(keyWord).matches();
            if(matches && keyWord.length()==11){
                housePo.setPhone(keyWord);
            }else if(matches) {
                housePo.setWhCode(Integer.valueOf(keyWord));
            }else if (matches==false){
                housePo.setContact(keyWord);
            }
        }
        /*安分页获取用户的信息*/
        List<WareHousePo> shop = this.shopDao.searchKeyWordFromWh(housePo);
        if(shop.size()<=limit){
            for (int i = 0; i <shop.size() ; i++) {
                endlist.add(shop.get(i));
            }
        }else {
            for (int i = page; i <shop.size() ; i++) {
                if(i==limit+page || i>=shop.size()){
                    break;
                }else {
                    endlist.add(shop.get(i));
                }
            }
        }
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", endlist.size());
        map.put("data", endlist);
        return map;
    }

    public Map<String, Object> getAllShopNames() {
        Map<String,Object> map = new HashMap<>(1);
        List<ShopPo> allShop = this.shopDao.getAllShop();
        map.put("result",allShop);
        return map;
    }


    public Integer addHouse(WareHousePo house) {
        return this.shopDao.addHouse(house);
    }

    public Integer deleteWhByCode(String[] whCode) {
        //删除中间表的仓库信息
        Integer i= this.shopDao.deleteWhFromMiddleList(whCode);
        return this.shopDao.deleteWhByCode(whCode);
    }


    public Integer editWh(WareHousePo house) {
        return this.shopDao.editWh(house);
    }
}
