<!-- <template>
	<view>
		<button @click="woqu">
			我去
		</button>
	</view>
</template> -->
<script>
	import Vue from 'vue'
	import ajax from './service/ajax.js'
	import config from './service/config.js'
	import state from './store/index.js'
	
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			plus.push.addEventListener("click", function(msg) {
				//这里可以写跳转业务代码  
				setTimeout(function() {
					if (msg.payload.indexOf("#") != -1) {
						let payload = msg.payload.split("#")

						//跳消息详情
						if (payload[0] == "1") {
							//订单 跳订单详情
							uni.navigateTo({
								url: "/pages/order/orderInfo/orderInfo?orderId=" + payload[1]
							})
						} else {
							uni.navigateTo({
								url: '/pages/user/news/news'
							})
						}

					} else {
						//跳消息列表
						uni.navigateTo({
							url: '/pages/user/news/news'
						})
					}
				}, 1000)
			}, false);

			//免登陆
			uni.getStorage({
				key: 'accessToken',
				success: (reg) => {
					if (reg.data != '') {
						//调用货主信息查询接口测试token是否可以使用
						let data = {
							type:1
						}
						//#ifdef APP-PLUS
						let pinf = plus.push.getClientInfo()
						let cid = pinf.clientid;
						data.cid = cid
						//#endif
						uni.request({
							url: config.ownerInfo_url,
							method: "get",
							data:data,
							header: {
								'Content-Type': 'application/x-www-form-urlencoded', // 默认值
								'Authorization': 'Bearer ' + reg.data
							},
							success: (res) => {
								if (res.data.code == 0) {
									console.log(this.$store.state.access_token)
									//往vuex里面塞token
									this.$store.commit("getAccessToken", reg.data)
									//去配货大厅
									uni.redirectTo({
										url: "/pages/goods/sendGoods/sendGoods"
									})
								}else if (res.data.code == -7019) {
									this.$store.commit("getAccessToken", "")
									this.$store.commit("getRefreshToken", "")
									//往手机缓存里面塞token
									uni.removeStorage({
										key:'accessToken'
									})
									uni.removeStorage({
										key:'refreshToken'
									})
									uni.showToast({
										title:"该手机号未注册,正在返回登录页",
										duration:2000,
										icon:"none"
									})
									setTimeout(function(){
										uni.redirectTo({
											url: "/pages/login/login"
										})
									},2000)
								}else if (res.data.code == -7110) {
									this.$store.commit("getAccessToken", "")
									this.$store.commit("getRefreshToken", "")
									//往手机缓存里面塞token
									uni.removeStorage({
										key:'accessToken'
									})
									uni.removeStorage({
										key:'refreshToken'
									})
									uni.showToast({
										title:"该货主不存在,正在返回登录页",
										duration:2000,
										icon:"none"
									})
									setTimeout(function(){
										uni.redirectTo({
											url: "/pages/login/login"
										})
									},2000)
								}
							},
							complete: (code) => {
								if (code.statusCode == 401) {
									// token过期.用refreshToken刷新accesstoken
									uni.getStorage({
										key: 'refreshToken',
										success: reg => {
											// refreshToken:reg.data
											ajax.post(config.refresh_url, {
												refreshToken: reg.data
											}).then(res => {
												console.log(res)
												if (res.code == 0) {
													//往vuex里面塞token
													this.$store.commit("getAccessToken", res.data.access_token)
													this.$store.commit("getRefreshToken", res.data.refresh_token)
													//往手机缓存里面塞token
													uni.setStorage({
														key: 'accessToken',
														data: res.data.access_token
													})
													uni.setStorage({
														key: 'refreshToken',
														data: res.data.refresh_token,
													})
													//去配货大厅
													uni.redirectTo({
														url: "/pages/goods/sendGoods/sendGoods"
													})
												}
											}).catch(err => {
												//ajax.js反馈的reject结果
												console.log(err)
											})
											
										},
									})
								}
							},
							fail(error) {
								//失败结果
								console.log(error)
							}
						})
					}
			
			
				}
			})
			
			//监听在线消息事件  
			plus.push.addEventListener("receive", function(msg) {
				//这里可以写跳转业务代码
				setTimeout(function() {
					if (msg.payload.indexOf("#") != -1) {
						let payload = msg.payload.split("#")

						//跳消息详情
						if (payload[0] == "1") {
							//订单 跳订单详情
							uni.navigateTo({
								url: "/pages/order/orderInfo/orderInfo?orderId=" + payload[1]
							})
						} else {
							uni.navigateTo({
								url: '/pages/user/news/news'
							})
						}

					} else {
						//跳消息列表
						uni.navigateTo({
							url: '/pages/user/news/news'
						})
					}
				}, 1000)
			}, false);
			// #endif

			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.statusBar = e.statusBarHeight + 34
					Vue.prototype.statusBottomBar = e.navigationBarHeight
					// Vue.prototype.statusBar = 20
					// #ifndef MP  
					if (e.platform == 'android') {
						Vue.prototype.customBar = e.statusBarHeight + 50
					} else {
						Vue.prototype.customBar = e.statusBarHeight + 45
					}
					// #endif  

					// #ifdef MP-WEIXIN  
					let custom = wx.getMenuButtonBoundingClientRect()
					Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
					// #endif  

					// #ifdef MP-ALIPAY  
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
					// #endif  
				}
			})
			console.log('onLaunch')
			
		},
		onShow: function() {
			//免登陆
			
			uni.getStorage({
				key: 'accessToken',
				success: (reg) => {
					if (reg.data != '') {
						//调用货主信息查询接口测试token是否可以使用
						let data = {
							type:1
						}
						//#ifdef APP-PLUS
						let pinf = plus.push.getClientInfo()
						let cid = pinf.clientid;
						data.cid = cid
						//#endif
						uni.request({
							url: config.ownerInfo_url,
							method: "get",
							data:data,
							header: {
								'Content-Type': 'application/x-www-form-urlencoded', // 默认值
								'Authorization': 'Bearer ' + reg.data
							},
							success: (res) => {
								if (res.data.code == 0) {
									this.$store.commit("getAccessToken", reg.data)
								}else if (res.data.code == -7019) {
									this.$store.commit("getAccessToken", "")
									this.$store.commit("getRefreshToken", "")
									//往手机缓存里面塞token
									uni.removeStorage({
										key:'accessToken'
									})
									uni.removeStorage({
										key:'refreshToken'
									})
									uni.showToast({
										title:"该手机号未注册,正在返回登录页",
										duration:2000,
										icon:"none"
									})
									setTimeout(function(){
										uni.redirectTo({
											url: "/pages/login/login"
										})
									},2000)
								}else if (res.data.code == -7110) {
									this.$store.commit("getAccessToken", "")
									this.$store.commit("getRefreshToken", "")
									//往手机缓存里面塞token
									uni.removeStorage({
										key:'accessToken'
									})
									uni.removeStorage({
										key:'refreshToken'
									})
									let pages = getCurrentPages() // 获取栈实例
									let page = pages[pages.length - 1]
									console.log(page.route)
									if(page.route != "pages/user/logout/logout" && page.route != "pages/login/login" && page.route != "pages/user/logoutPhone/logoutPhone"){
										uni.showToast({
											title:"该货主不存在,正在返回登录页",
											duration:2000,
											icon:"none"
										})
										setTimeout(function(){
											uni.redirectTo({
												url: "/pages/login/login"
											})
										},2000)
									}
									
								}
							},
							complete: (code) => {
								if (code.statusCode == 401) {
									// token过期.用refreshToken刷新accesstoken
									uni.getStorage({
										key: 'refreshToken',
										success: reg=> {
											// refreshToken:reg.data
											ajax.post(config.refresh_url, {
												refreshToken: reg.data
											}).then(res => {
												console.log(res)
												if (res.code == 0) {
													//往vuex里面塞token
													this.$store.commit("getAccessToken", res.data.access_token)
													this.$store.commit("getRefreshToken", res.data.refresh_token)
													//往手机缓存里面塞token
													uni.setStorage({
														key: 'accessToken',
														data: res.data.access_token
													})
													uni.setStorage({
														key: 'refreshToken',
														data: res.data.refresh_token,
													})
													//去配货大厅
													uni.redirectTo({
														url: "/pages/goods/sendGoods/sendGoods"
													})
												}
											}).catch(err => {
												//ajax.js反馈的reject结果
												console.log(err)
											})
											
										},
									})
								}
							},
							fail(error) {
								//失败结果
								console.log(error)
							}
						})
					}
			
			
				}
			})
			
			setTimeout(() => {
				// #ifdef APP-PLUS 
				plus.navigator.closeSplashscreen()
				// #endif
			}, 2000)
			console.log('App Show')
			
			let goodsLists = [
				// {
				// 	name:"果蔬",
				// 	id:"1",
				// 	check:false
				// },
				// {
				// 	name:"农产品",
				// 	id:"2",
				// 	check:false
				// },
				// {
				// 	name:"木材苗圃",
				// 	id:"3",
				// 	check:false
				// },
				// {
				// 	name:"粮食谷物",
				// 	id:"4",
				// 	check:false
				// },
				// {
				// 	name:"禽畜",
				// 	id:"5",
				// 	check:false
				// }
			]
			this.$store.commit("getGoodsLists", goodsLists)
			let goodsPackLists = [
				// {
				// 	name:"托盘",
				// 	id:"1",
				// 	check:false
				// },
				// {
				// 	name:"木箱",
				// 	id:"2",
				// 	check:false
				// },
				// {
				// 	name:"纸箱",
				// 	id:"3",
				// 	check:false
				// },
				// {
				// 	name:"袋装",
				// 	id:"4",
				// 	check:false
				// },
				// {
				// 	name:"散装",
				// 	id:"5",
				// 	check:false
				// }
			]
			this.$store.commit("getGoodsPackLists", goodsPackLists)
			let serviceType = [
				// {
				// 	name:"到付",
				// 	id:"1",
				// 	check:false
				// },
				// {
				// 	name:"三不超",
				// 	id:"2",
				// 	check:false
				// },
				// {
				// 	name:"需雨布",
				// 	id:"3",
				// 	check:false
				// },
				// {
				// 	name:"全部现金",
				// 	id:"4",
				// 	check:false
				// },
				// {
				// 	name:"随时装	",
				// 	id:"5",
				// 	check:false
				// },
				// {
				// 	name:"高价急走",
				// 	id:"6",
				// 	check:false
				// },
				// {
				// 	name:"需回单",
				// 	id:"7",
				// 	check:false
				// },
				// {
				// 	name:"需纸质发票",
				// 	id:"8",
				// 	check:false
				// }
			]
			this.$store.commit("getServiceType", serviceType)
		},
		onHide: function() {
			console.log('App Hide')
		}
		// ,
		// methods:{
		// 	woqu(){
		// 		console.log("woasjdfojsaf")
		// 	}
		// }
	}
