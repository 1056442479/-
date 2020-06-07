package com.huibo.gf.dao;

import com.huibo.gf.po.UserPo;

public interface QqDao {
    UserPo getQqUser(String openID);

}
