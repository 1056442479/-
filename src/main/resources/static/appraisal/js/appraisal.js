$(function () {

    var filesRodad = []; //文件名
    var shunxu = [];
    layui.use(['table', 'element', 'form', 'transfer', 'laydate', 'upload'], function () {
        var table = layui.table;
        var form = layui.form;
        var layer = layui.layer;
        var laydate = layui.laydate;
        var upload = layui.upload;
        var length = 0; //表格总数据
        var num = 0; //一页显示的数据
        var cu = 1; //当前第几页

        table.render({
            elem: '#goods'
            // ,  closeBtn :0//不显示关闭按钮
            , url: '../../getAllGoods' //数据接口
            , page: {theme: '#81d3ff', prev: '上一页', next: '下一页', last: '尾页'} //开启分页
            , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
            , even: true,
            text: {
                none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
            }
            , toolbar: '#toolbarDemo'
            , defaultToolbar: []
            // , unresize: true //是否拖拽，true为禁用
            , cols: [[ //表头
                {field: 'checkbox', type: "checkbox", fixed: 'left'}
                , {field: 'goodsId', title: '编号', sort: true, align: "center", unresize: true}
                , {field: 'goodsName', title: '商品名称', align: "center", unresize: true}
                , {
                    field: 'catRoute', title: '分类', align: "center", unresize: true, templet: function (d) {
                        var arr = getClassificationByGoodsCode(d.goodsId);
                        var str = "";
                        for (let i = 0; i < arr.length; i++) {
                            str += arr[i].catName;
                            if (i < arr.length - 1) {
                                str += ">"
                            }
                        }
                        return str;
                    }
                }
                , {field: 'inputUser', title: '录入人', align: "center", unresize: true}
                , {
                    field: 'surveyor', title: '鉴定人', align: "center", unresize: true, templet: function (d) {
                        var arr = getIdentifyPeopleByGoodsId(d.goodsId);
                        var surveyor = "";
                        if (arr.length > 0) {
                            surveyor = arr[0].createBy;
                        }
                        return surveyor;
                    }
                }
                , {
                    field: 'assessor', title: '评估人', align: "center", unresize: true, templet: function (d) {
                        var arr = getAppraisePeopleByGoodsId(d.goodsId);
                        var surveyor = "";
                        if (arr.length > 0) {
                            surveyor = arr[0].createBy;
                        }
                        return surveyor;
                    }
                }
                , {field: 'inputDate', title: '录入时间', sort: true, align: "center", unresize: true}
                , {field: 'goodsState', title: '状态', align: "center", unresize: true}
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
        laydate.render({
            elem: '#startTime'
            , trigger: 'click' //采用click弹出
        });
        laydate.render({
            elem: '#endTime'
            , trigger: 'click' //采用click弹出
        });
        laydate.render({
            elem: '#edit-inputDate'
            , trigger: 'click' //采用click弹出
        });

        laydate.render({
            elem: '#inputDate'
        });
        //查询
        $(document).on('click', '#search', function () {
            table.reload('goods', {
                method: 'post',
                url: '../../searchKeyWordFromGoods',
                page: {
                    curr: 1
                },
                where: {
                    goodsId: $("#goodsId").val(),
                    goodsState: $("#goodsState").val(),
                    inputUser: $("#inputUser").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
            laydate.render({
                elem: '#startTime'
                , trigger: 'click' //采用click弹出
            });
            laydate.render({
                elem: '#endTime'
                , trigger: 'click' //采用click弹出
            });
        });

        //点击提交
        $(document).on('click', '#tj', function () {
            var checkStatus = table.checkStatus('goods');
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要提交的数据", {icon: 0})
            } else {
                var arr = []; //提交后，该状态为空的，变为待鉴定，存放的商品id数组
                for (let i = 0; i < checkStatus.data.length; i++) {
                    if (checkStatus.data[i].goodsState.trim() == "") {
                        arr.push(checkStatus.data[i].goodsId)
                    }
                }
                if (arr.length > 0) {
                    var num = updateGoodsSate(arr);
                    if (num > 0) {
                        layer.alert("提交成功", {icon: 6});
                        table.reload("goods");
                    } else {
                        layer.alert("提交失败", {icon: 5});
                        table.reload("goods");
                    }
                }
            }
        });
        //点击删除按钮
        $(document).on('click', '#delete', function () {
            var checkStatus = table.checkStatus('goods');
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要删除的数据", {icon: 0})
            } else {
                var data = checkStatus.data;
                var goodsId = []; //要删除的角色id
                for (var i = 0; i < data.length; i++) {
                    if (data[i].goodsState == "") {
                        goodsId.push(data[i].goodsId)
                    }
                }
                if (goodsId.length > 0) {
                    $.post("../../deleteGoodsByCode", {"goodsId": goodsId}, function (data) {
                        if (data.result > 0) {
                            var len = layui.table.cache["goods"]; //当前没删除前表格的数据
                            if (len.length === goodsId.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                                layer.msg("删除成功,提交的无法删除");
                                window.location.href = "/appraisal/view/shopList.html"
                            } else {
                                layer.alert("删除成功,提交的无法删除", {icon: 6});
                                table.reload("goods");
                            }
                        } else {
                            layer.alert("提交失败了,刷新试试", {icon: 5, title: '提示'}, function () {
                                layer.closeAll();
                            })
                        }
                    })
                } else {
                    layer.alert("删除成功,提交的无法删除", {icon: 6});
                }

            }
        });

        //新增商品
        $("#closeAddWin").click(function () {
            layer.closeAll();
            // table.reload('goods');
        });
        $(document).on('click', '#add', function () {

            //清空表单
            $("#addForm")[0].reset();
            layui.form.render();
            //清空下拉框
            $("#addForm select").each(function () {
                $(this).val("")
            });
            // $(".layui-form-select dl").each(function () {
            //     $(this).remove()
            // });
            //清空商品属性的下拉框
            $("#conf div").each(function () {
                $(this).remove();
            });
            //清空图片部分
            $("#up div").each(function () {
                $(this).remove()
            });
            $("#rule").html("");
            layer.open({
                type: 1,
                title: "新增商品",
                anim: 1, //有0-6种动画
                content: $('#addForm'),//这里content是一个普通的String
                area: ['700px', '530px'],
                cancel: function () {
                    $("#addForm")[0].reset();
                    layui.form.render('select');
                    layui.form.render();
                    // table.reload('goods');
                }
                // , btn: ['提交', '取消']
            });

            //增加时的实时动态渲染下拉框门店
            var html = ''; //全局变量
            var shop = getAllShopInformation();
            if (shop.length > 0) {
                for (let i = 0; i < shop.length; i++) {
                    html += '<option value = "' + shop[i].shopCode + '" selected>' + shop[i].shopName + '</option>'
                }
                $("#shopName").html(html);
            }

            //增加时的实时动态渲染下拉框大类
            html = ''; //全局变量
            var big2 = getProductBig();
            if (big2.length > 0) {
                html += '<option value="">请选择商品大类</option>';
                for (let i = 0; i < big2.length; i++) {
                    html += '<option value = "' + big2[i].catName + '">' + big2[i].catName + '</option>'
                }
            } else {
                html += '<option value = "">暂无数据</option>'
            }
            $("#productBig").html(html);

            html="";
            html += '<option value = "">请选择商品小类</option>';
            $("#productSmall").html(html);
            html="";
            html += '<option value = "">请选择三级商品</option>';
            $("#productThree").html(html);
            html="";
            html += '<option value = "">请选择</option>';
            $("#brandCode").html(html);

            //商品小类的下拉框动态加载
            var smallName = "";
            var bigName = "";
            form.on('select(productBig)', function (data) {
                //大类名称
                bigName = data.value;
                //小类下拉框
                var small = getProductSmallByBigName(data.value);
                var html = '';
                if (small.length > 0) {
                    for (let i = 0; i < small.length; i++) {
                        smallName = small[0].catName;
                        html += '<option value = "' + small[i].catName + '">' + small[i].catName + '</option>'
                    }
                } else {
                    html += '<option value = "">暂无数据</option>'
                }
                shunxu.length = 0;
                $("#productSmall").html(html);
                layui.form.render();
                //品牌下拉框
                html = "";
                var brand = getProductByGigCode(data.value);
                if (brand.length > 0) {
                    for (let i = 0; i < brand.length; i++) {
                        html += '<option value = "' + brand[i].brandCode + '">' + brand[i].brandName + '</option>'
                    }
                } else {
                    html += '<option value = "">暂无数据</option>'
                }
                $("#brandCode").html(html);
                //三级部分下拉框
                var three = repeatProductThreeBySmallName(smallName);
                var htmls = '';
                if (three.length > 0) {
                    for (let i = 0; i < three.length; i++) {
                        htmls += '<option value = "' + three[i].catCode + '">' + three[i].catName + '</option>'
                    }
                } else {
                    htmls += '<option value = "">暂无数据</option>'
                }
                $("#productThree").html(htmls);

                layui.form.render();
                //商品属性

                var conf = getGroupCodeByGigCode(data.value);
                $("#conf div").each(function () {
                    $(this).remove();
                });
                if (conf.length > 0) {
                    for (let i = 0; i < conf.length; i++) {
                        var h = "";
                        var str = " <div class=\"layui-form-item\">\n" +
                            "     <label class=\"layui-form-label\">" + conf[i].attrName + "</label>\n" +
                            "       <div class=\"layui-input-block\">\n" +
                            "       <select id=\"" + conf[i].attrCode + "\" name=\"attr" + conf[i].attrCode + "\" lay-verify=\"required\"></select>\n" +
                            "       </div>\n" +
                            "   </div>";

                        var select = [];
                        select = conf[i].options.split("，");//清单选择框
                        if (select.length > 0) {
                            for (let j = 0; j < select.length; j++) {
                                h += '<option value = "' + select[j] + '">' + select[j] + '</option>';
                            }
                            $("#conf").append(str);
                            $("#" + conf[i].attrCode + "").append(h);
                        } else {
                            str = " <div class=\"layui-form-item\">\n" +
                                "                                <label class=\"layui-form-label\">" + conf[i].attrName + "</label>\n" +
                                "                                <div class=\"layui-input-block\">\n" +
                                "                                     <select id=\"" + conf[i].attrCode + "\" name=\"attr" + conf[i].attrCode + "\" lay-verify=\"required\"></select>\n" +
                                "                                </div>\n" +
                                "                            </div>";
                            $("#conf").append(str)
                        }
                    }
                }
                $("#up div").each(function () {
                    $(this).remove()
                });

                var p = "<div class=\"layui-upload\">\n" +
                    "  <button type=\"button\" class=\"layui-btn layui-btn-normal\" id=\"testList\">选择多文件</button> \n" +
                    "  <button type=\"button\" class=\"layui-btn\" id=\"testListAction\">开始上传</button>\n" +
                    "  <div class=\"layui-upload-list\">\n" +
                    "    <table class=\"layui-table\">\n" +
                    "      <thead>\n" +
                    "        <tr>" +
                    "<th>文件名</th>\n" +
                    "        <th>大小</th>\n" +
                    "        <th>状态</th>\n" +
                    "        <th>操作</th>\n" +
                    "      </tr></thead>\n" +
                    "      <tbody id=\"demoList\"></tbody>\n" +
                    "    </table>\n" +
                    "  </div>\n" +
                    "</div> ";
                $("#up").append(p);
                var photo = getProductByCatName(bigName);
                var evalPicDef = [];
                if (photo.length > 0) {
                    for (let i = 0; i < photo.length; i++) {
                        evalPicDef = JSON.parse(photo[i].evalPicDef);
                    }
                }
                var m = "";
                var op = 0;
                if (evalPicDef.length > 0) {
                    for (let i = 0; i < evalPicDef.length; i++) {
                        if (evalPicDef[i].picType != "无" && evalPicDef[i].picType != "") {
                            shunxu.push(evalPicDef[i].picType);
                            m += evalPicDef[i].picType + ",";
                            op++;
                        }
                    }
                }

                $("#rule").html("请按照" + m + "的顺序上传文件");

                //多文件列表示例

                var demoListView = $('#demoList')
                    , uploadListIns = upload.render({
                    elem: '#testList'
                    , url: '../../upFiles' //改成您自己的上传接口
                    , accept: 'file'
                    , multiple: true
                    , auto: false
                    , bindAction: '#testListAction'
                    , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                        obj.preview(function (index, file, result) {
                            console.log(file); //得到文件对象
                        });
                    }
                    , choose: function (obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列

                        //读取本地文件
                        obj.preview(function (index, file, result) {
                            var num = 1; //控制上传的数量
                            filesRodad.push(file.name);
                            var tr = $(['<tr id="upload-' + index + '">'
                                , '<td>' + file.name + '</td>'
                                , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
                                , '<td>等待上传</td>'
                                , '<td>'
                                , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                                , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                                , '</td>'
                                , '</tr>'].join(''));
                            //判断是否超出选择
                            $("#demoList tr").each(function () {
                                num++;
                                if (num > op) {
                                    layer.alert("请按顺序选择，不能超过选择！");
                                    $(this).remove()
                                }
                            });

                            //单个重传
                            tr.find('.demo-reload').on('click', function () {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function () {
                                num--;
                                delete files[index]; //删除对应的文件
                                if (filesRodad.indexOf(file.name) > 0) {
                                    filesRodad.splice(filesRodad.indexOf(file.name), 0)
                                }
                                tr.remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            demoListView.append(tr);
                        });
                    }
                    , done: function (res, index, upload) {
                        if (res.file) { //上传成功
                            var tr = demoListView.find('tr#upload-' + index)
                                , tds = tr.children();
                            tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                            tds.eq(3).html(''); //清空操作
                            return delete this.files[index]; //删除文件队列已经上传成功的文件
                        }
                        this.error(index, upload);
                    }
                    , error: function (index, upload) {
                        var tr = demoListView.find('tr#upload-' + index)
                            , tds = tr.children();
                        tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                        tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                    }
                });
                form.render('select');//需要渲染一下
            });
            // //商品三级的下拉框动态加载
            form.on('select(productSmall)', function (data) {
                var three = repeatProductThreeBySmallName(data.value);
                var html = '';
                if (three.length > 0) {
                    for (let i = 0; i < three.length; i++) {
                        html += '<option value = "' + three[i].catCode + '">' + three[i].catName + '</option>'
                    }
                } else {
                    html += '<option value = "">暂无数据</option>'
                }
                $("#productThree").html(html);
                form.render('select');//需要渲染一下
            });
            form.render('select');//需要渲染一下
        });


        //监听提交商品
        form.on('submit(addGoods)', function (data) {
            var str = []; //图片数组
            var index = 0;
            for (let i = 0; i < shunxu.length; i++) {
                if (index <= filesRodad.length - 1) {
                    str.push({
                        "direction": shunxu[i],
                        "lj": filesRodad[index]
                    });
                    index++;
                } else {
                    str.push({
                        "direction": shunxu[i],
                        "lj": "空",
                    });
                }

            }
            var add = $("#addForm").serializeArray();
            var attr = []; //属性数组
            var attrCode = [];//属性编号组
            for (let i = 12; i < add.length; i++) {
                if (add[i].name.substring(0, 4) == "attr") {
                    attr.push(add[i].value);
                    attrCode.push(add[i].name.substring(4))
                }
            }

            if (attr.length == 0) {
                attr.push("无数据");
                attrCode.push("无数据");
            }
            var goods = [];
            for (let i = 0; i < 12; i++) {
                goods.push(add[i].value)
            }

            $.ajax({
                url: '../../addGoods',
                method: 'post',
                data: {"json": JSON.stringify(str), "goods": goods, "attr": attr, "attrCode": attrCode},
                dataType: "json",
                success: function (data) {
                    if (data.result > 0) {
                        layer.alert("新增成功！", {
                            icon: 6, title: '提示', cancel: function (index) {
                                table.reload('goods', {url: '../../getAllGoods'});
                                //ajax请求获取总数，
                                $.post("../../getAllGoods", {"page": cu, "limit": num}, function (data) {
                                    length = data.count; //总数
                                    var currPageNo = 0; //要跳转的页数
                                    if (parseInt(length / num) === length / num) {
                                        currPageNo = (length / num)
                                    } else {
                                        currPageNo = Math.ceil(length / num);
                                    }
                                    //跳转到指定页
                                    table.reload("goods", {
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
                            //重载表格，避免查询后新增，无法显示新增数据
                            table.reload('goods', {url: '../../getAllGoods'});
                            //ajax请求获取总数，
                            $.post("../../getAllGoods", {"page": cu, "limit": num}, function (data) {
                                length = data.count; //总数
                                var currPageNo = 0; //要跳转的页数
                                if (parseInt(length / num) === length / num) {
                                    currPageNo = (length / num)
                                } else {
                                    currPageNo = Math.ceil(length / num);
                                }
                                //跳转到指定页
                                table.reload("goods", {
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


        //编辑
        $("#closeEditWin").click(function () {
            layer.closeAll();
            $("#editForm")[0].reset();
            layui.form.render();
            table.reload('goods');
        });

        $(document).on('click', '#edit', function () {
            var checkStatus = table.checkStatus('goods');
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要编辑的数据", {icon: 0})
            } else if (checkStatus.data.length > 1) {
                layer.alert("只能选择一行进行编辑", {icon: 0})
            } else if (checkStatus.data.length == 1 && checkStatus.data[0].goodsState != "") {
                layer.alert("请选择状态为空的进行编辑", {icon: 0})
            } else if (checkStatus.data.length == 1 && checkStatus.data[0].goodsState == "") {
                var data = checkStatus.data;
                var goodsId = data[0].goodsId; //商品编号
                var bigCode = data[0].catCode;//大类编号
                var json = "";
                json = repeatGoodsId(goodsId);
                //清空表单
                $("#editForm")[0].reset();
                layui.form.render();
                //清空下拉框
                $("#editForm select").each(function () {
                    $(this).val("")
                });
                //清空商品属性的下拉框
                $("#edit-conf div").each(function () {
                    $(this).remove();
                });
                //清空图片部分
                $("#edit-up div").each(function () {
                    $(this).remove()
                });
                $("#edit-rule").html("");
                layer.open({
                    type: 1,
                    title: "修改商品",
                    anim: 1, //有0-6种动画
                    content: $('#editForm'),//这里content是一个普通的String
                    area: ['700px', '530px'],
                    cancel: function () {
                        $("#editForm")[0].reset();
                        layui.form.render('select');
                        layui.form.render();
                    }
                    // , btn: ['提交', '取消']
                });

                //增加时的实时动态渲染下拉框门店
                var html = ''; //全局变量
                var shop = getAllShopInformation();
                var shopName = repeatShopCode(data[0].shopCode)[0].shopName;
                if (shop.length > 0) {
                    for (let i = 0; i < shop.length; i++) {
                        if (shop[i].shopName === shopName) {
                            html += '<option value = "' + shop[i].shopCode + '" selected>' + shop[i].shopName + '</option>'
                        } else {
                            html += '<option value = "' + shop[i].shopCode + '">' + shop[i].shopName + '</option>'
                        }
                    }
                    $("#edit-shopName").html(html);
                }

                //增加时的实时动态渲染下拉框大类
                html = ''; //全局变量
                var big2 = getProductBig();
                var bigNames = getProductByCode(bigCode).catName;
                if (big2.length > 0) {
                    for (let i = 0; i < big2.length; i++) {
                        if (big2[i].catName === bigNames) {
                            html += '<option value = "' + big2[i].catName + '" selected>' + big2[i].catName + '</option>'
                        } else {
                            html += '<option value = "' + big2[i].catName + '">' + big2[i].catName + '</option>'
                        }
                    }
                } else {
                    html += '<option value = "">暂无数据</option>'
                }
                $("#edit-productBig").html(html);

                var all = getClassificationByGoodsCode(goodsId); //所有级分类的信息

                //小类下拉框
                var small = getProductSmallByBigName(bigNames);
                html = '';
                if (small.length > 0) {
                    for (let i = 0; i < small.length; i++) {
                        if (all[1].catName === small[i].catName) {
                            html += '<option value = "' + small[i].catName + '" selected>' + small[i].catName + '</option>'
                        } else {
                            html += '<option value = "' + small[i].catName + '">' + small[i].catName + '</option>'
                        }
                    }
                } else {
                    html += '<option value = "">暂无数据</option>'
                }
                shunxu.length = 0;
                $("#edit-productSmall").html(html);

                //三级部分下拉框的回显
                var three = repeatProductThreeBySmallName(all[1].catName);
                html = '';
                if (three.length > 0) {
                    for (let i = 0; i < three.length; i++) {
                        if (three[i].catName === all[2].catName) {
                            html += '<option value = "' + three[i].catCode + '" selected>' + three[i].catName + '</option>'
                        } else {
                            html += '<option value = "' + three[i].catCode + '">' + three[i].catName + '</option>'
                        }
                    }
                } else {
                    html += '<option value = "">暂无数据</option>'
                }
                $("#edit-productThree").html(html);

                //品牌下拉框的回显
                html = "";
                var brand = getProductByGigCode(bigNames);
                var brandName = getBrandInformation(data[0].shopCode);
                if (brand.length > 0) {
                    for (let i = 0; i < brand.length; i++) {
                        if (brandName === brand[i].brandName) {
                            html += '<option value = "' + brand[i].brandCode + '" selected>' + brand[i].brandName + '</option>'
                        } else {
                            html += '<option value = "' + brand[i].brandCode + '">' + brand[i].brandName + '</option>'
                        }
                    }
                } else {
                    html += '<option value = "">暂无数据</option>'
                }
                $("#edit-brandCode").html(html);

                //商品属性的回显
                var conf = getGroupCodeByGigCode(bigNames);
                $("#edit-conf div").each(function () {
                    $(this).remove();
                });
                var attr = getAttrByGoodsId(data[0].goodsId);
                var attrInformation = [];
                for (let i = 0; i < attr.length; i++) {
                    attrInformation.push(attr[i]);
                }
                var index = 0;
                if (conf.length > 0) {
                    for (let i = 0; i < conf.length; i++) {

                        var h = "";
                        var str = " <div class=\"layui-form-item\">\n" +
                            "     <label class=\"layui-form-label\">" + conf[i].attrName + "</label>\n" +
                            "       <div class=\"layui-input-block\">\n" +
                            "       <select id=\"" + conf[i].attrCode + "\" name=\"attr" + conf[i].attrCode + "\" lay-verify=\"required\"></select>\n" +
                            "       </div>\n" +
                            "   </div>";

                        var select = [];
                        select = conf[i].options.split("，");//清单选择框

                        if (select.length > 0) {

                            for (let j = 0; j < select.length; j++) {
                                if (select[j] === attrInformation[index].attrValue) {
                                    h += '<option value = "' + select[j] + '" selected>' + select[j] + '</option>';
                                } else {
                                    h += '<option value = "' + select[j] + '">' + select[j] + '</option>';
                                }
                            }
                            $("#edit-conf").append(str);
                            $("#" + conf[i].attrCode + "").append(h);
                        } else {
                            str = " <div class=\"layui-form-item\">\n" +
                                "                                <label class=\"layui-form-label\">" + conf[i].attrName + "</label>\n" +
                                "                                <div class=\"layui-input-block\">\n" +
                                "                                     <select id=\"" + conf[i].attrCode + "\" name=\"attr" + conf[i].attrCode + "\" lay-verify=\"required\"></select>\n" +
                                "                                </div>\n" +
                                "                            </div>";
                            $("#edit-conf").append(str)
                        }
                        index++;
                    }
                }
                $("#edit-up div").each(function () {
                    $(this).remove()
                });
                var p = "<div class=\"layui-upload\">\n" +
                    "  <button type=\"button\" class=\"layui-btn layui-btn-normal\" id=\"testList\">选择多文件</button> \n" +
                    "  <button type=\"button\" class=\"layui-btn\" id=\"testListAction\">开始上传</button>\n" +
                    "  <div class=\"layui-upload-list\">\n" +
                    "    <table class=\"layui-table\">\n" +
                    "      <thead>\n" +
                    "        <tr>" +
                    "        <th>文件名</th>\n" +
                    "        <th>大小</th>\n" +
                    "        <th>状态</th>\n" +
                    "        <th>操作</th>\n" +
                    "      </tr></thead>\n" +
                    "      <tbody id=\"demoList\"></tbody>\n" +
                    "    </table>\n" +
                    "  </div>\n" +
                    "</div> ";
                $("#edit-up").append(p);
                var photo = getProductByCatName(bigNames);
                var evalPicDef = [];
                if (photo.length > 0) {
                    for (let i = 0; i < photo.length; i++) {
                        evalPicDef = JSON.parse(photo[i].evalPicDef);
                    }
                }
                var m = "";
                var op = 0;
                shunxu.length = 0;
                if (evalPicDef.length > 0) {
                    for (let i = 0; i < evalPicDef.length; i++) {
                        if (evalPicDef[i].picType != "无" && evalPicDef[i].picType != "") {
                            shunxu.push(evalPicDef[i].picType);
                            m += evalPicDef[i].picType + ",";
                            op++;
                        }
                    }
                }
                filesRodad.length = 0;
                var goods = repeatGoodsId(data[0].goodsId)[0].goodsDef;
                var def = JSON.parse(goods); //或缺的文件的路劲信息
                for (let i = 0; i < def.length; i++) {
                    filesRodad.push(def[i].lj)
                }
                for (let i = 0; i < def.length; i++) {
                    var tr = $(['<tr id="' + def[i].lj + '">'
                        , '<td>' + def[i].lj + '</td>'
                        , '<td>' + (def[i].lj.length * 100 / 1024).toFixed(1) + 'kb</td>'
                        , '<td>已上传</td>'
                        , '<td>'
                        , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                        , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete" name="' + def[i].lj + '">删除</button>'
                        , '</td>'
                        , '</tr>'].join(''));
                    $("#demoList").append(tr)
                }
                //删除对应的信息
                $("#demoList .demo-delete").click(function () {
                    filesRodad.splice(filesRodad.indexOf($(this).attr("name")), 1);
                    if ($(this).attr("name") == $(this).parent().parent().attr("id")) {
                        $(this).parent().parent().remove();
                    }
                });


                $("#edit-rule").html("请按照" + m + "的顺序上传文件");
                //多文件列表示例

                var demoListView = $('#demoList')
                    , uploadListIns = upload.render({
                    elem: '#testList'
                    , url: '../../upFiles' //改成您自己的上传接口
                    , accept: 'file'
                    , multiple: true
                    , auto: false
                    , bindAction: '#testListAction'
                    , allDone: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                        console.log(obj.total)
                    }
                    , choose: function (obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function (index, file, result) {
                            var num = 1; //控制上传的数量
                            filesRodad.push(file.name);
                            var tr = $(['<tr id="upload-' + index + '">'
                                , '<td>' + file.name + '</td>'
                                , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
                                , '<td>等待上传</td>'
                                , '<td>'
                                , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                                , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                                , '</td>'
                                , '</tr>'].join(''));
                            //判断是否超出选择
                            $("#demoList tr").each(function () {
                                num++;
                                if (num > op) {
                                    layer.alert("请按顺序选择，不能超过选择！");
                                    $(this).remove()
                                }
                            });

                            //单个重传
                            tr.find('.demo-reload').on('click', function () {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function () {
                                num--;
                                delete files[index]; //删除对应的文件
                                if (filesRodad.indexOf(file.name) > 0) {
                                    filesRodad.splice(filesRodad.indexOf(file.name), 1)
                                }
                                tr.remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            demoListView.append(tr);
                        });
                    }
                    , done: function (res, index, upload) {
                        if (res.file) { //上传成功
                            var tr = demoListView.find('tr#upload-' + index)
                                , tds = tr.children();
                            tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                            tds.eq(3).html(''); //清空操作
                            return delete this.files[index]; //删除文件队列已经上传成功的文件
                        }
                        this.error(index, upload);
                    }
                    , error: function (index, upload) {
                        var tr = demoListView.find('tr#upload-' + index)
                            , tds = tr.children();
                        tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                        tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                    }
                });
                form.render('select');//需要渲染一下

                //点击时下拉框动态加载的监听
                var bigName = "";
                var smallName = "";
                form.on('select(edit-productBig)', function (data) {
                    //大类名称
                    bigName = data.value;
                    //小类下拉框
                    var small = getProductSmallByBigName(data.value);
                    var html = '';
                    if (small.length > 0) {
                        for (let i = 0; i < small.length; i++) {
                            smallName = small[0].catName;
                            html += '<option value = "' + small[i].catName + '">' + small[i].catName + '</option>'
                        }
                    } else {
                        html += '<option value = "">暂无数据</option>'
                    }
                    shunxu.length = 0;
                    $("#edit-productSmall").html(html);

                    //品牌下拉框
                    html = "";
                    var brand = getProductByGigCode(data.value);
                    if (brand.length > 0) {
                        for (let i = 0; i < brand.length; i++) {
                            html += '<option value = "' + brand[i].brandCode + '">' + brand[i].brandName + '</option>'
                        }
                    } else {
                        html += '<option value = "">暂无数据</option>'
                    }
                    $("#edit-brandCode").html(html);


                    //三级部分下拉框
                    var three = repeatProductThreeBySmallName(smallName);
                    var htmls = '';
                    if (three.length > 0) {
                        for (let i = 0; i < three.length; i++) {
                            htmls += '<option value = "' + three[i].catCode + '">' + three[i].catName + '</option>'
                        }
                    } else {
                        htmls += '<option value = "">暂无数据</option>'
                    }
                    $("#edit-productThree").html(htmls);


                    //商品属性

                    var conf = getGroupCodeByGigCode(data.value);
                    $("#edit-conf div").each(function () {
                        $(this).remove();
                    });
                    if (conf.length > 0) {
                        for (let i = 0; i < conf.length; i++) {
                            var h = "";
                            var str = " <div class=\"layui-form-item\">\n" +
                                "     <label class=\"layui-form-label\">" + conf[i].attrName + "</label>\n" +
                                "       <div class=\"layui-input-block\">\n" +
                                "       <select id=\"" + conf[i].attrCode + "\" name=\"attr" + conf[i].attrCode + "\" lay-verify=\"required\"></select>\n" +
                                "       </div>\n" +
                                "   </div>";

                            var select = [];
                            select = conf[i].options.split("，");//清单选择框
                            if (select.length > 0) {
                                for (let j = 0; j < select.length; j++) {
                                    h += '<option value = "' + select[j] + '">' + select[j] + '</option>';
                                }
                                $("#edit-conf").append(str);
                                $("#" + conf[i].attrCode + "").append(h);
                            } else {
                                str = " <div class=\"layui-form-item\">\n" +
                                    "                                <label class=\"layui-form-label\">" + conf[i].attrName + "</label>\n" +
                                    "                                <div class=\"layui-input-block\">\n" +
                                    "                                     <select id=\"" + conf[i].attrCode + "\" name=\"attr" + conf[i].attrCode + "\" lay-verify=\"required\"></select>\n" +
                                    "                                </div>\n" +
                                    "                            </div>";
                                $("#edit-conf").append(str)
                            }
                        }
                    }
                    $("#edit-up div").each(function () {
                        $(this).remove()
                    });
                    //文件上传
                    var p = "<div class=\"layui-upload\">\n" +
                        "  <button type=\"button\" class=\"layui-btn layui-btn-normal\" id=\"testList\">选择多文件</button> \n" +
                        "  <button type=\"button\" class=\"layui-btn\" id=\"testListAction\">开始上传</button>\n" +
                        "  <div class=\"layui-upload-list\">\n" +
                        "    <table class=\"layui-table\">\n" +
                        "      <thead>\n" +
                        "        <tr>" +
                        "<th>文件名</th>\n" +
                        "        <th>大小</th>\n" +
                        "        <th>状态</th>\n" +
                        "        <th>操作</th>\n" +
                        "      </tr></thead>\n" +
                        "      <tbody id=\"demoList\"></tbody>\n" +
                        "    </table>\n" +
                        "  </div>\n" +
                        "</div> ";
                    $("#edit-up").append(p);
                    var photo = getProductByCatName(bigName);
                    var evalPicDef = [];
                    if (photo.length > 0) {
                        for (let i = 0; i < photo.length; i++) {
                            evalPicDef = JSON.parse(photo[i].evalPicDef);
                        }
                    }
                    var m = "";
                    var op = 0;
                    if (evalPicDef.length > 0) {
                        for (let i = 0; i < evalPicDef.length; i++) {
                            if (evalPicDef[i].picType != "无" && evalPicDef[i].picType != "") {
                                shunxu.push(evalPicDef[i].picType);
                                m += evalPicDef[i].picType + ",";
                                op++;
                            }
                        }
                    }

                    $("#edit-rule").html("请按照" + m + "的顺序上传文件");

                    //多文件列表示例

                    var demoListView = $('#demoList')
                        , uploadListIns = upload.render({
                        elem: '#testList'
                        , url: '../../upFiles' //改成您自己的上传接口
                        , accept: 'file'
                        , multiple: true
                        , auto: false
                        , bindAction: '#testListAction'

                        , choose: function (obj) {
                            var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列

                            //读取本地文件
                            obj.preview(function (index, file, result) {
                                var num = 1; //控制上传的数量
                                filesRodad.push(file.name);
                                var tr = $(['<tr id="upload-' + index + '">'
                                    , '<td>' + file.name + '</td>'
                                    , '<td>' + (file.size / 1024).toFixed(1) + 'kb</td>'
                                    , '<td>等待上传</td>'
                                    , '<td>'
                                    , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                                    , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                                    , '</td>'
                                    , '</tr>'].join(''));
                                //判断是否超出选择
                                $("#demoList tr").each(function () {
                                    num++;
                                    if (num > op) {
                                        layer.alert("请按顺序选择，不能超过选择！");
                                        $(this).remove()
                                    }
                                });

                                //单个重传
                                tr.find('.demo-reload').on('click', function () {
                                    obj.upload(index, file);
                                });

                                //删除
                                tr.find('.demo-delete').on('click', function () {
                                    num--;
                                    delete files[index]; //删除对应的文件
                                    if (filesRodad.indexOf(file.name) > 0) {
                                        filesRodad.splice(filesRodad.indexOf(file.name), 0)
                                    }
                                    tr.remove();
                                    uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                                });

                                demoListView.append(tr);
                            });
                        }
                        , done: function (res, index, upload) {
                            if (res.file) { //上传成功
                                var tr = demoListView.find('tr#upload-' + index)
                                    , tds = tr.children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html(''); //清空操作
                                return delete this.files[index]; //删除文件队列已经上传成功的文件
                            }
                            this.error(index, upload);
                        }
                        , error: function (index, upload) {
                            var tr = demoListView.find('tr#upload-' + index)
                                , tds = tr.children();
                            tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                            tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                        }
                    });
                    form.render('select');//需要渲染一下

                });
                // //商品三级的下拉框动态加载
                form.on('select(edit-productSmall)', function (data) {
                    var three = repeatProductThreeBySmallName(data.value);
                    var html = '';
                    if (three.length > 0) {
                        for (let i = 0; i < three.length; i++) {
                            html += '<option value = "' + three[i].catCode + '">' + three[i].catName + '</option>'
                        }
                    } else {
                        html += '<option value = "">暂无数据</option>'
                    }
                    $("#edit-productThree").html(html);
                    form.render('select');//需要渲染一下
                });
                form.render('select');//需要渲染一下
                form.val("editForm", json[0]);
            }
        });
        //监听编辑商品
        form.on('submit(editGoods)', function (data) {
            var str = []; //图片数组
            var index = 0;
            for (let i = 0; i < shunxu.length; i++) {
                if (index <= filesRodad.length - 1) {
                    str.push({
                        "direction": shunxu[i],
                        "lj": filesRodad[index]
                    });
                    index++;
                } else {
                    str.push({
                        "direction": shunxu[i],
                        "lj": "空",
                    });
                }

            }
            var add = $("#editForm").serializeArray();
            var attr = []; //属性数组
            var attrCode = [];//属性编号组
            for (let i = 12; i < add.length; i++) {
                if (add[i].name.substring(0, 4) == "attr") {
                    attr.push(add[i].value);
                    attrCode.push(add[i].name.substring(4))
                }
            }

            if (attr.length == 0) {
                attr.push("无数据");
                attrCode.push("无数据");
            }
            var goods = [];
            for (let i = 0; i < 12; i++) {
                goods.push(add[i].value)
            }

            $.ajax({
                url: '../../editGoods',
                method: 'post',
                data: {"json": JSON.stringify(str), "goods": goods, "attr": attr, "attrCode": attrCode},
                dataType: "json",
                success: function (data) {
                    if (data.result > 0) {
                        layer.alert("修改成功！", {
                            icon: 6, title: '提示', cancel: function (index) {
                                table.reload('goods');
                                layer.closeAll();
                                //重置表单数据
                                $("#editForm")[0].reset();
                                layui.form.render();
                            }
                        }, function () {
                            //重载表格，避免查询后新增，无法显示新增数据
                            table.reload('goods');
                            layer.closeAll();
                            //重置表单数据
                            $("#editForm")[0].reset();
                            layui.form.render();
                        })
                    } else {
                        layer.alert("修改失败！", {
                            icon: 6, title: '提示', cancel: function (index) {
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
            return false;
        });
        //鉴定
        $("#closeIdentifyWin").click(function () {
            layer.closeAll();
            $("#identify")[0].reset();
            layui.form.render();
        });

        $(document).on('click', '#jd', function () {
            var checkStatus = table.checkStatus('goods');
            var goodsId = "";
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要鉴定的数据", {icon: 0})
            } else if (checkStatus.data.length > 1) {
                layer.alert("只能选择一行鉴定", {icon: 0})
            } else if (checkStatus.data.length == 1 && checkStatus.data[0].goodsState != "待鉴定") {
                layer.alert("请选择待鉴定的商品，进行鉴定", {icon: 0})
            } else if (checkStatus.data.length == 1 && checkStatus.data[0].goodsState == "待鉴定") {
                goodsId = checkStatus.data[0].goodsId; //选中的商品编码
                layer.open({
                    type: 1,
                    title: "鉴定商品",
                    content: $('#identify'),//这里content是一个普通的String
                    area: ['700px', '520px'],
                    cancel: function () {
                        layer.closeAll();
                        $("#identify")[0].reset();
                        layui.form.render();
                    }
                });

                laydate.render({
                    elem: '#createTime'
                });
                //删除ul下的所有Li
                $("#photo li").each(function () {
                    $(this).remove();
                });
                // $("#layer-photos-demo span").each(function () {
                //     $(this).remove();
                // });

                //图片的回显
                var josn = repeatGoodsId(goodsId);
                var photos = JSON.parse(josn[0].goodsDef);

                for (let i = 0; i < photos.length; i++) {
                    if(photos[i].lj!="空"){
                    var str = "<li>" +
                        "<span style='font-size: 18px'>" + photos[i].direction + "</span>" +
                        "<img  layer-src=\"http://www.pawntest.com/ups/"+photos[i].lj+" \" src=\"http://www.pawntest.com/ups/"+photos[i].lj+"\" alt="+photos[i].direction+">"+
                        "</li>";

                    $("#photo").append(str)
                    }
                }
                layer.photos({
                    photos: '#photo'
                    ,anim: 4 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                });
                $("#goodsCode").val(goodsId);


                var information = getAllIdentifyInformation().length; //历时鉴定的条数
                $("#xiaoxi").html(information);
                $("#history").click(function () {

                    layer.open({
                        type: 1,
                        title: "历时鉴定记录",
                        content: $('#identifyHistory'),//这里content是一个普通的String
                        area: ['700px', '520px'],
                        cancel: function (index) {
                            $("body div").each(function () {
                                if ($(this).attr("lay-id") == "identifyHistory") {
                                    $(this).remove()
                                }
                            });
                            // $("#identifyHistory").css("display","none");
                            layer.close(index);
                            $("#identifyHistory")[0].reset();
                            layui.form.render();

                        }
                    });

                    table.render({
                        elem: '#identifyHistory'
                        // ,  closeBtn :0//不显示关闭按钮
                        , url: '../../getAllIdentify' //数据接口
                        , page: {theme: '#81d3ff', prev: '上一页', next: '下一页', last: '尾页'} //开启分页
                        , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
                        , even: true,
                        text: {
                            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
                        }
                        // , unresize: true //是否拖拽，true为禁用
                        , cols: [[ //表头
                            {field: 'checkbox', type: "checkbox", fixed: 'left', unresize: true}
                            , {field: 'identifyId', title: '序号', align: "center", unresize: true}
                            , {field: 'identifyResult', title: '真假', sort: true, align: "center", unresize: true}
                            , {field: 'goodsQuality', title: '新旧程度', sort: true, align: "center", unresize: true}
                            , {field: 'createBy', title: '鉴定人', align: "center", unresize: true}
                            , {field: 'createTime', title: '鉴定时间', align: "center", unresize: true}
                            , {field: 'identifyDesc', title: '备注', align: "center", unresize: true}
                        ]]
                        // ,done: function(res, curr, count){
                        //     //如果是异步请求数据方式，res即为你接口返回的信息。
                        //     //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                        //    information = count;
                        // }
                    });
                });
                //监听提交
                form.on('submit(addIdentify)', function (data) {
                    $.ajax({
                        url: '../../addIdentify',
                        method: 'post',
                        data: data.field,
                        dataType: "json",
                        success: function (data) {
                            if (data.result > 0) {
                                layer.alert("提交成功", {
                                    icon: 6, cancel: function () {
                                        layer.closeAll();
                                        $("#identifyHistory")[0].reset();
                                        layui.form.render();
                                        window.location.href = "/appraisal/view/shopList.html"
                                    }
                                }, function (index) {
                                    window.location.href = "/appraisal/view/shopList.html";
                                    $("#identifyHistory")[0].reset();
                                    layui.form.render();
                                });
                            } else {
                                layer.alert("提交失败了", {
                                    icon: 5, title: '提示', cancel: function (index) {
                                        layer.closeAll()
                                        $("#identifyHistory")[0].reset();
                                        layui.form.render();
                                    }
                                }, function () {
                                    layer.closeAll();
                                    $("#identifyHistory")[0].reset();
                                    layui.form.render();
                                })
                            }
                        },
                        error: function (e) {
                            layer.alert("提交失败了,刷新试试", {
                                icon: 5, title: '提示', cancel: function (index) {
                                    layer.closeAll()
                                    $("#identifyHistory")[0].reset();
                                    layui.form.render();
                                }
                            }, function () {
                                layer.closeAll();
                                $("#identifyHistory")[0].reset();
                                layui.form.render();
                            })
                        }
                    });
                    return false;
                });
            }
        });

        //评估
        $("#closeAppriseWin").click(function () {
            layer.closeAll();
            $("#appraiseForm")[0].reset();
            layui.form.render();
        });

        $(document).on('click', '#appraisal', function () {
            var checkStatus = table.checkStatus('goods');
            var goodsId = "";
            if (checkStatus.data.length === 0) {
                layer.alert("选择一行要评估的数据", {icon: 0})
            } else if (checkStatus.data.length > 1) {
                layer.alert("只能选择一行评估", {icon: 0})
            } else if (checkStatus.data.length == 1 && checkStatus.data[0].goodsState != "已鉴定") {
                layer.alert("请选择已鉴定的商品，进行评估", {icon: 0})
            } else if (checkStatus.data.length == 1 && checkStatus.data[0].goodsState == "已鉴定") {
                goodsId = checkStatus.data[0].goodsId; //选中的商品编码
                layer.open({
                    type: 1,
                    title: "评估商品",
                    content: $('#appraiseForm'),//这里content是一个普通的String
                    area: ['700px', '520px'],
                    cancel: function () {
                        layer.closeAll();
                        $("#appraiseForm")[0].reset();
                        layui.form.render();
                    }
                });
                laydate.render({
                    elem: '#appraise-createTime'
                });
                //删除ul下的所有Li
                $("#appraise-photo li").each(function () {
                    $(this).remove();
                });
                //图片的回显
                var josn = repeatGoodsId(goodsId);
                var photos = JSON.parse(josn[0].goodsDef);

                for (let i = 0; i < photos.length; i++) {
                    if(photos[i].lj!="空") {
                        var str = "<li>" +
                            "<span style='font-size: 18px'>" + photos[i].direction + "</span>" +
                            "<img  layer-src=\"http://www.pawntest.com/ups/" + photos[i].lj + " \" src=\"http://www.pawntest.com/ups/" + photos[i].lj + "\" alt=" + photos[i].direction + ">" +
                            "</li>";
                        $("#appraise-photo").append(str)
                    }
                }
                layer.photos({
                    photos: '#appraise-photo'
                    ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                });
                $("#appraise-goodsCode").val(goodsId);
                var information = getAllAppraiseInformation().length; //历时鉴定的条数
                $("#apprise-xiaoxi").html(information);
                $("#apprise-history").click(function () {
                    layer.open({
                        type: 1,
                        title: "历时鉴定记录",
                        content: $('#appraise'),//这里content是一个普通的String
                        area: ['700px', '520px'],
                        cancel: function (index) {
                            $("body div").each(function () {
                                if ($(this).attr("lay-id") == "appraise") {
                                    $(this).remove()
                                }
                            });
                            // $("#identifyHistory").css("display","none");
                            layer.close(index);
                            // $("#appraiseForm")[0].reset();
                            // layui.form.render();
                        }
                    });

                    table.render({
                        elem: '#appraise'
                        // ,  closeBtn :0//不显示关闭按钮
                        , url: '../../getAllAppraise' //数据接口
                        , page: {theme: '#81d3ff', prev: '上一页', next: '下一页', last: '尾页'} //开启分页
                        , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
                        , even: true,
                        text: {
                            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
                        }
                        // , unresize: true //是否拖拽，true为禁用
                        , cols: [[ //表头
                            {field: 'checkbox', type: "checkbox", fixed: 'left', unresize: true}
                            , {field: 'appraiseId', title: '序号', align: "center", unresize: true}
                            , {field: 'officialPrice', title: '官方价格', sort: true, align: "center", unresize: true}
                            , {field: 'valuationPrice', title: '评估价格', sort: true, align: "center", unresize: true}
                            , {field: 'createBy', title: '评估人', align: "center", unresize: true}
                            , {field: 'createTime', title: '评估时间', align: "center", unresize: true}
                            , {field: 'appraiseDesc', title: '备注', align: "center", unresize: true}
                        ]]
                        // ,done: function(res, curr, count){
                        //     //如果是异步请求数据方式，res即为你接口返回的信息。
                        //     //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                        //    information = count;
                        // }
                    });
                });
                //监听提交
                form.on('submit(apprise)', function (data) {
                    $.ajax({
                        url: '../../addApprise',
                        method: 'post',
                        data: data.field,
                        dataType: "json",
                        success: function (data) {
                            if (data.result > 0) {
                                layer.alert("提交成功", {
                                    icon: 6, cancel: function () {
                                        layer.closeAll();
                                        $("#appraiseForm")[0].reset();
                                        layui.form.render();
                                        window.location.href = "/appraisal/view/shopList.html"
                                    }
                                }, function (index) {
                                    window.location.href = "/appraisal/view/shopList.html";
                                    $("#appraiseForm")[0].reset();
                                    layui.form.render();
                                });
                            } else {
                                layer.alert("提交失败了", {
                                    icon: 5, title: '提示', cancel: function (index) {
                                        layer.closeAll();
                                        $("#appraiseForm")[0].reset();
                                        layui.form.render();
                                    }
                                }, function () {
                                    layer.closeAll();
                                    $("#appraiseForm")[0].reset();
                                    layui.form.render();
                                })
                            }
                        },
                        error: function (e) {
                            layer.alert("提交失败了,刷新试试", {
                                icon: 5, title: '提示', cancel: function (index) {
                                    layer.closeAll();
                                    $("#appraiseForm")[0].reset();
                                    layui.form.render();
                                }
                            }, function () {
                                layer.closeAll();
                                $("#appraiseForm")[0].reset();
                                layui.form.render();
                            })
                        }
                    });
                    return false;
                });
            }
        });
        //验证
        form.verify({
            repeatGoodsId: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                var json = repeatGoodsId(value);
                if (json.length > 0) {
                    checkResult = '编码已存在'
                }
                return checkResult;
            },
            repeatIdentifyCode: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                var json = repeatIdentifyCode(value);
                if (json.length > 0) {
                    checkResult = '编码已存在'
                }
                return checkResult;
            },
            repeatAppraiseCode: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                var json = repeatAppraiseCode(value);
                if (json.length > 0) {
                    checkResult = '编码已存在'
                }
                return checkResult;
            }

        });
    });
});