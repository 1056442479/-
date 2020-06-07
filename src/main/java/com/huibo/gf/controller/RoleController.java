package com.huibo.gf.controller;

import com.huibo.gf.service.RoleService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 谢亮
 * @version 1.0
 * @date  2020/5/8
 */
@RestController
public class RoleController {
    @Resource
    private RoleService roleService;

    /**
     * 获取所有角色信息
     * @param page 当前页码
     * @param limit 当前页条数
     * @return 角色集合
     */
    @RequestMapping("/getRole")
    public Map<String,Object> getRole(Integer page,Integer limit){
        return this.roleService.getRole(page,limit);
    }

    /**
     * 删除角色信息
     * @param id 要删除角色信息的id数组
     * @return 数值
     */
    @RequestMapping("/deleteRoles")
    public Map<String,Integer>  deleteRoles(@RequestParam(value = "roleid[]") String [] id){
        Map<String,Integer> map = new HashMap<>(1);
        Integer i = this.roleService.deleteRoles(id);
        map.put("result",i);
        return map;
    }
    /**
     * 查询角色信息
     * @param roleid 要查询角色信息的编号
     * @return 角色信息集合
     */
    @RequestMapping("/searchRole")
    public Map<String,Object>  searchRole(String roleid,Integer page,Integer limit){
        return this.roleService.searchRole(roleid,page,limit);
    }

    /**
     * 增加角色信息，和添加用户角色
     * @param roleid 角色id
     * @param desc 角色描述
     * @param rolename 角色名称
     *  @param user 用户数组
     * @return 数值
     */
    @RequestMapping("/addUserRoles")
    public Map<String,Object>  addUserRoles(String roleid,String desc,String rolename,@RequestParam(value = "user[]") String [] user){
        return this.roleService.addUserRoles(roleid,desc,rolename,user);
    }

    /**
     * 更据roleid得到其用户信息
     * @param roleid
     * @return
     */
    @RequestMapping("/getUserInformationByRoleId")
    public Map<String,Object>  getUserInformationByRoleId(String roleid){
        return this.roleService.getUserInformationByRoleId(roleid);
    }

    /**
     * 修改角色信息，并更改用户角色信息
     * @param roleid
     * @return
     */
    @RequestMapping("/updateUserRoles")
    public Map<String,Object>  updateUserRoles(String roleid,String desc,String rolename,@RequestParam(value = "addArr[]") String [] addArr,
                                               @RequestParam(value = "deleteArr[]") String [] deleteArr){
        return this.roleService.updateUserRoles(roleid,desc,rolename,deleteArr,addArr);

    }
    /**
     * 查询角色id是否重复
     * @param roleid 角色编号
     * @return 数值
     */
    @RequestMapping("/selectRepeatRoleId")
    public Map<String,Object>  selectRepeatRoleId(String roleid){
        return this.roleService.selectRepeatRoleId(roleid);
    }
    /**
     * 查询角色名称是否重复
     * @param rolename 角色名称
     * @return 数值
     */
    @RequestMapping("/selectRepeatRoleName")
    public Map<String,Object>  selectRepeatRoleName(String rolename){
        return this.roleService.selectRepeatRoleName(rolename);
    }
    /**
     * 增加角色能查看的窗口信息
     * @param rolename 角色名称
     * @param menuId 菜单的id
     * @return 数值
     */
    @RequestMapping("/addMenuIdRoleName")
    public Map<String,Object>  addMenuIdRoleName(String rolename, @RequestParam(value = "menuId[]") String menuId[]){
        return this.roleService.addMenuIdRoleName(rolename,menuId);
    }

    /**
     * 跟据用户的账号名查找对应的角色名
     * @param username 账号名
     * @return 角色信息
     */
    @RequestMapping("/getLoginUserRole")
    public Map<String,Object> getLoginUserRole(String username){
        return this.roleService.getLoginUserRole(username);
    }
    /**
     * 跟据用户的角色名名查找对应的菜单信息
     * @param rolename 角色名
     * @return 菜单信息
     */
    @RequestMapping("/getLoginUserMenu")
    public Map<String,Object> getLoginUserMenu(@RequestParam(value = "rolename[]") String rolename[]){
        return this.roleService.getLoginUserMenu(rolename);
    }


}
