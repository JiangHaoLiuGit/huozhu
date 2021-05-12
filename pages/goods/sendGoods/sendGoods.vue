<template>
	<view class="page">
		<u-navbar title="发货平台" title-color="#F8F8F8" :isBack="false" :background="{ background: '#0080FF' }">
			<view slot="right" class="slotRight u-padding-right-40" @click="to1">常发货源</view>
		</u-navbar>
		<view class="suggestBottom">
			<view class="wanting" v-if="type == 1">
				<image class="images" src="../../../static/pic18.png" mode=""></image>
				<view class="text inText nineColor">
					需要实名认证才能发货点击此处，<text @click="go" class="go masterColor">前往认证</text>
				</view>
			</view>
			<view class="contentList" v-else>
				<mescroll-body height="80%" ref="mescrollRef" @init="mescrollInit" :up="upOption" @down="downCallback" @up="upCallback">
					<view class="list por" v-for="(item,index) in order" :key="index">
						<image v-if="item.cargoState == 4" src="../../../static/pic61.png" style="width: 100rpx;top: 40rpx;right: 23rpx;"
						 class="poa" mode="widthFix"></image>
						<view class="tp" @click="to(item)">
							<!-- faceCargoState 是货源列表里前端展示用的 cargoState是后端数据库里存的.传后端参数的时候传给后端这个参数 -->
							<view class="status status1" v-if="item.faceCargoState == 2">
								待确认
							</view>
							<view class="status status2" v-else-if="item.faceCargoState == 1">
								待接单
							</view>
							<view class="status status3" v-else-if="item.faceCargoState == 3">
								运输中
							</view>
							<view class="site">
								<view class="start u-line-1">
									<text class="u-line-1">{{item.addressList[0].cityName}}</text>
									<text class="u-line-1">{{item.addressList[0].regionName}}</text>
								</view>
								<icon class="iconfont icondao to" style="font-size: 30rpx;"></icon>
								<view class="end u-line-1">
									<text class="u-line-1">{{item.addressList[item.addressList.length-1].cityName}}</text>
									<text class="u-line-1">{{item.addressList[item.addressList.length-1].regionName}}</text>
								</view>
							</view>
						</view>
						<view class="ct">
							<view class="type" style='text-align:left' @click="to(item)" v-if="item.cargorCarConductorName == '' || item.cargorCarConductorName == null">
								{{item.goodsTypeName}}/{{item.weight}}吨 | {{item.cargorCarModeName}} | {{item.occupyConductor}}
							</view>
							<view class="type" style='text-align:left;' @click="to(item)" v-else>
								{{item.goodsTypeName}}/{{item.weight}}吨 | {{item.cargorCarModeName}} | {{item.cargorCarConductorName}}
							</view>
							<view class="money" @click="to(item)">
								<text class="money">
									￥{{item.freight}}/趟 {{item.vehicleTypeName}}
								</text>
								<text class="tim">
									<text>{{item.releaseTime}}</text>
								</text>
							</view>
							<view class="news status1" v-if="item.faceCargoState == 2" @click="to(item)">
								<icon class="iconfont icontongzhi-hong" style="font-size: 24rpx;color: #fc441c;margin-right:10rpx"></icon>
								<text>司机已付定金，快去看看吧</text>
							</view>
							<view class="news status2" v-else-if="item.faceCargoState == 1" @click="to(item)">
								<icon class="iconfont icontongzhi-lan" style="font-size: 24rpx;color: #3399ff;margin-right:10rpx"></icon>
								<text>还没有司机接单，请耐心等待</text>
							</view>
							<view class="news status3" v-else-if="item.faceCargoState == 3">
								<icon class="iconfont icontongzhi-lv" style="font-size: 24rpx;color: #07CC10;margin-right:10rpx"></icon>
								<text @click="to(item)">您的货物正在运输中</text>
								<view class="call" @click="callTel(item.driverUsername)">
									<icon class="iconfont icondianhua-hei" style="font-size: 20rpx;color: #333;margin-right:10rpx"></icon>
									<!-- <image src="../../../static/pic19.png" mode=""></image> -->
									<text>联系司机</text>
								</view>
							</view>
						</view>
						<view class="bm">
							<view class="content" :class="item.faceCargoState != 1?'active':''" @click="start(item)">
								<icon class="iconfont iconxingxing-huang1" style="font-size: 30rpx;color: #fec24d;margin-right:10rpx" v-if="item.isOften"></icon>
								<icon class="iconfont iconxingxing-hui1" style="font-size: 30rpx;color: #e6e6e6;margin-right:10rpx" v-else></icon>
								<!-- <image src="../../../static/pic22.png" style="width: 26rpx;" mode="widthFix" v-if="item.isOften"></image>
								<image src="../../../static/pic21.png" style="width: 30rpx;" mode="widthFix" v-else></image> -->
								<!-- iconxiugai-hui -->
								<text>常用货源</text>
							</view>
							<view class="content" @click="change(item)" v-if="item.faceCargoState == 1">
								<icon class="iconfont iconxiugai-hui" style="font-size: 30rpx;color: #666;margin-right:10rpx"></icon>
								<!-- <image src="../../../static/pic31.png" style="width: 26rpx;" mode="widthFix"></image> -->
								<text :class="item.faceCargoState == 3?'active':''">修改货源</text>
							</view>
							<!--  :class="item.faceCargoState == 1?" -->
							<view class="content" @click="delet(item,1)" v-if="item.faceCargoState == 1">
								<icon class="iconfont iconshanchu-hui" style="font-size: 30rpx;color: #666;margin-right:10rpx"></icon>
								<!-- <image src="../../../static/pic23.png" style="width: 26rpx;" mode="widthFix"></image> -->
								<text>删除</text>
							</view>
							<view class="content active" @click="delet(item,2)" v-else-if="item.faceCargoState == 2">
								<icon class="iconfont iconshanchu-hui" style="font-size: 30rpx;color: #666;margin-right:10rpx"></icon>
								<text>取消</text>
							</view>
							<view class="content active" @click="delet(item,3)" v-else-if="item.faceCargoState == 3">
								<icon class="iconfont iconshanchu-hui" style="font-size: 30rpx;color: #666;margin-right:10rpx"></icon>
								<text>取消</text>
							</view>
						</view>
					</view>
				</mescroll-body>
			</view>

		</view>
		<view class="classBtn" :style="[{'bottom':statusBottomBar+ 'rpx'}]">
			<button class="btn" :class="type == 1?'submitBtnDDD':'submitBtnBlue'" :disabled="type == 1" @click="to2">前去发货</button>
		</view>
		<u-tabbar v-model="current" :before-switch="beforeSwitch" height="140" inactive-color="#333333" icon-size="40"
		 active-color="#0080FF" :list="list"></u-tabbar>
		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr state1">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu masterColor" @click="btnShu()">{{btnText1}}</button>
				<button class="btnShu" @click="show = false">{{btnText2}}</button>
			</view>
		</u-popup>

		<!-- 联系电话列表 -->
		<view class="warp" v-if="telShow" @tap="closeTelList">
			<view class="rect" style="padding-bottom: 40rpx;" @tap.stop>
				<view class="top u-padding-left-50 u-padding-top-20 u-padding-bottom-22 u-padding-right-50 u-flex u-row-between"
				 style="border-bottom: 1px solid #efefef;">
					<image src="../../../static/pic17.png" style="width: 20rpx;" mode="widthFix" @click="telShow = false"></image>
					<text class="u-font-xl fontWeight threeColor" style="font-size: 32rpx;">请选择司机联系方式</text>
					<view></view>
				</view>
				<view class="telList" v-for="(telItem, index) in telData" :key="index" @click="call(telItem.phone)">
					<view class="telIcon">
						<icon class="iconfont icondianhua-hei telIconStyle"></icon>
					</view>
					<view class="telNumb">{{telItem.phone}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Vue from "vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				upOption: {
					empty: {
						tip: '~ 暂无货源 ~', // 提示
					},
					textNoMore: '-- 已加载全部 --'
				},

				statusBottomBar: this.statusBottomBar * 2,
				type: 0,
				order: [

				],
				pageIndex: 1,
				pageSize: 10,
				//删除的货源id
				orderIndex: "",
				orderType: "",
				orderBlean: true,
				list: [{
						iconPath: "../../../static/tabBar01.png",
						selectedIconPath: "../../../static/tabBar02.png",
						text: '发货',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar03.png",
						selectedIconPath: "../../../static/tabBar04.png",
						text: '消息',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar05.png",
						selectedIconPath: "../../../static/tabBar06.png",
						text: '订单',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar07.png",
						selectedIconPath: "../../../static/tabBar08.png",
						text: '我的',
						isDot: false,
						customIcon: false
					},
				],
				current: 0,
				show: false,
				showErr: "请确认是否删除,一旦确认无法恢复",
				btnText1: "确认删除",
				btnText2: "暂不删除",
				scale: 5,
				startBlean: true,
				canReset: false,

				telShow: false,
				telData: [],
				//最新版本
				forbiddenShow: false,
				banben:"",
				updateContent: [],
				isIos: true,
				updateShow: false,
				mustPull: '',
				pullUrl: '',
				newVersion:""
			}
		},
		onLoad(option) {
			uni.getStorage({
				key: 'userPhone',
				success: res => {
					this.$store.commit("getPhone", res.data)
				},
				fail: err => {
					console.log(err);
				}
			})



		},
		onShow() {
			//版本更新
			//#ifdef APP-PLUS
			this.banben = plus.runtime.version
			//#endif
			// //#ifdef APP-PLUS
			let $platform = '';
			if(this.isIos) {
				$platform = 'ios';
			} else {
				$platform = 'android';
			}
			// ajax.get(config.version_url,{
			// 	version: plus.runtime.version,
			// 	appid: plus.runtime.appid,
			// 	platform: $platform
			// }).then(res => {
			// 	if(res.code == 0) {
			// 		if(res.data) {
			// 			let contentUrl = res.data.contentUrl;
			// 			this.mustPull = res.data.mustPull;
			// 			this.pullUrl = res.data.pullUrl;
			// 			this.newVersion = res.data.version
			// 			uni.request({  
			// 				url: contentUrl,
			// 				success: res => {
			// 					console.log(res);
			// 					let item = res.data.split('；');
			// 					this.updateContent = item;
			// 				}
			// 			})
			// 			if(this.mustPull == 1) {
			// 				this.updateShow = true;
			// 			} else {
			// 				uni.getStorage({
			// 				    key: 'updateStatus',
			// 				    success: reg => {
			// 						//判断版本需不需要更新
			// 						if(reg.data == this.newVersion){
			// 							this.updateShow = false;
			// 						}else{
			// 							this.updateShow = true;
			// 						}
			// 				    },
			// 					fail: err => {
			// 						this.updateShow = true;
			// 					}
			// 				})
			// 			}
			// 		} else {
			// 			//01-25改动
			// 			this.updateShow = false;
			// 			uni.removeStorage({
			// 			    key: 'updateStatus'
			// 			});
			// 		}
			// 	} else {
			// 		console.log(res)
			// 	}
			// }).catch(err => {
			// 	console.log(err)
			// })
			//#endif
			// this.orderBlean = false
			// this.order = []
			// this.pageIndex = 1
			// this.startBlean = true
			// this.pageList()
			this.canReset && this.downCallback()
			this.canReset && this.mescroll.scrollTo(0, 0)
			this.canReset = true
			let data = {
				type: 1
			}
			//#ifdef APP-PLUS
			let pinf = plus.push.getClientInfo()
			let cid = pinf.clientid;
			data.cid = cid
			//#endif
			ajax.get(config.ownerInfo_url, data).then(res => {
				console.log(res)
				if (res.code == 0) {
					// 1是已认证
					if (res.data.userCertificationStatus == 1) {
						this.type = 2
					} else {
						this.type = 1
					}
					this.$store.commit("getUserNo", res.data.userNo)
					uni.setStorage({
						key: 'userNo',
						data: res.data.userNo
					})
				} else if (res.code == -7019) {
					// uni.showToast({
					// 	title: "该手机号未注册,正在返回登录页",
					// 	duration: 2000,
					// 	icon: "none"
					// })
					// setTimeout(function() {
					// 	uni.redirectTo({
					// 		url: "/pages/login/login"
					// 	})
					// }, 2000)
				} else if (res.code == -7110) {
					uni.showToast({
						title: "该货主不存在,正在返回登录页",
						duration: 2000,
						icon: "none"
					})
					setTimeout(function() {
						uni.redirectTo({
							url: "/pages/login/login"
						})
					}, 2000)
				}
			}).catch(err => {
				//ajax.js反馈的reject结果
				console.log(err)
			})
		},
		methods: {
			// 立即更新
			goUpdate() {
				if(this.isIos) {
					let appleId = 1552115769 //app的appleId
					plus.runtime.launchApplication({
						action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
					}, function(e) {
						console.log('Open system default browser failed: ' + e.message);
					});
				} else {
					uni.showToast({
						title: "正在后台更新应用,稍后自动安装",
						icon: 'none',
						duration: 1000
					})
					uni.downloadFile({//执行下载
						url: this.pullUrl, //下载地址
						success: downloadResult => {//下载成功
							if (downloadResult.statusCode == 200) {
								// uni.showModal({
								// 	title: '',
								// 	content: '更新成功，确定现在重启吗？',
								// 	confirmText: '重启',
								// 	confirmColor: '#EE8F57',
								// 	success: function(res) {
								// 		if (res.confirm == true) {
								// 			plus.runtime.install(//安装
								// 				downloadResult.tempFilePath, {
								// 					force: true
								// 				},
								// 				function(res) {
								// 					utils.showToast('更新成功，重启中');
								// 					plus.runtime.restart();
								// 				}
								// 			);
								// 		}
								// 	}
								// });
								plus.runtime.install(//安装
									downloadResult.tempFilePath, {
										force: true
									},
									function(res) {
										utils.showToast('更新成功，重启中');
										plus.runtime.restart();
									}
								);
							}
						}
					});
					// plus.runtime.openURL(this.pullUrl);
				}
			},
			
			// 暂不更新
			cancelUpdata() {
				this.updateShow = false;
				uni.setStorage({
				    key: 'updateStatus',
				    data: this.newVersion,
				});
			},
			//关闭电话列表
			closeTelList() {
				this.telShow = false
			},
			//获取电话列表
			callTel(userName) {
				this.telShow = true
				ajax.get(config.telList_url, {
					username: userName
				}).then(res => {
					console.log("+++++电话列表+++++")
					console.log(res)
					if (res.code == 0) {
						this.telData = res.data;
					}
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})
			},

			// /*下拉刷新的回调 */
			// downCallback() {
			// 	// this.pageList();
			// },
			/*上拉加载的回调: */
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				// if(this.startBlean){
				// 	this.mescroll.endSuccess(1,true)
				// 	return
				// }
				ajax.get(config.getTime_url, {}).then(res1 => {
					ajax.get(config.freightCargo_url, {
						pageIndex: pageNum,
						pageSize: pageSize,
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.data.list != null) {
								for (let i = 0; i < res.data.list.length; i++) {
									if (res.code == 0) {
										var dateTime = new Date(res.data.list[i].releaseTime);
										var year = dateTime.getFullYear();
										var month = dateTime.getMonth() + 1;
										var day = dateTime.getDate();
										var hour = dateTime.getHours();
										var minute = dateTime.getMinutes();
										var second = dateTime.getSeconds();
										var now = new Date();
										// var now_new = Date.parse(now.toDateString()); //typescript转换写法
										var milliseconds = 0;
										var timeSpanStr;
										milliseconds = Number(res1.data) - res.data.list[i].releaseTime;
										if (milliseconds <= 1000 * 60 * 1) {
											timeSpanStr = '刚刚';
										} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
											timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
										} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
											timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
										} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
											timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
										} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
											timeSpanStr = year + '-' + month + '-' + day;
											// + ' ' + hour + ':' + minute
										} else {
											timeSpanStr = year + '-' + month + '-' + day;
											// + ' ' + hour + ':' + minute
										}
										res.data.list[i].releaseTime = timeSpanStr
									}




									if (res.data.list[i].cargorCarModeName.indexOf(",") != -1) {
										var str = res.data.list[i].cargorCarModeName.split(",")
										var strNew = ''
										for (let i = 0; i < str.length; i++) {
											if (i == 0) {
												strNew = str[i] + strNew
											} else {
												strNew = strNew + '/' + str[i]
											}
										}
										res.data.list[i].cargorCarModeName = strNew
									}
									if (res.data.list[i].cargorCarConductorName != null) {
										if (res.data.list[i].cargorCarConductorName.indexOf(",") != -1) {
											var str = res.data.list[i].cargorCarConductorName.split(",")
											var strNew = ''
											for (let i = 0; i < str.length; i++) {
												strNew = strNew + str[i] + '米'
											}
											res.data.list[i].cargorCarConductorName = strNew
										} else if (res.data.list[i].cargorCarConductorName != "") {
											res.data.list[i].cargorCarConductorName = res.data.list[i].cargorCarConductorName + "米"
										}
									}

									// cargorCarConductorName
								}
								// this.order = this.order.concat(res.data.list)
								let curPageData = res.data.list;
								let curPageLen = res.data.list.length;
								let hasNext = res.data.hasNextPage;
								if (page.num == 1) this.order = []; //如果是第一页需手动置空列表
								this.order = this.order.concat(curPageData); //追加新数据
								this.mescroll.endSuccess(curPageLen, hasNext);
							} else {
								this.mescroll.endErr();
								console.log("获取货源列表接口数据返回失败 error is :" + err);
							}
						} else {
							uni.showToast({
								title: "网络错误,请重试",
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(err => {
						this.mescroll.endErr();
						console.log("获取货源列表接口数据返回失败 error is :" + err);
					})
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})


			},
			timers(timespan) {

				var dateTime = new Date(timespan);

				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() + 1;
				var day = dateTime.getDate();
				var hour = dateTime.getHours();
				var minute = dateTime.getMinutes();
				var second = dateTime.getSeconds();
				var now = new Date();
				var now_new = Date.parse(now.toDateString()); //typescript转换写法

				var milliseconds = 0;
				var timeSpanStr;

				milliseconds = now_new - timespan;

				if (milliseconds <= 1000 * 60 * 1) {
					timeSpanStr = '刚刚';
				} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
					timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
				} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
				} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
				} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
					timeSpanStr = year + '-' + month + '-' + day;
					// + ' ' + hour + ':' + minute
				} else {
					timeSpanStr = year + '-' + month + '-' + day;
					// + ' ' + hour + ':' + minute
				}
				return timeSpanStr;
			},
			pageList() {
				ajax.get(config.getTime_url, {}).then(res1 => {
					ajax.get(config.freightCargo_url, {
						pageIndex: this.pageIndex,
						pageSize: this.pageSize
					}).then(res => {
						if (res.code == 0) {
							if (this.startBlean) {
								this.startBlean = false
							}
							if (res.data.list != null) {
								if (res.data.list.length > 0) {
									for (let i = 0; i < res.data.list.length; i++) {
										if (res.code == 0) {
											var dateTime = new Date(res.data.list[i].releaseTime);
											var year = dateTime.getFullYear();
											var month = dateTime.getMonth() + 1;
											var day = dateTime.getDate();
											var hour = dateTime.getHours();
											var minute = dateTime.getMinutes();
											var second = dateTime.getSeconds();
											var now = new Date();
											// var now_new = Date.parse(now.toDateString()); //typescript转换写法
											var milliseconds = 0;
											var timeSpanStr;
											milliseconds = Number(res1.data) - res.data.list[i].releaseTime;
											if (milliseconds <= 1000 * 60 * 1) {
												timeSpanStr = '刚刚';
											} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
												timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
											} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
												timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
											} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
												timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
											} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
												timeSpanStr = month + '-' + day;
												// + ' ' + hour + ':' + minute
											} else {
												timeSpanStr = year + '-' + month + '-' + day;
												// + ' ' + hour + ':' + minute
											}
											res.data.list[i].releaseTime = timeSpanStr
										}




										if (res.data.list[i].cargorCarModeName.indexOf(",") != -1) {
											var str = res.data.list[i].cargorCarModeName.split(",")
											var strNew = ''
											for (let i = 0; i < str.length; i++) {
												if (i == 0) {
													strNew = str[i] + strNew
												} else {
													strNew = strNew + '/' + str[i]
												}
											}
											res.data.list[i].cargorCarModeName = strNew
										}
										if (res.data.list[i].cargorCarConductorName != null) {
											if (res.data.list[i].cargorCarConductorName.indexOf(",") != -1) {
												var str = res.data.list[i].cargorCarConductorName.split(",")
												var strNew = ''
												for (let i = 0; i < str.length; i++) {
													strNew = strNew + str[i] + '米'
												}
												res.data.list[i].cargorCarConductorName = strNew
											} else if (res.data.list[i].cargorCarConductorName != "") {
												res.data.list[i].cargorCarConductorName = res.data.list[i].cargorCarConductorName + "米"
											}
										}

										// cargorCarConductorName
									}
									if (this.pageIndex == 1) this.order = []
									this.order = this.order.concat(res.data.list)
									this.pageIndex++
								} else {
									this.orderBlean = true
								}
							} else {

								this.orderBlean = true
							}

						} else {
							uni.showToast({
								title: "网络错误,请重试",
								icon: 'none',
								duration: 2000
							})
						}

					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})

			},
			//顶部右侧常发货源
			to1() {
				uni.navigateTo({
					url: "/pages/goods/oftenGoods/oftenGoods"
				})
			},
			to2() {
				this.$store.commit("getLocat", "")
				uni.navigateTo({
					url: "/pages/goods/ship/ship"
				})
			},
			//去发货
			to(e) {
				console.log(e.faceCargoState)
				if (e.faceCargoState == 1) {
					uni.navigateTo({
						url: "/pages/goods/goodsEdit/goodsEdit?id=" + e.id + "&type=1"
					})
				} else {
					uni.navigateTo({
						url: "/pages/order/orderInfo/orderInfo?orderId=" + e.id + "&status=" + e.faceCargoState
					})
				}
			},

			//点亮星星
			start(item) {
				uni.showLoading({
					title: "正在设置中"
				})
				if (item.isOften) {
					// 去删除
					ajax.dele(config.deleteById_url, {
						cargoId: item.id
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: "取消成功",
								icon: "success",
								duration: 2000,
								mask: true
							})
							// this.order = []
							// this.pageIndex = 1
							// this.orderBlean = false
							// this.pageList();
							this.mescroll.resetUpScroll()
						} else {
							uni.showToast({
								title: "网络错误,请重试",
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
				} else {
					// item.id的去点亮
					ajax.post(config.setUp_url, {
						cargoId: item.id
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: "增加成功",
								icon: "success",
								duration: 2000
							})
							// this.order = []
							// this.pageIndex = 1
							// this.orderBlean = false
							// this.pageList();
							this.mescroll.resetUpScroll()
						} else {
							uni.showToast({
								title: "发生未知错误",
								icon: "none",
								duration: 2000
							})
						}
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
				}

			},
			//修改
			change(index) {
				if (index.faceCargoState == 1) {
					uni.navigateTo({
						url: "/pages/goods/goodsEdit/goodsEdit?id=" + index.id
					})
				} else {
					console.log("不行")
				}
			},
			//删除货源
			delet(index, type) {
				console.log(index)

				this.orderIndex = index.id
				this.orderType = type
				if (type == 2) {
					// this.showErr = "请确认是否取消,一旦确认无法恢复"
					// this.btnText1 = "确认取消"
					// this.btnText2 = "暂不取消"
					// this.show = true
					this.$store.commit("getServiceIds", index.id)
					uni.navigateTo({
						url: "/pages/order/deleteOrderDai/deleteOrderDai"
					})
				} else if (type == 1) {
					this.showErr = "请确认是否删除,一旦确认无法恢复"
					this.btnText1 = "确认删除"
					this.btnText2 = "暂不删除"
					this.show = true
				} else if (type == 3) {
					uni.navigateTo({
						url: "/pages/order/deleteOrder/deleteOrder?id=" + index.id
					})
				}
			},
			//确认删除
			btnShu() {
				this.show = false
				console.log("ceshi")
				console.log(this.orderIndex)
				if (this.orderType == 1) {
					ajax.dele(config.deleteCargo_url, {
						id: this.orderIndex
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: "删除成功",
								icon: "success",
								duration: 2000
							})
							// this.order = []
							// this.pageIndex = 1
							// this.orderBlean = false
							// this.pageList();
							this.mescroll.resetUpScroll()
						} else {
							uni.showToast({
								title: "网络错误,请重试",
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
				} else if (this.orderType == 2) {
					//order-management/freight-cargo/{id}/cancel
					ajax.dele(config.orderList_url + `/${this.orderIndex}/cancel`, {
						refundAmount: "",
						canceReasonsName: "",
					}).then(res => {
						if (res.code == 0) {
							console.log(res)
							uni.showToast({
								title: "取消成功",
								icon: "none",
								duration: 2000
							})
							// this.order = []
							// this.pageIndex = 1
							// this.orderBlean = false
							// this.pageList();
							this.mescroll.resetUpScroll()
						} else {
							uni.showToast({
								title: "网络错误,请重试",
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(err => {
						console.log("取消失败 error is :" + err);
					})
				}


			},
			//打电话
			call(e) {
				console.log(e)
				uni.makePhoneCall({
					phoneNumber: e //仅为示例
				});
			},

			beforeSwitch(index) {
				let routes = getCurrentPages();
				let curRoute = routes[routes.length - 1].route;
				if (index == 0 && curRoute != 'pages/goods/sendGoods/sendGoods') {
					uni.reLaunch({
						url: "/pages/goods/sendGoods/sendGoods"
					})
				} else if (index == 1 && curRoute != 'pages/user/news/news') {
					uni.reLaunch({
						url: "/pages/user/news/news"
					})
				} else if (index == 2 && curRoute != 'pages/order/orderList/orderList') {
					uni.reLaunch({
						url: "/pages/order/orderList/orderList"
					})
				} else if (index == 3 && curRoute != 'pages/user/my/my') {
					uni.reLaunch({

						url: "/pages/user/my/my"
					})
				}
			},
			go() {
				//去认证
				uni.navigateTo({
					url: "/pages/attest/attest/attest?type=1"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.btn {
		margin-bottom: 70rpx;
		width: 100%;
		padding: 0;
	}

	.classBtn {
		background-color: #f8f8f8;
		position: fixed;
		bottom: 130rpx;
		left: 0;
		padding-left: 30rpx;
		padding-right: 30rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.orderBlean {
		color: #666;

	}

	.page {
		.slotRight {
			color: #f8f8f8;
			font-size: 24rpx;
		}

		.suggestBottom {
			min-height: calc(100vh - 546rpx);
			text-align: center;
			padding-bottom: 136rpx;
			margin-top: 20rpx;

			.wanting {
				.images {
					width: 142rpx;
					height: 134rpx;
					margin-top: 220rpx;
					margin-bottom: 42rpx;
				}

				view.text {
					width: 280rpx;
					margin: 0 auto;
					text-align: center;
				}
			}

			//.page .suggestBottom 
			.contentList {
				width: 100%;
				padding: 0 30rpx 40rpx 30rpx;

				.list {
					background-color: #fff;
					border-radius: 8rpx;
					box-shadow: 0px 2px 8px #C8C8C8;
					margin-bottom: 20rpx;

					display: grid;

					.tp {
						padding: 0 20rpx 26rpx;
						border-bottom: 2rpx solid #EEEEEE;
						display: flex;
						justify-content: start;
						margin-top: 26rpx;

						.status {
							width: 80rpx;
							height: 38rpx;
							text-align: center;
							font-size: 22rpx;
							line-height: 38rpx;
							border-radius: 8rpx;
							color: #F8F8F8;
							margin-top: 4rpx;
						}

						.status.status1 {
							background-color: #FC441C;
						}

						.status.status2 {
							background-color: #3399FF;
						}

						.status.status3 {
							background-color: #07CC10;
						}

						.site {
							padding-left: 19rpx;
							display: flex;
							justify-content: start;
							// padding-top: 16rpx;
							height: 46rpx;

							.start {
								color: #3399FF;
								font-size: 34rpx;
								line-height: 48rpx;

								text:first-child {
									padding-right: 10rpx;
								}
							}

							.to {
								// width: 40rpx;
								// height: 28rpx;
								margin: 10rpx 20rpx 0;
							}

							.end {
								color: #F96F2B;
								font-size: 32rpx;
								line-height: 48rpx;

								text:first-child {
									padding-right: 10rpx;
								}
							}

							text {
								max-width: 115rpx;
								display: inline-block;
							}
						}
					}

					.ct {
						padding: 16rpx 20rpx 22rpx 20rpx;

						.type {
							font-size: 24rpx;
							line-height: 38rpx;
							color: #666;
							display: flex;
							justify-contnt: start;

							text {
								display: inline-block;
								margin-right: 20rpx;
							}
						}

						view.money {
							display: flex;
							justify-content: space-between;
							margin: 8rpx 0;

							text.money {
								color: #ff9900;
								font-size: 26rpx;
							}

							text.tim {
								color: #999999;
								font-size: 24rpx;
								line-height: 28rpx;
								position: relative;
								top: 6rpx;
							}
						}

						.news.status1 {
							text {
								color: #FC441C;
							}
						}

						.news.status2 {
							text {
								color: #4898FA;
							}
						}

						.news.status3 {
							text {
								color: #07CC10;
							}
						}

						.news {
							display: flex;
							justify-content: start;
							align-items: center;
							position: relative;

							image {
								width: 28rpx;
								height: 26rpx;
								margin-right: 10rpx;
							}

							text {
								font-size: 26rpx;
								line-height: 38rpx;
							}

							.call {
								position: absolute;
								right: 0;
								top: 0;
								width: 182rpx;
								height: 38rpx;
								line-height: 38rpx;
								background: #FFCC52;
								border-radius: 8rpx;
								text-align: center;

								image {
									width: 22rpx;
									height: 19rpx;
								}

								text {
									font-size: 22rpx;
									line-height: 34rpx;
									color: #333;
								}
							}
						}
					}

					.bm {
						display: flex;
						justify-content: start;
						border-top: 2rpx solid #EEEEEE;

						.content {
							display: flex;
							justify-content: center;
							align-items: center;
							height: 80rpx;
							width: 220rpx;
							border-left: 2rpx solid #EEEEEE;

							image {
								margin-right: 20rpx;
							}

							text {
								font-size: 26rpx;
								color: #666;
							}

							text.active {
								color: #999;
							}
						}

						.content.active {
							width: 330rpx;
						}

						.content:first-child {
							border-left: none;
						}
					}
				}
			}

		}
	}

	.warp {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100%;
		background-color: rgba(0, 0, 0, .3);
		z-index: 2000;

		.box {
			width: 100%;
			height: 100vh;
			position: relative;
		}

		.rect {
			position: absolute;
			left: 0;
			bottom: 0;
			color: #fff;
			height: auto;
			margin: 0;
			background-color: #fff;
		}
	}

	.telList {
		width: 100%;
		height: 90rpx;
		border-bottom: 2rpx solid #efefef;

		.telIcon {
			float: left;
			width: 130rpx;
			height: 90rpx;
			line-height: 90rpx;

			.telIconStyle {
				color: #007AFF;
				font-size: 18px;
			}
		}

		.telNumb {
			float: right;
			width: calc(100% - 130rpx);
			color: #007AFF;
			text-align: left;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 40rpx;
		}
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
</style>
