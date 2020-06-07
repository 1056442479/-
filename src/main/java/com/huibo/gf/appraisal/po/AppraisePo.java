package com.huibo.gf.appraisal.po;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
/**
 * @author 谢亮
 * 商品估价记录
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppraisePo {
    //估价ID
    private String appraiseId;
    //商品ID
    private String goodsId;
    //流程实例ID
    private String proceInstId;
    //官方价
    private String officialPrice;
    //评估价
    private String valuationPrice;
    //典当价
    private String pawnPrice;
    //收购价
    private String pchasePrice;
    //售卖价
    private String sellingPrice;
    //租价
    private String rentalPrice;
    //备注
    private String appraiseDesc;
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
}
