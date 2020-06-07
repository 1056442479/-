$(function () {
    //页面加载时请求 另一张表的数据
    var slotGroup = [];
    $.ajax({
        url: '/getAllShopNames'
        , method: 'get'
        , dataType: "json"
        , async: false
        , success: function (res) {
            for (let i = 0; i < res.result.length; i++) {
                slotGroup.push(res.result[i])
            }
        }
    });
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
            elem: '#store'
            // ,  closeBtn :0//不显示关闭按钮
            , url: '/getAllWhInformation' //数据接口
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
                , {field: 'whCode', title: '编号', align: "center" , unresize: true}
                , {field: 'whName', title: '仓库名称', sort: true, align: "center" , unresize: true}
                , {field: 'contact', title: '联系人', sort: true, align: "center" , unresize: true}
                , {field: 'phone', title: '手机号', sort: true, align: "center" , unresize: true}
                , {field: 'address', title: '地址', sort: true, align: "center" , unresize: true}
                , {
                    field: 'shopName', title: '关联门店', sort: true, align: "center" , unresize: true, templet: function (d) {
                        return getRemark(d.whCode)
                    }
                }
                , {field: 'whState', title: '状态', sort: true, align: "center" , unresize: true}
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
                for (let i = 0; i <res.data.length ; i++) {
                    if(res.data[i].whState=="停用"){
                        $(".layui-table tbody tr").each(function () {
                            if(res.data[i].LAY_TABLE_INDEX==$(this).attr("data-index")){
                                $(this).css('color',"red");
                            }
                        })
                    }
                }
            }
        });
        //遍历展示一开始的数据,获取对应的门店数据
        function getRemark(whCode) {
            var showGroup = '';
            if (whCode == null || whCode == undefined) {
                return showGroup;
            } else {
                var men = getShopNames(whCode);
                for (let j = 0; j < men[0].result.length; j++) {
                    showGroup += men[0].result[j].shopName + " ";
                }
                return showGroup;
            }
        }

        var shopNames = [];
        var code = [];
        var data1 = [];
        $.ajax({
            type: "get",
            url: "/getAllShopNames",
            dataType: "json",
            async: false,    //异步
            success: function (data) {
                data1 = data
            }
        });

        for (var i = 0; i < data1.result.length; i++) {
            shopNames.push(data1.result[i])
        }
        for (var i = 0; i < data1.result.length; i++) {
            code.push(data1.result[i].shopCode)
        }


        //点击删除按钮
        $(document).on('click', '#delete', function () {
            var checkStatus = table.checkStatus('store');
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要删除的数据", {icon: 0})
            } else {
                var data = checkStatus.data;
                var whCode = []; //要删除的角色id
                for (var i = 0; i < data.length; i++) {
                    whCode.push(data[i].whCode)
                }
                $.post("deleteWhByCode", {"whCode": whCode}, function (data) {
                    if (data.result > 0) {
                        var len = layui.table.cache["store"]; //当前没删除前表格的数据
                        if (len.length === whCode.length) { //如果删除数组id长度等于数据条数，则为删除全部了
                            layer.msg("删除成功");
                            window.location.href = "/house.html"
                        } else {
                            layer.alert("删除成功", {icon: 6});
                            table.reload("store");
                        }
                    } else {
                        layer.alert("提交失败了,刷新试试", {icon: 5, title: '提示'}, function () {
                            layer.closeAll();
                        })
                    }
                })
            }
        });

        //关闭新增门店窗口
        $("#closeAddWin").click(function () {
            layer.closeAll();
            $("#addShop")[0].reset();
            layui.form.render();
            // table.reload('store')
        });
        //显示新增门店窗口,并新增门店
        $(document).on('click', '#add', function () {
            layer.open({
                type: 1,
                title: "新增仓库",
                anim: 1, //有0-6种动画
                content: $('#addShop'),//这里content是一个普通的String
                area: ['700px', '520px'],
                cancel: function () {
                    $("#addShop")[0].reset();
                    layui.form.render();
                    // table.reload('store')
                }
                // , btn: ['提交', '取消']
            });

            transfer.render({
                elem: '#whName'
                , data: shopNames
                , title: ['可选门店', '已选门店']
                , showSearch: true
                , height: 300
                , width: 200
                , id: 'demo1'
                , parseData: function (res) {
                    return {
                        "value": res.shopCode //数据值
                        , "title": res.shopName //数据标题
                        , "disabled": true  //是否禁用
                        , text: {
                            none: '无数据' //没有数据时的文案
                            , searchNone: '无匹配数据' //搜索无匹配数据时的文案
                        }
                    }
                }
            });

            form.on('submit(addShop)', function (data) {
                $.ajax({
                    url: '/addHouse',
                    method: 'post',
                    data: data.field,
                    dataType: "json",
                    success: function (data) {
                        if (data.result > 0) {
                            layer.alert("新增成功！", {
                                icon: 6, title: '提示', cancel: function (index) {
                                    table.reload('store', {url: '/getAllWhInformation'});
                                    //ajax请求获取总数，
                                    $.post("getAllWhInformation", {"page": cu, "limit": num}, function (data) {
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
                                        $("#addShop")[0].reset();
                                        layui.form.render();
                                    });
                                }
                            }, function () {
                                //重载表格，避免查询后新增，无法显示新增数据
                                table.reload('store', {url: '/getAllWhInformation'});
                                //ajax请求获取总数，
                                $.post("getAllWhInformation", {"page": cu, "limit": num}, function (data) {
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
                                    $("#addShop")[0].reset();
                                    layui.form.render();
                                });
                            })
                        } else {
                            layer.alert("新增失败！", {
                                icon: 6, title: '提示', cancel: function (index) {
                                    layer.closeAll();
                                    $("#addShop")[0].reset();
                                    layui.form.render();
                                }
                            }, function () {
                                layer.closeAll();
                                $("#addShop")[0].reset();
                                layui.form.render();
                            })
                        }
                    },
                    error: function (e) {
                        layer.alert("提交失败了,刷新试试", {
                            icon: 5, title: '提示', cancel: function (index) {
                                layer.closeAll();
                                $("#addShop")[0].reset();
                                layui.form.render();
                            }
                        }, function () {
                            layer.closeAll();
                            $("#addShop")[0].reset();
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
            $("#editShop")[0].reset();
            layui.form.render();
            // table.reload('store')
        });

        $(document).on('click', '#edit', function () {
            // table.reload('store')
            var checkStatus = table.checkStatus('store');
            if (checkStatus.data.length === 0) {
                layer.alert("至少选择一行要编辑的数据", {icon: 0})
            } else if (checkStatus.data.length > 1) {
                layer.alert("只能选择一行进行编辑", {icon: 0})
            } else {
                var data = checkStatus.data;
                var whCode = data[0].whCode; //仓库编号
                $("#editCode").val(data[0].whCode);
                $("#editName").val(data[0].whName);
                $("#edit-contact").val(data[0].contact);
                $("#edit-phone").val(data[0].phone);
                $("#edit-address").val(data[0].address);

                $("#edit-radio input:radio").each(function () {
                    if ($(this).val() == data[0].whState) {
                        $(this).prop("checked", true);
                        //一定要动态渲染表单，不然没用，这里天坑
                        form.render()
                    }
                });
                layer.open({
                    type: 1,
                    title: "编辑仓库",
                    content: $('#editShop'),//这里content是一个普通的String
                    area: ['700px', '520px']
                });
                var houses=  getShopNames(whCode);
                var shopCode = [];
                // var whName=[];
                for (let i = 0; i < houses[0].result.length; i++) {
                    shopCode.push(houses[0].result[i].shopCode)
                }

                transfer.render({
                    elem: '#edit-whName'
                    , data: shopNames
                    ,value:shopCode
                    , title: ['可选门店', '已选门店']
                    , showSearch: true
                    , height: 300
                    , width: 200
                    , id: 'demo1'
                    , parseData: function (res) {
                        return {
                            "value": res.shopCode //数据值
                            , "title": res.shopName //数据标题
                            , "disabled": true //是否禁用
                            // , "checked": res.checked //是否选中
                            , text: {
                                none: '无数据' //没有数据时的文案
                                , searchNone: '无匹配数据' //搜索无匹配数据时的文案
                            }
                        }
                    }
                });

                //监听提交编辑用户
                form.on('submit(editShop)', function (data) {

                    $.ajax({
                        url: '/editWh',
                        method: 'post',
                        data:data.field,
                        dataType: "json",
                        success: function (data) {
                            //重载表格
                            table.reload("table");
                            if (data.result > 0) {
                                layer.alert("修改成功", {
                                    icon: 6, cancel: function () {
                                        layer.closeAll();
                                        table.reload('store')
                                    }
                                }, function (index) {
                                    layer.closeAll();
                                    table.reload('store')
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

        //查询
        $(document).on('click', '#search', function () {
            //查询的状态信息
            var  state= $("#state").val();
            var keyWord = $("#keyWord").val();
            if (keyWord.trim().toString() == "" && state=="全部") {
                table.reload('store', {url: '/getAllWhInformation'});
            } else {
                table.reload('store', {
                    page: {
                        curr: 1
                    },
                    where: {
                        state:state,
                        keyWord:keyWord
                    },
                    method: 'post',
                    url: '/searchKeyWordFromWh'
                });
            }
        });

        form.verify({
            repeatWhCode: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                $.ajax({
                    url: "/repeatWhCode",
                    type: "GET",
                    data: {"whCode": value},
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
});