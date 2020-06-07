var layid = ""; //当前选择的选项卡的lay-id值
var username ="";
$(function () {
     username =getLogingInformations()[0].authentication.name; //登录人的账号
    if(username==null || username==""){
       var openid = getLogingInformations()[0].authentication.principal.openId;
        $.ajax({
            type: "get",
            url: "/getUserInformationByOpenId",
            dataType: "json",
            async: false,    //异步
            data: {"openId": openid},
            success: function (data) {
                    username = data.result.username;
            }
        });
    }
    $("#name").html(username + "<span class=\"layui-nav-more\"></span>"); //用户名
    var role = [];
    role = loginUserRole(username); //获取角色
    var menuInformation = getLoginUserMenu(role); //获取该角色的菜单信息
    var thisUserMenuId = []; //登录用户角色所有的菜单id
    var thisUserMenuPid = []; //登录用户角色所有的菜单pid
    for (let i = 0; i < menuInformation.length; i++) {
        thisUserMenuId.push(menuInformation[i].id);
    }
    for (let i = 0; i < menuInformation.length; i++) {
        thisUserMenuPid.push(menuInformation[i].pid);
    }
    var firstMenu = ["1", "1-1", "1-2", "2", "2-2", "2-1"]; //初始就有的菜单信息
    for (let i = 0; i < firstMenu.length; i++) {   //判断该用户的疏失菜单那些可见，哪些不可见
        //如果在初始菜单里面找不到该菜单的id，则把这个菜单删除
        if (thisUserMenuId.indexOf(firstMenu[i]) < 0) {
            $("#tree a").each(function () {
                if ($(this).attr("lay-id") === firstMenu[i]) {
                    // $(this).css("display", "none")
                    $(this).remove()
                }
            })
        }
    }

    var first = []; // 所有一级菜单的信息
    for (let i = 0; i < menuInformation.length; i++) {
        if (menuInformation[i].pid == 0) {
            first.push(menuInformation[i])
        }
    }
    var menu = "";
    var er = "";
    var san = "";
    var si = "";


    for (var i =0; i < first.length; i++) {
        if ((first[i].id != "1" && first[i].id != "2") && first[i].pid == 0) {
            if (thisUserMenuPid.indexOf(first[i].id) < 0) {  //查看这个一级菜单是否有子集
                menu += "<li class=\"layui-nav-item\">\n" +
                    "        <a lay-id=" + first[i].id + " class=\"site-demo-active\"  data-type=\"tabAdd\" action=" + first[i].url + " href=\"javascript:;\">\n" +
                    "              <i class=\""+first[i].icon+"\"></i>" + first[i].name + "\n" +
                    "        </a>\n" +
                    " </li>"
            } else {
                menu += "<li class=\"layui-nav-item\">\n" +
                    "        <a lay-id=" + first[i].id + " class=\"site-demo-active\" action=" + first[i].url + " href=\"javascript:;\">\n" +
                    "              <i class=\""+first[i].icon+"\"></i>" + first[i].name + "\n" +
                    "        </a>\n" +
                    "             <dl class=\"layui-nav-child\">_</dl>\n" +
                    " </li>"
            }
        }
        // first[i].id
        for (var j = 0; j < menuInformation.length; j++) {

            if (menuInformation[j].pid == first[i].id) {

                if (menuInformation[j].pid == "1" && menuInformation[j].id == "1-1" || menuInformation[j].id == "1-2") {

                } else if (menuInformation[j].pid == "2" && menuInformation[j].id == "2-1" || menuInformation[j].id == "2-2") {

                } else {
                    if (thisUserMenuPid.indexOf(menuInformation[j].id) < 0) {  //查看这个一级菜单是否有子集
                        if (menuInformation[j].pid == 1) {
                            var one = "                    <dd>\n" +
                                "                        <a lay-id=" + menuInformation[j].id + "  action=" + menuInformation[j].url + " class=\"site-demo-active\"\n" +
                                "                           data-type=\"tabAdd\" href=\"javascript:;\">\n" +
                                "                            <i class=\""+ menuInformation[j].icon+"\" aria-hidden=\"true\"></i>\n" +
                                "                            " + menuInformation[j].name + "\n" +
                                "                        </a>\n" +
                                "                    </dd>";
                            $("#one").append(one);
                        } else if (menuInformation[j].pid == 2) {
                            var two = "                    <dd>\n" +
                                "                        <a lay-id=" + menuInformation[j].id + "  action=" + menuInformation[j].url + " class=\"site-demo-active\"\n" +
                                "                           data-type=\"tabAdd\" href=\"javascript:;\">\n" +
                                "                            <i class=\""+ menuInformation[j].icon+"\" aria-hidden=\"true\"></i>\n" +
                                "                            " + menuInformation[j].name + "\n" +
                                "                        </a>\n" +
                                "                    </dd>";
                            $("#two").append(two);
                        }else{
                            var index = menu.lastIndexOf("_");
                            var start = menu.substring(0,index);
                            var last = menu.substring(index+1);
                            er =
                                // "                     _\n"+
                                "                    <dd>\n" +
                                "                        <a lay-id=" + menuInformation[j].id + "  action=" + menuInformation[j].url + " class=\"site-demo-active\"\n" +
                                "                           data-type=\"tabAdd\" href=\"javascript:;\">\n" +
                                "                            <i class=\""+ menuInformation[j].icon+"\" aria-hidden=\"true\"></i>\n" +
                                "                            " + menuInformation[j].name + "\n" +
                                "                        </a>\n" +
                                "                    </dd>_";
                                // menu= menu.replace("_",er);
                                menu=start+er+last
                        }
                    } else {
                        if (menuInformation[j].pid == 1) {
                            var one = "                    <dd>\n" +
                                "                        <a lay-id=" + menuInformation[j].id + "  action=" + menuInformation[j].url + " class=\"site-demo-active\"\n" +
                                "                           href=\"javascript:;\">\n" +
                                "                             <i class=\""+ menuInformation[j].icon+"\" aria-hidden=\"true\"></i>\n" +
                                "                            " + menuInformation[j].name + "\n" +
                                "                        </a>\n" +
                                "                        <dl class=\"layui-nav-child\">|</dl>\n" +
                                "                    </dd>";
                            $("#one").append(one);
                        } else if (menuInformation[j].pid == 2) {
                            var two = "               <dd>\n" +
                                "                        <a lay-id=" + menuInformation[j].id + "  action=" + menuInformation[j].url + " class=\"site-demo-active\"\n" +
                                "                           href=\"javascript:;\">\n" +
                                "                             <i class=\""+ menuInformation[j].icon+"\" aria-hidden=\"true\"></i>\n" +
                                "                            " + menuInformation[j].name + "\n" +
                                "                        </a>\n" +
                                "                        <dl class=\"layui-nav-child\">|</dl>\n" +
                                "                    </dd>";
                            $("#two").append(two);
                        }
                        var index1 = menu.lastIndexOf("_");
                        var start1 = menu.substring(0,index1);
                        var last1 = menu.substring(index1+1);
                        er =
                            "                    <dd>\n" +
                            "                        <a lay-id=" + menuInformation[j].id + "  action=" + menuInformation[j].url + " class=\"site-demo-active\"\n" +
                            "                           href=\"javascript:;\">\n" +
                            "                            <i class=\""+ menuInformation[j].icon+"\" aria-hidden=\"true\"></i>\n" +
                            "                            " + menuInformation[j].name + "\n" +
                            "                        </a>\n" +
                            "                        <dl class=\"layui-nav-child\">|</dl>\n" +
                            "                    </dd>_";
                        menu=start1+er+last1
                    }

                    for (var e = 0; e < menuInformation.length; e++) {
                        if (menuInformation[e].pid == menuInformation[j].id && menuInformation[e].id.split("-").length == 3) {
                            if (thisUserMenuPid.indexOf(menuInformation[e].id) < 0) {  //查看这个一级菜单是否有子集
                                var index2 = menu.lastIndexOf("|");
                                var start2 = menu.substring(0,index2);
                                var last2 = menu.substring(index2+1);
                                san =
                                    "                    <dd>\n" +
                                    "                        <a lay-id=" + menuInformation[e].id + "  action=" + menuInformation[e].url + " class=\"site-demo-active\"\n" +
                                    "                           data-type=\"tabAdd\" href=\"javascript:;\">\n" +
                                    "                             <i class=\""+ menuInformation[e].icon+"\" aria-hidden=\"true\"></i>\n" +
                                    "                            " + menuInformation[e].name + "\n" +
                                    "                        </a>\n" +
                                    "                    </dd>|";
                                // menu = menu.replace("er", san)
                                menu=start2+san+last2
                            } else {
                                var index3 = menu.lastIndexOf("|");
                                var start3 = menu.substring(0,index3);
                                var last3 = menu.substring(index3+1);
                                san =
                                    "                    <dd>\n" +
                                    "                        <a lay-id=" + menuInformation[e].id + "  action=" + menuInformation[e].url + " class=\"site-demo-active\"\n" +
                                    "                           href=\"javascript:;\">\n" +
                                    "                            <i class=\""+ menuInformation[e].icon+"\" aria-hidden=\"true\"></i>\n" +
                                    "                            " + menuInformation[e].name + "\n" +
                                    "                        </a>\n" +
                                    "                        <dl class=\"layui-nav-child\">*</dl>\n" +
                                    "                    </dd>|";
                                // menu = menu.replace("er", san)
                                menu=start3+san+last3
                            }
                            for (var l = 0; l < menuInformation.length; l++) {
                                if (menuInformation[l].pid === menuInformation[e].id && menuInformation[l].id.split("-").length == 4) {
                                    if (thisUserMenuPid.indexOf(menuInformation[l].id) < 0) {  //查看这个一级菜单是否有子集
                                        var index4 = menu.lastIndexOf("*");
                                        var start4 = menu.substring(0,index4);
                                        var last4 = menu.substring(index4+1);
                                        si =
                                            "                    <dd>\n" +
                                            "                        <a lay-id=" + menuInformation[l].id + "  action=" + menuInformation[l].url + " class=\"site-demo-active\"\n" +
                                            "                          href=\"javascript:;\">\n" +
                                            "                             <i class=\""+ menuInformation[l].icon+"\" aria-hidden=\"true\"></i>\n" +
                                            "                            " + menuInformation[l].name + "\n" +
                                            "                        </a>\n" +
                                            "                    </dd>*";
                                        // menu = menu.replace("san", si)
                                        menu=start4+si+last4
                                    } else {
                                        var index5 = menu.lastIndexOf("*");
                                        var start5 = menu.substring(0,index5);
                                        var last5 = menu.substring(index5+1);
                                        si =
                                            "                    <dd>\n" +
                                            "                        <a lay-id=" + menuInformation[l].id + "  action=" + menuInformation[l].url + " class=\"site-demo-active\"\n" +
                                            "                           data-type=\"tabAdd\" href=\"javascript:;\">\n" +
                                            "                          <i class=\""+ menuInformation[l].icon+"\" aria-hidden=\"true\"></i>\n" +
                                            "                            " + menuInformation[l].name + "\n" +
                                            "                        </a>\n" +
                                            "                        <dl class=\"layui-nav-child\"></dl>\n" +
                                            "                    </dd>*";
                                        // menu = menu.replace("san", si)
                                        // si = ""
                                        menu=start5+si+last5
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }
    for (let i = 0; i <menu.length ; i++) {
        if(menu[i]=="_"){
           menu= menu.replace("_","")
        }else if(menu[i]=="|"){
            menu= menu.replace("|","")
        }else if(menu[i]=="*"){
            menu= menu.replace("*","")
        }
    }

    $("#tree").append(menu);

    layui.use(['element', 'layer', 'form'], function () {
        var element = layui.element;
        var layer = layui.layer;
        var form = layui.form;
        // 获取当前选择的yal-id的值
        element.on('tab(demo)', function (data) {
            layid = $(this).attr("lay-id")
        });

        //删除该值对应的选项卡，删除当前
        $("#deleteThis").click(function () {
            if (layid != 0) { //判断是否是首页，首页不能删除
                element.tabDelete("demo", layid);
            }
        });
        //触发事件
        var name = ""; //选项卡的名字
        var id = "";  //选项卡的lay-id的值
        var url = ""; //用于iframe中打开的url
        //添加选项卡
        var active = {
            tabAdd: function (name, url, id) {
                //新增一个Tab项
                element.tabAdd('demo', {
                    title: name.html(),
                    content: "<iframe frame-options policy=\"SAMEORIGIN\" src=" + url + "  style='width: 100%;height:75vh;frameborder:no; border:0px; scrolling:no'></iframe>",
                    id: id //实际使用一般是规定好的id
                })
            }
        };
        //修改登录人员信息，
        $("#modifyInformation").click(function () {
            layer.open({
                type: 1,
                title: "修改密码",
                anim: 1, //有0-6种动画
                content: $('#editUserForm'),//这里content是一个普通的String
                area: ['400px', '300px']
                , cancel: function (index, layero) {
                    layer.closeAll();
                }
                // , btn: ['提交', '取消']
            });
        });
        //点击取消，关闭修改面板，清空form表单
        $("#cancel").click(function () {
            layer.closeAll();
            $("#editUserForm")[0].reset();
        });

        form.on('submit(edit)', function (data) {
            $.ajax({
                url: '/editUserPassword',
                method: 'get',
                data: {username: username, "newPassword": $("#newPassword").val()},
                dataType: "json",
                success: function (data) {
                    if (data.result > 0) {
                        layer.alert("修改成功", {
                            icon: 6, title: "提示", cancel: function () {
                                layer.closeAll();
                                $("#editUserForm")[0].reset();
                            }
                        }, function () {
                            layer.closeAll();
                            $("#editUserForm")[0].reset();
                        })
                    } else {
                        layer.alert("修改失败", {
                            icon: 5, title: "提示", cancel: function () {
                                layer.closeAll();
                                $("#editUserForm")[0].reset();
                            }
                        }, function () {
                            layer.closeAll();
                            $("#editUserForm")[0].reset();
                        })
                    }
                },
                error: function () {
                    layer.alert("系统错误，修改失败", {
                        icon: 5, title: "系统提示", cancel: function () {
                            layer.closeAll();
                            $("#editUserForm")[0].reset();
                        }
                    }, function () {
                        layer.closeAll();
                        $("#editUserForm")[0].reset();
                    })
                }
            });
            //ajax提交必写，也是天坑
            return false;
        });

        $("#left a[data-type]").click(function () {

            name = $(this).val();
            id = $(this).attr("lay-id");
            url = $(this).attr("action");
            //判断这个页面是否是404，是404就去error.html
            $.ajax({
                url: "/" + url + "",
                type: 'GET',
                async: false, //异步为false
                complete: function (response) {
                    if (response.status == 404) {
                        url = "error.html"
                    }
                }
            });
            var dataid = $(this);
            //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
            if ($("#table-panel li[lay-id]").length <= 0) {
                //如果比零小，则直接打开新的tab项
                active.tabAdd(dataid, url, id);
            } else {
                //否则判断该tab项是否以及存在
                var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
                $.each($("#table-panel li[lay-id]"), function () {
                    //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                    if (id == $(this).attr("lay-id")) {
                        isData = true;
                    }
                });
                //如果为false，则为未打开，新增选项卡
                if (isData == false) {
                    active.tabAdd(dataid, url, id);
                }
            }
            //最后不管是否新增tab，最后都转到要打开的选项页面上
            element.tabChange("demo", id);
        });


        form.verify({
            //验证密码是否正确
            verifyPassword: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                $.ajax({
                    url: "/verifyPassword",
                    type: "GET",
                    data: {"password": value, "username": username},
                    async: false,
                    success: function (data) {
                        if (data.result < 0) {
                            checkResult = "原密码不正确，请重输";
                        }
                    }
                });
                return checkResult;
            },
            //验证两次密码输入是否一致
            confirmPass: function (value) {
                if ($("#newPassword").val() !== value)
                    return '两次密码输入不一致！';
            }
        });
    });
});