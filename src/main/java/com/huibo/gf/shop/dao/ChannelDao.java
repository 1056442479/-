package com.huibo.gf.shop.dao;

import com.huibo.gf.shop.po.ChannelPo;

import java.util.List;

public interface ChannelDao {
    List<ChannelPo> getAllChannelInformation();

    List<ChannelPo> getAllChannel(Integer start, Integer limit);

    Integer addChannel(ChannelPo channelPo);

    Integer repeatChannelCode(String channelCode);

    List<ChannelPo> searchKeyWordFromChannel(String keyWord);

    Integer deleteChannel(String[] channelCode);

    List<ChannelPo> searchChannelByCode(String channelCode);

    Integer editChannel(ChannelPo channelPo);
}
