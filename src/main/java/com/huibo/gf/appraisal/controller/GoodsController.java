package com.huibo.gf.appraisal.controller;

import com.huibo.gf.appraisal.service.GoodsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 谢亮
 */
@RestController
public class GoodsController {
    @Resource
    private GoodsService goodsService;


    /**
     * 获取商品的信息
     * @return 商品的信息
     */
    @RequestMapping("/getAllGoods")
    public Map<String,Object> getAllGoods(Integer page, Integer limit){
        return this.goodsService.getAllGoods(page,limit);
    }
    /**
     * 获取商品的分类信息
     * @return 商品的分类信息
     */
    @RequestMapping("/getClassificationByGoodsCode")
    public Map<String,Object> getClassificationByGoodsCode(String goodsCode){
        return this.goodsService.getClassificationByGoodsCode(goodsCode);
    }

    /**
     * 更据关键字获取商品的信息
     * @return 商品的信息
     */
    @RequestMapping("/searchKeyWordFromGoods")
    public Map<String,Object> searchKeyWordFromGoods(Integer page, Integer limit,String goodsId,String goodsState,String inputUser,String startTime,String endTime){
        return this.goodsService.searchKeyWordFromGoods(page,limit,goodsId,goodsState,inputUser,startTime,endTime);
    }
    /**
     * 更据ID删除商品的信息
     * @param  goodsId 商品的ID数组
     * @return 商品的信息
     */
    @RequestMapping("/deleteGoodsByCode")
    public Map<String,Object> deleteGoodsByCode(@RequestParam(value = "goodsId[]") String [] goodsId){
        return this.goodsService.deleteGoodsByCode(goodsId);
    }
    /**
     * 根据ID获取商品的信息
     * @return 商品的信息
     */
    @RequestMapping("/repeatGoodsId")
    public Map<String,Object> repeatGoodsId(String goodsId){
        return this.goodsService.repeatGoodsId(goodsId);
    }

    /**
     * 文件上传
     * @param upFile
     * @return
     * @throws IOException
     */
    @RequestMapping("/upFiles")
    public Map<String,Object> up1(@RequestParam(value = "file") MultipartFile[] upFile) throws IOException {
        Map<String,Object> map = new HashMap<>(1);
        //文件路劲名保存的数组
        String files [] = new String[upFile.length];
        if(upFile!=null && upFile.length>0){
            String path = this.getClass().getResource("/").toString();
            path = path.replace("WEB-INF/classes","");
            path = path.replace("file:/","");
            path = path+"static/ups/";

            int num = 0;
            for (MultipartFile mf: upFile) {
                if (!mf.isEmpty()) {
                    files[num] = new File(mf.getOriginalFilename()).toString();
                    mf.transferTo(new File(path + mf.getOriginalFilename()));
                    num++;
                }
            }
            map.put("file",files);
        }
        return map;
    }

    /**
     * 新增商品信息
     * @param  goods 商品的信息
     * @param  attr 属性信息数组
     * @param json  路径字符串
     * @return 商品的信息
     */
    @RequestMapping("/addGoods")
    public Map<String,Object> addGoods(@RequestParam(value = "goods[]") String [] goods,
                                       @RequestParam(value = "attr[]") String [] attr,
                                       @RequestParam(value = "attrCode[]") String [] attrCode,
                                       String json) throws ParseException {
        return this.goodsService.addGoods(goods,attr,json,attrCode);
    }
    /**
     * 修改商品信息
     * @param  goods 商品的信息
     * @param  attr 属性信息数组
     * @param json  路径字符串
     * @return 商品的信息
     */
    @RequestMapping("/editGoods")
    public Map<String,Object> editGoods(@RequestParam(value = "goods[]") String [] goods,
                                       @RequestParam(value = "attr[]") String [] attr,
                                       @RequestParam(value = "attrCode[]") String [] attrCode,
                                       String json) throws ParseException {
        return this.goodsService.editGoods(goods,attr,json,attrCode);
    }
    /**
     * 更据ID查询商品的属性
     * @param  goodsId 商品的ID
     * @return 商品的属性信息
     */
    @RequestMapping("/getAttrByGoodsId")
    public Map<String,Object> getAttrByGoodsId( String goodsId){
        return this.goodsService.getAttrByGoodsId(goodsId);
    }
    /**
     * 更据ID改变商品的状态
     * @param  goodsId 商品的ID
     * @return 数值
     */
    @RequestMapping("/updateGoodsSate")
    public Map<String,Object> updateGoodsSate(@RequestParam(value = "goodsId[]") String [] goodsId){
        return this.goodsService.updateGoodsSate(goodsId);
    }


}

