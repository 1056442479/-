package com.huibo.gf.appraisal.dao;

import com.huibo.gf.appraisal.po.AppraisePo;

import java.util.List;
import java.util.Map;

public interface AppraiseDao {
    List<AppraisePo> getAllAppraiseInformation();

    List<AppraisePo> getAllAppraiseLimit(Integer start, Integer limit);


    Integer addApprise(AppraisePo appraisePo);

    Integer editGoodsState(String goodsId,String state);

    List<AppraisePo> repeatAppraiseCode(String appriseId);

    List<AppraisePo> getAppraisePeopleByGoodsId(String goodsId);
}
