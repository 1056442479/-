package com.huibo.gf.shop.po;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelPo {
    //序号
    private  String channelCode;
    //渠道名
    private String  channelName;
    //手机号
    private String mobile;
    //证件号码，身份证
    private String idNo;
    //银行账户名称
    private String accountName;
    //银行名
    private String bankName;
    //账号
    private String account;
    //会员数量
    private Integer memberCount;
    //累计充值
    private String totalCharge;
    //累计消费
    private  String consume;
    //渠道状态
    private  String channelState;

}
