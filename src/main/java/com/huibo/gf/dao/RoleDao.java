package com.huibo.gf.dao;

import com.huibo.gf.po.MeanPo;
import com.huibo.gf.po.RolePo;
import com.huibo.gf.po.UserPo;


import java.util.List;

public interface RoleDao {
    List<RolePo> getAllRoles();

    List<RolePo> getRole(Integer start, Integer limit);

    Integer deleteRoles(String[] id);


    List<RolePo> searchRole(String code, Integer page, Integer limit);

    Integer addRole(String roleid, String rolename, String desc);

    String getUserIdByName(String s);

    int addUserRole(String s, String roleid);

    int deleteRolesFromMid(String[] id);

    List<UserPo> getUserInformationByRoleId(String roleid);

    Integer updateUserRoles(String roleid, String desc, String rolename);

    int deleteUserRole(String s, String roleid);

    List<RolePo>selectRepeatRoleId(String roleid);

    List<RolePo>  selectRepeatRoleName(String rolename);

    Integer addMenuIdRoleName(String rolename, String menuId);

    List<RolePo> getLoginUserRole(String username);

    List<MeanPo> getLoginUserMenu(String rolename[]);

    int deleteMenuIdRoleName(String rolename);
}
