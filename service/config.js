let pathPrefix = "/api/"
// /api/
const mock = "http://114.215.83.61:3100/mock/64/hab-app/"
//http://114.215.83.61:3100/mock/64/hab-app/
let ip = "/api/"
//汪琪电脑ip http://192.168.3.11:8900
//http://hab.hangliu.com.cn/hab-app/
//#ifdef APP-PLUS
// ip = "http://savvyray.oicp.net/"
// ip = "http://z340423c48.imdo.co/"
//测试地址
ip = "http://hab.hangliu.com.cn/hab-app/"
//生产地址
// ip = "https://api.clicksync.cn/hab-app/"

//#endif
const config = {
	mock:mock,
	// faceUser:"face-user/cargo-owner",
	//reg-login
	login_url: ip + "reg-login",//用户注册/登录
	reg_url: ip + "face-user/registered",//用户注册
	check_url: ip + "face-user/check",//注册校验手机号
	code_url: ip + "authentication/verification-code",//获取验证码
	
	// biopsy_url: mock + "authentication/biopsy",//用户活体检测
	// faceAuthen_url: mock + "faceUser/faceAuthentication",//
	// authen_url: "authentication",//人证比对
	// business_url: mock + "authentication/business-license",//企业检测
	
	basicData_url: ip + "basic-data/region-tree",//区域树
	basicDataTwo_url: ip + "basic-data/region",//省市区
	carModel_url: ip + "basic-data/car-model",//车型列表
	carConductor_url: ip + "basic-data/car-conductor",//车长列表
	deliverGoods_url: ip + "cooked-car/cargo-cooked-car",//熟车列表
	freightCargo_url: ip + "distribution-hall/cargo-owner-freight-cargo",//货源列表
	freightCargoInfo_url: ip + "distribution-hall/freight-cargo",//货源详情
	orderList_url: ip + "order-management/freight-cargo",//订单列表
	ship_url: ip + "order-management/freight-shipping-order",
	rate_url: ip + "order-management",//评价提交
	rateType_url: ip + "basic-data/order-evaluation-type",//评价列表查询
	
	// refundFlow_url: mock + "freight-shipping-order",//退款
	
	
	dirverInfo_url: ip + "order-management/face-driver",//司机简介
	cargoAdd_url: ip + "distribution-hall/freight-cargo-add",//货源新增
	deleteUsername_url: ip + "face-user/delete-username",//用户注销
	bdGoodsType_url: ip + "basic-data/bd-goods-type",//货源类型列表
	packagingType_url: ip + "basic-data/bd-packaging-type",//包装方式列表
	deleteCargo_url: ip + "distribution-hall/delete-cargo",//
	serviceCargo_url: ip + "basic-data/bd-cargo-service",//
	supplyList_url: ip + "common-supply/list",//常发货源列表
	deleteById_url: ip + "common-supply/deleteById",//常用货源删除
	cargoEdit_url: ip + "distribution-hall/freight-cargo-edit",//货源修改
	setUp_url: ip + "common-supply/set-up",//常用货源增加
	resendList_url: ip + "distribution-hall/resend-list",//快速重发货源列表
	phoneYan_url: ip + "personal-center/phone",//用户中心手机号修改
	ownerInfo_url: ip + "face-user/info",//我的信息-货主
	passwd_url: ip + "personal-center/passwd",//修改密码
	userPhone_url: ip + "personal-center/freight-contact-phone",//聯係人操作
	userImg_url: ip + "personal-center/head-portrait",//头像修改
	driverInfo_url: ip + "cooked-car/driver-info",//根据手机号查询司机信息
	zhiCar_url: ip + "cooked-car/addInfo",//添加熟车
	driverDelete_url: ip + "cooked-car/deleteById",//删除熟车
	cargoOwner_url: ip + "order-management/introduction",//货主/司机-简介
	driverOwner_url: ip + "order-management/face-driver",//司机-简介
	pinList_url: ip + "order-management/evaluation-list",//查看评价列表
	driverPinList_url: ip + "order-management/face-driver/freight-order-evaluation/list",//司机-简介评论列表
	driverPin_url: ip + "order-management/face-driver/freight-order-evaluation",//司机-简介评论信息
	message_url: ip + "message/freight-message-notification",//消息列表
	user_url: ip + "personal-center/freight-wallet-account",//钱包详情
	walletTransaction_url: ip + "personal-center/freight-wallet-transaction",//
	gpsPush_url: ip + "order-management/gps-push",//gps数据推送
	shippingOrder_url: ip + "order-management",//gps查看轨迹
	oss_url: ip + "authentication/upload-oss",//oss图片上传
	recharge_url: ip + "account/recharge",//充值
	licenseFace_url: ip + "authentication/business-license-face",//人脸认证（活体照片与身份证头像面比对）
	getTime_url: ip + "face-user/getTime",//获取服务器时间
	approve_url: ip + "authentication/approve",//获取服务器时间
	canceReasons_url: ip + "basic-data/cance-reasons",//取消原因
	transferAccounts_url: ip + "face-user/transfer-accounts",//支付宝提现
	version_url: ip + "personal-center/version",//版本升级
	telList_url: ip + "contact-phone/list",//司机打电话
	region_url: ip + "basic-data/region", //区域列表
	refresh_url: ip + "token/refresh", //刷新token
	hallHistory_url: ip + "distribution-hall/history", //装货地个人历史列表
	withdrawal_url: ip + "face-user/withdrawal", //提现手机号码验证
	minShipping_url: ip + "distribution-hall/min-shipping", //获取最小运费
}
module.exports = config







  // uni.request({
  //   url: 'http://192.168.0.134:8900/appUser/getUserInfoByUserName',
  //   method: "post",
  //   header: {
  //    'Content-Type': 'application/x-www-form-urlencoded', // 默认值
  //    'Authorization':'Bearer '+res.data.access_token
  //   },
  //   success(res) {
  //       console.log(res)
  //   },
  //   fail(error) {
  //       //失败结果
  //       console.log(error)
  //   }
  // })
  // ajax.get(config.getTime_url,{
  //   userId: userid,
  // }).then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   //ajax.js反馈的reject结果
  //   console.log(err)
  // })

  //wx.showToast({ title: "账号或密码必填", image:"/static/erreo.png",icon: "success",duration: 2000 });
  //杭州谷禾技术有限公司 40
