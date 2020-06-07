/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : gf

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-06-07 14:02:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `c_pawn_attr_conf`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_attr_conf`;
CREATE TABLE `c_pawn_attr_conf` (
  `ATTR_CODE` varchar(32) NOT NULL,
  `GROUP_CODE` varchar(32) DEFAULT NULL,
  `ATTR_NAME` varchar(64) DEFAULT NULL,
  `ATTR_TYPE` varchar(32) DEFAULT NULL COMMENT '取数据字典中PC_ATTR_TYPE类型的数据\r\n            01 唯一属性\r\n            02 单选属性\r\n            03 多选属性',
  `OPTIONS` text DEFAULT NULL COMMENT '各个属性项以逗号隔开',
  `SORT_NO` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`ATTR_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_attr_conf
-- ----------------------------
INSERT INTO `c_pawn_attr_conf` VALUES ('1', '1', '颜色', '唯一属性', '黄金色，黄色，古铜色', '1');
INSERT INTO `c_pawn_attr_conf` VALUES ('11', '3', '形状', '唯一属性', '正方形，圆形，柱体', '1');
INSERT INTO `c_pawn_attr_conf` VALUES ('12', '3', '材质', '唯一属性', '真皮，合成材料，布', '2');
INSERT INTO `c_pawn_attr_conf` VALUES ('13', '3', '工艺', '唯一属性', '人工，机械', '1');
INSERT INTO `c_pawn_attr_conf` VALUES ('14', '3', '颜色', '唯一属性', '古铜色，黄色，蓝色，白色', '1');
INSERT INTO `c_pawn_attr_conf` VALUES ('2', '1', '形状', '唯一属性', '圆形，椭圆形，月牙形', '22');
INSERT INTO `c_pawn_attr_conf` VALUES ('21', '21', '测试属性', '唯一属性', '测试，在册', '1');
INSERT INTO `c_pawn_attr_conf` VALUES ('3', '1', '尺寸', '唯一属性', '大，小，中', '3');
INSERT INTO `c_pawn_attr_conf` VALUES ('4', '2', '材质', '唯一属性', '金属，塑料，路合金', '1');
INSERT INTO `c_pawn_attr_conf` VALUES ('5', '2', '精准度', '唯一属性', '毫秒，秒', '2');
INSERT INTO `c_pawn_attr_conf` VALUES ('6', '4', '类型', '唯一属性', '超级跑车，普通汽车', '1');
INSERT INTO `c_pawn_attr_conf` VALUES ('7', '4', '颜色', '唯一属性', '红色，黑色，白色', '1');
INSERT INTO `c_pawn_attr_conf` VALUES ('8', '2', '适合人群', '唯一属性', '青年，老年，少年，女性', '1');

-- ----------------------------
-- Table structure for `c_pawn_attr_group`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_attr_group`;
CREATE TABLE `c_pawn_attr_group` (
  `GROUP_CODE` varchar(32) NOT NULL,
  `GROUP_NAME` varchar(64) DEFAULT NULL,
  `GROUP_STATE` varchar(32) DEFAULT '' COMMENT '使用数据字典中PC_VALID_N类型的代码',
  `SORT_NO` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`GROUP_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_attr_group
-- ----------------------------
INSERT INTO `c_pawn_attr_group` VALUES ('1', '首饰组', '启用', '1');
INSERT INTO `c_pawn_attr_group` VALUES ('2', '手表组', '启用', '2');
INSERT INTO `c_pawn_attr_group` VALUES ('21', '测试组', '启用', '1');
INSERT INTO `c_pawn_attr_group` VALUES ('3', '包组', '启用', '3');
INSERT INTO `c_pawn_attr_group` VALUES ('4', '车组', '启用', '1');

-- ----------------------------
-- Table structure for `c_pawn_attr_group_cat_rel`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_attr_group_cat_rel`;
CREATE TABLE `c_pawn_attr_group_cat_rel` (
  `GROUP_CODE` varchar(32) NOT NULL,
  `CAT_CODE` varchar(32) NOT NULL,
  PRIMARY KEY (`GROUP_CODE`,`CAT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_attr_group_cat_rel
-- ----------------------------
INSERT INTO `c_pawn_attr_group_cat_rel` VALUES ('1', '2');
INSERT INTO `c_pawn_attr_group_cat_rel` VALUES ('2', '3');
INSERT INTO `c_pawn_attr_group_cat_rel` VALUES ('21', '5');
INSERT INTO `c_pawn_attr_group_cat_rel` VALUES ('3', '1');
INSERT INTO `c_pawn_attr_group_cat_rel` VALUES ('4', '12');

-- ----------------------------
-- Table structure for `c_pawn_brand`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_brand`;
CREATE TABLE `c_pawn_brand` (
  `BRAND_CODE` varchar(32) NOT NULL,
  `BRAND_NAME` varchar(64) DEFAULT NULL,
  `F_LETTER` varchar(16) DEFAULT NULL,
  `BRAND_DESC` text DEFAULT NULL,
  `IS_SHOW` varchar(32) DEFAULT NULL COMMENT '取数据字典中的PC_IS_SHOW类别\r\n            1 显示\r\n            0 隐藏',
  `SORT_NO` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`BRAND_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_brand
-- ----------------------------
INSERT INTO `c_pawn_brand` VALUES ('1', '名牌包', 'GC', null, '是', '1');
INSERT INTO `c_pawn_brand` VALUES ('2', '名表', 'MB', null, '是', '2');
INSERT INTO `c_pawn_brand` VALUES ('3', '周六福', 'ZLF', null, '是', '4');
INSERT INTO `c_pawn_brand` VALUES ('4', '测试品牌', 'CC', null, '是', '1');
INSERT INTO `c_pawn_brand` VALUES ('5', '名车', 'MC', null, '是', '1');
INSERT INTO `c_pawn_brand` VALUES ('6', '普车', 'PC', null, '是', '1');

