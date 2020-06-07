package com.huibo.gf.controller;

import com.huibo.gf.bo.CodeTimeBo;
import com.huibo.gf.bo.QqToken;
import com.huibo.gf.po.MeanPo;
import com.huibo.gf.po.UserPo;
import com.huibo.gf.service.UserService;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 谢亮
 * @version 1.0
 * @date 2020/5/8
 */
@RestController
public class UserController  {
    @Resource
    private UserService userService;

    /**
     * 生成验证码
     */
    @RequestMapping("/getImageCode")
    public void imageCode(HttpServletResponse response, HttpServletRequest request) throws IOException {
        BufferedImage bi = new BufferedImage(100, 41, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2 = (Graphics2D) bi.getGraphics();

        g2.setColor(java.awt.Color.white);
        g2.fillRect(0, 0, 100, 50);


        String[] arr = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "s", "d", "f", "g", "h", "j",
                "k", "z", "x", "c", "v", "b", "n", "m"};

        String str = "";

        for (int i = 0; i < 4; i++) {
            int num = (int) (Math.random() * arr.length);
            str += arr[num];
        }
        //设置验证码的过期时间,60秒
        CodeTimeBo code = new CodeTimeBo(str, 60);

        g2.setColor(java.awt.Color.red);
        g2.setFont(new java.awt.Font("楷体", 30, 35));
        g2.drawString(str, 15, 30);

        g2.setColor(java.awt.Color.yellow);
        g2.drawLine(20, 19, 90, 30);
        g2.setColor(java.awt.Color.red);
        g2.drawLine(10, 30, 80, 40);

        //验证码存入session
        request.getSession().setAttribute("imageCode", code);
        response.setContentType("image/jpg");
        //流操作，返回图片
        ImageIO.write(bi, "jpg", response.getOutputStream());
    }

    /**
     * 发送验证码
     *
     * @param phone   手机号码
     * @param request
     * @return
     * @throws IOException
     */
    @GetMapping("/sendCode")
    public Map<String, Object> sendCode(String phone, HttpServletRequest request) throws IOException {
        String str = "";
        Map<String, Object> map = new HashMap<>(1);
        for (int i = 0; i < 4; i++) {
            String num = (int) (Math.random() * 10) + "";
            str = str + num;
        }
        //设置验证码的过期时间,60秒
        CodeTimeBo code = new CodeTimeBo(str, 60);
        System.out.println("成功" + str);
        request.getSession().setAttribute("code", code);
        map.put("code", 1);
        return map;
    }

    /**
     * 更据电话号码，获取用户姓名
     *
     * @param phone 电话号码
     * @return 用户信息
     */
    @RequestMapping("/getUserNameByPhone")
    public Map<String, Object> getUserNameByPhone(String phone) {
        Map<String, Object> map = new HashMap<>(1);
        List<UserPo> list = this.userService.getUserNameByPhone(phone);
        map.put("result", list);
        return map;
    }

    /**
     * 获取所有用户，做分页展示
     *
     * @param page  当前页码
     * @param limit 显示数目
     * @return 用户集合
     */
    @RequestMapping("/getUser")
    public Map<String, Object> getUser(Integer page, Integer limit) {
        return this.userService.getUser(page, limit);
    }

