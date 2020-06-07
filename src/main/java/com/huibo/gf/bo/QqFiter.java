package com.huibo.gf.bo;

import org.springframework.lang.Nullable;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.Assert;
import org.springframework.web.client.RestTemplate;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class QqFiter extends AbstractAuthenticationProcessingFilter {

    public static final String SPRING_SECURITY_FORM_CODE_KEY = "code";

    private String codeParameter =SPRING_SECURITY_FORM_CODE_KEY;

    private boolean postOnly = true;

    public QqFiter() {
        super(new AntPathRequestMatcher("/qqlogin", "GET"));
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        if (this.postOnly && !request.getMethod().equals("GET")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        } else {
            String code = this.obtainPhone(request);
            if (code == null) {
                code = "";
            }
            code = code.trim();
            //获取token
            String url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=101780702&client_secret=be3cf79b89eafe3f0b8f90462aed8065&code="+code+"&redirect_uri=http://www.pawntest.com/qqlogin";
            RestTemplate template = new RestTemplate();
            String forObject = template.getForObject(url, String.class);
            String token = forObject.substring(forObject.indexOf("=")+1,forObject.indexOf("&"));
            //获取用户的openID
            url ="https://graph.qq.com/oauth2.0/me?access_token="+token;
            forObject=template.getForObject(url,String.class);
            String openID = forObject.substring(forObject.lastIndexOf(":")+2,forObject.lastIndexOf("\""));
            request.setAttribute("openid",openID);
            QqToken qqToken = new QqToken(openID);
            this.setDetails(request, qqToken);
            return this.getAuthenticationManager().authenticate(qqToken);
        }
    }



    @Nullable
    protected String obtainPhone(HttpServletRequest request) {
        return request.getParameter(this.codeParameter);
    }

    protected void setDetails(HttpServletRequest request, QqToken authRequest) {
        authRequest.setDetails(this.authenticationDetailsSource.buildDetails(request));
    }

    public void setPhoneParameter(String phoneParameter) {
        Assert.hasText(phoneParameter, "Phone parameter must not be empty or null");
        this.codeParameter = phoneParameter;
    }



    public void setPostOnly(boolean postOnly) {
        this.postOnly = postOnly;
    }

    public final String getUsernameParameter() {
        return this.codeParameter;
    }


}
