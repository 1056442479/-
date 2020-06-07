package com.huibo.gf.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.huibo.gf.dao.QqDao;
import com.huibo.gf.po.UserPo;
import org.hibernate.validator.internal.engine.messageinterpolation.parser.ELState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * 当登录成功时的操作
 * @author 谢亮
 * @date 2020/5/9
 */
@Component
public class AuthcationSuccessHalder implements AuthenticationSuccessHandler {
    @Autowired
    private QqDao qqDao;
    //spring自带json数据转换器
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        //获取表头，验证是否是ajax登录请求
       String xhr =request.getHeader("X-Requested-With");
       if(xhr!=null && "XMLHttpRequest".equals(xhr)) {
           response.setCharacterEncoding("utf-8");
           response.setContentType("application/json;charset=utf-8");
           Map<String, String> map = new HashMap<>(1);
           map.put("result", "1");
           response.getWriter().write(objectMapper.writeValueAsString(map));
           response.getWriter().flush();
       }else {
           String openid = request.getAttribute("openid").toString();
           if (openid!=null ||openid==""){
               UserPo userPo =this.qqDao.getQqUser(openid);
               if(userPo!=null){
                   response.sendRedirect("/main.html");
               }else{
                   response.sendRedirect("/zhuce.html");
               }
           }else{
               response.sendRedirect("/index.html");
           }
       }
    }
}
