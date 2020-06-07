package com.huibo.gf.bo;

import com.huibo.gf.dao.QqDao;
import com.huibo.gf.dao.UserDao;
import com.huibo.gf.po.UserPo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class QqProvider implements AuthenticationProvider {
    @Autowired
    private QqDao qqDao;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException{
        String openid = authentication.getPrincipal().toString();
        //更据电话号码查询，对应的用户信息
        UserPo userPo = this.qqDao.getQqUser(openid);
        if(userPo!=null){
            QqToken qqToken = new QqToken(userPo, null);
            qqToken.setDetails(authentication.getDetails());
            return qqToken;
        }else {
            UserPo userPo1 = new UserPo();
            userPo1.setOpenId(openid);
            QqToken qqToken = new QqToken(userPo1, null);
            qqToken.setDetails(authentication.getDetails());
            return qqToken;
        }
    }




    @Override
    public boolean supports(Class<?> aClass) {
        return QqToken.class.isAssignableFrom(aClass);
    }
}
