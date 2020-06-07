package com.huibo.gf.dao;

import com.huibo.gf.bo.ShopBo;
import com.huibo.gf.po.ShopPo;
import com.huibo.gf.po.UserPo;
import com.huibo.gf.po.WareHousePo;

import java.util.List;

/**
 * 门店资料实dao层
 * @author 谢亮
 * @version 1.0
 * @date 2020/5/15
 */
public interface ShopDao {

    List<ShopPo> getShop(Integer start, Integer limit);

    List<ShopPo> getAllShop();

    List<WareHousePo> getWhNames(String shopCode);

    List<WareHousePo> getAllWhNames(String state);

    List<ShopPo> repeatShopCode(String shopeCode);

    Integer addShop(ShopPo shopPo);

    Integer addShopHouse( Integer shopCode,String house);

    Integer deleteShop(String[] shopCode);

    void deleteShopForMid(String[] shopCode);

    Integer editShop(ShopPo shopPo);

    String selectWhCode(String s);


    int deleteWh(Integer shopCode,String s[]);

    List<ShopPo> searchKeyWord(ShopPo shopPo);

    List<ShopPo> getShopNames(String whcode);


    List<WareHousePo> getHouse(Integer start, Integer limit);

    Integer repeatWhCode(String whCode);

    Integer addHouse(WareHousePo house);

    Integer deleteWhByCode(String[] whCode);

    Integer deleteWhFromMiddleList(String[] whCode);

    List<WareHousePo> searchKeyWordFromWh(WareHousePo housePo);

    Integer editWh(WareHousePo house);
}
