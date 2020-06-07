var storage = window.localStorage;//本地存储全局变量
layui.use('layer', function () {
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
    layui.use('form', function () {
        var form = layui.form;
        form.render();
        //各种基于事件的操作，下面会有进一步介绍
        $("#phone").click(function () {
            $("#main").css("display", "none");
            $("#phone-win").css("display", "block");
        });

        $("#user-win").click(function () {
            $("#main").css("display", "block");
            $("#phone-win").css("display", "none");
        });
        var value = 60;
        var dian = 0;
        $("#yzm").click(function () {
            dian++;
            if (dian == 1) {
                var time = setInterval(function () {
                    if (value == 0) {
                        value = 60;
                        $("#yzm").html("重新发送");
                        $("#yzm").removeProp("class", "layui-disabled");
                        $("#yzm").css("font-size", "14px");
                        $("#yzm").prop("class", "layui-btn layui-btn-danger");
                        dian = 0;
                        clearInterval(time)
                    } else {
                        value = value - 1;
                        $("#yzm").html(value + "s");
                        $("#yzm").prop("class", "layui-disabled");
                        $("#yzm").css("font-size", "20px");
                    }
                }, 1000);

                $.get("/sendCode?phone=" + $("#phone-number").val(), function (data) {
                    // console.log(data)
                })
            }
        });


        /**
         * 账号密码登录
         */
        form.on('submit(login)', function (data) {
            var index = layer.load(3, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
            $.ajax({
                url: '/login',
                method: 'post',
                data: data.field,
                dataType: "json",
                success: function (data) {
                    if (data.result > 0) {
                        storage.setItem("username", $("#username").val());//更新本地缓存的数据
                        storage.setItem("dlfs", "账号密码");//更新本地缓存的数据
                        window.location.href = "/main.html";
                    } else if (data.result === "Bad credentials") {
                        layer.closeAll("loading");
                        layer.alert("账号或密码错误", {icon: 5,cancel:function () {
                                layer.closeAll("loading");
                            }});
                    } else {
                        layer.alert(data.result, {icon: 5,cancel:function () {
                                layer.closeAll("loading");
                            }});
                        layer.closeAll("loading");
                    }
                },
                error: function (e) {
                    layer.alert("提交失败！", {icon: 2,cancel:function () {
                            layer.closeAll("loading");
                        }});
                    layer.closeAll("loading");
                }
            });
            return false;
        });

        /**
         * 电话号码登录
         */
        form.on('submit(phone)', function (data) {
            var index = layer.load(3, {
                shade: [0.1, '#fff'] //0.1透明度的白色背景
            });
            $.ajax({
                url: '/loginByPhone',
                method: 'post',
                data: data.field,
                dataType: "json",
                success: function (data) {
                    if (data.result > 0) {
                        storage.setItem("username", $("#phone-number").val());//更新本地缓存的数据
                        storage.setItem("dlfs", "电话号码");//更新本地缓存的数据
                        window.location.href = "/main.html"
                    } else if (data.result === "Bad credentials") {
                        layer.closeAll("loading");
                        layer.alert("账号或密码错误", {icon: 5,cancel:function () {
                                layer.closeAll("loading");
                            }});
                    } else {
                        layer.alert(data.result, {icon: 5,cancel:function () {
                                layer.closeAll("loading");
                            }});
                        layer.closeAll("loading");
                    }
                },
                error: function (e) {
                    layer.alert("提交失败！", {icon: 2,cancel:function () {
                            layer.closeAll("loading");
                        }});
                    layer.closeAll("loading");
                }
            });
            return false;
        });
        
    });
});

