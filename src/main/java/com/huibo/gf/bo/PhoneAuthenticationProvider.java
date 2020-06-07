package com.huibo.gf.bo;

import com.huibo.gf.dao.UserDao;
import com.huibo.gf.po.UserPo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;



@Component
public class PhoneAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private UserDao userDao;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String phone = authentication.getPrincipal().toString();
        //更据电话号码查询，对应的用户信息
        UserPo userPo = this.userDao.getUserByPhone(phone);
        System.out.println(userPo);
        if(userPo!=null){
            PhoneToken phoneToken = new PhoneToken(userPo, null);
            phoneToken.setDetails(authentication.getDetails());
            return phoneToken;
        }
        throw new AuthenticationServiceException("电话号码未注册");
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return PhoneToken.class.isAssignableFrom(aClass);
    }
}
