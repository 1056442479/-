package com.huibo.gf.shop.service;

import com.huibo.gf.shop.dao.ChannelDao;
import com.huibo.gf.shop.po.ChannelPo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChannelService {
    @Resource
    private ChannelDao channelDao;

    public Map<String, Object> getAllChannel(Integer page, Integer limit) {
        Map<String,Object> map = new HashMap<>(1);
        //起始数据
        Integer start = 0;
        start = (page-1)*limit;
        /*安分页获取商品大类的信息*/
        List<ChannelPo> roles = this.channelDao.getAllChannel(start,limit);
        /*获取所有商品大类的信息*/
        List<ChannelPo> allRoles= this.channelDao.getAllChannelInformation();
        map.put("code",0);
        map.put("msg","");
        map.put("count",allRoles.size());
        map.put("data",roles);

        return  map;
    }

    public Integer addChannel(ChannelPo channelPo) {
        return this.channelDao.addChannel(channelPo);
    }

    public Integer repeatChannelCode(String channelCode) {
        return this.channelDao.repeatChannelCode(channelCode);
    }

    public Map<String, Object> searchKeyWordFromChannel(String keyWord, Integer page, Integer limit) {
        //最终返回的list数据
        List<ChannelPo> endlist = new ArrayList<>();
        Map<String,Object> map = new HashMap<>(1);
        //查询到的数据
        List<ChannelPo> list = this.channelDao.searchKeyWordFromChannel(keyWord);

        page =(page-1)*limit;
        if(list.size()<limit){
            for (int i = 0; i <list.size() ; i++) {
                endlist.add(list.get(i));
            }
        }else {
            for (int i = page; i <list.size() ; i++) {
                if(i==limit+page || i>=list.size()){
                    break;
                }else {
                    endlist.add(list.get(i));
                }
            }
        }
        //layUI分页必须返回的数据
        map.put("code",0);
        map.put("msg","");
        map.put("count",list.size());
        map.put("data",endlist);
        return  map;
    }

    public Integer deleteChannel(String[] channelCode) {
        return this.channelDao.deleteChannel(channelCode);
    }

    public List<ChannelPo> searchChannelByCode(String channelCode) {
        return this.channelDao.searchChannelByCode(channelCode);
    }

    public Integer editChannel(ChannelPo channelPo) {
        return this.channelDao.editChannel(channelPo);
    }
}
