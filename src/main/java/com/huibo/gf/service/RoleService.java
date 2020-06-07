package com.huibo.gf.service;

import com.huibo.gf.dao.RoleDao;
import com.huibo.gf.po.MeanPo;
import com.huibo.gf.po.RolePo;
import com.huibo.gf.po.UserPo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 角色操作层
 * @author 谢亮
 * @date 2020/5/12
 * @version 1.0
 */
@Service
public class RoleService {
    @Resource
    private RoleDao roleDao;

    public Map<String, Object> getRole(Integer page, Integer limit) {
        Map<String,Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        start = (page-1)*limit;
        /*安分页获取用户的信息*/
        List<RolePo> roles = this.roleDao.getRole(start,limit);
        /*获取所有用户的信息*/
        List<RolePo> allRoles= this.roleDao.getAllRoles();
        map.put("code",0);
        map.put("msg","");
        map.put("count",allRoles.size());
        map.put("data",roles);

        return  map;
    }

    public Integer deleteRoles(String[] id) {
        //删除中间表的角色id
       int i = this.roleDao.deleteRolesFromMid(id);
        return this.roleDao.deleteRoles(id);
    }


    public Map<String, Object> searchRole(String code, Integer page, Integer limit) {
        //最终返回的list数据
        List<RolePo> endlist = new ArrayList<>();
        Map<String,Object> map = new HashMap<>(1);
        //查询到的数据
        List<RolePo> list = this.roleDao.searchRole(code,page,limit);

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

    public Map<String, Object> addUserRoles(String roleid, String desc, String rolename, String[] user) {
        Map<String,Object> map = new HashMap<>(1);
        /*增加角色信息*/
        Integer i = this.roleDao.addRole(roleid,rolename,desc);
        if(user.length==1 && "无数据".equals(user[0]) ){

        }else {
            for (int j = 0; j <user.length ; j++) {
                /*增加用户的角色*/
              int num =  this.roleDao.addUserRole(user[j],roleid);
            }
        }
        map.put("result",i);
        return map;
    }

    public Map<String, Object> getUserInformationByRoleId(String roleid) {
        Map<String,Object> map = new HashMap<>(1);
        List<UserPo> userPos = this.roleDao.getUserInformationByRoleId(roleid);
        map.put("result",userPos);
        return map;
    }

    public Map<String, Object> updateUserRoles(String roleid, String desc, String rolename, String[] deleteArr, String[] addArr) {
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.roleDao.updateUserRoles(roleid,desc,rolename);
        if(deleteArr.length==1 &&"无数据".equals(deleteArr[0])){

        }else{
            for (int j = 0; j <deleteArr.length ; j++) {
                /*删除用户的角色*/
                int num =  this.roleDao.deleteUserRole(deleteArr[j],roleid);
            }
        }
        if(addArr.length==1 && "无数据".equals(addArr[0])){

        }else{
            for (int j = 0; j <addArr.length ; j++) {
                /*删除用户的角色*/
                int num =  this.roleDao.addUserRole(addArr[j],roleid);
            }
        }
        map.put("result",i);
        return map;
    }

    public Map<String, Object> selectRepeatRoleId(String roleid) {
        Map<String,Object> map = new HashMap<>(1);
       List<RolePo> i = this.roleDao.selectRepeatRoleId(roleid);
        map.put("result",i.size());
        return map;
    }

    public Map<String, Object> selectRepeatRoleName(String rolename) {
        Map<String,Object> map = new HashMap<>(1);
        List<RolePo> i  = this.roleDao.selectRepeatRoleName(rolename);
        map.put("result",i.size());
        return map;
    }

    public Map<String, Object> addMenuIdRoleName(String rolename,String menuId[]) {
        Map<String,Object> map = new HashMap<>(1);
        Integer num = 0;
        for (int i = 0; i <menuId.length ; i++) {
            //先删除这个角色的所有菜单信息，避免重复
            int j = this.roleDao.deleteMenuIdRoleName(rolename);
        }
        for (int i = 0; i <menuId.length ; i++) {
            num = this.roleDao.addMenuIdRoleName(rolename,menuId[i]);
        }
        map.put("result",num);
        return map;
    }

    public Map<String, Object> getLoginUserRole(String username) {
        Map<String,Object> map = new HashMap<>(1);
        List<RolePo> list = this.roleDao.getLoginUserRole(username);
        map.put("result",list);
        return map;
    }

    public Map<String, Object> getLoginUserMenu(String rolename[]) {
        Map<String,Object> map = new HashMap<>(1);
        List<MeanPo> list = this.roleDao.getLoginUserMenu(rolename);
        map.put("result",list);
        return map;
    }
}
