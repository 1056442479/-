$(function () {
    var deleteTu = []; //添加的索引

    layui.use(['table', 'element', 'form', 'transfer', 'tree'], function () {
        var table = layui.table;
        var form = layui.form;
        var layer = layui.layer;

        var length = 0; //表格总数据
        var num = 0; //一页显示的数据
        var cu = 1; //当前第几页
        var now = 0;

        //增加时的实时动态渲染下拉框
        var html = ''; //全局变量
        var big2 = getProductBig();
        for (let i = 0; i < big2.length; i++) {
            html += '<option value = "' + big2[i].catName + '" selected>' + big2[i].catName + '</option>'
        }
        $("#addUp").html(html);
        form.render('select');//需要渲染一下

        //页面加载时的实时动态渲染下拉框
        // var htmls1 = ''; //全局变量
        // var big =  getProductBig();
        // for (let i = 0; i <big.length ; i++) {
        //     htmls1 += '<option value = "' + big[i].catName + '" selected>' + big[i].catName + '</option>'
        // }
        // $("#keyWordPcatName").html(htmls1);
        // form.render('select');//需要渲染一下


        table.render({
            elem: '#product'
            // ,  closeBtn :0//不显示关闭按钮
            , url: '../../getAllProductSmall' //数据接口
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
                , {field: 'catCode', title: '编号', sort: true, align: "center", unresize: true}
                , {field: 'catName', title: '分类名称', align: "center", unresize: true}
                , {field: 'pcatName', title: '所属大类', align: "center", unresize: true}
                , {field: 'catLvl', title: '级别', sort: true, align: "center", unresize: true}
                , {field: 'unit', title: '单位', align: "center", unresize: true}
                , {field: 'sortNo', title: '排序', sort: true, align: "center", unresize: true}
                , {field: 'isShow', title: '显示', align: "center", unresize: true}
                , {
                    field: 'operation',
                    title: '操作',
                    align: "center",
                    fixed: 'right',
                    toolbar: '#barDemo',
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

        //最右边的动态操作
        table.on('tool(product)', function (obj) {
            var data = obj.data;

            if (obj.event === 'searchLower') {  //查看下集
                $("div").each(function () {
                    if ($(this).attr("lay-id") == "product") {
                        $(this).css("display", "none")
                    }
                });
                table.render({
                    elem: '#productLower'
                    // ,  closeBtn :0//不显示关闭按钮
                    , url: '../../getAllProductThree' //数据接口
                    , where: {"pcatName": data.catName}
                    , page: {theme: '#81d3ff', prev: '上一页', next: '下一页', last: '尾页'} //开启分页
                    , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
                    , even: true,
                    text: {
                        none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
                    }
                    , toolbar: '#toolbarDemoLower'
                    , cols: [[ //表头
                        {field: 'checkbox', type: "checkbox", fixed: 'left'}
                        , {field: 'catCode', title: '编号', sort: true, align: "center", unresize: true}
                        , {field: 'catName', title: '分类名称', align: "center", unresize: true}
                        , {field: 'pcatName', title: '上级分类', align: "center", unresize: true}
                        , {field: 'catLvl', title: '级别', sort: true, align: "center", unresize: true}
                        , {field: 'unit', title: '单位', align: "center", unresize: true}
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

                //点击返回，返回上级
                $(document).on('click', '#back', function () {
                    $("div").each(function () {
                        if ($(this).attr("lay-id") == "product") {
                            $(this).css("display", "block")
                        }
                        if ($(this).attr("lay-id") == "productLower") {
                            $(this).css("display", "none")
                        }
                    });
                });

                //点击删除按钮
                $(document).on('click', '#deleteLower', function () {
                    var checkStatus = table.checkStatus('productLower');
                    if (checkStatus.data.length === 0) {
                        layer.alert("至少选择一行要删除的数据", {icon: 0})
                    } else {
                        var data = checkStatus.data;
                        var productCode = []; //要删除的商品id
                        for (var i = 0; i < data.length; i++) {
                            productCode.push(data[i].catCode)
                        }
                        $.post("../../deleteProductThree", {"productCode": productCode}, function (data) {
                            if (data.result > 0) {
                                var len = layui.table.cache["productLower"]; //当前没删除前表格的数据
                                if (len.length === productCode.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                                    layer.msg("删除成功");
                                    window.location.href = "/shop/view/ProductSubcategories.html"
                                } else {
                                    layer.alert("删除成功", {icon: 6});
                                    table.reload("productLower");
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
                $(document).on('click', '#searchLower', function () {
                    //查询的状态信息
                    var keyWord = $("#keyWordLower").val();
                    if (keyWord.trim().toString() == "") {
                        table.reload('productLower', {url: '../../getAllProductThree'});
                    } else {
                        table.reload('productLower', {
                            page: {
                                curr: 1
                            },
                            where: {
                                keyWord: keyWord,
                                pcatName: data.catName
                            },
                            method: 'post',
                            url: '../../searchProductThreeByKeyWord'
                        });
                    }
                });

                $("#closeAddThreeWin").click(function () {
                    layer.closeAll();
                    $("#addThreeForm")[0].reset();
                    layui.form.render();
                });
                $(document).on('click', '#addLower', function () {
                    //增加时的实时动态渲染下拉框
                    var htmlt = ''; //全局变量
                    var big4 = getProductSmall(data.catName);
                    for (let i = 0; i < big4.length; i++) {
                        htmlt += '<option value = "' + big4[i].catName + '" selected>' + big4[i].catName + '</option>'
                    }
                    $("#two").html(htmlt);
                    form.render('select');//需要渲染一下

                    layer.open({
                        type: 1,
                        title: "新增商品三级",
                        anim: 1, //有0-6种动画
                        content: $('#addThreeForm'),//这里content是一个普通的String
                        area: ['700px', '520px'],
                        cancel: function () {
                            $("#addThreeForm")[0].reset();
                            layui.form.render();
                        }
                        // , btn: ['提交', '取消']
                    });
                    form.on('submit(addThree)', function (data) {
                        $.ajax({
                            url: '../../addProductThree',
                            method: 'post',
                            data: data.field,
                            dataType: "json",
                            success: function (data) {
                                if (data.result > 0) {
                                    layer.alert("新增成功！", {
                                        icon: 6, title: '提示', cancel: function (index) {
                                            table.reload('productLower', {url: '../../getAllProductThree'});
                                            layer.closeAll();
                                            $("#addThreeForm")[0].reset();
                                            layui.form.render();
                                        }
                                    }, function () {
                                        table.reload('productLower', {url: '../../getAllProductThree'});
                                        layer.closeAll();
                                        $("#addThreeForm")[0].reset();
                                        layui.form.render();
                                    })
                                } else {
                                    layer.alert("新增失败！", {
                                        icon: 5, title: '提示', cancel: function (index) {
                                            layer.closeAll();
                                            $("#addThreeForm")[0].reset();
                                            layui.form.render();
                                        }
                                    }, function () {
                                        layer.closeAll();
                                        $("#addThreeForm")[0].reset();
                                        layui.form.render();
                                    })
                                }
                            },
                            error: function (e) {
                                layer.alert("提交失败了,刷新试试", {
                                    icon: 5, title: '提示', cancel: function (index) {
                                        layer.closeAll();
                                        $("#addThreeForm")[0].reset();
                                        layui.form.render();
                                    }
                                }, function () {
                                    layer.closeAll();
                                    $("#addThreeForm")[0].reset();
                                    layui.form.render();
                                })
                            }
                        });
                        return false;
                    });
                });

                //修改
                $(document).on('click', '#closeEditThreeWin', function () {
                    layer.closeAll();
                    $("#addThreeForm")[0].reset();
                    layui.form.render();
                });

                $(document).on('click', '#editLower', function () {
                    var checkStatus = table.checkStatus('productLower');
                    if (checkStatus.data.length === 0) {
                        layer.alert("至少选择一行要编辑的数据", {icon: 0})
                    } else if (checkStatus.data.length > 1) {
                        layer.alert("只能选择一行进行编辑", {icon: 0})
                    } else {
                        var data = checkStatus.data;
                        var catCode = data[0].catCode; //编号


                        layer.open({
                            type: 1,
                            title: "编辑三级商品",
                            content: $('#editThreeForm'),//这里content是一个普通的String
                            area: ['700px', '520px']
                        });
                        var three = repeatProductThreeByCode(catCode);

                        //修改的实收动态渲染下拉框
                        var htmls = ''; //全局变量
                        var small = getProductAllSmallInformation();
                        for (let i = 0; i < small.length; i++) {
                            htmls += '<option value = "' + small[i].catName + '">' + small[i].catName + '</option>'
                        }
                        $("#edit-two").html(htmls);
                        form.render('select');//需要渲染一下
                        form.val("editThreeForm", three[0]);

                        //监听提交编辑用户
                        form.on('submit(editThree)', function (data) {
                            $.ajax({
                                url: '../../editProductThree',
                                method: 'post',
                                data: data.field,
                                dataType: "json",
                                success: function (data) {
                                    //重载表格
                                    table.reload('productLower');
                                    if (data.result > 0) {
                                        layer.alert("修改成功", {
                                            icon: 6, cancel: function () {
                                                layer.closeAll();
                                                table.reload('productLower')
                                            }
                                        }, function (index) {
                                            layer.closeAll();
                                            table.reload('productLower')
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

            } else if (obj.event === 'addLower') { //新增下级
                //增加时的实时动态渲染下拉框
                var html = ''; //全局变量
                var big2 = getProductSmall(data.catName);
                for (let i = 0; i < big2.length; i++) {
                    html += '<option value = "' + big2[i].catName + '" selected>' + big2[i].catName + '</option>'
                }
                $("#two").html(html);
                form.render('select');//需要渲染一下

                $("#closeAddThreeWin").click(function () {
                    layer.closeAll();
                    $("#addThreeForm")[0].reset();
                    layui.form.render();
                });

                layer.open({
                    type: 1,
                    title: "新增商品小类",
                    anim: 1, //有0-6种动画
                    content: $('#addThreeForm'),//这里content是一个普通的String
                    area: ['700px', '520px'],
                    cancel: function () {
                        $("#addThreeForm")[0].reset();
                        layui.form.render();
                    }
                    // , btn: ['提交', '取消']
                });
                form.on('submit(addThree)', function (data) {
                    $.ajax({
                        url: '../../addProductThree',
                        method: 'post',
                        data: data.field,
                        dataType: "json",
                        success: function (data) {
                            if (data.result > 0) {
                                layer.alert("新增成功！", {
                                    icon: 6, title: '提示', cancel: function (index) {
                                        table.reload('product', {url: '../../getAllProductSmall'});
                                        layer.closeAll();
                                        $("#addThreeForm")[0].reset();
                                        layui.form.render();
                                    }
                                }, function () {
                                    table.reload('product', {url: '../../getAllProductSmall'});
                                    layer.closeAll();
                                    $("#addThreeForm")[0].reset();
                                    layui.form.render();
                                })
                            } else {
                                layer.alert("新增失败！", {
                                    icon: 5, title: '提示', cancel: function (index) {
                                        layer.closeAll();
                                        $("#addThreeForm")[0].reset();
                                        layui.form.render();
                                    }
                                }, function () {
                                    layer.closeAll();
                                    $("#addThreeForm")[0].reset();
                                    layui.form.render();
                                })
                            }
                        },
                        error: function (e) {
                            layer.alert("提交失败了,刷新试试", {
                                icon: 5, title: '提示', cancel: function (index) {
                                    layer.closeAll();
                                    $("#addThreeForm")[0].reset();
                                    layui.form.render();
                                }
                            }, function () {
                                layer.closeAll();
                                $("#addThreeForm")[0].reset();
                                layui.form.render();
                            })
                        }
                    });
                    return false;
                });
            }
        });


        $("#closeAddWin").click(function () {
            layer.closeAll();
            $("#addForm")[0].reset();
            layui.form.render();
        });
        $(document).on('click', '#add', function () {
            layer.open({
                type: 1,
                title: "新增商品小类",
                anim: 1, //有0-6种动画
                content: $('#addForm'),//这里content是一个普通的String
                area: ['700px', '520px'],
                cancel: function () {
                    $("#addForm")[0].reset();
                    layui.form.render();
                }
                // , btn: ['提交', '取消']
            });
            form.on('submit(addShop)', function (data) {

                $.ajax({
                    url: '../../addProductSmall',
                    method: 'post',
                    data: data.field,
                    dataType: "json",
                    success: function (data) {
                        if (data.result > 0) {
                            layer.alert("新增成功！", {
                                icon: 6, title: '提示', cancel: function (index) {
                                    table.reload('product', {url: '../../getAllProductSmall'});
                                    //ajax请求获取总数，
                                    $.post("../../getAllProductSmall", {"page": cu, "limit": num}, function (data) {
                                        length = data.count; //总数
                                        var currPageNo = 0; //要跳转的页数
                                        if (parseInt(length / num) === length / num) {
                                            currPageNo = (length / num)
                                        } else {
                                            currPageNo = Math.ceil(length / num);
                                        }
                                        //跳转到指定页
                                        table.reload("product", {
                                            page: {
                                                curr: currPageNo
                                            }
                                        });
                                    });
                                    $("#addForm")[0].reset();
                                    layui.form.render();
                                    layer.closeAll();
                                }
                            }, function () {
                                table.reload('product', {url: '../../getAllProductSmall'});
                                //ajax请求获取总数，
                                $.post("../../getAllProductSmall", {"page": cu, "limit": num}, function (data) {
                                    length = data.count; //总数
                                    var currPageNo = 0; //要跳转的页数
                                    if (parseInt(length / num) === length / num) {
                                        currPageNo = (length / num)
                                    } else {
                                        currPageNo = Math.ceil(length / num);
                                    }
                                    //跳转到指定页
                                    table.reload("product", {
                                        page: {
                                            curr: currPageNo
                                        }
                                    });
                                });
                                $("#addForm")[0].reset();
                                layui.form.render();
                                layer.closeAll();
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
        //修改
        $(document).on('click', '#closeEditWin', function () {
            layer.closeAll();
            layui.form.render();
        });

        $(document).on('click', '#edit', function () {
            var checkStatus = table.checkStatus('product');
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要编辑的数据", {icon: 0})
            } else if (checkStatus.data.length > 1) {
                layer.alert("只能选择一行进行编辑", {icon: 0})
            } else {
                var data = checkStatus.data;
                var catCode = data[0].catCode; //编号


                layer.open({
                    type: 1,
                    title: "编辑用户",
                    content: $('#editForm'),//这里content是一个普通的String
                    area: ['700px', '520px']
                });
                var small = getProductSmallByCode(catCode);

                //修改的实收动态渲染下拉框
                var htmls = ''; //全局变量
                var big = getProductBig();
                for (let i = 0; i < big.length; i++) {
                    htmls += '<option value = "' + big[i].catName + '">' + big[i].catName + '</option>'
                }
                $("#update").html(htmls);
                form.render('select');//需要渲染一下
                form.val("editForm", small[0]);

                //监听提交编辑用户
                form.on('submit(editSmall)', function (data) {
                    $.ajax({
                        url: '../../editProductSmall',
                        method: 'post',
                        data: data.field,
                        dataType: "json",
                        success: function (data) {
                            //重载表格
                            table.reload('product');
                            if (data.result > 0) {
                                layer.alert("修改成功", {
                                    icon: 6, cancel: function () {
                                        layer.closeAll();
                                        table.reload('product')
                                    }
                                }, function (index) {
                                    layer.closeAll();
                                    table.reload('product')
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

        //点击删除按钮
        $(document).on('click', '#delete', function () {
            var checkStatus = table.checkStatus('product');
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要删除的数据", {icon: 0})
            } else {
                var data = checkStatus.data;
                var productCode = []; //要删除的商品id
                for (var i = 0; i < data.length; i++) {
                    productCode.push(data[i].catCode)
                }
                $.post("../../deleteProductSmall", {"productCode": productCode}, function (data) {
                    if (data.result > 0) {
                        var len = layui.table.cache["product"]; //当前没删除前表格的数据
                        if (len.length === productCode.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                            layer.msg("删除成功");
                            window.location.href = "/shop/view/ProductSubcategories.html"
                        } else {
                            layer.alert("删除成功", {icon: 6});
                            table.reload("product");
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
                table.reload('product', {url: '../../getAllProductSmall'});
            } else {
                table.reload('product', {
                    page: {
                        curr: 1
                    },
                    where: {
                        keyWord: keyWord
                    },
                    method: 'post',
                    url: '../../searchProductSmallByKeyWord'
                });
            }
        });
        form.verify({
            repeatProductSmallByCode: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                var lis = getProductSmallByCode(value);
                if (lis.length > 0) {
                    checkResult = "该编码已存在"
                }
                return checkResult;
            },
            repeatProductThreeByCode: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                var lis = repeatProductThreeByCode(value);
                if (lis.length > 0) {
                    checkResult = "该编码已存在"
                }
                return checkResult;
            },
            repeatSmallName:function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                var lis = repeatSmallName(value);
                if (lis.length > 0) {
                    checkResult = "该名称存在"
                }
                return checkResult;
            },
            repeatProductThreeName:function (value) {
                var checkResult = "";
                var lis = repeatProductThreeName(value);
                if (lis.length > 0) {
                    checkResult = "该名称存在"
                }
                return checkResult;
            }
        });
    });
});