</script>

<style lang="scss">
	// @import "uview-ui/index.scss";
	/*每个页面公共css */
	/* 全局样式 */
	* {
		box-sizing: border-box;
		font-family: 'PingFang';
	}

	body {
		background-color: #f4f4f4;
		font-family: 'PingFang';
	}

	.page {
		background-color: #F8F8F8;
		min-height: 100vh;
		width: 100%;
		overflow: hidden;
	}

	@font-face {
		font-family: 'PingFang';
		// src: url('https://songgete.oss-cn-hangzhou.aliyuncs.com/file/PingFangSC-Bold.ttf');
		src: url('./static/PingFang-SC-Regular.ttf');
		font-weight: bold;
		font-style: normal;
	}

	// @font-face {
	//   font-family: 'PingFang';
	//   //https://songgete.oss-cn-hangzhou.aliyuncs.com/file/PingFangSC-Bold.ttf
	//   // src: url('./static/PingFangSC-Bold.eot');
	//   src: url('./static/liao.ttf');
	//   font-weight: bold;
	//   font-style: normal;
	// }

	.iconfont {
		color: #666;
	}

	.masterColor {
		color: #1580FC;
	}

	.textRight {
		text-align: right;
	}

	.cont {
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0px 2px 8px #C8C8C8;
	}

	.cont .conts {
		width: calc(100% - 20rpx);
		margin-left: 20rpx;
		padding-top: 16rpx;
		min-height: 80rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		border-bottom: 2rpx solid #EEEEEE;
	}

	.cont .conts:last-child {
		border-bottom: none;
	}

	.cont .conts .contslf {
		width: 150rpx;
		color: #999999;
		font-size: 26rpx;
		line-height: 48rpx;
	}

	.cont .conts .contsct {
		width: calc(100% - 150rpx - 54rpx);
		height: 48rpx;
		text-align: right;
		position: relative;
	}

	.cont .conts .contsct text {
		color: #999;
		font-size: 28rpx;
		line-height: 48rpx;
	}

	.cont .conts .contsct .pick.poa {}

	.cont .conts .contsct text.active {
		color: #333;
	}

	.cont .conts .contsct .pick {
		width: 466rpx;
		height: 48rpx;
		left: 0;
		top: 0;
		z-index: 2;
	}

	.cont .conts .contsrt {
		width: 54rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		bottom: 4px;
	}

	.cont .conts .contsrt image {
		transform: rotate(0deg);
		bottom: 0;
		width: 14rpx !important;
		height: 28rpx !important;
	}

	.cont .conts .contsrt image.active {
		transform: rotate(90deg);
		bottom: -4px;
	}

	.cont .conts .contsbt {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		margin-top: 22rpx;
		padding-right: 20rpx;
	}

	.cont .conts .contsbt .contsbtCont {
		margin-bottom: 20rpx;
		width: 136rpx;
		height: 54rpx;
		margin-right: 34rpx;
		background-color: #EEEEEE;
		border: 2rpx solid #ddd;
		text-align: center;
		line-height: 50rpx;
		color: #666;
		font-size: 24rpx;
		position: relative;
		border-radius: 8rpx;

	}

	.cont .conts .contsbt .contsbtCont text {
		color: #666;
		width: 136rpx;
		height: 54rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		display: block;
	}

	.cont .conts .contsbt .contsbtCont:nth-of-type(4n) {
		margin-right: 0;
	}

	.cont .conts .contsbt .contsbtCont image {
		position: absolute !important;
		bottom: -10rpx;
		right: -10rpx;
		z-index: 2;
		opacity: 0;
		background: #fff;
		border-radius: 14rpx;
	}

	.cont .conts .contsbt .contsbtCont.active {
		background: rgba(21, 128, 252, 0.2);
		color: #3399FF;
		border-color: #3399FF;
	}

	.cont .conts .contsbt .contsbtCont.active text {
		color: #3399FF;
	}

	.cont .conts .contsbt .contsbtCont.active image {
		opacity: 1;
	}

	.cont .contsTwo {
		padding-left: 20rpx;
		height: 130rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}

	.cont .contsTwo .topList {
		padding: 20rpx 0 22rpx;
	}

	.cont .contsTwo .name {
		color: #999999;
		font-size: 28rpx;
		line-height: 38rpx;
	}

	.cont .contsTwo .wei {
		color: #999;
		font-size: 24rpx;
		line-height: 32rpx;
	}

	.cont .contsTwo:last-child {
		border-bottom: none;
	}

	.cont .contsTwo .bottomList {}

	.cont .contsTwo .bottomList input {
		width: 600rpx;
		height: 40rpx;
		font-size: 32rpx;
		padding-left: 20rpx;
		padding-bottom: 10rpx;
	}

	.cont .contsThree {
		display: flex;
		justify-content: space-between;
	}

	.cont .contsThree .contslf {
		width: 300rpx;
	}

	.cont .contsThree .contsrf {
		width: 326rpx;
		padding-right: 40rpx;
		padding-bottom: 10rpx;
	}

	.cont .contsThree .contsrf .wei {
		width: 95rpx;
		font-size: 24rpx;
		color: #666666;
	}

	.cont .contsThree .contsrf input {
		font-size: 26rpx;
	}

	// .cont .contsThree{
	// 	padding-left: 20rpx;
	// 	height: 80rpx;
	// 	display: flex;
	// 	justify-content: start;
	// 	align-items:center;
	// 	border-bottom: 2rpx solid #EEEEEE;

	// }
	// .cont .contsThree:last-child{
	// 	border-bottom: none;
	// }
	.showErr.showErr1 .btnShu {
		width: 50%;
		float: left;
		border: none;
		border-top: 1px solid #DDDDDD;
		border-radius: 0;
		color: #666;
	}

	.showErr.showErr1 .btnShu.masterColor {
		color: #3399FF;
		border-right: 1px solid #dddddd;
	}

	.rect {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		color: #3399FF;
		background: rgba(21, 128, 252, 0.2);
		text-align: center;
		margin-top: 8rpx;
		margin-bottom: 28px;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.widthB {
		width: 100%;
	}

	.spaceAround {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.spaceBetween {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.flexLeft {
		display: flex;
		justify-content: left;
		align-items: center;
	}

	.flexRight {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.por {
		position: relative;
	}

	.poa {
		position: absolute;
	}

	.boxShadow {
		box-shadow: 0 6upx 12upx rgba(0, 0, 0, .08)
	}

	.boxShadowSecond {
		box-shadow: 0 6upx 12upx rgba(0, 0, 0, .16)
	}

	.borderRadius {
		border-radius: 8upx;
	}

	.borderRadiusYuan {
		border-radius: 50%;
	}

	.family {
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	}

	.left {
		float: left;
	}

	.right {
		float: right;
	}

	.clearfix:after {
		clear: both;
		content: "";
		display: table;
	}

	.tooSmallText {
		font-size: 20upx;
		line-height: 28upx;
	}

	.smallText {
		font-size: 24upx;
		line-height: 32upx;
	}

	.inText {
		font-size: 28upx;
		line-height: 38upx;
	}

	.bigText {
		font-size: 32upx;
		line-height: 42upx;
	}

	.u-font-ss {
		font-size: 20rpx;
	}

	.u-font-xs {
		font-size: 22rpx;
	}

	.u-font-xss {
		font-size: 24rpx;
	}

	.u-font-sm {
		font-size: 26rpx;
	}

	.u-font-md {
		font-size: 28rpx;
	}

	.u-font-lg {
		font-size: 30rpx;
	}

	.twoS {
		width: 100%;
		height: 4rpx;
		display: block;
		background: #DDDDDD;
	}

	.oneS {
		width: 100%;
		height: 4rpx;
		display: block;
		background: #DDDDDD;
	}

	.u-font-xl {
		font-size: 34rpx;
	}

	.fontWeight {
		font-weight: bold;
	}

	.fffColor {
		color: #fff;
	}

	.fffBackground {
		background: #fff;
	}

	.dddBackground {
		background: #ddd;
	}

	.yellowBackground {
		background: #FDB82B;
	}

	.orangeBackground {
		background: #FD7F23;
	}

	.threeColor {
		color: #333;
	}

	.sixColor {
		color: #666;
	}

	.nineColor {
		color: #999;
	}

	uni-button:after {
		border: none;
	}

	.orangeColor {
		color: #FF5B00 !important;
	}

	.redColor {
		color: red !important;
	}

	.greenColor {
		color: #07CC10;
	}

	.marginTop {
		padding-top: 160upx !important;
		display: flow-root;
	}

	.paddingLeftRight {
		padding-left: 30upx;
		padding-right: 30upx;
	}

	uni-toast .uni-toast {
		padding: 0 20upx;
	}

	.boxThree.te {
		height: auto !important;
	}

	.rt.te {
		float: left;
		width: 400rpx;
		margin-left: 158rpx;
	}

	/* 下面所有的都是大量页面会重复的样式 */
	.submitBtnGray {
		width: 690upx;
		height: 92upx;
		background: #CCCCCC;
		box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
		border-radius: 10upx;
		color: #333;
		font-size: 40upx;
		line-height: 92upx;
		margin-top: 60upx;
		margin-bottom: 60upx;
		line-height: 92upx;
	}

	.submitBtnBlue {
		width: 690upx;
		height: 80upx;
		background-color: #0080FF !important;
		box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
		border-radius: 8upx;
		color: #F8F8F8 !important;
		font-size: 32upx;
		line-height: 80upx;
		text-align: center;
		margin: 0 auto;
	}

	.submitBtnDDD {
		width: 690upx;
		height: 80upx;
		background-color: #DDD !important;
		border: 2rpx solid #CCC;
		box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
		border-radius: 8upx;
		color: #666666 !important;
		font-size: 32upx;
		line-height: 80upx;
		text-align: center;
		margin: 0 auto;
	}

	.absoluteBtn {
		position: absolute;
		left: 30upx;
		bottom: 50upx;
	}

	.absoluteBtnNew {
		position: absolute;
		left: 30upx;
		bottom: 190upx;
	}

	.twoItem {
		display: flex;
		justify-content: space-between;
		align-items: end;
		padding: 0 20upx;
		background: #fff;
		margin-bottom: 2upx;
		border-radius: 8upx;
	}

	.twoItem>view {

		min-height: 80upx;
		line-height: 80upx;
		border-radius: 8upx;
		font-size: 28upx;
		line-height: 38upx;
		padding-top: 20upx;
		color: #333;
	}

	.twoItem>view:nth-of-type(1) {
		color: #666;
		width: 40%;
	}

	.twoItem>view:nth-of-type(2) {
		text-align: right;
		width: 60%;
	}

	.twoItem .oilCar,
	.threeItem .oilCar {
		padding-bottom: 20upx;
		position: relative;
	}

	.twoItem .oilCar .carItem,
	.threeItem .oilCar .carItem {
		width: auto;
		height: 40upx;
		background: #6E6E6E;
		color: #fff;
		margin-right: 6upx;
		margin-bottom: 6upx;
		border-radius: 4upx;
		float: right;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10upx;
		font-size: 24upx;
		line-height: 32upx;
	}

	.threeItem .oilCar .carItem {
		float: left;
	}

	.threeItem .oilCar .carInput {
		position: absolute;
		top: 20upx;
		left: 0;
		width: 450upx;
		height: 40upx;

	}

	.threeItem .oilCar .carInput text {
		font-size: 28upx;
		line-height: 38upx;
		color: #999999;
		float: left;
	}

	.threeItem .oilCar .carInput image {
		float: right;
		width: 16upx;
		height: 10upx;
		margin-top: 14upx;
	}

	.threeItem .oilItems {
		padding-bottom: 20upx;
	}

	.threeItem .oilitem {
		width: auto;
		height: 40upx;
		background: #FD8123;
		color: #fff;
		margin-right: 6upx;
		margin-bottom: 6upx;
		border-radius: 4upx;
		float: left;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10upx;
		font-size: 24upx;
		line-height: 32upx;
	}

	.threeItem {
		display: flex;
		justify-content: space-between;
		align-items: end;
		padding: 0 30upx;
		background: #fff;
		margin-bottom: 2upx;
		border-radius: 8upx;
	}

	.threeItem>view {
		padding-top: 20upx;
		min-height: 80upx;
		line-height: 80upx;
		border-radius: 8upx;
		color: #333;

		font-size: 28upx;
		line-height: 38upx;
	}

	.threeItem>view:nth-of-type(1) {
		width: 170upx;
		color: #666;
	}

	.threeItem>view:nth-of-type(2) {
		width: 420upx;
	}

	.threeItem>view:nth-of-type(3) {
		width: 50upx;
		text-align: right;
		color: #999;
	}

	/* 以上是充值或者加油列表样式比如加油清单或者充值清单 */

	/* 导航样式 */
	.navImg {
		width: 19upx;
		height: 32upx;
	}

	.navImgSecond {
		width: 60upx;
		height: 60upx;
	}

	.kong {
		width: 60upx;
		height: 60upx;
	}

	.shai {
		position: relative;
		top: 14upx;
	}

	.kong .image image {
		width: 60upx;
		height: 60upx;
	}

	/*form 样式*/
	.showErr {
		width: 660rpx;
	}

	.showErr .point {
		min-height: 300rpx;
		text-align: center;

	}

	.showErr .point .title {
		color: #333333;
		font-size: 36rpx;
		line-height: 48rpx;
		display: block;
		padding-top: 92rpx;
	}

	.showErr .point .err {
		color: #999999;
		font-size: 32rpx;
		line-height: 42rpx;
		padding-top: 28rpx;
		display: block;
	}

	.showErr .btnShu {
		height: 88rpx;
		border-top: 2rpx solid #dddddd;
		color: #3399FF;
		font-size: 32rpx;
		background-color: #fff;
	}

	.btn {
		margin-bottom: 50rpx;
	}

	.showErr.state1 .btnShu {
		color: #333333;
		width: 50%;
		float: left;
		border: none;
		border-top: 2rpx solid #DDDDDD;
		border-radius: 0;
	}

	.showErr.state1 .btnShu.btnShu.masterColor {
		color: #3399FF;
		border-right: 2rpx solid #dddddd;
	}

	.suggest {
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: #3399FF;
		background: rgba(21, 128, 252, 0.2);
		margin-top: 8rpx;
	}
</style>
