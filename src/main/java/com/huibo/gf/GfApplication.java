package com.huibo.gf;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * @author 谢亮
 */
@SpringBootApplication
@MapperScan("com.huibo.gf.dao,com.huibo.gf.shop.dao,com.huibo.gf.appraisal.dao")
public class GfApplication {

    public static void main(String[] args) {
        SpringApplication.run(GfApplication.class, args);
    }

}
