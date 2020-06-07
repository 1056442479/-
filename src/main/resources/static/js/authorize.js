layui.use(['table', 'element', 'form', 'transfer','tree'], function () {
        var table = layui.table;
        var form = layui.form;
        var layer = layui.layer;
        var transfer = layui.transfer;
        var tree = layui.tree;

    //获取所有菜单信息
    var json =getAllMenuInformation();
    //获取一级菜单的个数
    var first = [];
    for (var i = 0; i <json.length ; i++) {
        if(json[i].pid==0){
            first.push(json[i])
        }
    }

    var data = []; //总数据源
    var xia=[]; //一级菜单下的所有菜单
    for (var i = 0; i <first.length ; i++) {
        data.push({
            title: first[i].name,
            id: first[i].id,
            field: first[i].id,
            spread: true,
            children: []
        });
        for (var j = 0; j < json.length; j++) {
            if (json[j].pid === first[i].id) {
                data[i].children.push({
                    title: json[j].name,
                    id: json[j].id,
                    field: json[j].id,
                    spread: true,
                    children: []
                });
                for (var k = 0; k <json.length ; k++) {
                    if(json[k].pid===json[j].id ){
                        data[i].children[0].children.push({
                            title:json[k].name,
                            id:json[k].id,
                            field:json[k].id,
                            spread: true,
                            children:[]
                        });
                        for (var l = 0; l <json.length ; l++) {
                            if(json[l].pid===json[k].id){
                                data[i].children[0].children[0].children.push({
                                    title:json[l].name,
                                    id:json[l].id,
                                    field:json[l].id,
                                    spread: true,
                                    children:[]
                                });
                            }
                        }
                    }
                }
            }
        }
    }
    var rolename ="";
    var checkData="";
    //渲染
    //基本演示
    $(document).on('click', '#shouquan', function () {
        var checkStatus = table.checkStatus('table');
        tree.render({
            elem: '#tree'
            ,data: data
            ,showCheckbox: true  //是否显示复选框
            ,id: 'demoId1'
            ,isJump: true //是否允许点击节点时弹出新窗口跳转
            ,click: function(obj){
                var data = obj.data;  //获取当前点击的节点数据
                layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
            }
        });
        if (checkStatus.data.length === 0) {
            layer.alert("请选择一行数据", {icon: 0,title:'提示'})
            $(".layui-tree-line").css("display","none")
        }else if(checkStatus.data.length >1){
            layer.alert("只能选择一行数据", {icon: 0,title:'提示'})
            $(".layui-tree-line").css("display","none")
        }else{
            rolename = checkStatus.data[0].rolename; //获取角色名
            layer.open({
                type: 1,
                title: "您正在为"+'<span style=\'color:red\'>'+checkStatus.data[0].rolename+'</span>'+"进行授权操作",
                anim: 1, //有0-6种动画
                content:  $('#tree'),//这里content是一个普通的String
                area: ['700px', '520px']
                , cancel: function () {
                    $(".layui-tree-line").css("display","none")
                }
               , btn: ['确认授权', '取消授权']
                ,btn2: function(){
                    $(".layui-tree-line").css("display","none")
                }
                ,yes:function () {
                    $(".layui-tree-line").css("display","none");
                    layer.closeAll();
                    //demoId为，树加载定义的id值,获取所有选中的数据
                    checkData= tree.getChecked('demoId1');
                    var menuId = []; //存储被选中的菜单id
                       if(checkData.length>0){
                           for (let i = 0; i <checkData.length ; i++) {
                               menuId.push(checkData[i].id);
                               if(checkData[i].children.length>0 ){
                                   for (let j = 0; j <checkData[i].children.length ; j++) {
                                       menuId.push(checkData[i].children[j].id);
                                       if(checkData[i].children[j].children.length>0){
                                           for (let k = 0; k <checkData[i].children[j].children.length ; k++) {
                                               menuId.push(checkData[i].children[j].children[k].id);
                                               if(checkData[i].children[j].children[k].children.length>0){
                                                   for (let l = 0; l <checkData[i].children[j].children[k].children.length ; l++) {
                                                       menuId.push(checkData[i].children[j].children[k].children[l].id);
                                                   }
                                               }
                                           }
                                       }
                                   }
                               }
                           }
                       }
                  if(menuId.length>0){
                      $.post("addMenuIdRoleName",{"rolename":rolename,"menuId":menuId},function (data) {
                            if(data.result>0){
                                layer.alert("授权成功",{icon:6,title:"提示",cancel:function () {
                                        layer.closeAll();
                                    }},function () {
                                    layer.closeAll();
                                })
                            }else {
                                layer.alert("授权失败",{icon:5,title:"警告",cancel:function () {
                                        layer.closeAll();
                                    }},function () {
                                    layer.closeAll();
                                })
                            }
                      })
                  }

                }
            });
        }
    });

});