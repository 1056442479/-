//icon图标 0 黄色感叹号  1 绿色对 2 是红叉 3是黄色问好 4是黑锁 5是红色哭脸 6是绿色笑脸
$(function () {
    layui.config({
        base: 'module/'
    }).extend({
        treetable: 'treetable-lay/treetable'
    }).use(['treetable', 'form', 'table', 'layer'], function () {

        var treetable = layui.treetable;
        var layer = layui.layer;
        var form = layui.form;
        var table = layui.table;
// 渲染表格
        var insTb = treetable.render({
            elem: '#demoTreeTb',
            url: '/tree',
            skin: 'row ',
            toolbar: '#toolbarDemo',
            treeColIndex: 2,          // 图标显示在第几列
            treeSpid: 0,             // 顶级父类的参数
            treeIdName: 'id',       // 父级id
            treePidName: 'pid',     // 子集id
            treeDefaultClose: true,   // 是否默认折叠
            treeLinkage: true,        // 父级展开时是否自动展开所有子级
            tree: {
                arrowType: 'arrow5',   // 自定义箭头风格
                getIcon: function (d) {  // 自定义图标
                    // d是当前行的数据

                    if (d.haveChild) {  // 判断是否有子集
                        return '<i class="ew-tree-icon ew-tree-icon-folder"></i>';
                    } else {
                        return '<i class="ew-tree-icon ew-tree-icon-file"></i>';
                    }
                }
            },
            cols: [[
                {type: 'numbers', unresize: true},
                {type: 'checkbox', unresize: true},
                {field: 'id', title: 'ID', align: 'center', unresize: true},
                {field: 'name', title: '菜单名称', align: 'center', unresize: true},
                {field: 'icon', title: '字体图标', align: 'center', unresize: true},
                {field: 'url', title: '地址', align: 'center', unresize: true}
            ]]
        });

        //关闭新增一级菜单的窗口
        $("#closeAddFirstMenuWin").click(function () {
            layer.closeAll();
            //重置表单数据
            $("#addFirstMenuForm")[0].reset();
            layui.form.render();
        });
        //新增一级菜单
        $(document).on('click', '#addFirstMenu', function () {
            layer.open({
                type: 1,
                title: "新增一级菜单",
                anim: 1, //有0-6种动画
                content: $('#addFirstMenuForm'),//form的id
                area: ['400px', '300px']
                ,cancel:function () {
                    $("#addFirstMenuForm")[0].reset();
                    layui.form.render();
                }
                // , btn: ['提交', '取消']
            });
            form.on('submit(addFirstMenu)', function (data) {
                layer.load(2, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
                $.ajax({
                    url: '/addFirstMenu',
                    method: 'post',
                    data: data.field,
                    dataType: "json",
                    success: function (data) {
                        if (data.result > 0) {
                            layer.alert("增加成功", {
                                icon: 6, cancel: function (index) {
                                    layer.closeAll()
                                    window.location.href = "/menuEditor.html"
                                }
                            }, function () {
                                layer.closeAll();
                                //重载表格
                                window.location.href = "/menuEditor.html"
                            });
                        } else {
                            layer.alert("提交失败了", {
                                icon: 5, title: '提示', cancel: function (index) {
                                    layer.closeAll()
                                }
                            }, function () {
                                layer.closeAll();
                            })
                        }
                    },
                    error: function (e) {
                        layer.alert("提交失败了", {
                            icon: 2, title: '提示', cancel: function (index) {
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

        });

        //alert窗口的图标 1 -6
        //点击编辑按钮
        var close = $("#closeUpdateFirstMenuWin").click(function () {
            layer.closeAll();
        });

        $(document).on('click', '#editMenu', function () {

            var length = getCheckNum(); //选中的行数
            if (length === 0) {
                layer.alert("至少选择一行要编辑的数据", {icon: 0})
            } else if (length > 1) {
                layer.alert("只能选择一行进行编辑", {icon: 0})
            } else {
                var json = getCheckInformation(); //获取选中行的数据
                $("#icon").val(json[0].icon);
                $("#id").val(json[0].id);
                $("#url").val(json[0].url);
                $("#name").val(json[0].name);

                layer.open({
                    type: 1,
                    title: "编辑菜单",
                    anim: 4,
                    content: $('#updateMenuForm'),//这里content是一个普通的String
                    area: ['400px', '350px']
                });
                //监听提交编辑用户
                form.on('submit(saveUpdateMenu)', function (data) {
                    layer.load(2, {
                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                    });
                    $.ajax({
                        url: '/updateMenu',
                        method: 'post',
                        data: data.field,
                        dataType: "json",
                        success: function (data) {
                            //重载表格
                            if (data.result > 0) {
                                layer.alert("修改成功", {
                                    icon: 1, title: '提示', cancel: function (index) {
                                        window.location.href = "/menuEditor.html"
                                    }
                                }, function () {
                                    window.location.href = "" +
                                        "/menuEditor.html";
                                });
                            } else {
                                layer.alert("修改失败了", {
                                    icon: 5, title: '提示', cancel: function (index) {
                                        layer.closeAll()
                                    }
                                })
                            }
                        },
                        error: function (e) {
                            layer.alert("提交失败了", {
                                icon: 2, title: '提示', cancel: function (index) {
                                    layer.closeAll()
                                }
                            })
                        }
                    });
                    return false;
                });
            }
        });

        //删除菜单
        $(document).on('click', '#deleteMenu', function () {
            var json = getCheckInformation(); //获取选中行的数据
            var id = [];//存放选中行的id
            if (json.length == 0) {
                layer.alert("请选择要删除的菜单", {icon: 0, title: '提示'})
            } else {
                for (var i = 0; i < json.length; i++) {
                    id.push(json[i].id);
                }

                layer.confirm('本次操作不可逆，是否删除！', {icon: 0, title: '警告'}, function (index) {
                    //do something
                    $.post("deleteMenu", {"id": id}, function (data) {
                        if (data.result > 0) {
                            layer.close(index);
                            layer.alert("删除成功！", {
                                icon: 6, title: '提示', cancel: function (index) {
                                    window.location.href = "/menuEditor.html"
                                }
                            }, function () {
                                window.location.href = "/menuEditor.html";
                            });
                        } else {
                            layer.close(index);
                            layer.alert("删除失败！", {icon: 5, title: '提示'});
                        }
                    })
                });

            }
        });
        var parentId = ""; //父级id
        //关闭增加子集菜单
        $("#closeChildMenuWin").click(function () {
            layer.closeAll();
            //重置表单数据
            $("#addChildMenuForm")[0].reset();
            layui.form.render();
            layer.closeAll()
        });
        //增加下级菜单
        $(document).on('click', '#addLastMenu', function () {
            var json = getCheckInformation(); //获取选中行的数据
            var id = [];//存放选中行的id
            if (json.length == 0) {
                layer.alert("请选择要增加子菜单的父级菜单", {icon: 0, title: '提示'})
            } else if (json.length > 1) {
                layer.alert("只能选择一个父级菜单进行增加", {icon: 0, title: '提示'})
            } else {
                var json = getCheckInformation();
                $("#parent-id").val(json[0].id);
                parentId=json[0].id;
                layer.open({
                    type: 1,
                    title: "新增子级菜单",
                    anim: 1, //有0-6种动画
                    content: $('#addChildMenuForm'),//form的id
                    area: ['400px', '410px']
                    ,cancel:function () {
                        $("#addChildMenuForm")[0].reset();
                        layui.form.render();
                    }
                    // , btn: ['提交', '取消']
                });
                form.on('submit(saveAddChild)', function (data) {
                    layer.load(2, {
                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                    });
                    $.ajax({
                        url: '/saveAddChildMenu',
                        method: 'post',
                        data: data.field,
                        dataType: "json",
                        success: function (data) {
                            if (data.result > 0) {
                                layer.alert("增加成功", {
                                    icon: 6, title: '提示', cancel: function (index) {
                                        window.location.href = "/menuEditor.html"
                                    }
                                }, function () {
                                    layer.closeAll();
                                    //重载表格
                                    window.location.href = "/menuEditor.html"
                                });
                            } else {
                                layer.alert("提交失败了,刷新试试", {
                                    icon: 2, title: '提示', cancel: function (index) {
                                        layer.closeAll()
                                    }
                                }, function () {
                                    layer.closeAll();
                                })
                            }
                        },
                        error: function (e) {
                            layer.alert("提交失败了,刷新试试", {
                                icon: 2, title: '提示', cancel: function (index) {
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

            }
        });
        form.verify({
            //验证菜单id是否重复
            repeatId: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                $.ajax({
                    url: "/repeatId",
                    type: "GET",
                    data: {"id": value},
                    async: false,
                    success: function (data) {
                        if (data.result > 0) {
                            checkResult = "Id不能重复";
                        }
                    },
                    error: function () {
                    }
                });
                return checkResult;
            }
            , repeatSonId: function (value, item) { //value：表单的值、item：表单的DOM对象
                var checkResult = "";
                $.ajax({
                    url: "/repeatSonId",
                    type: "GET",
                    data: {"id": value,"parentId":parentId},
                    async: false,
                    success: function (data) {
                        if (data.result > 0) {
                            checkResult = "Id不能重复";
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