    /**
     * 添加用户
     *
     * @param userPo 用户实体信息
     * @return 用户集合
     */
    @RequestMapping("/addUser")
    public Map<String, Integer> addUser(UserPo userPo) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.addUser(userPo);
        map.put("result", i);
        return map;
    }

    /**
     * 修改用户
     *
     * @param userPo 用户实体信息
     * @return 集合
     */
    @RequestMapping("/updateUser")
    public Map<String, Integer> updateUser(UserPo userPo) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.updateUser(userPo);
        map.put("result", i);
        return map;
    }

    /**
     * 删除用户
     *
     * @param id 用户id数组
     * @return 数字
     */
    @RequestMapping("/deleteUsers")
    public Map<String, Integer> deleteUsers(@RequestParam(value = "id[]") String[] id) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.deleteUsers(id);
        map.put("result", i);
        return map;
    }

    /**
     * 查询用户
     *
     * @param keyWord 关键字
     * @return 集合
     */
    @RequestMapping("/searchUser")
    public Map<String, Object> searchUser(String keyWord, Integer page, Integer limit) {
        return this.userService.searchUser(keyWord, page, limit);
    }

    /**
     * 获得属性表格
     *
     * @return
     */
    @RequestMapping("/tree")
    public Map<String, Object> tree() {
        Map<String, Object> map = new HashMap<>(1);
        List<MeanPo> list = this.userService.getMean();
//        map.put("code",0);
//        map.put("msg","");
//        map.put("count",list.size());
        map.put("data", list);
        return map;
    }

    /**
     * 添加一级菜单
     *
     * @param meanPo 菜单实体信息
     * @return 菜单集合
     */
    @RequestMapping("/addFirstMenu")
    public Map<String, Integer> addFirstMenu(MeanPo meanPo) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.addFirstMenu(meanPo);
        map.put("result", i);
        return map;
    }

    /**
     * 修改级菜单
     *
     * @param meanPo 菜单实体信息
     * @return 菜单集合
     */
    @RequestMapping("/updateMenu")
    public Map<String, Integer> updateMenu(MeanPo meanPo) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.updateMenu(meanPo);
        map.put("result", i);
        return map;
    }

    /**
     * 删除菜单
     *
     * @param ids 菜单的id
     * @return 菜单集合
     */
    @RequestMapping("/deleteMenu")
    public Map<String, Integer> deleteMenu(@RequestParam(value = "id[]") String ids[]) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.deleteMenu(ids);
        map.put("result", i);
        return map;
    }

    /**
     * 添加子集级菜单
     *
     * @param meanPo 菜单实体信息
     * @return 菜单集合
     */
    @RequestMapping("/saveAddChildMenu")
    public Map<String, Integer> saveAddChildMenu(MeanPo meanPo) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.saveAddChildMenu(meanPo);
        map.put("result", i);
        return map;
    }

    /**
     * 验证用户名是否重复
     *
     * @param username 用户名
     * @return 菜单集合
     */
    @RequestMapping("/selectRepeatUserName")
    public Map<String, Integer> selectRepeatUserName(String username) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.selectRepeatUserName(username);
        map.put("result", i);
        return map;
    }

    /**
     * 验证树形表格id名是否重复
     *
     * @param id id
     * @return 菜单集合
     */
    @RequestMapping("/repeatId")
    public Map<String, Integer> repeatId(String id) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.repeatId(id);
        map.put("result", i);
        return map;
    }

    /**
     * 验证添加子菜单时，子菜单是否重复
     *
     * @param id       id
     * @param parentId 父级id
     * @return 菜单集合
     */
    @RequestMapping("/repeatSonId")
    public Map<String, Integer> repeatSonId(String id, String parentId) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.repeatSonId(id, parentId);
        map.put("result", i);
        return map;
    }

    /**
     * 获取所有用户的信息
     *
     * @return 所有用户的信息
     */
    @RequestMapping("/getAllUserInformation")
    public Map<String, Object> getAllUserInformation() {
        Map<String, Object> map = new HashMap<>(1);
        List<UserPo> list = this.userService.getAllUserInformation();
        map.put("result", list);
        return map;
    }

    /**
     * 验证用户输入的原密码是否正确
     *
     * @return 数值
     */
    @RequestMapping("/verifyPassword")
    public Map<String, Object> verifyPassword(String password, String username) {
        Map<String, Object> map = new HashMap<>(1);
        List<UserPo> list = this.userService.verifyPassword(password, username);
        String mi = list.get(0).getPassword();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        boolean matches = bCryptPasswordEncoder.matches(password, mi);
        if (matches) {
            map.put("result", 1);
        } else {
            map.put("result", -1);
        }
        return map;
    }

    /**
     * 修改用户的密码
     *
     * @return 数值
     */
    @RequestMapping("/editUserPassword")
    public Map<String, Integer> editUserPassword(String username, String newPassword) {
        Map<String, Integer> map = new HashMap<>(1);
        Integer i = this.userService.editUserPassword(username, newPassword);
        map.put("result", i);
        return map;
    }

    /**
     * 获取当前登录用户的信息
     * @return 登录用户的信息
     */
    @RequestMapping("/getLogingInformations")
    public Map<String,Object> getLogingInformations(){
        Map<String,Object> map = new HashMap<>(1);
        SecurityContext context = SecurityContextHolder.getContext();
        map.put("result",context);
        return map;
    }

    /**
     * 验证账号是否存在
     * @return 数值
     */
    @RequestMapping("/getUsername")
    public Map<String,Object> getUsername(String username){
        Map<String,Object> map = new HashMap<>(1);
       Integer i = this.userService.getUsername(username);
        map.put("result",i);
        return map;
    }

    /**
     * 验证账号密码是否正确
     * @return 密码
     */
    @RequestMapping("/getPassWord")
    public Map<String,Object> getPassWord(String username,String password){
        Map<String,Object> map = new HashMap<>(1);
        UserPo userPo = this.userService.getPassWord(username);
        String pass = userPo.getPassword();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        boolean matches = bCryptPasswordEncoder.matches(password, pass);
        if(matches){
            map.put("result",1);
        }else {
            map.put("result",-1);
        }
        return map;
    }
    /*
     *  给该账户绑定qq号码
     */
    @RequestMapping("/addUserOpenId")
    public Map<String,Object> addUserOpenId(String username,String openid){
        Map<String,Object> map = new HashMap<>(1);
        Integer i = this.userService.addUserOpenId(username,openid);
        map.put("result",i);
        return map;
    }

    /**
     * 更据用户的openID获取用户信息
     */
    @RequestMapping("/getUserInformationByOpenId")
    public Map<String,Object> getUserInformationByOpenId(String openId){
        Map<String,Object> map = new HashMap<>(1);
        UserPo userPo= this.userService.getUserInformationByOpenId(openId);
        map.put("result",userPo);
        return map;
    }
}
