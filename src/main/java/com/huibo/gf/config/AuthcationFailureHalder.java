package com.huibo.gf.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 验证失败的配置类
 * @author 谢亮
 */
@Component
public class AuthcationFailureHalder implements AuthenticationFailureHandler {

    //spring自带json数据转换器
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
        //获取表头，验证是否是ajax登录请求
        String xhr =request.getHeader("X-Requested-With");
        if(xhr!=null && "XMLHttpRequest".equals(xhr)) {
            response.setCharacterEncoding("utf-8");
            response.setContentType("application/json;charset=utf-8");
            Map<String, String> map = new HashMap<>(1);
            map.put("result", e.getMessage());
            response.getWriter().write(objectMapper.writeValueAsString(map));
            response.getWriter().flush();
        }else {
            //不是的话直接重定向
            response.sendRedirect("/error.html");
        }
    }
}
