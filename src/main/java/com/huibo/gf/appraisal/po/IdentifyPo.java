package com.huibo.gf.appraisal.po;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
/**
 * @author 谢亮
 * 商品鉴定记录
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IdentifyPo {
    //鉴定序号
    private String identifyId;
    //商品序号
    private String goodsId;
    //流程实例ID
    private String procInstId;
    //新旧程度
    private String goodsQuality;
    //备注
    private String identifyDesc;
    //鉴定结果
    private String identifyResult;
    //创建人
    private String createBy;
    //创建时间
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(timezone = "Asia/Shanghai",pattern = "yyyy-MM-dd")
    private Date createTime;
    //修改人
    private String modifyBy;
    //修改时间
    private Date modifyTime;
    //状态
    private  String identifyState;

}
