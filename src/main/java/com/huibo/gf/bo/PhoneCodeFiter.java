package com.huibo.gf.bo;

import com.huibo.gf.config.AuthcationFailureHalder;
import com.huibo.gf.config.MyCodesException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class PhoneCodeFiter extends OncePerRequestFilter {
    @Autowired
    private AuthcationFailureHalder fh;


    private void validate(HttpServletRequest httpServletRequest) throws AuthenticationException {
        //前端表单的name属性
        String ic = httpServletRequest.getParameter("code");
        System.out.println(ic);
        //判断是否为空
        if(ic==null || "".equals(ic.trim())){
            throw new MyCodesException("短信验证码为空");
        }else {
            //从session中取出imageCode的验证码，在usercontroller里可查。
            Object code = httpServletRequest.getSession().getAttribute("code");
            CodeTimeBo c = (CodeTimeBo)code;
            if(c==null){
                throw new MyCodesException("短信验证码为空");
            }else if(!ic.equals(c.getValue())){
                System.out.println(c.getValue());
                throw new MyCodesException("验证码不匹配");
            }
        }
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        //判断请求是否是login请求，是就拦截，不是就放行
        if(httpServletRequest.getRequestURI().equals("/loginByPhone")){
            try {
                //验证码是否通过验证，即有无异常产生
                validate(httpServletRequest);
                //无异常，就通过，进行号码验证
                filterChain.doFilter(httpServletRequest,httpServletResponse);
            }catch (AuthenticationException e){
                fh.onAuthenticationFailure(httpServletRequest,httpServletResponse,e);
            }
        }else {
            //其他的url
            filterChain.doFilter(httpServletRequest,httpServletResponse);
        }

    }
}
