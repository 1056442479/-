var storage = window.localStorage;//本地存储全局变量
var fs = storage.getItem("dlfs"); //判断是账号密码登录还是电话登录
var name = ""; //登录账号

/*封装获取登录人账号的方法*/
function getName() {
    if (fs == "账号密码") {
        name = storage.getItem("username");
        // $("#name").html(name+"<span class=\"layui-nav-more\"></span>"); //用户名
    } else if (fs == "电话号码") {
        var phone = storage.getItem("username");
        $.post("getUserNameByPhone", {"phone": phone}, function (data) {
            name = data.result[0].username;
            $("#name").html(name + "<span class=\"layui-nav-more\"></span>"); //用户名
        })
    }
    return name;
}




/*得到当前登录人的信息*/
function getLogingInformations() {
    var json = [];
    $.ajax({
        type: "get",
        url: "/getLogingInformations",
        dataType: "json",
        async: false,    //异步
        success: function (data) {
                json.push(data.result)
        }
    });
    return json;
}

/*封装树形表格treetable复选框选中行的数量*/
function getCheckNum() {
    var length = 0;
    $(".layui-table tbody tr .layui-form-checked").each(function () {
        length += 1;
    });
    return length;
}

/*封装树形表格treetable复选框选中行的信息*/
function getCheckInformation() {
    var json = [];
    $(".layui-table tbody tr .layui-form-checked").each(function () {
        var row = $(this).parent("div").parent("td").parent("tr");//获取选中行
        var id = row.find("td:eq(2)").attr("data-content");
        var name = row.find("td:eq(3)")[0].innerText;
        var icon = row.find("td:eq(4)")[0].innerText;
        var url = row.find("td:eq(5)")[0].innerText;
        json.push({
            id: id,
            name: name,
            icon: icon,
            url: url
        })
    });
    return json;
}

/*获取全部的user信息*/
function getAllUserInformation() {
    var json = [];
    $.ajax({
        type: "get",
        url: "/getAllUserInformation",
        dataType: "json",
        async: false,    //异步
        success: function (data) {
            for (var i = 0; i < data.result.length; i++) {
                json.push({
                    id: data.result[i].id,
                    name: data.result[i].username,
                    password: data.result[i].password,
                    sex: data.result[i].sex,
                    phone: data.result[i].phone
                })
            }
        }
    });
    return json;
}

//更据角色id来查找对应的用户信息
function getUserInformationByRoleId(roleid) {
    var user = [];
    $.ajax({
        type: "get",
        url: "/getUserInformationByRoleId",
        dataType: "json",
        async: false,    //异步
        data: {"roleid": roleid},
        success: function (data) {
            if (data.result.length > 0) {
                for (var i = 0; i < data.result.length; i++) {
                    user.push(data.result[i])
                }
            }
        },
        error: function () {
        }
    });
    return user;
}

/*获取所有菜单的信息*/
function getAllMenuInformation() {
    var json = [];
    $.ajax({
        type: "get",
        url: "/tree",
        dataType: "json",
        async: false,    //异步
        success: function (data) {
            if (data.data.length > 0) {
                for (var i = 0; i < data.data.length; i++) {
                    json.push(data.data[i])
                }
            }
        },
        error: function () {
        }
    });
    return json;
}

/*获取登录用户的角色信息*/
function loginUserRole(username) {
    var json = [];
    $.ajax({
        type: "get",
        url: "/getLoginUserRole",
        data: {"username": username},
        dataType: "json",
        async: false,    //异步
        success: function (data) {
            if (data.result.length > 0) {
                for (let i = 0; i < data.result.length; i++) {
                    json.push(data.result[i])
                }
            }
        },
        error: function () {
        }
    });
    return json;
}

/*获取登录用户的角色所能观察的窗口信息*/
function getLoginUserMenu(rolename) {
    var name = [];
    for (let i = 0; i < rolename.length; i++) {
        name.push(rolename[i].rolename)
    }
    var json = [];
    $.ajax({
        type: "get",
        url: "/getLoginUserMenu",
        data: {"rolename": name},
        dataType: "json",
        async: false,    //异步
        success: function (data) {
            if (data.result.length > 0) {
                for (let i = 0; i < data.result.length; i++) {
                    json.push(data.result[i])
                }
            }
        },
        error: function () {
        }
    });
    return json;
}

