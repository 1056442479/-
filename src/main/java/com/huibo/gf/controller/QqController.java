//package com.huibo.gf.controller;
//
//import com.huibo.gf.po.UserPo;
//import com.huibo.gf.service.QqService;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestTemplate;
//
//import javax.annotation.Resource;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
///**
// * @author 谢亮
// * @version 1.0
// * @date  2020/5/8
// */
//@RestController
//public class QqController {
//    @Resource
//    private QqService qqService;
//
//    @RequestMapping("/qqlogin")
//    public void redirectQqUrl(String code, HttpServletRequest request, HttpServletResponse response) throws IOException {
//        //1、发请求获取code
//        System.out.println(code);
//        //获取token
//        String url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=101780702&client_secret=be3cf79b89eafe3f0b8f90462aed8065&code="+code+"&redirect_uri=http://www.pawntest.com/qqlogin";
//        RestTemplate template = new RestTemplate();
//        String forObject = template.getForObject(url, String.class);
//        String token = forObject.substring(forObject.indexOf("=")+1,forObject.indexOf("&"));
//       //获取用户的openID
//        url ="https://graph.qq.com/oauth2.0/me?access_token="+token;
//        forObject=template.getForObject(url,String.class);
//        String openID = forObject.substring(forObject.lastIndexOf(":")+2,forObject.lastIndexOf("\""));
//        //获取用户的信息
//        url="https://graph.qq.com/user/get_user_info?access_token="+token+"&oauth_consumer_key=101780702&openid="+openID;
//        forObject=template.getForObject(url,String.class);
//        UserPo userPo = this.qqService.getQqUser(openID);
//        if(userPo!=null){
//           response.sendRedirect("main.html");
//        }
//    }
//}
