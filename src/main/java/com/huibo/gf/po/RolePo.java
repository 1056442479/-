package com.huibo.gf.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 角色实体类
 * @author 谢亮
 * @version 1.0
 * @date 2020/5/12
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RolePo {
    private String roleid;
    private String rolename;
    private String desc;
}
