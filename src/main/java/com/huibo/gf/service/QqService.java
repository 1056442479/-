package com.huibo.gf.service;

import com.huibo.gf.dao.QqDao;
import com.huibo.gf.po.UserPo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class QqService {
    @Resource
    private QqDao qqDao;

    public UserPo getQqUser(String openID) {
        return this.qqDao.getQqUser(openID);
    }
}
