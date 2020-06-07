package com.huibo.gf.appraisal.dao;


import com.huibo.gf.appraisal.po.IdentifyPo;

import java.util.List;

public interface IdentifyDao {


    List<IdentifyPo> getAllIdentify(String state);

    Integer addIdentify(IdentifyPo identifyPo);

    List<IdentifyPo> getIdentifyPeopleByGoodsId(String goodsId);

    List<IdentifyPo> repeatIdentifyCode(String identifyId);

    Integer updateGoodsState(String goodsId,String state);
}
