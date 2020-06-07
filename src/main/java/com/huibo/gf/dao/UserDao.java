package com.huibo.gf.dao;

import com.huibo.gf.po.MeanPo;
import com.huibo.gf.po.UserPo;

import javax.annotation.Resource;
import java.util.List;

public interface UserDao {

    UserPo getUserName(String s);

    UserPo getUserByPhone(String phone);

    List<UserPo> getUser(Integer page, Integer limit);

    List<UserPo> getAllUser();

    Integer addUser(UserPo userPo);

    Integer deleteUsers(String[] id);

    Integer updateUser(UserPo userPo);

    List<UserPo> searchById(String keyWord);

    List<UserPo> searchByName(String keyWord);

    List<UserPo> getUserNameByPhone(String phone);

    List<MeanPo> getMean();

    Integer addFirstMenu(MeanPo meanPo);

    Integer updateMenu(MeanPo meanPo);

    Integer deleteMenu(String[] ids);


    Integer selectRepeatUserName(String username);

    Integer repeatId(String id);

    void deleteMenuFromMid(String[] ids);

    Integer repeatSonId(String ids);

    List<UserPo> verifyPassword(String password, String username);

    Integer editUserPassword(String username, String m);

    Integer getUsername(String username);

    Integer addUserOpenId(String username, String openid);

    UserPo selectUserName(String username);

    UserPo getUserInformationByOpenId(String openId);

    UserPo getPassWord(String username);
}
