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
        elem: '#brand'
        // ,  closeBtn :0//不显示关闭按钮
        , url: '../../getAllBrand' //数据接口
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
            , {field: 'brandCode', title: '编号', sort: true, align: "center", unresize: true}
            , {field: 'brandName', title: '品牌名称', align: "center", unresize: true}
            , {field: 'fletter', title: '品牌首字母', align: "center", unresize: true}
            , {field: 'sortNo', title: '排序', sort: true, align: "center", unresize: true}
            , {field: 'isShow', title: '显示', align: "center", unresize: true}
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
                if (res.data[i].isShow == "否") {
                    $(".layui-table tr").each(function () {
                        if (res.data[i].LAY_TABLE_INDEX == $(this).attr("data-index")) {
                            $(this).css('color', "red");
                        }
                    })
                }
            }
        }
    });
    //点击删除按钮
    $(document).on('click', '#delete', function () {
        var checkStatus = table.checkStatus('brand');
        if (checkStatus.data.length === 0) {
            layer.alert("至少选择一行要删除的数据", {icon: 0})
        } else {
            var data = checkStatus.data;
            var brandCode = []; //要删除的角色id
            for (var i = 0; i < data.length; i++) {
                brandCode.push(data[i].brandCode)
            }
            $.post("../../deleteBrand", {"brandCode": brandCode}, function (data) {
                if (data.result > 0) {
                    var len = layui.table.cache["brand"]; //当前没删除前表格的数据
                    if (len.length === brandCode.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                        layer.msg("删除成功");
                        window.location.href = "/shop/view/brand.html"
                    } else {
                        layer.alert("删除成功", {icon: 6});
                        table.reload("brand");
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
            table.reload('brand', {url: '../../getAllBrand'});
        } else {
            table.reload('brand', {
                page: {
                    curr: 1
                },
                where: {
                    keyWord: keyWord
                },
                method: 'post',
                url: '../../searchKeyWordFromBrand'
            });
        }
    });
    //增加渠道信息
    //关闭新增门店窗口
    $("#closeAddWin").click(function () {
        layer.closeAll();
        $("#addForm")[0].reset();
        layui.form.render();
    });
    //显示新增门店窗口,并新增门店
    $(document).on('click', '#add', function () {
        $("#addForm")[0].reset();
        layui.form.render();

        layer.open({
            type: 1,
            title: "新增渠道",
            anim: 1, //有0-6种动画
            content: $('#addForm'),//这里content是一个普通的String
            area: ['700px', '520px'],
            cancel: function () {
                $("#addForm")[0].reset();
                layui.form.render();
            }
            // , btn: ['提交', '取消']
        });
        var big = getProductBig();
        transfer.render({
            elem: '#getAllProductBig'
            , data: big
            , title: ['可选商品大类', '已选商品大类']
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
        form.on('submit(addBrand)', function (data) {
            var getData = transfer.getData('demo1'); //获取右侧穿梭款被选中的数据
            var catCode = [];
            if (getData.length > 0) {
                for (var i = 0; i < getData.length; i++) {
                    catCode.push(getData[i].value)
                }
            } else {
                catCode.push("无数据")
            }
            var json = [
                data.field.brandCode,
                data.field.brandName,
                data.field.fletter,
                data.field.sortNo,
                data.field.isShow,
            ];
            $.ajax({
                url: '../../addBrand',
                method: 'post',
                data: {"brand": json, "catCode": catCode},
                dataType: "json",
                success: function (data) {
                    if (data.result > 0) {
                        layer.alert("新增成功！", {
                            icon: 6, title: '提示', cancel: function (index) {
                                table.reload('brand', {url: '../../getAllBrand'});
                                //ajax请求获取总数，
                                $.post("../../getAllBrand", {"page": cu, "limit": num}, function (data) {
                                    length = data.count; //总数
                                    var currPageNo = 0; //要跳转的页数
                                    if (parseInt(length / num) === length / num) {
                                        currPageNo = (length / num)
                                    } else {
                                        currPageNo = Math.ceil(length / num);
                                    }
                                    //跳转到指定页
                                    table.reload("brand", {
                                        page: {
                                            curr: currPageNo
                                        }
                                    });
                                });
                                layer.closeAll();
                                //重置表单数据
                                $("#addForm")[0].reset();
                                layui.form.render();
                            }
                        }, function () {
                            table.reload('brand', {url: '../../getAllBrand'});
                            //ajax请求获取总数，
                            $.post("../../getAllBrand", {"page": cu, "limit": num}, function (data) {
                                length = data.count; //总数
                                var currPageNo = 0; //要跳转的页数
                                if (parseInt(length / num) === length / num) {
                                    currPageNo = (length / num)
                                } else {
                                    currPageNo = Math.ceil(length / num);
                                }
                                //跳转到指定页
                                table.reload("brand", {
                                    page: {
                                        curr: currPageNo
                                    }
                                });

                            });
                            layer.closeAll();
                            //重置表单数据
                            $("#addForm")[0].reset();
                            layui.form.render();
                        })
                    } else {
                        layer.alert("新增失败！", {
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
    $(document).on("click", "#closeEditWin", function () {
        layer.closeAll();
    });
    // 显示编辑窗口
    $(document).on('click', '#edit', function () {
        $("#editForm")[0].reset();
        layui.form.render();

        var checkStatus = table.checkStatus('brand');
        if (checkStatus.data.length === 0) {
            layer.alert("至少选择一行要编辑的数据", {icon: 0})
        } else if (checkStatus.data.length > 1) {
            layer.alert("只能选择一行进行编辑", {icon: 0})
        } else {
            var data = checkStatus.data;
            var hui = getBrandInformation(data[0].brandCode); //点击行的数据
            form.val("editForm", hui[0]);

            layer.open({
                type: 1,
                title: "编辑品牌管理",
                anim: 1, //有0-6种动画
                content: $('#editForm'),//这里content是一个普通的String
                area: ['700px', '520px']
                , cancel: function (index, layero) {
                    layer.closeAll();
                    $("#editForm")[0].reset();
                    layui.form.render();
                }
                // , btn: ['提交', '取消']
            });
            var big = getProductBig();
            var productBig = getProductByBrandCode(data[0].brandCode); //这个品牌管理编码相关的大类信息
            var catCode = [];//相关的大类编码
            if (productBig.length > 0) {
                for (let i = 0; i < productBig.length; i++) {
                    catCode.push(productBig[i].catCode)
                }
            }
            //显示搜索框的穿梭款
            transfer.render({
                elem: '#getEditAllProductBig'
                , data: big
                , value: catCode
                , title: ['可选商品大类', '已选商品大类']
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
        }
        //监听提交编辑用户
        form.on('submit(updateBrand)', function (data) {
            var getData = transfer.getData('demo1'); //获取右侧穿梭款被选中的数据
            var code = []; //最终获取到的右边名称的code编码
            if (getData.length > 0) {
                for (var i = 0; i < getData.length; i++) {
                    code.push(getData[i].value)
                }
            }

            var deleteArr = []; //要删除的人的code
            for (var j = 0; j < catCode.length; j++) {
                if (code.indexOf(catCode[j]) < 0) {
                    deleteArr.push(catCode[j])
                }
            }
            var addArr = []; //要增加的人的账号
            for (var j = 0; j < code.length; j++) {
                if (catCode.indexOf(code[j]) < 0) {
                    addArr.push(code[j])
                }
            }
            if (addArr.length == 0) {
                addArr.push("无数据")
            }
            if (deleteArr.length == 0) {
                deleteArr.push("无数据")
            }

            //表单提交数据
            var json = [
                data.field.brandCode,
                data.field.brandName,
                data.field.fletter,
                data.field.sortNo,
                data.field.isShow,
            ];

            $.ajax({
                url: '../../updateBrand',
                method: 'post',
                data: {"brand": json, "addArr": addArr, "deleteArr": deleteArr},
                dataType: "json",
                success: function (data) {
                    if (data.result > 0) {
                        layer.alert("增加成功", {
                                icon: 6
                                //点击右上角的回调
                                , cancel: function (index) {
                                    $("#editForm")[0].reset();
                                    layui.form.render();
                                    layer.closeAll();
                                    table.reload('brand')
                                }
                            },
                            //点击确认的回调
                            function (index) {
                                $("#editForm")[0].reset();
                                layui.form.render();
                                layer.closeAll();
                                //重载表格
                                table.reload('brand');
                            });
                    } else {
                        layer.alert("提交失败了,刷新试试", {
                            icon: 5, title: '提示', cancel: function (index) {
                                layer.closeAll()
                                $("#editForm")[0].reset();
                                layui.form.render();
                            }
                        }, function () {
                            layer.closeAll();
                            $("#editForm")[0].reset();
                            layui.form.render();
                        })
                    }
                },
                error: function (e) {
                    layer.alert("提交失败了,刷新试试", {
                        icon: 5, title: '提示', cancel: function (index) {
                            layer.closeAll();
                            $("#editForm")[0].reset();
                            layui.form.render();
                        }
                    }, function () {
                        layer.closeAll();
                        $("#editForm")[0].reset();
                        layui.form.render();
                    })
                }
            });
            // ajax提交必写，也是天坑
            return false;
        });
    });

    form.verify({
        repeatBrandCode: function (value, item) { //value：表单的值、item：表单的DOM对象
            var checkResult = "";
            $.ajax({
                url: "../../repeatBrandCode",
                type: "GET",
                data: {"brandCode": value},
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
        },
        repeatBrandName:function (value) {
            var checkResult = "";
            var json = repeatBrandName(value);
            if (json.length > 0) {
                checkResult = "名称已存在"
            }
            return checkResult;
        }

    });
});