$(function () {
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
            elem: '#attribute'
            // ,  closeBtn :0//不显示关闭按钮
            , url: '../../getAllAttributes' //数据接口
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
                , {field: 'groupCode', title: '编号', sort: true, align: "center", unresize: true}
                , {field: 'groupName', title: '类型名称', align: "center", unresize: true}
                , {field: 'sortNo', title: '排序', sort: true, align: "center", unresize: true}
                , {
                    field: 'catName', title: '适用商品大类', align: "center", unresize: true, templet: function (d) {
                        var str = "";
                        var json = getProductBigByGroup(d.groupCode);
                        if (json.length > 0) {
                            for (let i = 0; i < json.length; i++) {
                                str += json[i].catName + " ";
                            }
                        }
                        return str;
                    }
                }
                , {
                    field: 'confNumber',
                    title: '属性数量',
                    sort: true,
                    align: "center",
                    unresize: true,
                    templet: function (d) {
                        var json = getConfByGroup(d.groupCode);
                        return json.length
                    }
                }
                , {field: 'groupState', title: '状态', align: "center", unresize: true}
                , {
                    field: 'operation',
                    title: '操作',
                    align: "center",
                    fixed: 'right',
                    toolbar: '#toolbarDemoLower',
                    width: 200,
                    unresize: true
                }
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
                    if (res.data[i].groupState == "停用") {
                        $(".layui-table tr").each(function () {
                            if (res.data[i].LAY_TABLE_INDEX == $(this).attr("data-index")) {
                                $(this).css('color', "red");
                            }
                        })
                    }
                }
            }
        });
        //点击返回，返回上级
        $(document).on('click', '#back', function () {

            window.location.href = "/shop/view/ProductAttributes.html"
        });
        //参数列表
        table.on('tool(attribute)', function (obj) {
            var data = obj.data;
            var groupCode = data.groupCode;
            if (obj.event === 'searchLower') {  //查看下集
                $("div").each(function () {
                    if ($(this).attr("lay-id") === "attribute") {
                        $(this).css("display", "none")
                    }
                });
                table.render({
                    elem: '#conf'
                    // ,  closeBtn :0//不显示关闭按钮
                    , url: '../../getConfByGroup' //数据接口
                    , where: {"groupCode": groupCode}
                    , page: {theme: '#81d3ff', prev: '上一页', next: '下一页', last: '尾页'} //开启分页
                    , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
                    , even: true,
                    text: {
                        none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
                    }
                    , toolbar: '#demoLower'
                    , cols: [[ //表头
                        {field: 'checkbox', type: "checkbox", fixed: 'left'}
                        , {field: 'attrCode', title: '编号', sort: true, align: "center", unresize: true}
                        , {field: 'attrName', title: '属性名称', align: "center", unresize: true}
                        , {field: 'attrType', title: '属性是否可选', align: "center", unresize: true}
                        , {
                            field: 'entryWay', title: '录入方式', align: "center", unresize: true, templet: function (d) {
                                return "列表录入"
                            }
                        }
                        , {field: 'options', title: '可选值列表', align: "center", unresize: true}
                        , {field: 'sortNo', title: '排序', sort: true, align: "center", unresize: true}
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
                        // for (let i = 0; i <res.data.length ; i++) {
                        //     if(res.data[i].isShow=="否"){
                        //         $(".layui-table tr").each(function () {
                        //             if(res.data[i].LAY_TABLE_INDEX==$(this).attr("data-index")){
                        //                 $(this).css('color',"red");
                        //             }
                        //         })
                        //     }
                        // }
                    }
                });


                //查询
                $(document).on('click', '#searchLower', function () {
                    //查询的状态信息
                    var keyWord = $("#keyWordLower").val();
                    if (keyWord.trim().toString() == "") {
                        table.reload('conf', {url: '../../getConfByGroup'});
                    } else {
                        table.reload('conf', {
                            page: {
                                curr: 1
                            },
                            where: {
                                keyWord: keyWord,
                                groupCode: groupCode
                            },
                            method: 'post',
                            url: '../../searchConfByKeyWord'
                        });
                    }
                });

                //点击删除按钮
                $(document).on('click', '#deleteLower', function () {
                    var checkStatus = table.checkStatus('conf');
                    if (checkStatus.data.length === 0) {
                        layer.alert("至少选择一行要删除的数据", {icon: 0})
                    } else {
                        var data = checkStatus.data;
                        var confCode = []; //要删除的属性id
                        for (var i = 0; i < data.length; i++) {
                            confCode.push(data[i].attrCode)
                        }
                        $.post("../../deleteConf", {"confCode": confCode}, function (data) {
                            if (data.result > 0) {
                                var len = layui.table.cache["conf"]; //当前没删除前表格的数据
                                if (len.length === confCode.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                                    layer.msg("删除成功");
                                    window.location.href = "../../shop/view/ProductAttributes.html"
                                } else {
                                    layer.alert("删除成功", {icon: 6});
                                    table.reload("conf");
                                }
                            } else {
                                layer.alert("提交失败了,刷新试试", {icon: 5, title: '提示'}, function () {
                                    layer.closeAll();
                                })
                            }
                        })
                    }
                });
                //新增
                $("#closeAddAttrWin").click(function () {
                    layer.closeAll();
                    $("#addAttr")[0].reset();
                    layui.form.render();

                });
                $(document).on('click', '#addLower', function () {
                    $("#addAttr")[0].reset();
                    layui.form.render();


                    layer.open({
                        type: 1,
                        title: "新增商品属性",
                        anim: 1, //有0-6种动画
                        content: $('#addAttr'),//这里content是一个普通的String
                        area: ['700px', '500px'],
                        cancel: function () {
                            $("#addAttr")[0].reset();
                            layui.form.render();
                        }
                        // , btn: ['提交', '取消']
                    });

                    form.on('submit(addAttr)', function (data) {
                        var json = [
                            data.field.attrCode,
                            groupCode,
                            data.field.attrName,
                            data.field.attrType,
                            data.field.options,
                            data.field.sortNo
                        ];
                        $.ajax({
                            url: '../../addAttr',
                            method: 'post',
                            data: {"json": json},
                            dataType: "json",
                            success: function (data) {
                                if (data.result > 0) {
                                    layer.alert("新增成功！", {
                                        icon: 6, title: '提示', cancel: function (index) {
                                            table.reload('conf', {url: '../../getConfByGroup'});
                                            //ajax请求获取总数，
                                            $.post("../../getConfByGroup", {"page": cu, "limit": num}, function (data) {
                                                length = data.count; //总数
                                                var currPageNo = 0; //要跳转的页数
                                                if (parseInt(length / num) === length / num) {
                                                    currPageNo = (length / num)
                                                } else {
                                                    currPageNo = Math.ceil(length / num);
                                                }
                                                //跳转到指定页
                                                table.reload("conf", {
                                                    page: {
                                                        curr: currPageNo
                                                    }
                                                });

                                            });
                                            layer.closeAll();
                                            //重置表单数据
                                            $("#addAttr")[0].reset();
                                            layui.form.render();
                                        }
                                    }, function () {
                                        table.reload('conf', {url: '../../getConfByGroup'});
                                        //ajax请求获取总数，
                                        $.post("../../getConfByGroup", {"page": cu, "limit": num}, function (data) {
                                            length = data.count; //总数
                                            var currPageNo = 0; //要跳转的页数
                                            if (parseInt(length / num) === length / num) {
                                                currPageNo = (length / num)
                                            } else {
                                                currPageNo = Math.ceil(length / num);
                                            }
                                            //跳转到指定页
                                            table.reload("conf", {
                                                page: {
                                                    curr: currPageNo
                                                }
                                            });

                                        });
                                        layer.closeAll();
                                        //重置表单数据
                                        $("#addAttr")[0].reset();
                                        layui.form.render();
                                    })
                                } else {
                                    layer.alert("新增失败！", {
                                        icon: 6, title: '提示', cancel: function (index) {
                                            layer.closeAll();
                                            $("#addAttr")[0].reset();
                                            layui.form.render();
                                        }
                                    }, function () {
                                        layer.closeAll();
                                        $("#addAttr")[0].reset();
                                        layui.form.render();
                                    })
                                }
                            },
                            error: function (e) {
                                layer.alert("提交失败了,刷新试试", {
                                    icon: 5, title: '提示', cancel: function (index) {
                                        layer.closeAll();
                                        $("#addAttr")[0].reset();
                                        layui.form.render();
                                    }
                                }, function () {
                                    layer.closeAll();
                                    $("#addAttr")[0].reset();
                                    layui.form.render();
                                })
                            }
                        });
                        return false;
                    });
                });

                //点击编辑按钮
                var close = $("#closeEditAttrWin").click(function () {
                    layer.closeAll();
                    $("#editAttr")[0].reset();
                    layui.form.render();
                });

                $(document).on('click', '#editLower', function () {
                    var checkStatus = table.checkStatus('conf');
                    if (checkStatus.data.length === 0) {
                        layer.alert("至少选择一行要编辑的数据", {icon: 0})
                    } else if (checkStatus.data.length > 1) {
                        layer.alert("只能选择一行进行编辑", {icon: 0})
                    } else {
                        var data = checkStatus.data;
                        var attrCode = data[0].attrCode;
                        var all = repeatAttrCode(attrCode); //该编码商品属性的信息
                        layer.open({
                            type: 1,
                            title: "编辑属性信息",
                            content: $('#editAttr'),//这里content是一个普通的String
                            area: ['700px', '500px']
                        });
                        form.val("editAttr", all[0]);

                        //监听提交编辑用户
                        form.on('submit(editAttr)', function (data) {
                            $.ajax({
                                url: '../../editAttr',
                                method: 'post',
                                data: data.field,
                                dataType: "json",
                                success: function (data) {
                                    //重载表格
                                    table.reload("conf");
                                    if (data.result > 0) {
                                        layer.alert("修改成功", {
                                            icon: 6, cancel: function () {
                                                layer.closeAll();
                                                table.reload('conf')
                                            }
                                        }, function (index) {
                                            layer.closeAll();
                                            table.reload('conf')
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


                ///
            }
        });

        //查询
        $(document).on('click', '#search', function () {
            //查询的状态信息
            var keyWord = $("#keyWord").val();
            if (keyWord.trim().toString() == "") {
                table.reload('attribute', {url: '../../getAllAttributes'});
            } else {
                table.reload('attribute', {
                    page: {
                        curr: 1
                    },
                    where: {
                        keyWord: keyWord
                    },
                    method: 'post',
                    url: '../../searchAttributesByKeyWord'
                });
            }
        });
        //点击删除按钮
        $(document).on('click', '#delete', function () {
            var checkStatus = table.checkStatus('attribute');
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要删除的数据", {icon: 0})
            } else {
                var data = checkStatus.data;
                var groupCode = []; //要删除的属性id
                for (var i = 0; i < data.length; i++) {
                    groupCode.push(data[i].groupCode)
                }
                $.post("../../deleteGroup", {"groupCode": groupCode}, function (data) {
                    if (data.result > 0) {
                        var len = layui.table.cache["attribute"]; //当前没删除前表格的数据
                        if (len.length === groupCode.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                            layer.msg("删除成功");
                            window.location.href = "/shop/view/ProductAttributes.html"
                        } else {
                            layer.alert("删除成功", {icon: 6});
                            table.reload("attribute");
                        }
                    } else {
                        layer.alert("提交失败了,刷新试试", {icon: 5, title: '提示'}, function () {
                            layer.closeAll();
                        })
                    }
                })
            }
        });
        //新增
        $("#closeAddWin").click(function () {
            layer.closeAll();
            $("#addGroup")[0].reset();
            layui.form.render();
        });
        $(document).on('click', '#add', function () {
            $("#addGroup")[0].reset();
            layui.form.render();


            layer.open({
                type: 1,
                title: "新增商品组",
                anim: 1, //有0-6种动画
                content: $('#addGroup'),//这里content是一个普通的String
                area: ['700px', '520px'],
                cancel: function () {
                    $("#addGroup")[0].reset();
                    layui.form.render();
                }
                // , btn: ['提交', '取消']
            });
            //穿梭框赋值
            var big = getProductBig();
            transfer.render({
                elem: '#Big'
                , data: big
                , title: ['可选大类', '已选大类']
                , showSearch: true
                , height: 300
                , width: 200
                , id: 'demo1'
                , parseData: function (res) {
                    return {
                        "value": res.catCode //数据值
                        , "title": res.catName //数据标题
                        , text: {
                            none: '无数据' //没有数据时的文案
                            , searchNone: '无匹配数据' //搜索无匹配数据时的文案
                        }
                    }
                }
            });

            form.on('submit(addGroup)', function (data) {
                var getData = transfer.getData('demo1');

                var catCode = [];
                //选中查看的id
                if (getData.length > 0) {
                    for (let i = 0; i < getData.length; i++) {
                        catCode.push(getData[i].value)
                    }
                } else {
                    catCode.push("无数据")
                }
                //表单提交数据
                var json = [
                    data.field.groupCode,
                    data.field.groupName,
                    data.field.sortNo,
                    data.field.groupState
                ];

                $.ajax({
                    url: '../../addGroup',
                    method: 'post',
                    data: {"json": json, "catCode": catCode},
                    dataType: "json",
                    success: function (data) {
                        if (data.result > 0) {
                            layer.alert("新增成功！", {
                                icon: 6, title: '提示', cancel: function (index) {
                                    table.reload('attribute', {url: '../../getAllAttributes'});
                                    //ajax请求获取总数，
                                    $.post("../../getAllAttributes", {"page": cu, "limit": num}, function (data) {
                                        length = data.count; //总数
                                        var currPageNo = 0; //要跳转的页数
                                        if (parseInt(length / num) === length / num) {
                                            currPageNo = (length / num)
                                        } else {
                                            currPageNo = Math.ceil(length / num);
                                        }
                                        //跳转到指定页
                                        table.reload("attribute", {
                                            page: {
                                                curr: currPageNo
                                            }
                                        });

                                    });
                                    layer.closeAll();
                                    //重置表单数据
                                    $("#addGroup")[0].reset();
                                    layui.form.render();
                                }
                            }, function () {
                                table.reload('attribute', {url: '../../getAllAttributes'});
                                //ajax请求获取总数，
                                $.post("../../getAllAttributes", {"page": cu, "limit": num}, function (data) {
                                    length = data.count; //总数
                                    var currPageNo = 0; //要跳转的页数
                                    if (parseInt(length / num) === length / num) {
                                        currPageNo = (length / num)
                                    } else {
                                        currPageNo = Math.ceil(length / num);
                                    }
                                    //跳转到指定页
                                    table.reload("attribute", {
                                        page: {
                                            curr: currPageNo
                                        }
                                    });

                                });
                                layer.closeAll();
                                //重置表单数据
                                $("#addGroup")[0].reset();
                                layui.form.render();
                            })
                        } else {
                            layer.alert("新增失败！", {
                                icon: 6, title: '提示', cancel: function (index) {
                                    layer.closeAll();
                                    $("#addGroup")[0].reset();
                                    layui.form.render();
                                }
                            }, function () {
                                layer.closeAll();
                                $("#addGroup")[0].reset();
                                layui.form.render();
                            })
                        }
                    },
                    error: function (e) {
                        layer.alert("提交失败了,刷新试试", {
                            icon: 5, title: '提示', cancel: function (index) {
                                layer.closeAll();
                                $("#addGroup")[0].reset();
                                layui.form.render();
                            }
                        }, function () {
                            layer.closeAll();
                            $("#addGroup")[0].reset();
                            layui.form.render();
                        })
                    }
                });
                return false;
            });
        });

        //点击编辑按钮
        var close = $("#closeEditWin").click(function () {
            layer.closeAll();
            $("#editGroup")[0].reset();
            layui.form.render();
        });

        $(document).on('click', '#edit', function () {
            var checkStatus = table.checkStatus('attribute');
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要编辑的数据", {icon: 0})
            } else if (checkStatus.data.length > 1) {
                layer.alert("只能选择一行进行编辑", {icon: 0})
            } else {
                var data = checkStatus.data;
                var groupCode = data[0].groupCode;
                var g = repeatGroupCode(groupCode);//属性组信息
                layer.open({
                    type: 1,
                    title: "编辑属性组",
                    content: $('#editGroup'),//这里content是一个普通的String
                    area: ['700px', '520px']
                });
                form.val("editGroup", g[0]);
                var all = getProductBig(); //所有商品大类的信息
                var correspond = getProductBigByGroup(groupCode);//该属性组对应的大类
                var productBigCode = [];
                if (correspond.length > 0) {
                    for (let i = 0; i < correspond.length; i++) {
                        productBigCode.push(correspond[i].catCode)
                    }
                }
                transfer.render({
                    elem: '#edit-Big'
                    , data: all
                    , value: productBigCode
                    , title: ['待选商品大类', '适用商品大类']
                    , showSearch: true
                    , height: 300
                    , width: 200
                    , id: 'demo1'
                    , parseData: function (res) {
                        return {
                            "value": res.catCode //数据值
                            , "title": res.catName //数据标题
                            // , "disabled": res.disabled  //是否禁用
                            , text: {
                                none: '无数据' //没有数据时的文案
                                , searchNone: '无匹配数据' //搜索无匹配数据时的文案
                            }
                        }
                    }
                });

                //监听提交编辑用户
                form.on('submit(editGroup)', function (data) {
                    var getData = transfer.getData('demo1'); //获取右侧穿梭款被选中的数据
                    var bigCode = []; //最终右边的数据
                    if (getData.length > 0) {
                        for (var i = 0; i < getData.length; i++) {
                            bigCode.push(getData[i].value)
                        }
                    }


                    var deleteArr = []; //要删除的
                    for (var j = 0; j < productBigCode.length; j++) {
                        if (bigCode.indexOf(productBigCode[j]) < 0) {
                            deleteArr.push(productBigCode[j])
                        }
                    }
                    var addArr = []; //要增加的
                    for (var j = 0; j < bigCode.length; j++) {
                        if (productBigCode.indexOf(bigCode[j]) < 0) {
                            addArr.push(bigCode[j])
                        }
                    }
                    if (addArr.length == 0) {
                        addArr.push("无数据")
                    }
                    if (deleteArr.length == 0) {
                        deleteArr.push("无数据")
                    }
                    //表单提交数据
                    //表单提交数据
                    var json = [
                        data.field.groupCode,
                        data.field.groupName,
                        data.field.sortNo,
                        data.field.groupState
                    ];
                    $.ajax({
                        url: '../../editGroup',
                        method: 'post',
                        data: {"group": json, "add": addArr, "delete": deleteArr},
                        dataType: "json",
                        success: function (data) {
                            //重载表格
                            table.reload("attribute");
                            if (data.result > 0) {
                                layer.alert("修改成功", {
                                    icon: 6, cancel: function () {
                                        layer.closeAll();
                                        table.reload('attribute')
                                    }
                                }, function (index) {
                                    layer.closeAll();
                                    table.reload('attribute')
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
            repeatGroupCode: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                var json = repeatGroupCode(value);
                if (json.length > 0) {
                    checkResult = "编码已存在"
                }
                return checkResult;
            },
            repeatAttrCode: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                var json = repeatAttrCode(value);
                if (json.length > 0) {
                    checkResult = "编码已存在"
                }
                return checkResult;
            }
        });
    });
});