//更据openid来查找对应的用户信息
function getUserInformationByOpenId(openid) {
    var user = [];
    $.ajax({
        type: "get",
        url: "/getUserInformationByOpenId",
        dataType: "json",
        async: false,    //异步
        data: {"openId": openid},
        success: function (data) {
            console.log(data.result)
            if (data.result.length > 0) {
                user.push(data.result)
            }
        }
    });
    return user;
}
//获取该门店对应的仓库信息
function getWhNames(shopecode) {
    var men = [];
    $.ajax({
        type: "get",
        url: "/getWhNames",
        dataType: "json",
        async: false,    //异步
        data: {"shopecode": shopecode},
        success: function (data) {
            men.push(data)
        }
    });
    return men;
}
//更具编码
function repeatShopCode(shopcode) {
    var men = [];
    $.ajax({
        type: "get",
        url: "/repeatShopCode",
        dataType: "json",
        async: false,    //异步
        data: {"shopCode": shopcode},
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//获取所有的门店信息
function getAllShopInformation(){
    var men = [];
    $.ajax({
        type: "get",
        url: "/getAllShopInformation",
        dataType: "json",
        data:{"page":1,"limit":100},
        async: false,    //异步
        success: function (data) {
            if(data.data.length>0){
                for (let i = 0; i <data.data.length ; i++) {
                    men.push(data.data[i])
                }
            }
        }
    });
    return men;
}


//获取该仓库对应的门店信息
function getShopNames(whcode) {
    var men = [];
    $.ajax({
        type: "get",
        url: "/getShopNames",
        dataType: "json",
        async: false,    //异步
        data: {"whcode": whcode},
        success: function (data) {
            men.push(data)
        }
    });
    return men;
}
//更据编码来获取商品大类的信息
function getProductByCode(whcode) {
    var men="";
    $.ajax({
        url:"../../getProductByCode",
        type: "get",
        dataType: "json",
        async: false,    //异步
        data: {"whcode": whcode},
        success: function (data) {
            men=data.result[0]
        }
    });
    return men;
}
//更据大类名称来获取商品大类的信息
function getProductByCatName(catName) {
    var men=[];
    $.ajax({
        url:"../../getProductByCatName",
        type: "get",
        dataType: "json",
        async: false,    //异步
        data: {"catName": catName},
        success: function (data) {
            for (let i = 0; i <data.result.length ; i++) {
                men.push(data.result[i])
            }
        }
    });
    return men;
}

//获取所有商品大类的信息
function getProductBig() {
    var men=[];
    $.ajax({
        url:"../../getProductBig",
        type: "get",
        dataType: "json",
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更据上级名称获取所有商品小类的信息
function getProductSmall(fcatName) {
    var men=[];
    $.ajax({
        url:"../../getProductSmall",
        type: "get",
        dataType: "json",
        data:{"fcatName":fcatName},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更据小类名称获取小类的信息
function repeatSmallName(smallName) {
    var men=[];
    $.ajax({
        url:"../../repeatSmallName",
        type: "get",
        dataType: "json",
        data:{"smallName":smallName},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更据大类的名称获取所有商品小类的信息
function getProductSmallByBigName(catName) {
    var men=[];
    $.ajax({
        url:"../../getProductSmallByBigName",
        type: "get",
        dataType: "json",
        data:{"catName":catName},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}

//获取所有商品小类的信息
function getProductAllSmallInformation() {
    var men=[];
    $.ajax({
        url:"../../getProductAllSmallInformation",
        type: "get",
        dataType: "json",
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更据编码获取该品牌管理的信息
function getBrandInformation(brandCode) {
    var men=[];
    $.ajax({
        url:"../../getBrandInformation",
        type: "get",
        dataType: "json",
        data:{"brandCode":brandCode},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                men.push(data.result[0])
            }
        }
    });
    return men;
}
//更据大类的名称获取该品牌管理的商品品牌的信息
function getProductByGigCode(catName) {
    var men=[];
    $.ajax({
        url:"../../getProductByGigCode",
        type: "get",
        dataType: "json",
        data:{"catName":catName},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更据品牌名称获取品牌的信息
function repeatBrandName(brandName) {
    var men=[];
    $.ajax({
        url:"../../repeatBrandName",
        type: "get",
        dataType: "json",
        data:{"brandName":brandName},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}


//更据编码获取该品牌管理的商品大类的信息
function getProductByBrandCode(brandCode) {
    var men=[];
    $.ajax({
        url:"../../getProductByBrandCode",
        type: "get",
        dataType: "json",
        data:{"brandCode":brandCode},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更据商品小类获取该信息
function getProductSmallByCode(catCode) {
    var men=[];
    $.ajax({
        url:"../../getProductSmallByCode",
        type: "get",
        dataType: "json",
        data:{"catCode":catCode},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                men.push(data.result[0])
            }
        }
    });
    return men;
}
//更据三级的编码获取三级信息
function repeatProductThreeByCode(catCode) {
    var men=[];
    $.ajax({
        url:"../../repeatProductThreeByCode",
        type: "get",
        dataType: "json",
        data:{"catCode":catCode},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                men.push(data.result[0])
            }
        }
    });
    return men;
}
//更据三级的名称获取三级信息
function repeatProductThreeName(threeName) {
    var men=[];
    $.ajax({
        url:"../../repeatProductThreeName",
        type: "get",
        dataType: "json",
        data:{"threeName":threeName},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                men.push(data.result[0])
            }
        }
    });
    return men;
}

//更据小类的名称获取三级信息
function repeatProductThreeBySmallName(catName) {
    var men=[];
    $.ajax({
        url:"../../repeatProductThreeBySmallName",
        type: "get",
        dataType: "json",
        data:{"catName":catName},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}

//更据属性组获取大类的信息
function getProductBigByGroup(groupCode) {
    var men=[];
    $.ajax({
        url:"../../getProductBigByGroup",
        type: "get",
        dataType: "json",
        data:{"groupCode":groupCode},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更据属性组获取商品属性的配置信息
function getConfByGroup(groupCode) {
    var men=[];
    $.ajax({
        url:"../../getConfByGroup",
        type: "get",
        dataType: "json",
        data:{"groupCode":groupCode},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更据大类的名称获取该商品的属性组的信息
function getGroupCodeByGigCode(catName) {
    var men=[];
    $.ajax({
        url:"../../getGroupCodeByGigCode",
        type: "get",
        dataType: "json",
        data:{"catName":catName},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更据编码获取属性组的信息
function repeatGroupCode(groupCode) {
    var men=[];
    $.ajax({
        url:"../../repeatGroupCode",
        type: "get",
        dataType: "json",
        data:{"groupCode":groupCode},
        async: false,    //异步
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更据商品属性的code获取对应的信息
function repeatAttrCode(attrCode) {
    var men=[];
    $.ajax({
        url: "../../repeatAttrCode",
        type: "GET",
        data: {"attrCode": attrCode},
        async: false,
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length ; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}

//更据商品的code获取对应的分类信息
function getClassificationByGoodsCode(goodsId) {
    var men=[];
    $.ajax({
        url: "../../getClassificationByGoodsCode",
        type: "GET",
        data: {"goodsCode": goodsId},
        async: false,
        success: function (data) {
            if(data.big.length>0){
                men.push(data.big[0]);
            }
            if(data.small.length>0){
                men.push(data.small[0]);
            }
            if(data.three.length>0){
                men.push(data.three[0]);
            }
        }
    });
    return men;
}

//更据商品的code获取对应的信息
function repeatGoodsId(goodsId) {
    var men=[];
    $.ajax({
        url: "../../repeatGoodsId",
        type: "GET",
        data: {"goodsId": goodsId},
        async: false,
        success: function (data) {
            if(data.result.length>0){
                men.push(data.result[0]);
            }
        }
    });
    return men;
}
//更具商品编码获取商品的属性信息
function getAttrByGoodsId(goodsId) {
    var men=[];
    $.ajax({
        url: "../../getAttrByGoodsId",
        type: "GET",
        data: {"goodsId": goodsId},
        async: false,
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//得到所有的鉴定记录
function getAllIdentifyInformation() {
    var men=[];
    $.ajax({
        url: "../../getAllIdentifyInformation",
        type: "GET",
        async: false,
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更距商品编码查询鉴定人
function getIdentifyPeopleByGoodsId(goodsId) {
    var men=[];
    $.ajax({
        url: "../../getIdentifyPeopleByGoodsId",
        type: "GET",
        async: false,
        data:{"goodsId":goodsId},
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更距鉴定编码获取对应额信息
function repeatIdentifyCode(id) {
    var men=[];
    $.ajax({
        url: "../../repeatIdentifyCode",
        type: "GET",
        async: false,
        data:{"identifyId":id},
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更距商品编码改变商品的状态
function updateGoodsSate(goodsId) {
    var id =[];
    for (let i = 0; i < goodsId.length; i++) {
        id.push(goodsId[i])
    }
    var men=0;
    $.ajax({
        url: "../../updateGoodsSate",
        type: "GET",
        async: false,
        data:{"goodsId":id},
        success: function (data) {
            if(data.result>0){
                men=1;
            }
        }
    });
    return men;
}
//得到所有的评估记录
function getAllAppraiseInformation() {
    var men=[];
    $.ajax({
        url: "../../getAllAppraiseInformation",
        type: "GET",
        async: false,
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更具评估编码获取对应的信息
function repeatAppraiseCode(appriseId) {
    var men=[];
    $.ajax({
        url: "../../repeatAppraiseCode",
        type: "GET",
        async: false,
        data:{"appriseId":appriseId},
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}
//更距商品编码查询评估人
function getAppraisePeopleByGoodsId(goodsId) {
    var men=[];
    $.ajax({
        url: "../../getAppraisePeopleByGoodsId",
        type: "GET",
        async: false,
        data:{"goodsId":goodsId},
        success: function (data) {
            if(data.result.length>0){
                for (let i = 0; i <data.result.length; i++) {
                    men.push(data.result[i])
                }
            }
        }
    });
    return men;
}

