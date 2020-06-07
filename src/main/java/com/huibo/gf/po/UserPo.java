package com.huibo.gf.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;

/**
 * 用户实体类
 * @author 谢亮
 * @date 2020/5/8
 * @version 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPo implements UserDetails {
    private Integer id;
    private String username;
    private String password;
    private String phone;
    private String yzm;
    private String sex;
    private String openId;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    /**
     * 判断当前账户是否过期
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 判断当前账户是否锁定
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 判断当前密码是否过期
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 判断当前账户是否可用
     * @return
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

}