-- ----------------------------
-- Table structure for `c_pawn_brand_cat_rel`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_brand_cat_rel`;
CREATE TABLE `c_pawn_brand_cat_rel` (
  `BRAND_CODE` varchar(32) NOT NULL,
  `CAT_CODE` varchar(32) NOT NULL,
  PRIMARY KEY (`BRAND_CODE`,`CAT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_brand_cat_rel
-- ----------------------------
INSERT INTO `c_pawn_brand_cat_rel` VALUES ('1', '1');
INSERT INTO `c_pawn_brand_cat_rel` VALUES ('2', '3');
INSERT INTO `c_pawn_brand_cat_rel` VALUES ('3', '2');
INSERT INTO `c_pawn_brand_cat_rel` VALUES ('4', '5');
INSERT INTO `c_pawn_brand_cat_rel` VALUES ('5', '12');
INSERT INTO `c_pawn_brand_cat_rel` VALUES ('6', '12');

-- ----------------------------
-- Table structure for `c_pawn_product_cat`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_product_cat`;
CREATE TABLE `c_pawn_product_cat` (
  `CAT_CODE` varchar(32) NOT NULL,
  `CAT_NAME` varchar(64) DEFAULT NULL,
  `CAT_LVL` varchar(4) DEFAULT '',
  `CAT_ROUTE` varchar(256) DEFAULT NULL COMMENT '从最顶级直到当前级，每一级以逗号隔开，如：1,3,7',
  `UNIT` varchar(16) DEFAULT NULL,
  `CAT_DESC` text DEFAULT NULL,
  `EVAL_PIC_DEF` text DEFAULT NULL COMMENT '通过json保存：\r\n            [\r\n            {\r\n               picType:''正面'',\r\n               flat:1   (0表示可选,1必选)\r\n            },\r\n            {\r\n               picType:''背面'',\r\n               flat:1   (0表示可选,1必选)\r\n            }\r\n            ]',
  `IS_SHOW` varchar(32) DEFAULT NULL COMMENT '取数据字典中的PC_IS_SHOW类别\r\n            1 显示\r\n            0 隐藏',
  `SORT_NO` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`CAT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_product_cat
