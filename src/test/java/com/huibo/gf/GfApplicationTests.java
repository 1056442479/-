package com.huibo.gf;

import com.huibo.gf.appraisal.dao.GoodsDao;
import com.huibo.gf.appraisal.po.GoodsPo;
import com.huibo.gf.bo.ShopBo;
import com.huibo.gf.dao.RoleDao;
import com.huibo.gf.dao.ShopDao;
import com.huibo.gf.dao.UserDao;
import com.huibo.gf.po.RolePo;
import com.huibo.gf.po.ShopPo;
import com.huibo.gf.po.UserPo;
import com.huibo.gf.po.WareHousePo;
import com.huibo.gf.shop.dao.ProductBigDao;
import com.huibo.gf.shop.po.ProductBigPo;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
class GfApplicationTests {
    @Resource
    private UserDao userDao;
    @Resource
    private RoleDao roleDao;
    @Resource
    private ShopDao shopDao;
    @Resource
    private ProductBigDao productBigDao;
    @Resource
    private GoodsDao goodsDao;

    @Test
    void testGetUserName() {
        UserPo admin = this.userDao.getUserName("admin");
        System.out.println(admin);
    }

    @Test
    void testGetUser() {
        List<UserPo> list = this.userDao.getUser(0, 10);
        list.forEach(e -> {
            System.out.println(e);
        });
    }

    @Test
    void testAddUser() {
        UserPo userPo = new UserPo(null, "张三", "123", "123", null, "男",null);
        Integer integer = this.userDao.addUser(userPo);
        System.out.println(integer);
    }

    @Test
    public void testSelectRepeatUserName() {
        Integer i = this.userDao.selectRepeatUserName("张三");
        System.out.println(i);
    }

//    @Test
//    void testAddRole() {
//        int i = this.roleDao.addRole("sd", "sd", "sd");
//        System.out.println(i);
//    }

    @Test
    void testAddUserRole() {
        int i = this.roleDao.addUserRole("sd", "张三");
        System.out.println(i);
    }

    @Test
    void testDeleteRolesFromMid() {
        String arr[] = new String[1];
        arr[0] = "wo";
        int i = this.roleDao.deleteRolesFromMid(arr);
        System.out.println(i);
    }

    @Test
    void testGetUserInformationByRoleId() {
        List<UserPo> i = this.roleDao.getUserInformationByRoleId("admin");
        System.out.println(i);
    }

    @Test
    void testUpdateUserRoles() {
        Integer i = this.roleDao.updateUserRoles("萨达", "sdsd", "sd萨达");
        System.out.println(i);
    }

    @Test
    void testDeleteUserRole() {
        Integer i = this.roleDao.deleteUserRole("张三", "admin");
        System.out.println(i);
    }

    @Test
    void testSelectRepeatRoleId() {
        List<RolePo> i = this.roleDao.selectRepeatRoleId("admin");
        System.out.println(i);
    }

    @Test
    void testDeleteMenuIdRoleName() {
        int i = this.roleDao.deleteMenuIdRoleName("admin");
        System.out.println(i);
    }

    @Test
    @Transactional
    @Rollback(true)
    void testEditUserPassword() {
        int i = this.userDao.editUserPassword("李四", "123");
        System.out.println(i);
    }
    @Test
    void getUserInformationByOpenId() {
        UserPo userPo= this.userDao.getUserInformationByOpenId("9BD525739959DC32A8191283DCC240C1");
        System.out.println(userPo);
    }

    @Test
    void getAllWhNames() {
        String s ="启用";
       List<WareHousePo> shopBos = this.shopDao.getAllWhNames(s);
        for (int i = 0; i <shopBos.size(); i++) {
            System.out.println(shopBos.get(i).getWhName());
        }
    }
    @Test
    void getWhNames() {
        List<WareHousePo> shopBos = this.shopDao.getWhNames("1");
        for (int i = 0; i <shopBos.size(); i++) {
            System.out.println(shopBos.get(i).getWhName());
        }
    }
    @Test
    @Transactional
    @Rollback(true)
    void testAddShopHouse() {
        Integer i = this.shopDao.addShopHouse(1,"5");
        System.out.println(i);
    }
    @Test
    @Transactional
    @Rollback(true)
    void testDeleteWh() {
        String [] arr = {"1","2"};
        Integer i = this.shopDao.deleteWh(1,arr);
        System.out.println(i);
    }
    @Test
    void getSearchKeyWord() {
        ShopPo shopPo = new ShopPo();
        shopPo.setShopCode(1);
        List<ShopPo> shopBos = this.shopDao.searchKeyWord(shopPo);
        for (int i = 0; i <shopBos.size(); i++) {
            System.out.println(shopBos.get(i));
        }
    }
    @Test
    void getGetAllProduct() {
        List<ProductBigPo> shopBos = this.productBigDao.getAllProduct();
        for (int i = 0; i <shopBos.size(); i++) {
            System.out.println(shopBos.get(i));
        }
    }
    @Test
    @Transactional
    @Rollback(true)
    void testAddProductBig() {
        ProductBigPo productBigPo = new ProductBigPo();
        productBigPo.setCatLvl("sd");
        productBigPo.setCatDesc("sd");
        productBigPo.setCatName("sdsad");
        productBigPo.setCatCode("11");
        productBigPo.setEvalPicDef("sd");
        Integer i = this.productBigDao.addProductBig(productBigPo);
        System.out.println(i);
    }
    @Test
    void getSearchProductBigByKeyWordt() {
        List<ProductBigPo> shopBos = this.productBigDao.searchProductBigByKeyWord("表");
        for (int i = 0; i <shopBos.size(); i++) {
            System.out.println(shopBos.get(i));
        }
    }
    @Test
    @Transactional
    @Rollback(true)
    void testEditProductBig() {
        ProductBigPo productBigPo = new ProductBigPo();
        productBigPo.setCatLvl("sd");
        productBigPo.setCatDesc("sd");
        productBigPo.setCatName("sdsad");
        productBigPo.setCatCode("1");
        productBigPo.setEvalPicDef("sd");
        Integer i = this.productBigDao.editProductBig(productBigPo);
        System.out.println(i);
    }

    @Test
    void testGetAllGoods(){
        List<GoodsPo> allGoods = this.goodsDao.getAllGoods();
        allGoods.forEach(e->{
            System.out.println(e);
        });
    }
    @Test
    void testSearchGigBYGoodsId(){
        List<ProductBigPo> allGoods = this.goodsDao.searchGigBYGoodsId("1");
        allGoods.forEach(e->{
            System.out.println(e);
        });
    }
    @Test
    void testGetGoodsByKeyWord(){
        GoodsPo goodsPo = new GoodsPo();
        goodsPo.setGoodsId("1");
        List<GoodsPo> allGoods = this.goodsDao.getGoodsByKeyWord("1",null,null,"2020-5-5","20201-5-5");
        allGoods.forEach(e->{
            System.out.println(e);
        });
    }


}
