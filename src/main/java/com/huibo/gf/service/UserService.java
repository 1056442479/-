package com.huibo.gf.service;

import com.huibo.gf.dao.UserDao;
import com.huibo.gf.po.MeanPo;
import com.huibo.gf.po.UserPo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 谢亮
 * @version 1.0
 * @date 2020/5/8
 */
@Service
public class UserService implements UserDetailsService {
    @Resource
    private UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserPo user = this.userDao.getUserName(username);
        if (user != null) {
            return user;
        } else {
            throw new UsernameNotFoundException("账号不存在");
        }

    }

    /**
     * 获取用户 分页信息
     *
     * @param page  当前页
     * @param limit 当前页的数量
     * @return map
     */
    public Map<String, Object> getUser(Integer page, Integer limit) {
        Map<String, Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        start = (page - 1) * limit;
        /*安分页获取用户的信息*/
        List<UserPo> userPos = this.userDao.getUser(start, limit);
        /*获取所有用户的信息*/
        List<UserPo> allUser = this.userDao.getAllUser();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", allUser.size());
        map.put("data", userPos);

        return map;
    }

    public Integer addUser(UserPo userPo) {
        //对密码进行加密
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String password = userPo.getPassword();
        String newpassword = bCryptPasswordEncoder.encode(password);
        userPo.setPassword(newpassword);
        Integer i = this.userDao.addUser(userPo);
        return i;
    }


    public Integer deleteUsers(String[] id) {
        return this.userDao.deleteUsers(id);
    }

    public Integer updateUser(UserPo userPo) {
        return this.userDao.updateUser(userPo);
    }


    public Map<String, Object> searchUser(String keyWord, Integer page, Integer limit) {
        //查询到的数据
        List<UserPo> list = new ArrayList<>();
        //最终返回的list数据
        List<UserPo> endlist = new ArrayList<>();
        Map<String, Object> map = new HashMap<>(1);
        //判断是否是数字
        boolean isNum = keyWord.matches("[0-9]+");
        if (isNum) {
            list = this.userDao.searchById(keyWord);
        } else {
            list = this.userDao.searchByName(keyWord);
        }
        page = (page - 1) * limit;
        if (list.size() < limit) {
            for (int i = 0; i < list.size(); i++) {
                endlist.add(list.get(i));
            }
        } else {
            for (int i = page; i < list.size(); i++) {
                if (i == limit + page || i >= list.size()) {
                    break;
                } else {
                    endlist.add(list.get(i));
                }
            }
        }
        //layUI分页必须返回的数据
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", list.size());
        map.put("data", endlist);
        return map;
    }

    public List<UserPo> getUserNameByPhone(String phone) {
        return this.userDao.getUserNameByPhone(phone);
    }

    public List<MeanPo> getMean() {
        return this.userDao.getMean();
    }

    public Integer addFirstMenu(MeanPo meanPo) {
        meanPo.setPid("0");
        return this.userDao.addFirstMenu(meanPo);
    }

    public Integer updateMenu(MeanPo meanPo) {
        return this.userDao.updateMenu(meanPo);
    }

    public Integer deleteMenu(String[] ids) {
        //删除中间表的菜单id
        this.userDao.deleteMenuFromMid(ids);
        return this.userDao.deleteMenu(ids);
    }

    public Integer saveAddChildMenu(MeanPo meanPo) {
        //父级的id
        String id = meanPo.getPid();
        //子集的id
        String child = meanPo.getId();
        //最终子集的id，格式父id-子id
        String end = id + "-" + child;
        meanPo.setId(end);
        meanPo.setPid(id);
        return this.userDao.addFirstMenu(meanPo);
    }

    public Integer selectRepeatUserName(String username) {
        return this.userDao.selectRepeatUserName(username);
    }

    public Integer repeatId(String id) {
        return this.userDao.repeatId(id);
    }

    public List<UserPo> getAllUserInformation() {
        return this.userDao.getAllUser();
    }

    public Integer repeatSonId(String id, String parentId) {
        //最终子菜单的id
        String ids = parentId + "-" + id;
        return this.userDao.repeatSonId(ids);
    }

    public List<UserPo> verifyPassword(String password, String username) {
        return this.userDao.verifyPassword(password, username);
    }

    public Integer editUserPassword(String username, String newPassword) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String m = bCryptPasswordEncoder.encode(newPassword);
        Integer i = this.userDao.editUserPassword(username, m);
        System.out.println(i);
        return i;
    }

    public Integer getUsername(String username) {
        return this.userDao.getUsername(username);
    }

    public Integer addUserOpenId(String username, String openid) {
        return this.userDao.addUserOpenId(username,openid);
    }

    public UserPo selectUserName(String username) {
        return this.userDao.selectUserName(username);
    }

    public UserPo getUserInformationByOpenId(String openId) {
        return this.userDao.getUserInformationByOpenId(openId);
    }

    public UserPo getPassWord(String username) {
        return this.userDao.getPassWord(username);
    }
}
