$(function () {
    var deleteTu = []; //添加的索引

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
            elem: '#product'
            // ,  closeBtn :0//不显示关闭按钮
            , url: '../../getAllProductBig' //数据接口
            , page: {theme: '#81d3ff', prev: '上一页', next: '下一页', last: '尾页'} //开启分页
            , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
            , even: true,
            text: {
                none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
            }
            , toolbar: '#toolbarDemo'
            // , unresize: true //是否拖拽，true为禁用
            , cols: [[ //表头
                {field: 'checkbox', type: "checkbox", fixed: 'left', unresize: true}
                , {field: 'catCode', title: '大类编号', align: "center", unresize: true}
                , {field: 'catName', title: '大类名称', sort: true, align: "center", unresize: true}
                , {field: 'catLvl', title: '排序', sort: true, align: "center", unresize: true}
                , {field: 'catDesc', title: '备注', align: "center", unresize: true}
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
            }
        });

        //关闭新增门店窗口
        $("#closeAddWin").click(function () {
            layer.closeAll();
        });

        //删除操作
        $(document).on('click', '.layui-form-item button', function () {
            var bt = $(this).attr("deleteindex");
            $(".layui-form-item").each(function () {
                if (bt != undefined) {
                    if (bt == $(this).attr("id")) {
                        $(this).remove()
                    }
                }
            })
        });

        var num = 3; //点击次数，控制索引
        //新增商品定义
        $(document).on('click', '#addSpDy', function () {
            num += 1;
            var index = "tu" + num; //form的id索引
            deleteTu.push(index);
            var picType = 'picType' + num; //input的name属性
            var flat = 'flat' + num; //select的name属性
            var str = "<div  class = \"layui-form-item \" id = " + index + ">" +
                "<div class = \"layui-input-block\">" +
                "<input type = \"text\"  picTypename = " + picType + " class = \"layui-input\" style = \"width: 51%;float: left\">" +
                "<select flatname = " + flat + " style = \"width: 20%\">" +
                "<option value = \"1\">必选</option>" +
                "<option value = \"0\">可选</option>" +
                "</select>" +
                "<button type=\"button\" deleteindex=" + index + " class=\"layui-btn layui-btn-danger\">删除</button>" +
                "</div>" +
                "</div>";
            $("#addj").before("" + str + "");
            layui.form.render();
        });
        $(document).on('click', '#editSpDy', function () {
            num += 1;
            var index = "tu" + num; //form的id索引
            var picType = 'picType' + num; //input的name属性
            var flat = 'flat' + num; //select的name属性
            var str = "<div  class = \"layui-form-item \" id = " + index + ">" +
                "<div class = \"layui-input-block\">" +
                "<input type = \"text\"  picTypename = " + picType + " class = \"layui-input\" style = \"width: 51%;float: left\">" +
                "<select flatname = " + flat + " style = \"width: 20%\">" +
                "<option value = \"1\">必选</option>" +
                "<option value = \"0\">可选</option>" +
                "</select>" +
                "<button type=\"button\" deleteindex=" + index + " class=\"layui-btn layui-btn-danger\">删除</button>" +
                "</div>" +
                "</div>";
            $("#editj").before("" + str + "");
            layui.form.render();
        });


        //显示新增门店窗口,并新增门店
        $(document).on('click', '#add', function () {
            $("#addForm")[0].reset();
            layui.form.render();
            var arrs = [];
            $(".layui-form-item").each(function () {
                arrs.push($(this).attr("id"));
            });

            if (arrs.indexOf("tu1") < 0) {
                var str = " <div class=\"layui-form-item\" id=\"tu1\">\n" +
                    "        <label class=\"layui-form-label\">鉴定图定义</label>\n" +
                    "        <div class=\"layui-input-block\">\n" +
                    "            <input type=\"text\" picTypename=\"picType1\" value=\"正面\"  placeholder=\"正面\"  class=\"layui-input\" style=\"width: 51%;float: left\">\n" +
                    "            <select flatname=\"flat1\" lay-verify=\"\" style=\"width: 20px\">\n" +
                    "                <option value=\"1\">必选</option>\n" +
                    "                <option value=\"0\">可选</option>\n" +
                    "            </select>\n" +
                    "            <button type=\"button\" deleteindex=\"tu1\" class=\"layui-btn layui-btn-danger\">删除</button>\n" +
                    "        </div>\n" +
                    "    </div>"
                $("#bei").after("" + str + "");
                layui.form.render();
            }
            if (arrs.indexOf("tu2") < 0) {
                var str = " <div class=\"layui-form-item\" id=\"tu1\">\n" +
                    "        <div class=\"layui-input-block\">\n" +
                    "            <input type=\"text\" picTypename=\"picType1\" value=\"正面\"  placeholder=\"正面\"  class=\"layui-input\" style=\"width: 51%;float: left\">\n" +
                    "            <select flatname=\"flat1\" lay-verify=\"\" style=\"width: 20px\">\n" +
                    "                <option value=\"1\">必选</option>\n" +
                    "                <option value=\"0\">可选</option>\n" +
                    "            </select>\n" +
                    "            <button type=\"button\" deleteindex=\"tu1\" class=\"layui-btn layui-btn-danger\">删除</button>\n" +
                    "        </div>\n" +
                    "    </div>"
                $("#addj").before("" + str + "");
                layui.form.render();
            }
            if (arrs.indexOf("tu3") < 0) {
                var str = " <div class=\"layui-form-item\" id=\"tu1\">\n" +
                    "        <div class=\"layui-input-block\">\n" +
                    "            <input type=\"text\" picTypename=\"picType1\" value=\"正面\"  placeholder=\"正面\"  class=\"layui-input\" style=\"width: 51%;float: left\">\n" +
                    "            <select flatname=\"flat1\" lay-verify=\"\" style=\"width: 20px\">\n" +
                    "                <option value=\"1\">必选</option>\n" +
                    "                <option value=\"0\">可选</option>\n" +
                    "            </select>\n" +
                    "            <button type=\"button\" deleteindex=\"tu1\" class=\"layui-btn layui-btn-danger\">删除</button>\n" +
                    "        </div>\n" +
                    "    </div>"
                $("#addj").before("" + str + "");
                layui.form.render();
            }

            if (deleteTu.length > 0) {
                for (let i = 0; i < deleteTu.length; i++) {
                    var ids = "#" + deleteTu[i];
                    $(ids).remove()
                }
            }
            deleteTu.length = 0;
            layer.open({
                type: 1,
                title: "新增商品大类",
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
                var json = [];
                var picTypename = [];
                var flatname = [];
                var product = [
                    data.field.catCode,
                    data.field.catName,
                    data.field.catLvl,
                    data.field.catDesc,
                ];

                $(".layui-form-item input").each(function () {
                    if ($(this).attr("picTypename") != undefined) {
                        picTypename.push($(this).val())
                    }
                });
                $(".layui-form-item select").each(function () {
                    if ($(this).attr("flatname") != undefined) {
                        flatname.push($(this).val())
                    }
                });
                if (picTypename.length != 0 || flatname.length != 0) {
                    for (let i = 0; i < picTypename.length; i++) {
                        json.push({
                            picType: picTypename[i],
                            flat: flatname[i]
                        })
                    }
                }

                $.ajax({
                    url: '../../addProductBig',
                    method: 'post',
                    data: {"product": product, "json": JSON.stringify(json)},
                    dataType: "json",
                    success: function (data) {
                        if (data.result > 0) {
                            layer.alert("新增成功！", {
                                icon: 6, title: '提示', cancel: function (index) {
                                    table.reload('product', {url: '../../getAllProductBig'});
                                    //ajax请求获取总数，
                                    $.post("getAllProductBig", {"page": cu, "limit": num}, function (data) {
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
                                    layer.closeAll();
                                }
                            }, function () {
                                table.reload('product', {url: '../../getAllProductBig'});
                                //ajax请求获取总数，
                                $.post("getAllProductBig", {"page": cu, "limit": num}, function (data) {
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
                $.post("../../deleteProductBig", {"productCode": productCode}, function (data) {
                    if (data.result > 0) {
                        var len = layui.table.cache["product"]; //当前没删除前表格的数据
                        if (len.length === productCode.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                            layer.msg("删除成功");
                            window.location.href = "/shop/view/ProductCategories.html"
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
                table.reload('product', {url: '../../getAllProductBig'});
            } else {
                table.reload('product', {
                    page: {
                        curr: 1
                    },
                    where: {
                        keyWord: keyWord
                    },
                    method: 'post',
                    url: '../../searchProductBigByKeyWord'
                });
            }
        });
        //修改
        $(document).on('click', '#close-edit-Win', function () {
            layer.closeAll();
            layui.form.render();
        });

        $(document).on('click', '#edit', function () {

            $(".layui-form-item").each(function () {
                if ($(this).find("input").attr("picTypename") != undefined) {
                    if ($(this).find("input").attr("picTypename") != "picType1" && $(this).find("input").attr("picTypename") != "picType2" && $(this).find("input").attr("picTypename") != "picType3") {
                        $(this).remove();
                    }
                }
            });


            var checkStatus = table.checkStatus('product');
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要编辑的数据", {icon: 0})
            } else if (checkStatus.data.length > 1) {
                layer.alert("只能选择一行进行编辑", {icon: 0})
            } else {
                var data = checkStatus.data;
                var catCode = data[0].catCode; //编号
                $("#edit-catCode").val(data[0].catCode);
                $("#edit-catName").val(data[0].catName);
                $("#edit-catLvl").val(data[0].catLvl);
                $("#edit-catDesc").val(data[0].catDesc);
                var def = getProductByCode(catCode);
                var str = def.evalPicDef; //商品定义的json字符串
                var arr = JSON.parse(str);//商品定义的json数组对象

                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        num++;
                        var index = "tu" + num; //form的id索引
                        if (arr[i].picType == "") {
                            arr[i].picType = "无"
                        }
                        var strs = "<div  class = \"layui-form-item \" id = " + index + ">" +
                            "<div class = \"layui-input-block\">" +
                            "<input type = \"text\" value=" + arr[i].picType + " picTypename = " + arr[i].picType + " class = \"layui-input\" style = \"width: 51%;float: left\">" +
                            "<select flatname = " + arr[i].flat + " style = \"width: 20%\">" +
                            "<option value = \"1\">必选</option>" + (arr[i].flat = "1" ? "selected:true" : false) +
                            "<option value = \"0\">可选</option>" + (arr[i].flat = "0" ? "selected:true" : false) +
                            "</select>" +
                            "<button type=\"button\" deleteindex=" + index + " class=\"layui-btn layui-btn-danger\">删除</button>" +
                            "</div>" +
                            "</div>";
                        $("#editj").before("" + strs + "");
                    }
                }
                layui.form.render();

                layer.open({
                    type: 1,
                    title: "编辑用户",
                    content: $('#editForm'),//这里content是一个普通的String
                    area: ['700px', '520px']
                });


                //监听提交编辑用户
                form.on('submit(editProduct)', function (data) {

                    var json = [];
                    var picTypename = [];
                    var flatname = [];
                    var product = [
                        data.field.catCode,
                        data.field.catName,
                        data.field.catLvl,
                        data.field.catDesc,
                    ];

                    $(".layui-form-item input").each(function () {
                        if ($(this).attr("picTypename") != undefined) {
                            if ($(this).attr("picTypename") != "picType1" && $(this).attr("picTypename") != "picType2" && $(this).attr("picTypename") != "picType3") {
                                picTypename.push($(this).val())
                            }
                        }
                    });
                    $(".layui-form-item select").each(function () {
                        if ($(this).attr("flatname") != undefined) {
                            if ($(this).attr("flatname") != "flat1" && $(this).attr("flatname") != "flat2" && $(this).attr("flatname") != "flat3") {
                                flatname.push($(this).val())
                            }
                        }
                    });
                    if (picTypename.length != 0 || flatname.length != 0) {
                        for (let i = 0; i < picTypename.length; i++) {
                            json.push({
                                picType: picTypename[i],
                                flat: flatname[i]
                            })
                        }
                    }

                    $.ajax({
                        url: '/editProductBig',
                        method: 'post',
                        data: {"product": product, "json": JSON.stringify(json)},
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


        form.verify({
            repeatProductBigCode: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                $.ajax({
                    url: "/repeatProductBigCode",
                    type: "GET",
                    data: {"catCode": value},
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
            },
            repeatCatName:function (value,item) {
                var checkResult = "";
                var name =  getProductByCatName(value);
                if(name.length>0){
                    checkResult="名称不能重复"
                }
                return checkResult;
            }
        });
    });
});