package com.huibo.gf.config;

import org.springframework.security.core.AuthenticationException;

/**
 * 自定义异常，继承org.springframework.security.core.AuthenticationException;
 * @author 谢亮
 * @date 2020/5/9
 */
public class MyCodesException extends AuthenticationException {
    public MyCodesException(String msg) {
        super(msg);
    }
}
