package com.huibo.gf.bo;



/**
 * 用于验证码过期时间的对象
 * @author 谢亮
 * @date 2020/5/9
 */
public class CodeTimeBo {
    //值
    private String value;
    //过期时间
    private Long futureTime;

    public CodeTimeBo( String value,Integer second) {
        this.futureTime =System.currentTimeMillis()+second*1000;
        this.value = value;
    }

    public CodeTimeBo() {
    }


    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getFutureTime() {
        return futureTime;
    }

    public void setFutureTime(Long futureTime) {
        this.futureTime = futureTime;
    }
}
