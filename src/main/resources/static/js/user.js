layui.use(['table', 'element', 'form'], function () {
    var table = layui.table;
    var form = layui.form;
    var layer = layui.layer;
    var laypage = layui.laypage;

    var length = 0; //表格总数据
    var num = 0; //一页显示的数据
    var cu = 1; //当前第几页
    var now = 0;
    //第一个实例

    table.render({
        elem: '#table'
        // ,unresize:true //是否禁用拖拽列
        // ,  closeBtn :0//不显示关闭按钮
        , url: '/getUser' //数据接口
        , page: {theme: '#81d3ff', prev: '上一页', next: '下一页', last: '尾页', refresh: '刷新'} //开启分页
        , skin: 'row ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
        , even: true,
        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        },
        title:'用户表' //大标题，导出数据用得到
        ,refresh: true
        , toolbar: '#toolbarDemo'
        , cols: [[ //表头
            {field: 'checkbox', type: "checkbox", fixed: 'left' , unresize: true}
            , {field: 'id', title: 'ID', sort: true, align: "center" , unresize: true}
            , {field: 'username', title: '用户名', align: "center" , unresize: true}
            , {field: 'sex', title: '性别', sort: true, align: "center" , unresize: true}
            , {field: 'phone', title: '电话号码', sort: true, align: "center" , unresize: true}
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

    //关闭新增窗口
    $("#closeAddWin").click(function () {
        layer.closeAll();
        //重置表单数据
        $("#addUser")[0].reset();
        layui.form.render();
    });
    //显示新增窗口
    $(document).on('click', '#add', function () {
        $("#addUser")[0].reset();
        layui.form.render();
        layer.open({
            type: 1,
            title: "新增用户",
            anim: 1, //有0-6种动画
            content: $('#addUser'),//这里content是一个普通的String
            area: ['500px', '400px'],
            cancel: function () {
                $("#addUser")[0].reset();
                layui.form.render();
            }
            // , btn: ['提交', '取消']
        });

    });

    //监听提交新增用户
    form.on('submit(addUser)', function (data) {

        layer.load(2, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        $.ajax({
            url: '/addUser',
            method: 'post',
            data: data.field,
            dataType: "json",
            success: function (data) {
                if (data.result > 0) {
                    layer.alert("增加成功", {
                            icon: 6,
                            //点击右上角的回调
                            cancel: function (index) {
                                layer.closeAll();
                                //重载表格，避免查询后新增，无法显示新增数据
                                table.reload('table', {url: '/getUser'});
                                //ajax请求获取总数，
                                $.post("getUser", {"page": cu, "limit": num}, function (data) {
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
                                    $("#addUser")[0].reset();
                                    layui.form.render();
                                });
                            }
                        },
                        //点击确认的回调
                        function (index) {
                            layer.closeAll();
                            //重载表格，避免查询后新增，无法显示新增数据
                            table.reload('table', {url: '/getUser'});
                            //ajax请求获取总数，
                            $.post("getUser", {"page": cu, "limit": num}, function (data) {
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
                                $("#addUser")[0].reset();
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
        //ajax提交必写，也是天坑
        return false;
    });
    //点击删除按钮
    $(document).on('click', '#delete', function () {
        var checkStatus = table.checkStatus('table');
        if (checkStatus.data.length === 0) {
            layer.alert("至少选择一行要删除的数据", {icon: 0})
        } else {
            var data = checkStatus.data;
            var id = []; //要删除的用户id
            for (var i = 0; i < data.length; i++) {
                id.push(data[i].id)
            }
            $.post("deleteUsers", {"id": id}, function (data) {
                if (data.result > 0) {
                    var len = layui.table.cache["table"]; //当前没删除前表格的数据
                    if (len.length === id.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                        layer.msg("删除成功");
                        window.location.href = "/user.html"
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


    //alert窗口的图标 1 -6
    //点击编辑按钮
    var close = $("#close").click(function () {
        layer.closeAll();
    });

    $(document).on('click', '#edit', function () {
        var checkStatus = table.checkStatus('table');
        if (checkStatus.data.length === 0) {
            layer.alert("至少选择一行要编辑的数据", {icon: 0})
        } else if (checkStatus.data.length > 1) {
            layer.alert("只能选择一行进行编辑", {icon: 0})
        } else {
            var data = checkStatus.data;
            $("#phone").val(data[0].phone);
            $("#id").val(data[0].id);
            $("#username").val(data[0].username);
            $("#password").val(data[0].password);
            $("#sex input:radio").each(function () {
                if ($(this).val() == data[0].sex) {
                    $(this).prop("checked", true);
                    //一定要动态渲染表单，不然没用，这里天坑
                    form.render()
                }
            });
            layer.open({
                type: 1,
                title: "编辑用户",
                anim: 4,
                content: $('#updateUser'),//这里content是一个普通的String
                area: ['500px', '400px']
            });
            //监听提交编辑用户
            form.on('submit(updateUser)', function (data) {
                layer.load(2, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
                $.ajax({
                    url: '/updateUser',
                    method: 'post',
                    data: data.field,
                    dataType: "json",
                    success: function (data) {
                        //重载表格
                        table.reload("table");
                        if (data.result > 0) {
                            layer.alert("修改成功", {
                                icon: 6, cancel: function () {
                                    layer.closeAll();
                                }
                            }, function (index) {
                                layer.closeAll();
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
                return false;
            });
        }
    });
    //查询
    $(document).on('click', '#search', function () {
        var keyWord = $("#keyWord").val();
        if (keyWord.trim().toString() == "") {
            table.reload('table', {url: '/getUser'});
        } else {
            table.reload('table', {
                page: {
                    curr: 1
                },
                where: {
                    keyWord: keyWord
                },
                method: 'post',
                url: '/searchUser'
            });
        }
    });

    form.verify({
        repeatUsername: function (value, item) { //value：表单的值、item：表单的DOM对象
            var checkResult = "";
            $.ajax({
                url: "/selectRepeatUserName",
                type: "GET",
                data: {"username": value},
                async: false,
                success: function (data) {
                    if (data.result > 0) {
                        checkResult = "该账号已存在";
                    }
                },
                error: function () {
                }
            });
            return checkResult;
        }
    });


});