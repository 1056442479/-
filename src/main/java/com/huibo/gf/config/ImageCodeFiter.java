package com.huibo.gf.config;

import com.huibo.gf.bo.CodeTimeBo;
import com.huibo.gf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.security.core.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 自定义验证码验证过滤器
 * @author 谢亮
 * @date 2020/5/9
 */
@Component
public class ImageCodeFiter extends OncePerRequestFilter {

    @Autowired
    private AuthcationFailureHalder fh;


    private void validate(HttpServletRequest httpServletRequest) throws AuthenticationException {
        //前端表单的name属性
        String ic = httpServletRequest.getParameter("yzm");
        //判断是否为空
        if(ic==null || "".equals(ic.trim())){
            throw new MyCodesException("没有输入验证码");
        }else {
            //从session中取出imageCode的验证码，在usercontroller里可查。
            Object imageCode = httpServletRequest.getSession().getAttribute("imageCode");
            if(imageCode==null){
                throw new MyCodesException("验证码为空");
            }else {
                //判断验证码是否过期
                CodeTimeBo code = (CodeTimeBo)imageCode;
                if(System.currentTimeMillis()>code.getFutureTime()){
                    httpServletRequest.getSession().removeAttribute("imageCode");
                    throw new MyCodesException("验证码已过期");
                    //判断验证码是否匹配
                }else if(!ic.equals(code.getValue())){
                    throw new MyCodesException("验证码不匹配");
                }

            }
        }
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        //判断请求是否是login请求，是就拦截，不是就放行
        if(httpServletRequest.getRequestURI().equals("/login")){
          try {
              //验证码是否通过验证，即有无异常产生
              validate(httpServletRequest);
              //无异常，就通过，进行用户名密码验证
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
