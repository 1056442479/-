$(function () {
    layui.use(['table', 'element', 'form', 'transfer'], function () {
        var table = layui.table;
        var form = layui.form;
        var layer = layui.layer;
        var transfer = layui.transfer;
        var json =  getLogingInformations();
       var openid = json[0].authentication.principal.openId;
        //点击取消，重定向登录页
        $("#cancel").click(function () {
            window.location.href="/index.html"
        });
        //点击提交2
        form.on('submit(tijiao)', function (data) {
            var username = $("#username").val();
            $.ajax({
                url: '/addUserOpenId',
                method: 'get',
                data: {"openid":openid,"username":username},
                dataType: "json",
                success: function (data) {
                    if (data.result > 0) {
                        layer.alert("绑定成功", {
                            icon: 6, title: "提示", cancel: function () {
                                layer.closeAll();
                                $("#main")[0].reset();
                                window.location.href="/main.html"
                            }
                        }, function () {
                            layer.closeAll();
                            $("#main")[0].reset();
                            window.location.href="/main.html"
                        })
                    } else {
                        layer.alert("绑定失败失败", {
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
                    layer.alert("系统错误，绑定失败", {
                        icon: 5, title: "系统提示", cancel: function () {
                            layer.closeAll();
                            $("#editUserForm")[0].reset();
                            window.location.href="/index.html"
                        }
                    }, function () {
                        layer.closeAll();
                        $("#editUserForm")[0].reset();
                        window.location.href="/index.html"
                    })
                }
            });
            //ajax提交必写，也是天坑
            return false;
        });

    form.verify({
        getUsername: function (value, item) { //value：表单的值、item：表单的DOM对象
            var checkResult = "";
            $.ajax({
                url: "/getUsername",
                type: "GET",
                data: {"username": value},
                async: false,
                success: function (data) {
                    if (data.result == 0) {
                        checkResult = "账号不存在！";
                    }
                },
                error: function () {
                }
            });
            return checkResult;
        }, getPassWord: function (value, item) { //value：表单的值、item：表单的DOM对象
            var checkResult = "";
            var username = $("#username").val();
            $.ajax({
                url: "/getPassWord",
                type: "GET",
                data: {"password": value,"username":username},
                async: false,
                success: function (data) {
                    if (data.result < 0) {
                        checkResult = "密码错误！";
                    }else {
                        window.location.href="/main.html"
                    }
                },
                error: function () {
                }
            });
            return checkResult;
        }
    });
    });
});