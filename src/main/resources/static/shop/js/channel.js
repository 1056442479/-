layui.use(['table', 'element', 'form', 'transfer', 'tree'], function () {
    var table = layui.table;
    var form = layui.form;
    var layer = layui.layer;
    var transfer = layui.transfer;
    var tree = layui.tree;

    var length = 0; //表格总数据
    var num = 0; //一页显示的数据
    var cu = 1; //当前第几页
    var now = 0;


    table.render({
        elem: '#channel'
        // ,  closeBtn :0//不显示关闭按钮
        , url: '../../getAllChannel' //数据接口
        , page: {theme: '#81d3ff', prev: '上一页', next: '下一页', last: '尾页'} //开启分页
        , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
        , even: true,
        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        }
        , toolbar: '#toolbarDemo'
        // , unresize: true //是否拖拽，true为禁用
        , cols: [[ //表头
            {field: 'checkbox', type: "checkbox", fixed: 'left'}
            , {field: 'channelCode', title: '编号', sort: true, align: "center", unresize: true}
            , {field: 'channelName', title: '渠道名称', sort: true, align: "center", unresize: true}
            , {field: 'mobile', title: '手机', sort: true, align: "center", unresize: true}
            , {field: 'totalCharge', title: '累计充值', sort: true, align: "center", unresize: true}
            , {field: 'consume', title: '累计消费', sort: true, align: "center", unresize: true}
            , {field: 'memberCount', title: '会员数量', sort: true, align: "center", unresize: true}
            , {field: 'channelState', title: '状态', align: "center", unresize: true}
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
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].channelState == "停用") {
                    $(".layui-table tr").each(function () {
                        if (res.data[i].LAY_TABLE_INDEX == $(this).attr("data-index")) {
                            $(this).css('color', "red");
                        }
                    })
                }
            }
        }
    });

    //增加渠道信息
    //关闭新增门店窗口
    $("#closeAddWin").click(function () {
        layer.closeAll();
    });
    //显示新增门店窗口,并新增门店
    $(document).on('click', '#add', function () {
        $("#addForm")[0].reset();
        layui.form.render();

        layer.open({
            type: 1,
            title: "新增品牌",
            anim: 1, //有0-6种动画
            content: $('#addForm'),//这里content是一个普通的String
            area: ['700px', '520px'],
            cancel: function () {
                $("#addForm")[0].reset();
                layui.form.render();
            }
            // , btn: ['提交', '取消']
        });

        form.on('submit(addBrand)', function (data) {
            $.ajax({
                url: '/addBrand',
                method: 'post',
                data: data.field,
                dataType: "json",
                success: function (data) {
                    if (data.result > 0) {
                        layer.alert("新增成功！", {
                            icon: 6, title: '提示', cancel: function (index) {
                                table.reload('channel', {url: '../../getAllChannel'});
                                //ajax请求获取总数，
                                $.post("../../getAllChannel", {"page": cu, "limit": num}, function (data) {
                                    length = data.count; //总数
                                    var currPageNo = 0; //要跳转的页数
                                    if (parseInt(length / num) === length / num) {
                                        currPageNo = (length / num)
                                    } else {
                                        currPageNo = Math.ceil(length / num);
                                    }
                                    //跳转到指定页
                                    table.reload("store", {
                                        page: {
                                            curr: currPageNo
                                        }
                                    });
                                    layer.closeAll();
                                    //重置表单数据
                                    $("#addForm")[0].reset();
                                    layui.form.render();
                                });
                            }
                        }, function () {
                            table.reload('channel', {url: '../../getAllChannel'});
                            //ajax请求获取总数，
                            $.post("../../getAllChannel", {"page": cu, "limit": num}, function (data) {
                                length = data.count; //总数
                                var currPageNo = 0; //要跳转的页数
                                if (parseInt(length / num) === length / num) {
                                    currPageNo = (length / num)
                                } else {
                                    currPageNo = Math.ceil(length / num);
                                }
                                //跳转到指定页
                                table.reload("channel", {
                                    page: {
                                        curr: currPageNo
                                    }
                                });
                                layer.closeAll();
                                //重置表单数据
                                $("#addForm")[0].reset();
                                layui.form.render();
                            });
                        })
                    } else {
                        layer.alert("新增失败！", {
                            icon: 6, title: '提示', cancel: function (index) {
                                layer.closeAll();
                                $("#addForm")[0].reset();
                                layui.form.render();
                            }
                        }, function () {
                            layer.closeAll();
                            $("#addForm")[0].reset();
                            layui.form.render();
                        })
                    }
                },
                error: function (e) {
                    layer.alert("提交失败了,刷新试试", {
                        icon: 5, title: '提示', cancel: function (index) {
                            layer.closeAll();
                            $("#addForm")[0].reset();
                            layui.form.render();
                        }
                    }, function () {
                        layer.closeAll();
                        $("#addForm")[0].reset();
                        layui.form.render();
                    })
                }
            });
            return false;
        });
    });
    //点击删除按钮
    $(document).on('click', '#delete', function () {
        var checkStatus = table.checkStatus('channel');
        if (checkStatus.data.length === 0) {
            layer.alert("至少选择一行要删除的数据", {icon: 0})
        } else {
            var data = checkStatus.data;
            var channelCode = []; //要删除的角色id
            for (var i = 0; i < data.length; i++) {
                channelCode.push(data[i].channelCode)
            }
            $.post("../../deleteChannel", {"channelCode": channelCode}, function (data) {
                if (data.result > 0) {
                    var len = layui.table.cache["channel"]; //当前没删除前表格的数据
                    if (len.length === channelCode.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                        layer.msg("删除成功");
                        window.location.href = "/shop/view/channel.html"
                    } else {
                        layer.alert("删除成功", {icon: 6});
                        table.reload("channel");
                    }
                } else {
                    layer.alert("提交失败了,刷新试试", {icon: 5, title: '提示'}, function () {
                        layer.closeAll();
                    })
                }
            })
        }
    });
    //查询
    $(document).on('click', '#search', function () {
        //查询的状态信息
        var keyWord = $("#keyWord").val();
        if (keyWord.trim().toString() == "") {
            table.reload('channel', {url: '../../getAllChannel'});
        } else {
            table.reload('channel', {
                page: {
                    curr: 1
                },
                where: {
                    keyWord: keyWord
                },
                method: 'post',
                url: '../../searchKeyWordFromChannel'
            });
        }
    });
    //编辑页面
    $("#closeEditWin").click(function () {
        layer.closeAll();

    });

    $(document).on('click', '#edit', function () {
        $("#editForm")[0].reset();
        layui.form.render();

        var checkStatus = table.checkStatus('channel');
        if (checkStatus.data.length === 0) {
            layer.alert("至少选择一行要编辑的数据", {icon: 0})
        } else if (checkStatus.data.length > 1) {
            layer.alert("只能选择一行进行编辑", {icon: 0})
        } else {
            var data = checkStatus.data;
            var channelCode = data[0].channelCode; //编号
            var json = "";
            $.ajax({
                url: "../../searchChannelByCode",
                data: {"channelCode": channelCode},
                type: "get",
                dataType: "json",
                async: false,    //异步
                success: function (data) {
                    json = data.result[0]
                }
            });
            form.val("editForm", json);
            $("#state input:radio").each(function () {
                if ($(this).val() == data[0].channelState) {
                    $(this).prop("checked", true);
                    //一定要动态渲染表单，不然没用，这里天坑
                    form.render()
                }
            });
            layer.open({
                type: 1,
                title: "编辑用户",
                content: $('#editForm'),//这里content是一个普通的String
                area: ['700px', '520px']
            });

            //监听提交编辑用户
            form.on('submit(editChannel)', function (data) {
                $.ajax({
                    url: '../../editChannel',
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
                                    table.reload('channel')
                                }
                            }, function (index) {
                                layer.closeAll();
                                table.reload('channel')
                            });
                        } else {
                            layer.alert("修改失败了,刷新试试", {
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


    form.verify({
        repeatChannelCode: function (value, item) { //value：表单的值、item：表单的DOM对象
            var checkResult = "";
            $.ajax({
                url: "/repeatChannelCode",
                type: "GET",
                data: {"channelCode": value},
                async: false,
                success: function (data) {
                    if (data.result > 0) {
                        checkResult = "该编号已存在";
                    }
                },
                error: function () {
                }
            });
            return checkResult;
        }

    });
});