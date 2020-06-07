layui.use(['table', 'element', 'form', 'transfer'], function () {
    var table = layui.table;
    var form = layui.form;
    var layer = layui.layer;
    var transfer = layui.transfer;

    var length = 0; //表格总数据
    var num = 0; //一页显示的数据
    var cu = 1; //当前第几页
    var now = 0;


    table.render({
        elem: '#table'
        // ,  closeBtn :0//不显示关闭按钮
        , url: '/getRole' //数据接口
        , page: {theme: '#81d3ff', prev: '上一页', next: '下一页', last: '尾页', refresh: '刷新'} //开启分页
        , skin: 'row ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
        , even: true,
        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        }
        , toolbar: '#toolbarDemo'
        // , unresize: true
        , cols: [[ //表头
            {field: 'checkbox', type: "checkbox", fixed: 'left' , unresize: true}
            , {field: 'roleid', title: '角色编号', align: "center" , unresize: true}
            , {field: 'rolename', title: '角色名', sort: true, align: "center" , unresize: true}
            , {field: 'desc', title: '角色描述', sort: true, align: "center" , unresize: true}
        ]],
        done: function (res, curr, count) {
            //如果是异步请求数据方式，res即为你接口返回的信息。
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            //当前页是第几页
            cu = curr;
            //limits选中的每条展示的数据条数
            num = $(".layui-laypage-limits").find("option:selected").val();
            //得到数据总量
            length = count;
            //当前页的数据
        }
    });
    //点击删除按钮
    $(document).on('click', '#delete', function () {
        var checkStatus = table.checkStatus('table');
        if (checkStatus.data.length === 0) {
            layer.alert("至少选择一行要删除的数据", {icon: 0})
        } else {
            var data = checkStatus.data;
            var id = []; //要删除的角色id
            for (var i = 0; i < data.length; i++) {
                id.push(data[i].roleid)
            }
            $.post("deleteRoles", {"roleid": id}, function (data) {
                if (data.result > 0) {
                    var len = layui.table.cache["table"]; //当前没删除前表格的数据
                    if (len.length === id.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                        layer.msg("删除成功");
                        window.location.href = "/role.html"
                    } else {
                        layer.alert("删除成功", {icon: 6});
                        table.reload("table");
                    }
                } else {
                    layer.alert("提交失败了,刷新试试", {icon: 5, title: '提示'}, function () {
                        layer.closeAll();
                    })
                }
            })
        }
    });
    //关闭新增窗口
    $("#closeAddWin").click(function () {
        layer.closeAll();
        //重置表单数据
        $("#addUserRole")[0].reset();
        layui.form.render();
        $("#roleid").prop("readonly", false);
    });
    //获取全部用户信息
    var data1 = getAllUserInformation();

    // 显示新增窗口
    $(document).on('click', '#add', function () {
        layer.open({
            type: 1,
            title: "新增角色",
            anim: 1, //有0-6种动画
            content: $('#addUserRole'),//这里content是一个普通的String
            area: ['700px', '520px']
            , cancel: function () {
                $("#addUserRole")[0].reset();
                layui.form.render();
            }
            // , btn: ['提交', '取消']
        });
        transfer.render({
            elem: '#getAllUser'
            , data: data1
            , title: ['可选用户', '已选用户']
            , showSearch: true
            , height: 300
            , width: 200
            , id: 'demo1'
            , parseData: function (res) {
                return {
                    "value": res.id //数据值
                    , "title": res.name //数据标题
                    , "disabled": res.disabled  //是否禁用
                    , "checked": res.checked //是否选中
                    , text: {
                        none: '无数据' //没有数据时的文案
                        , searchNone: '无匹配数据' //搜索无匹配数据时的文案
                    }
                }
            }
        });
    });
    //显示搜索框的穿梭款


    //监听提交新增角色
    form.on('submit(addRole)', function (data) {
        var getData = transfer.getData('demo1'); //获取右侧穿梭款被选中的数据
        var name = [];
        if (getData.length > 0) {
            for (var i = 0; i < getData.length; i++) {
                name.push(getData[i].title)
            }
        } else {
            name.push("无数据")
        }
        //表单提交数据
        var json = {
            "desc": data.field.desc,
            "roleid": data.field.roleid,
            "rolename": data.field.rolename,
            "user": name
        };

        layer.load(2, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        $.ajax({
            url: '/addUserRoles',
            method: 'post',
            data: json,
            dataType: "json",
            success: function (data) {
                if (data.result > 0) {
                    layer.alert("增加成功", {
                            icon: 6
                            //点击右上角的回调
                            , cancel: function (index) {
                                layer.closeAll();
                                //重载表格，避免查询后新增，无法显示新增数据
                                table.reload('table', {url: '/getRole'});
                                //ajax请求获取总数，
                                $.post("getRole", {"page": cu, "limit": num}, function (data) {
                                    length = data.count; //总数
                                    var currPageNo = 0; //要跳转的页数
                                    if (parseInt(length / num) === length / num) {
                                        currPageNo = (length / num)
                                    } else {
                                        currPageNo = Math.ceil(length / num);
                                    }
                                    //跳转到指定页
                                    table.reload("table", {
                                        page: {
                                            curr: currPageNo
                                        }
                                    });
                                    //重置表单数据
                                    $("#addUserRole")[0].reset();
                                    layui.form.render();
                                });
                            }
                        },
                        //点击确认的回调
                        function (index) {
                            layer.closeAll();
                            //重载表格，避免查询后新增，无法显示新增数据
                            table.reload('table', {url: '/getRole'});
                            //ajax请求获取总数，
                            $.post("getRole", {"page": cu, "limit": num}, function (data) {
                                length = data.count; //总数
                                var currPageNo = 0; //要跳转的页数
                                if (parseInt(length / num) === length / num) {
                                    currPageNo = (length / num)
                                } else {
                                    currPageNo = Math.ceil(length / num);
                                }
                                //跳转到指定页
                                table.reload("table", {
                                    page: {
                                        curr: currPageNo
                                    }
                                });
                                //重置表单数据
                                $("#addUserRole")[0].reset();
                                layui.form.render();
                            });
                        });
                } else {
                    layer.alert("提交失败了,刷新试试", {
                        icon: 5, title: '提示', cancel: function (index) {
                            layer.closeAll()
                        }
                    }, function () {
                        layer.closeAll();
                    })
                }
            },
            error: function (e) {
                layer.alert("提交失败了,刷新试试", {
                    icon: 5, title: '提示', cancel: function (index) {
                        layer.closeAll()
                    }
                }, function () {
                    layer.closeAll();
                })
            }
        });
        // ajax提交必写，也是天坑
        return false;
    });

    var close = $("#closeUpdateWin").click(function () {
        layer.closeAll();
    });
    // 显示编辑窗口
    $(document).on('click', '#edit', function () {

        var checkStatus = table.checkStatus('table');
        if (checkStatus.data.length === 0) {
            layer.alert("至少选择一行要编辑的数据", {icon: 0})
        } else if (checkStatus.data.length > 1) {
            layer.alert("只能选择一行进行编辑", {icon: 0})
        } else {
            var data = checkStatus.data;
            $("#update-roleid").val(data[0].roleid);
            $("#update-name").val(data[0].rolename);
            $("#update-desc").val(data[0].desc);

            layer.open({
                type: 1,
                title: "编辑角色",
                anim: 1, //有0-6种动画
                content: $('#updateUserRole'),//这里content是一个普通的String
                area: ['700px', '520px']
                , cancel: function (index, layero) {
                    layer.closeAll();
                }
                // , btn: ['提交', '取消']
            });
            //得到该角色的用户id
            var user = getUserInformationByRoleId(data[0].roleid);
            var userID = [];
            for (var i = 0; i < user.length; i++) {
                userID.push(user[i].id + "")
            }
            //显示搜索框的穿梭款
            transfer.render({
                elem: '#getUpdateAllUser'
                , data: data1
                , value: userID
                , title: ['可选成员', '已选成员']
                , showSearch: true
                , height: 300
                , width: 200
                , id: 'demo1'
                , parseData: function (res) {
                    return {
                        "value": res.id //数据值
                        , "title": res.name //数据标题
                        , "disabled": res.disabled  //是否禁用
                        , "checked": res.checked //是否选中
                        , text: {
                            none: '无数据' //没有数据时的文案
                            , searchNone: '无匹配数据' //搜索无匹配数据时的文案
                        }
                    }
                }
            });
        }
        //监听提交编辑用户
        form.on('submit(updateRole)', function (data) {
            var getData = transfer.getData('demo1'); //获取右侧穿梭款被选中的数据
            var name = []; //右边名称
            if (getData.length > 0) {
                for (var i = 0; i < getData.length; i++) {
                    name.push(getData[i].title)
                }
            }

            var allName = [];  //原始用户名数组
            for (var i = 0; i < user.length; i++) {
                allName.push(user[i].username + "");
            }

            var deleteArr = []; //要删除的人的账号
            for (var j = 0; j < allName.length; j++) {
                if (name.indexOf(allName[j]) < 0) {
                    deleteArr.push(allName[j])
                }
            }
            var addArr = []; //要增加的人的账号
            for (var j = 0; j < name.length; j++) {
                if (allName.indexOf(name[j]) < 0) {
                    addArr.push(name[j])
                }
            }
            if (addArr.length == 0) {
                addArr.push("无数据")
            }
            if (deleteArr.length == 0) {
                deleteArr.push("无数据")
            }

            //表单提交数据
            var json = {
                "desc": data.field.desc,
                "roleid": data.field.roleid,
                "rolename": data.field.rolename,
                "addArr": addArr,
                "deleteArr": deleteArr
            };

            $.ajax({
                url: '/updateUserRoles',
                method: 'post',
                data: json,
                dataType: "json",
                success: function (data) {
                    if (data.result > 0) {
                        layer.alert("增加成功", {
                                icon: 6
                                //点击右上角的回调
                                , cancel: function (index) {
                                    layer.closeAll();
                                    table.reload('table')
                                }
                            },
                            //点击确认的回调
                            function (index) {
                                layer.closeAll();
                                //重载表格
                                table.reload('table');
                            });
                    } else {
                        layer.alert("提交失败了,刷新试试", {
                            icon: 5, title: '提示', cancel: function (index) {
                                layer.closeAll()
                            }
                        }, function () {
                            layer.closeAll();
                        })
                    }
                },
                error: function (e) {
                    layer.alert("提交失败了,刷新试试", {
                        icon: 5, title: '提示', cancel: function (index) {
                            layer.closeAll()
                        }
                    }, function () {
                        layer.closeAll();
                    })
                }
            });
            // ajax提交必写，也是天坑
            return false;
        });
    });

    //查询
    $(document).on('click', '#search', function () {
        var roleid = $("#keyWord").val();
        if (roleid.trim().toString() == "") {
            table.reload('table', {url: '/getRole'});
        } else {
            table.reload('table', {
                page: {
                    curr: 1
                },
                where: {
                    roleid: roleid
                },
                method: 'post',
                url: '/searchRole'
            });
        }
    });
    form.verify({
        repeatRoleId: function (value, item) { //value：表单的值、item：表单的DOM对象
            console.log(value)
            var checkResult = "";
            $.ajax({
                url: "/selectRepeatRoleId",
                type: "GET",
                data: {"roleid": value},
                async: false,
                success: function (data) {
                    if (data.result > 0) {
                        checkResult = "角色编号不能重复";
                    }
                },
                error: function () {
                }
            });
            return checkResult;
        },
        repeatRoleName: function (value, item) {
            var checkResult = "";
            $.ajax({
                url: "/selectRepeatRoleName",
                type: "GET",
                data: {"rolename": value},
                async: false,
                success: function (data) {
                    if (data.result > 0) {
                        checkResult = "角色名称不能重复";
                    }
                },
                error: function () {
                }
            });
            return checkResult;
        }
    });

});
