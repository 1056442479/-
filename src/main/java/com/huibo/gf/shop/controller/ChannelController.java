package com.huibo.gf.shop.controller;

import com.huibo.gf.shop.po.ChannelPo;
import com.huibo.gf.shop.service.ChannelService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ChannelController {
    @Resource
    private ChannelService channelService;

    /**
     * 获取商品渠道商的信息
     * @return 渠道商的信息
     */
    @RequestMapping("/getAllChannel")
    public Map<String,Object> getAllChannel(Integer page, Integer limit){
        return this.channelService.getAllChannel(page,limit);
    }
    /**
     * 验证编码是否重复
     * @return 数值
     */
    @RequestMapping("/repeatChannelCode")
    public Map<String,Object> repeatChannelCode(String channelCode){
        Map<String,Object> map=new HashMap<>(1);
        Integer i = this.channelService.repeatChannelCode(channelCode);
        map.put("result",i);
        return map;
    }

    /**
     * 获取渠道商的信息
     * @return 渠道商的信息
     */
    @RequestMapping("/addChannel")
    public Map<String,Object> addChannel(ChannelPo channelPo){
        Map<String,Object> map=new HashMap<>(1);
        Integer i = this.channelService.addChannel(channelPo);
        map.put("result",i);
        return map;
    }
    /**
     * 查询渠道商的信息
     * @return 渠道商的信息
     */
    @RequestMapping("/searchKeyWordFromChannel")
    public Map<String,Object> searchKeyWordFromChannel(String keyWord,Integer page,Integer limit){
        return this.channelService.searchKeyWordFromChannel(keyWord,page,limit);
    }

    /**
     * 删除渠道商的信息
     * @return 数值
     */
    @RequestMapping("/deleteChannel")
    public Map<String,Object> deleteChannel(@RequestParam(value = "channelCode[]") String [] channelCode){
        Map<String,Object> map=new HashMap<>(1);
        Integer i = this.channelService.deleteChannel(channelCode);
        map.put("result",i);
        return map;
    }
    /**
     * 按编号查询渠道的信息
     * @return 渠道信息
     */
    @RequestMapping("/searchChannelByCode")
    public Map<String,Object> searchChannelByCode(String channelCode){
        Map<String,Object> map=new HashMap<>(1);
        List<ChannelPo> list = this.channelService.searchChannelByCode(channelCode);
        map.put("result",list);
        return map;
    }


    /**
     * 修改渠道商的信息
     * @return 数值
     */
    @RequestMapping("/editChannel")
    public Map<String,Object> editChannel(ChannelPo channelPo){
        Map<String,Object> map=new HashMap<>(1);
        Integer i = this.channelService.editChannel(channelPo);
        map.put("result",i);
        return map;
    }

}