-- ----------------------------
INSERT INTO `c_pawn_product_cat` VALUES ('1', '箱包', '1', null, null, '装东西的', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"背面\",\"flat\":\"1\"},{\"picType\":\"顶部\",\"flat\":\"1\"}]', null, null);
INSERT INTO `c_pawn_product_cat` VALUES ('12', '汽车', '21', null, null, '车子', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"背面\",\"flat\":\"1\"}]', null, null);
INSERT INTO `c_pawn_product_cat` VALUES ('2', '珠宝', '2', null, null, '装饰', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"背面\",\"flat\":\"1\"}]', null, null);
INSERT INTO `c_pawn_product_cat` VALUES ('3', '表', '3', null, null, '看时间', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"背面\",\"flat\":\"1\"},{\"picType\":\"顶部\",\"flat\":\"1\"}]', null, null);
INSERT INTO `c_pawn_product_cat` VALUES ('5', '测试大类', '21', null, null, 'ad', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"背面\",\"flat\":\"1\"},{\"picType\":\"标签\",\"flat\":\"1\"}]', null, null);

-- ----------------------------
-- Table structure for `c_pawn_product_cat_copy`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_product_cat_copy`;
CREATE TABLE `c_pawn_product_cat_copy` (
  `CAT_CODE` varchar(32) NOT NULL,
  `CAT_NAME` varchar(64) DEFAULT NULL,
  `CAT_LVL` varchar(4) DEFAULT '',
  `CAT_ROUTE` varchar(256) DEFAULT NULL COMMENT '从最顶级直到当前级，每一级以逗号隔开，如：1,3,7',
  `UNIT` varchar(16) DEFAULT NULL,
  `CAT_DESC` text DEFAULT NULL,
  `EVAL_PIC_DEF` text DEFAULT NULL COMMENT '通过json保存：\r\n            [\r\n            {\r\n               picType:''正面'',\r\n               flat:1   (0表示可选,1必选)\r\n            },\r\n            {\r\n               picType:''背面'',\r\n               flat:1   (0表示可选,1必选)\r\n            }\r\n            ]',
  `IS_SHOW` varchar(32) DEFAULT NULL COMMENT '取数据字典中的PC_IS_SHOW类别\r\n            1 显示\r\n            0 隐藏',
  `SORT_NO` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`CAT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_product_cat_copy
-- ----------------------------
INSERT INTO `c_pawn_product_cat_copy` VALUES ('1', '箱包', '1', null, null, '箱子和包', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"背面\",\"flat\":\"1\"},{\"picType\":\"标签\",\"flat\":\"1\"},{\"picType\":\"萨达\",\"flat\":\"0\"}]', null, null);
INSERT INTO `c_pawn_product_cat_copy` VALUES ('2', '香烟', '15', null, null, '珠宝首饰爱仕达多', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"标签\",\"flat\":\"1\"}]', null, null);
INSERT INTO `c_pawn_product_cat_copy` VALUES ('3', '撒旦法', '3', null, null, '钟表仪器', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"背面\",\"flat\":\"1\"},{\"picType\":\"标签\",\"flat\":\"1\"},{\"picType\":\"无\",\"flat\":\"1\"}]', null, null);
INSERT INTO `c_pawn_product_cat_copy` VALUES ('4', '搜房网', '2', null, null, '萨达萨法', '[{\"picType\":\"无\",\"flat\":\"1\"}]', null, null);
INSERT INTO `c_pawn_product_cat_copy` VALUES ('5', '地方', '12', null, null, '阿萨德', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"背面\",\"flat\":\"1\"},{\"picType\":\"标签\",\"flat\":\"1\"}]', null, null);
INSERT INTO `c_pawn_product_cat_copy` VALUES ('6', '阿萨德大的', '13', null, null, '阿萨德', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"背面\",\"flat\":\"1\"},{\"picType\":\"无\",\"flat\":\"1\"},{\"picType\":\"\",\"flat\":\"1\"}]', null, null);
INSERT INTO `c_pawn_product_cat_copy` VALUES ('7', '表', '2', null, null, '阿萨德', '[{\"picType\":\"正面\",\"flat\":\"1\"},{\"picType\":\"背面\",\"flat\":\"1\"},{\"picType\":\"标签\",\"flat\":\"1\"},{\"picType\":\"萨达\",\"flat\":\"1\"},{\"picType\":\"正面\",\"flat\":\"1\"}]', null, null);

-- ----------------------------
-- Table structure for `c_pawn_product_small`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_product_small`;
CREATE TABLE `c_pawn_product_small` (
  `CAT_CODE` varchar(32) NOT NULL,
  `CAT_NAME` varchar(64) DEFAULT NULL,
  `P_CAT_NAME` varchar(32) DEFAULT '' COMMENT '最顶级为%root%',
  `CAT_LVL` varchar(4) DEFAULT '2',
  `CAT_ROUTE` varchar(256) DEFAULT NULL COMMENT '从最顶级直到当前级，每一级以逗号隔开，如：1,3,7',
  `UNIT` varchar(16) DEFAULT NULL,
  `CAT_DESC` text DEFAULT NULL,
  `EVAL_PIC_DEF` text DEFAULT NULL COMMENT '通过json保存：\r\n            [\r\n            {\r\n               picType:''正面'',\r\n               flat:1   (0表示可选,1必选)\r\n            },\r\n            {\r\n               picType:''背面'',\r\n               flat:1   (0表示可选,1必选)\r\n            }\r\n            ]',
  `IS_SHOW` varchar(32) DEFAULT '是' COMMENT '取数据字典中的PC_IS_SHOW类别\r\n            1 显示\r\n            0 隐藏',
  `SORT_NO` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`CAT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_product_small
-- ----------------------------
INSERT INTO `c_pawn_product_small` VALUES ('1', '潮流女包', '箱包', '2', null, '个', '\n            ', null, '是', '1');
INSERT INTO `c_pawn_product_small` VALUES ('11', '超跑', '汽车', '2', null, '辆', '\n            ', null, '是', '1');
INSERT INTO `c_pawn_product_small` VALUES ('2', '蓝水鬼', '表', '2', null, '个', '\n      算大      ', null, '是', '2');
INSERT INTO `c_pawn_product_small` VALUES ('3', '手势', '珠宝', '2', null, '个', '\n            带手上的', null, '是', '1');
INSERT INTO `c_pawn_product_small` VALUES ('4', '测试小类', '测试大类', '2', null, '测试', '\n            ', null, '是', '1');
INSERT INTO `c_pawn_product_small` VALUES ('5', '家用车', '汽车', '2', null, '辆', '\n            ', null, '是', '1');

-- ----------------------------
-- Table structure for `c_pawn_product_three`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_product_three`;
CREATE TABLE `c_pawn_product_three` (
  `CAT_CODE` varchar(32) NOT NULL,
  `CAT_NAME` varchar(64) DEFAULT NULL,
  `P_CAT_NAME` varchar(32) DEFAULT NULL COMMENT '最顶级为%root%',
  `CAT_LVL` varchar(4) DEFAULT '3',
  `CAT_ROUTE` varchar(256) DEFAULT NULL COMMENT '从最顶级直到当前级，每一级以逗号隔开，如：1,3,7',
  `UNIT` varchar(16) DEFAULT NULL,
  `CAT_DESC` text DEFAULT NULL,
  `EVAL_PIC_DEF` text DEFAULT NULL COMMENT '通过json保存：\r\n            [\r\n            {\r\n               picType:''正面'',\r\n               flat:1   (0表示可选,1必选)\r\n            },\r\n            {\r\n               picType:''背面'',\r\n               flat:1   (0表示可选,1必选)\r\n            }\r\n            ]',
  `IS_SHOW` varchar(32) DEFAULT NULL COMMENT '取数据字典中的PC_IS_SHOW类别\r\n            1 显示\r\n            0 隐藏',
  `SORT_NO` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`CAT_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_product_three
-- ----------------------------
INSERT INTO `c_pawn_product_three` VALUES ('1', 'asd', '包', '3', null, 'sd', '\n            sad ', null, '是', '2');
INSERT INTO `c_pawn_product_three` VALUES ('10', '兰博基里', '超跑', '3', null, '辆', '\n            ', null, '是', '1');
INSERT INTO `c_pawn_product_three` VALUES ('12', '法拉利', '超跑', '3', null, '辆', '\n            ', null, '是', '1');
INSERT INTO `c_pawn_product_three` VALUES ('121', '测试三级', '测试小类', '3', null, 'sad', '\n            ', null, '是', '');
INSERT INTO `c_pawn_product_three` VALUES ('14', '五菱', '家用车', '3', null, '辆', '\n            ', null, '是', '1');
INSERT INTO `c_pawn_product_three` VALUES ('2', 'LV', '潮流女包', '3', null, '个', 'ad\n            ', null, '是', '1');
INSERT INTO `c_pawn_product_three` VALUES ('3', '苦吃', '潮流女包', '3', null, '个', '\n            ', null, '是', '1');
INSERT INTO `c_pawn_product_three` VALUES ('4', '蓝表', '蓝水鬼', '3', null, '个', '\n            ', null, '是', '1');
INSERT INTO `c_pawn_product_three` VALUES ('5', '手镯', '手势', '3', null, '个', '\n            阿斯顿', null, '是', '1');
INSERT INTO `c_pawn_product_three` VALUES ('6', '阿斯顿', '蓝水鬼', '3', null, '个', '\n        的     ', null, '是', '1');
INSERT INTO `c_pawn_product_three` VALUES ('7', '戒指', '手势', '3', null, '个', '\n            ', null, '是', '2');

-- ----------------------------
-- Table structure for `c_pawn_shop`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_shop`;
CREATE TABLE `c_pawn_shop` (
  `shopCode` int(32) NOT NULL AUTO_INCREMENT,
  `shopName` varchar(64) DEFAULT NULL,
  `contact` varchar(32) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `shopState` varchar(32) DEFAULT '' COMMENT '使用数据字典中PC_VALID_N类型的代码',
  PRIMARY KEY (`shopCode`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_shop
-- ----------------------------
INSERT INTO `c_pawn_shop` VALUES ('1', 'asd', 'asd', '15698547854', 'asd', '启用');
INSERT INTO `c_pawn_shop` VALUES ('2', '阿萨德', '是否为', '15658954874', '萨达', '启用');
INSERT INTO `c_pawn_shop` VALUES ('3', '撒旦法', '萨达', '15698564257', '萨是否', '启用');
INSERT INTO `c_pawn_shop` VALUES ('4', '是否是', '阿萨德', '15698546521', '萨达', '启用');
INSERT INTO `c_pawn_shop` VALUES ('5', '萨达', '阿达', '15698546245', '阿萨德', '停用');
INSERT INTO `c_pawn_shop` VALUES ('6', '阿萨德', '阿萨德', '15698546245', '阿达', '启用');
INSERT INTO `c_pawn_shop` VALUES ('7', '萨达', '萨达', '15698546521', '萨达', '启用');

-- ----------------------------
-- Table structure for `c_pawn_shop_wh_rel`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_shop_wh_rel`;
CREATE TABLE `c_pawn_shop_wh_rel` (
  `shopCode` varchar(32) NOT NULL,
  `whCode` varchar(32) NOT NULL,
  PRIMARY KEY (`shopCode`,`whCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_shop_wh_rel
-- ----------------------------
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('1', '2');
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('1', '4');
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('2', '2');
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('2', '3');
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('3', '2');
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('4', '2');
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('4', '3');
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('5', '2');
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('6', '2');
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('6', '3');
INSERT INTO `c_pawn_shop_wh_rel` VALUES ('7', '4');

-- ----------------------------
-- Table structure for `c_pawn_warehouse`
-- ----------------------------
DROP TABLE IF EXISTS `c_pawn_warehouse`;
CREATE TABLE `c_pawn_warehouse` (
  `whCode` int(32) NOT NULL AUTO_INCREMENT,
  `whName` varchar(64) DEFAULT NULL,
  `contact` varchar(32) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `whState` varchar(32) DEFAULT '' COMMENT '使用数据字典中PC_VALID_N类型的代码',
  PRIMARY KEY (`whCode`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_pawn_warehouse
-- ----------------------------
INSERT INTO `c_pawn_warehouse` VALUES ('1', '5号仓库', '阿斯顿', '15698547541', '阿斯顿', '启用');
INSERT INTO `c_pawn_warehouse` VALUES ('2', '2号仓库', '萨法', '15698546354', '萨法', '启用');
INSERT INTO `c_pawn_warehouse` VALUES ('3', '3号仓库', '萨达第五位', '15985654874', '发的', '停用');
INSERT INTO `c_pawn_warehouse` VALUES ('4', '4号仓库', '阿萨德', '15698546354', '阿萨德', '启用');

-- ----------------------------
-- Table structure for `i_pawn_channel`
-- ----------------------------
DROP TABLE IF EXISTS `i_pawn_channel`;
CREATE TABLE `i_pawn_channel` (
  `CHANNEL_CODE` varchar(32) NOT NULL,
  `CHANNEL_NAME` varchar(32) DEFAULT NULL,
  `MOBILE` varchar(32) DEFAULT NULL,
  `ID_NO` varchar(32) DEFAULT NULL,
  `ACCOUNT_NAME` varchar(32) DEFAULT NULL,
  `BANK_NAME` varchar(32) DEFAULT NULL,
  `ACCOUNT` varchar(32) DEFAULT NULL,
  `MEMBER_COUNT` int(11) DEFAULT NULL,
  `TOTAL_CHARGE` varchar(10) DEFAULT '',
  `CONSUME` varchar(10) DEFAULT '',
  `CHANNEL_STATE` varchar(11) DEFAULT '' COMMENT '使用数据字典中PC_VALID_N类型的代码',
  `CREATE_BY` varchar(32) DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `MODIFY_BY` varchar(32) DEFAULT NULL,
  `MODIFY_TIME` datetime DEFAULT NULL,
  PRIMARY KEY (`CHANNEL_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of i_pawn_channel
-- ----------------------------
INSERT INTO `i_pawn_channel` VALUES ('1', 'sad', '15965854632', '13', '萨达', '炸弹', '大', '1200', '1200', '1500', '启用', null, null, null, null);
INSERT INTO `i_pawn_channel` VALUES ('2', 'asd', '15698562451', '12', '12', 'sad', 'asd', '12', '12', '12', '停用', null, null, null, null);
INSERT INTO `i_pawn_channel` VALUES ('3', 'asd', '15698546325', '12', '12', 'asd', 'asd', '1231', '1231', '21', '启用', null, null, null, null);

-- ----------------------------
-- Table structure for `i_pawn_goods`
-- ----------------------------
DROP TABLE IF EXISTS `i_pawn_goods`;
CREATE TABLE `i_pawn_goods` (
  `GOODS_ID` varchar(11) NOT NULL,
  `SOURCE_GOODS_ID` varchar(11) DEFAULT '',
  `PROC_INST_ID` varchar(64) DEFAULT NULL,
  `BRAND_CODE` varchar(32) DEFAULT NULL,
  `CAT_CODE` varchar(32) DEFAULT NULL,
  `SUB_CAT_CODE` varchar(32) DEFAULT NULL,
  `DETAIL_CAT_CODE` varchar(32) DEFAULT NULL,
  `GOODS_NAME` varchar(32) DEFAULT NULL,
  `SHOP_CODE` varchar(32) DEFAULT NULL,
  `WH_CODE` varchar(32) DEFAULT NULL,
  `ARTICLE_NUMBER` varchar(64) DEFAULT NULL,
  `FIRST_PRICE` decimal(10,2) DEFAULT NULL,
  `OFFICIAL_PRICE` decimal(10,2) DEFAULT NULL,
  `VALUATION_PRICE` decimal(10,2) DEFAULT NULL,
  `PAWN_PRICE` decimal(10,2) DEFAULT NULL,
  `PURCHASE_PRICE` decimal(10,2) DEFAULT NULL,
  `SELLING_PRICE` decimal(10,2) DEFAULT NULL,
  `RENT_PRICE` decimal(10,2) DEFAULT NULL,
  `BOTTOM_PRICE` decimal(10,2) DEFAULT NULL,
  `GOODS_DESC` text DEFAULT NULL,
  `INPUT_USER` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `INPUT_DATE` datetime DEFAULT NULL,
  `SURVEYOR` varchar(32) DEFAULT NULL,
  `SURVEY_TIME` datetime DEFAULT NULL,
  `ASSESSOR` varchar(32) DEFAULT NULL,
  `ASSESS_TIME` datetime DEFAULT NULL,
  `IS_RENTABLE` varchar(1) DEFAULT NULL COMMENT '0：不可出租\r\n            1：可以出租',
  `IS_SALABLE` varchar(1) DEFAULT NULL COMMENT '0：不可出售\r\n            1：可以出售',
  `SOURCE_TYPE` varchar(32) DEFAULT NULL COMMENT '值来自数据字典编码：PC_GOODS_SOURCE_TYPE',
  `IS_IN_PROC` varchar(1) DEFAULT NULL COMMENT '0：非流程中\r\n            1：流程中',
  `STOCK_STATE` varchar(16) DEFAULT '' COMMENT '值来自数据字典编码：PC_STOCK_STAT',
  `GOODS_STATE` varchar(16) DEFAULT '' COMMENT '值来自数据字典编码：PC_GOODS_STAT',
  `CREATE_BY` varchar(32) DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `MODIFY_BY` varchar(32) DEFAULT NULL,
  `MODIFY_TIME` datetime DEFAULT NULL,
  `GOODS_DEF` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`GOODS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of i_pawn_goods
-- ----------------------------
INSERT INTO `i_pawn_goods` VALUES ('1', '', null, '3', '2', '3', '7', '修改', '4', null, '22', '22222.00', null, null, null, null, null, null, null, '修改', '谢亮', '2020-05-14 00:00:00', null, null, null, null, null, null, null, null, '', '已评估', null, null, null, null, '[{\"direction\":\"正面\",\"lj\":\"bcaa12601e67c0470e67c831517a5968.jpg\"},{\"direction\":\"背面\",\"lj\":\"1.jpg\"}]');
INSERT INTO `i_pawn_goods` VALUES ('2', '', null, '3', '2', '3', '7', '尽快尽快', '5', null, '12', '32323.00', null, null, null, null, null, null, null, '大神奥术大师大多', 'sad挨打大所多', '2020-05-13 00:00:00', null, null, null, null, null, null, null, null, '', '已评估', null, null, null, null, '[{\"direction\":\"正面\",\"lj\":\"bdaaa7b5edfad2c566ad68994a7b88fc.jpg\"},{\"direction\":\"背面\",\"lj\":\"cd570a787be26a7f3c229f07af38838f.jpg\"}]');
INSERT INTO `i_pawn_goods` VALUES ('3', '', null, '2', '3', '2', '6', 'ad', '4', null, '12', '12.00', null, null, null, null, null, null, null, 'asd', 'asd', '2020-05-20 00:00:00', null, null, null, null, null, null, null, null, '', '待鉴定', null, null, null, null, '[{\"direction\":\"正面\",\"lj\":\"1.jpg\"},{\"direction\":\"背面\",\"lj\":\"2.jpg\"},{\"direction\":\"顶部\",\"lj\":\"cd570a787be26a7f3c229f07af38838f.jpg\"}]');
INSERT INTO `i_pawn_goods` VALUES ('4', '', null, '1', '1', '1', '3', '迁安市多', '3', null, '12', '12.00', null, null, null, null, null, null, null, 'ad', '气温', '2020-05-12 00:00:00', null, null, null, null, null, null, null, null, '', '待鉴定', null, null, null, null, '[{\"direction\":\"正面\",\"lj\":\"bdaaa7b5edfad2c566ad68994a7b88fc.jpg\"},{\"direction\":\"背面\",\"lj\":\"bcaa12601e67c0470e67c831517a5968.jpg\"},{\"direction\":\"顶部\",\"lj\":\"cd570a787be26a7f3c229f07af38838f.jpg\"}]');
INSERT INTO `i_pawn_goods` VALUES ('5', '', null, '4', '5', '4', '121', 'ads', '7', null, '21', '22222.00', null, null, null, null, null, null, null, 'asd', 'ads', '2020-05-13 00:00:00', null, null, null, null, null, null, null, null, '', '待鉴定', null, null, null, null, '[{\"direction\":\"正面\",\"lj\":\"空\"},{\"direction\":\"背面\",\"lj\":\"bdaaa7b5edfad2c566ad68994a7b88fc.jpg\"},{\"direction\":\"标签\",\"lj\":\"cd570a787be26a7f3c229f07af38838f.jpg\"}]');

-- ----------------------------
-- Table structure for `i_pawn_goods_appraise_log`
-- ----------------------------
DROP TABLE IF EXISTS `i_pawn_goods_appraise_log`;
CREATE TABLE `i_pawn_goods_appraise_log` (
  `APPRAISE_ID` int(11) NOT NULL,
  `GOODS_ID` int(11) DEFAULT NULL,
  `PROC_INST_ID` varchar(64) DEFAULT NULL,
  `OFFICIAL_PRICE` decimal(10,2) DEFAULT NULL,
  `VALUATION_PRICE` decimal(10,2) DEFAULT NULL,
  `PAWN_PRICE` decimal(10,2) DEFAULT NULL,
  `RCHASE_PRICE` decimal(10,2) DEFAULT NULL,
  `SELLING_PRICE` decimal(10,2) DEFAULT NULL,
  `RENTAL_PRICE` decimal(10,2) DEFAULT NULL,
  `APPRAISE_DESC` text DEFAULT NULL,
  `CREATE_BY` varchar(32) DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `MODIFY_BY` varchar(32) DEFAULT NULL,
  `MODIFY_TIME` datetime DEFAULT NULL,
  PRIMARY KEY (`APPRAISE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of i_pawn_goods_appraise_log
-- ----------------------------
INSERT INTO `i_pawn_goods_appraise_log` VALUES ('1', '2', null, '12.00', '12.00', '12.00', null, '12.00', '12.00', '水电\n            ', '阿斯顿', '2020-05-11 00:00:00', null, null);
INSERT INTO `i_pawn_goods_appraise_log` VALUES ('2', '1', null, '21.00', '12.00', '12.00', null, '12.00', '12.00', '阿斯顿 \n            ', '阿斯顿发', '2020-05-20 00:00:00', null, null);

-- ----------------------------
-- Table structure for `i_pawn_goods_attr_rel`
-- ----------------------------
DROP TABLE IF EXISTS `i_pawn_goods_attr_rel`;
CREATE TABLE `i_pawn_goods_attr_rel` (
  `ATTR_CODE` varchar(32) NOT NULL,
  `GOODS_ID` int(11) NOT NULL,
  `ATTR_VALUE` text DEFAULT NULL,
  PRIMARY KEY (`ATTR_CODE`,`GOODS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of i_pawn_goods_attr_rel
-- ----------------------------
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('1', '1', '黄金色');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('1', '2', '黄金色');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('1', '4', '黄金色');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('1', '15', '黄金色');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('1', '121', '黄金色');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('1', '121212', '古铜色');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('11', '4', '正方形');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('12', '4', '真皮');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('13', '4', '人工');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('14', '4', '古铜色');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('2', '1', '月牙形');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('2', '2', '圆形');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('2', '4', '圆形');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('2', '15', '圆形');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('2', '121', '圆形');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('2', '121212', '椭圆形');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('21', '3', '在册');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('21', '5', '测试');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('3', '1', '大');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('3', '2', '大');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('3', '4', '大');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('3', '15', '大');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('3', '121', '大');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('3', '121212', '小');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('4', '3', '塑料');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('4', '1221', '金属');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('5', '3', '秒');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('5', '1221', '毫秒');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('6', '6', '超级跑车');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('7', '6', '红色');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('8', '3', '老年');
INSERT INTO `i_pawn_goods_attr_rel` VALUES ('8', '1221', '青年');

-- ----------------------------
-- Table structure for `i_pawn_goods_identify_log`
-- ----------------------------
DROP TABLE IF EXISTS `i_pawn_goods_identify_log`;
CREATE TABLE `i_pawn_goods_identify_log` (
  `IDENTIFY_ID` int(11) NOT NULL,
  `GOODS_ID` int(11) DEFAULT NULL,
  `PROC_INST_ID` varchar(64) DEFAULT NULL,
  `GOODS_QUALITY` varchar(2) DEFAULT NULL,
  `IDENTIFY_DESC` text DEFAULT NULL,
  `IDENTIFY_RESULT` varchar(2) DEFAULT NULL,
  `CREATE_BY` varchar(32) DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `MODIFY_BY` varchar(32) DEFAULT NULL,
  `MODIFY_TIME` datetime DEFAULT NULL,
  `identify_state` varchar(255) DEFAULT '已鉴定',
  PRIMARY KEY (`IDENTIFY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of i_pawn_goods_identify_log
-- ----------------------------
INSERT INTO `i_pawn_goods_identify_log` VALUES ('1', '1', null, '七成', '阿斯顿\n            ', '正品', '张三', '2020-05-20 00:00:00', null, null, '已鉴定');
INSERT INTO `i_pawn_goods_identify_log` VALUES ('2', '2', null, '九成', '阿斯顿\n            ', '正品', '李四', '2020-05-06 00:00:00', null, null, '已鉴定');
INSERT INTO `i_pawn_goods_identify_log` VALUES ('4', '3', null, '七成', 'sad\n            ', '正品', '阿斯顿', '2020-05-13 00:00:00', null, null, '已鉴定');

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `pid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '菜单设置', 'layui-icon layui-icon-set', null, '0');
INSERT INTO `menu` VALUES ('1-1', '菜单编辑', 'fa   fa-list-alt', 'menuEditor.html', '1');
INSERT INTO `menu` VALUES ('1-2', '菜单授权', 'fa fa-file-code-o', 'Authorize.html', '1');
INSERT INTO `menu` VALUES ('2', '用户管理', 'layui-icon layui-icon-user', null, '0');
INSERT INTO `menu` VALUES ('2-1', '操作用户', 'fa  fa-pencil-square', 'user.html', '2');
INSERT INTO `menu` VALUES ('2-2', '角色管理', 'fa fa-address-card-o', 'role.html', '2');
INSERT INTO `menu` VALUES ('21-2', '阿萨德', '大师', '的', '21');
INSERT INTO `menu` VALUES ('3', '门店配置', 'fa fa-university', null, '0');
INSERT INTO `menu` VALUES ('3-1', '门店资料', 'fa fa-file-code-o', 'stores.html', '3');
INSERT INTO `menu` VALUES ('4', '仓库配置', 'fa fa-suitcase', null, '0');
INSERT INTO `menu` VALUES ('4-1', '仓库资料', 'fa fa-file-image-o', 'house.html', '4');
INSERT INTO `menu` VALUES ('45-1', '萨达', 'd', 'sd', '45');
INSERT INTO `menu` VALUES ('5', '商品配置', 'fa fa-shopping-bag', null, '0');
INSERT INTO `menu` VALUES ('5-1', '商品大类', 'fa fa-tags', '../../shop/view/ProductCategories.html', '5');
INSERT INTO `menu` VALUES ('5-2', '商品小类', 'fa fa-tags', '../../shop/view/ProductSubcategories.html', '5');
INSERT INTO `menu` VALUES ('5-3', '商品属性', 'fa fa-tags', '../../shop/view/ProductAttributes.html', '5');
INSERT INTO `menu` VALUES ('5-4', '品牌管理', 'fa fa-tags', '../../shop/view/BrandManagement.html', '5');
INSERT INTO `menu` VALUES ('5-6-1', '阿萨德', '的', '萨达', '5-6');
INSERT INTO `menu` VALUES ('5-6-3-1', '阿萨德', '萨达', '阿达', '5-6-3');
INSERT INTO `menu` VALUES ('5-6-3-2', '萨达', ' 萨达', '的', '5-6-3');
INSERT INTO `menu` VALUES ('54-12', '硕大的', '的', '萨达', '54');
INSERT INTO `menu` VALUES ('6', '渠道商管理', 'fa fa-object-group', '', '0');
INSERT INTO `menu` VALUES ('6-1', '渠道商', 'fa fa-paw', '../../shop/view/channel.html', '6');
INSERT INTO `menu` VALUES ('7', '评估鉴定', 'fa fa-check-square', null, '0');
INSERT INTO `menu` VALUES ('7-1', '商品列表', 'fa fa-flag', '../../appraisal/view/shopList.html', '7');

-- ----------------------------
-- Table structure for `menu_role`
-- ----------------------------
DROP TABLE IF EXISTS `menu_role`;
CREATE TABLE `menu_role` (
  `id` varchar(32) DEFAULT NULL,
  `rolename` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu_role
-- ----------------------------
INSERT INTO `menu_role` VALUES ('1', '管理人员');
INSERT INTO `menu_role` VALUES ('1-1', '管理人员');
INSERT INTO `menu_role` VALUES ('1-2', '管理人员');
INSERT INTO `menu_role` VALUES ('2', '管理人员');
INSERT INTO `menu_role` VALUES ('2-1', '管理人员');
INSERT INTO `menu_role` VALUES ('2-2', '管理人员');
INSERT INTO `menu_role` VALUES ('3', '管理人员');
INSERT INTO `menu_role` VALUES ('3-1', '管理人员');
INSERT INTO `menu_role` VALUES ('4', '管理人员');
INSERT INTO `menu_role` VALUES ('4-1', '管理人员');
INSERT INTO `menu_role` VALUES ('5', '管理人员');
INSERT INTO `menu_role` VALUES ('5-1', '管理人员');
INSERT INTO `menu_role` VALUES ('5-2', '管理人员');
INSERT INTO `menu_role` VALUES ('5-3', '管理人员');
INSERT INTO `menu_role` VALUES ('5-4', '管理人员');
INSERT INTO `menu_role` VALUES ('6', '管理人员');
INSERT INTO `menu_role` VALUES ('6-1', '管理人员');
INSERT INTO `menu_role` VALUES ('7', '管理人员');
INSERT INTO `menu_role` VALUES ('7-1', '管理人员');

-- ----------------------------
-- Table structure for `sys_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `roleid` varchar(35) NOT NULL,
  `rolename` varchar(35) DEFAULT NULL,
  `desc` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('admin', '管理人员', '所有操作可见');
INSERT INTO `sys_role` VALUES ('role-kaifa', '开发人员', '进行后台开发');
INSERT INTO `sys_role` VALUES ('role_test', '测试人员', '测试操作');
INSERT INTO `sys_role` VALUES ('sd', 'sd', 'sd');
INSERT INTO `sys_role` VALUES ('test', '李四的权限', '李四的权限');
INSERT INTO `sys_role` VALUES ('xl', '测试角色', '阿萨德');
INSERT INTO `sys_role` VALUES ('王五的权限', '王五的角色', '撒大声地');

-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '',
  `password` varchar(320) NOT NULL DEFAULT '',
  `phone` varchar(32) DEFAULT NULL,
  `yzm` varchar(32) DEFAULT '',
  `sex` varchar(32) DEFAULT NULL,
  `openId` varchar(32) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', '$2a$10$GSRdzBryijReZyisMMySXO2r1iFcRB.xaBVwy5R6bhsM8mzfhLqoS', '17623849751', '', '男', null);
INSERT INTO `sys_user` VALUES ('3', '张三', '$2a$10$GSRdzBryijReZyisMMySXO2r1iFcRB.xaBVwy5R6bhsM8mzfhLqoS', '123', '', '男', '97833F42183A7411C168E844360ED5CF');
INSERT INTO `sys_user` VALUES ('6', '我的3sd', '$2a$10$5yUuneOaHlqw5yX03IuO3.PYH9xFOxK5QN0I7x2qTCrkBQhitd/7K', '17623849512', '', '女', null);
INSERT INTO `sys_user` VALUES ('9', 'asds', '$2a$10$voc.rwf8Wh2xyGCXDEsHuuO9emmlyKXU3LN.gxUptS7.in7FtGZki', '12345678998', '', '女', null);
INSERT INTO `sys_user` VALUES ('11', '硕大的s ', '$2a$10$NpaTOtfhZoeJkpIX9TaiNOMc229wwgLskUnxwHxYcu1ypWnvThhL2', '17569854125', '', '男', null);
INSERT INTO `sys_user` VALUES ('12', '456啥对对对', '$2a$10$q1UB7S1UjB/W25bnj29ige.f3kUkXQZu6dGaAhOFq5ceLT8sDmlki', '17625489651', '', '女', null);
INSERT INTO `sys_user` VALUES ('14', 'hsajdh', '$2a$10$fHId0ArM5D2O5uGOeaKy7eY1KMtl9R1lakDZzYNsp7mLHvtuovlaG', '12369854127', '', '女', null);
INSERT INTO `sys_user` VALUES ('16', 'admin121', '$2a$10$GNsvAQ9IzfxEPJZYgi7Kneiy/D8kEXA0Hpgsua0KvKILWR59l9oma', '17623849512', '', '女', null);
INSERT INTO `sys_user` VALUES ('22', 'admin11', '$2a$10$TK0RTnL6Tep2w2IiT0w/iOlmm2sicpwvkbIWhonD1iqPiv/zveT76', '12569854125', '', '男', null);
INSERT INTO `sys_user` VALUES ('23', 'admin111112', '$2a$10$AXfjNSYBL58STSJoUcM2luqCy.a3pgQPqbb.BnGXFrlZQvK.llc/a', '15698541235', '', '女', null);
INSERT INTO `sys_user` VALUES ('24', '谢亮', '$2a$10$zu0xbEb.pPh/SDJNxAKA9errQnLoIkUOub8mgU0ZfNdEGk4cLlORi', '13228521430', '', '男', '9BD525739959DC32A8191283DCC240C1');
INSERT INTO `sys_user` VALUES ('25', 'aa', '456', '13369598745', '', '男', null);
INSERT INTO `sys_user` VALUES ('26', 'aaa22', '$2a$10$dW93NFWe1hqXlRezL4oYbuWivFCssKcwdq1aBWjp7mZzYD0is7a9e', '15698956485', '', '男', null);
INSERT INTO `sys_user` VALUES ('27', 's', '$2a$10$IO3XIfcfQK2qtKjBXeH76Ow9bFP2Ldn3OpOyHHURbzKL.AeTve22m', '12659845156', '', '男', null);
INSERT INTO `sys_user` VALUES ('28', 'sad', '$2a$10$61ZOrtis63JYsIvax7Lk7uMJhJ/knwxf78.CxFA3Meq4ln2sd6NB2', '15656985641', '', '男', null);
INSERT INTO `sys_user` VALUES ('29', 'asds', '$2a$10$vHwXoZOiAPsakSguOSe9p.hkxbIGeMcxxJkaIyQNZXz8nZWAZ2.vi', '15698541257', '', '男', null);
INSERT INTO `sys_user` VALUES ('60', '撒发传单萨达硕大的', '$2a$10$at1MSQNVbTwq6ZderYGfkuMVl89ziAcxgpBm70LUNJs2ymo4BPxZa', '15698542569', '', '女', null);
INSERT INTO `sys_user` VALUES ('66', 'sad萨达', '$2a$10$VWCqwxXyuCkfbM8U5VZY0.TR8Bui4Ivph1pU6cHRpJEXrlSG4vscW', '15639856421', '', '男', null);
INSERT INTO `sys_user` VALUES ('75', 'asdsf', '$2a$10$EZa52wlU7xLdajV09D1OJe/6Zzgmv37O5VMb0khVA6KP6c8VJ/v8K', '15698546325', '', '男', null);
INSERT INTO `sys_user` VALUES ('76', 'sadsafasd', '$2a$10$.KdK4AYGx7a5wv5L2lZ3Luof7wSj.xHmDyrF/pM4ZY95Yqg9zLFqy', '15698546325', '', '女', null);
INSERT INTO `sys_user` VALUES ('77', 'xl测试', '$2a$10$wuvWFl9z/kPyCj8mYQa/sefl3WtI2TLy12C4fcVSoVVKqeXmXyZVi', '15645985465', '', '男', null);
INSERT INTO `sys_user` VALUES ('78', '王五', '$2a$10$gl2smeqoY0BdqQvPMqYPr.XHMx6BGJfAuuyMEezVBCu8HhoWfk1vy', '15698546254', '', '男', null);
INSERT INTO `sys_user` VALUES ('79', '欧阳森', '$2a$10$wa7kBaPmXBL9MABYpIRTQO90IDvZpHXsX/ZHiBKufYHNMsD21dXuW', '15986542135', '', '男', null);
INSERT INTO `sys_user` VALUES ('80', 'asdad', '$2a$10$yTCpxx21ozRATXjrs7cqPeHD8R4n0jClG8gen9Q.gSE2CTiIs8dde', '15698546325', '', '男', null);
INSERT INTO `sys_user` VALUES ('81', '张三', '123', '123', '', '男', '');
INSERT INTO `sys_user` VALUES ('82', '张三', '123', '123', '', '男', '');
INSERT INTO `sys_user` VALUES ('83', '张三', '123', '123', '', '男', '');

-- ----------------------------
-- Table structure for `sys_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleid` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('19', 'role-kaifa', '谢亮');
INSERT INTO `sys_user_role` VALUES ('20', 'admin', 'admin');
INSERT INTO `sys_user_role` VALUES ('21', 'test', '李四');
INSERT INTO `sys_user_role` VALUES ('35', 'role_test', '李四');
INSERT INTO `sys_user_role` VALUES ('36', 'xl', 'xl测试');
INSERT INTO `sys_user_role` VALUES ('37', '王五的权限', '王五');
INSERT INTO `sys_user_role` VALUES ('39', 'admin', '谢亮');
INSERT INTO `sys_user_role` VALUES ('40', 'xl', '我的3sd');
INSERT INTO `sys_user_role` VALUES ('41', 'xl', 'asds');
INSERT INTO `sys_user_role` VALUES ('42', '张三', 'sd');
INSERT INTO `sys_user_role` VALUES ('43', '张三', 'sd');
INSERT INTO `sys_user_role` VALUES ('44', '张三', 'sd');
