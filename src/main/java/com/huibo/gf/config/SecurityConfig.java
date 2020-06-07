package com.huibo.gf.config;


import com.huibo.gf.bo.*;
import com.huibo.gf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author 谢亮
 * 配置类
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthcationSuccessHalder authcationSuccessHalder;
    @Autowired
    private AuthcationFailureHalder authcationFailureHalder;
    @Autowired
    private ImageCodeFiter imageCodeFiter;
    @Autowired
    private PhoneAuthenticationProvider phoneAuthenticationProvider;
    @Autowired
    private QqProvider qqProvider;
    @Autowired
    private PhoneCodeFiter phoneCodeFiter;


    @Bean
    public PasswordEncoder getPasswordEncoder() {
        //加密函数，参数为长度
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userService);
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.headers().frameOptions().disable();
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        PhoneAuthenticationFilter phoneAuthenticationFilter = new PhoneAuthenticationFilter();
        QqFiter qqFiter =new QqFiter();
        qqFiter.setAuthenticationSuccessHandler(authcationSuccessHalder);
        qqFiter.setAuthenticationManager(authenticationManagerBean());
        phoneAuthenticationFilter.setAuthenticationSuccessHandler(authcationSuccessHalder);
        phoneAuthenticationFilter.setAuthenticationFailureHandler(authcationFailureHalder);
        phoneAuthenticationFilter.setAuthenticationManager(authenticationManagerBean());
        http.headers().contentTypeOptions().disable();
        http.httpBasic().disable()
                //关闭csrf
                .csrf().disable()
                //解决控制台报错Refused to display 'http://127.0.0.1:8070/default_sso_heartbeat.html' in a frame because it set 'X-Frame-Options' to 'DENY'.
                .headers().frameOptions().disable().and()
//                .headers().contentTypeOptions().disable().and()
                .addFilterBefore(qqFiter,UsernamePasswordAuthenticationFilter.class)
                //在某个资源前面添加某个过滤器
                .addFilterBefore(imageCodeFiter, UsernamePasswordAuthenticationFilter.class)
                //在某个资源后面添加某个过滤器
                .addFilterAfter(phoneAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(phoneCodeFiter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                //以下资源不被拦截
                .antMatchers("/getImageCode", "error.html", "/image/**", "/login", "/index.html","/qqlogin","/favicon.ico",
                        "/loginByPhone", "/js/**", "/layui/**", "/css/**", "/sendCode", "/loginByPhone", "user.html").permitAll()
                //拦截所有请求
                .anyRequest().authenticated()
                .and()
                //启用登出功能
                .logout()
                //设置登出访问接口
                .logoutUrl("/logout")
                //清除验证信息
                .clearAuthentication(true)
                //清除session中的信息
                .invalidateHttpSession(true)
                //配置注销后的自定义清除操作
                .addLogoutHandler(new LogoutHandler() {
                    @Override
                    public void logout(HttpServletRequest httpServletRequest,
                                       HttpServletResponse httpServletResponse,
                                       Authentication authentication) {

                    }
                })
                //配置注销后要进行的业务逻辑
                .logoutSuccessHandler(new LogoutSuccessHandler() {
                    @Override
                    public void onLogoutSuccess(HttpServletRequest httpServletRequest,
                                                HttpServletResponse httpServletResponse,
                                                Authentication authentication) throws IOException, ServletException {
                        httpServletResponse.sendRedirect("index.html");
                    }
                })
                .and()
                //表单登录
                .formLogin()
                //自定定义登录页面
                .loginPage("/index.html")
                //访问的url
                .loginProcessingUrl("/login")
                //成功后进行的操作authcationSuccessHalder
                .successHandler(authcationSuccessHalder)
                //失败后进行的操作authcationFailureHalder
                .failureHandler(authcationFailureHalder)
                .and()
                .authenticationProvider(phoneAuthenticationProvider)
                .authenticationProvider(qqProvider);

    }

    public static void main(String[] args) {
        String s = "123";
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encode = bCryptPasswordEncoder.encode(s);
        System.out.println(bCryptPasswordEncoder.matches(encode, s));
    }
}
