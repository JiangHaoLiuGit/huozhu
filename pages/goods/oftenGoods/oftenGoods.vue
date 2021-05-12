<template>
	<view class="page">
		<u-navbar title="常发货源" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#0080FF' }">
		</u-navbar>
		<view class="suggestBottom">
			<view class="wanting u-flex u-row-center" v-if="order.length <= 0">
				<image class="images" src="../../../static/pic18.png" style="width: 50rpx;" mode="widthFix"></image>
				<view class="text inText nineColor">
					暂无常发货源
				</view>
			</view>
			<view class="contentList" v-else>
				<view class="list" v-for="(item,index) in order" :key="index">
					<view class="tp">
						<view class="site">
							<view class="start u-line-1" style="max-width: 300rpx;">
								<text>{{item.addressList[0].cityName}}</text>
								<text>{{item.addressList[0].regionName}}</text>
							</view>
							<image style="width:40rpx;" class="to" src="../../../static/pic20.png" mode="widthFix"></image>
							<view class="end u-line-1" style="max-width: 300rpx;">
								<text>{{item.addressList[item.addressList.length-1].cityName}}</text>
								<text>{{item.addressList[item.addressList.length-1].regionName}}</text>
							</view>
						</view>
					</view>
					<view class="ct">
						<view class="type">
							<text>{{item.goodsTypeName}}/{{item.weight}}吨</text>
							<text>{{item.vehicleTypeName}}</text>
							<text>{{item.cargorCarModeName}}</text>
							<text v-if="item.cargorCarConductorName == '' || item.cargorCarConductorName == null">{{item.occupyConductor}}</text>
							<text v-else>{{item.cargorCarConductorName}}</text>
						</view>
						<view class="money">
							<text class="money">
								￥{{item.freight}}/趟
							</text>
						</view>
					</view>
					<view class="bm">
						<view class="content" @click="start(item)">
							<!-- <image src="../../../static/pic21.png" style="width: 30rpx;" mode="widthFix" v-if="1 == 1"></image> -->
							<!-- <image src="../../../static/pic22.png" style="width: 26rpx;" mode="widthFix" v-else></image> -->
							<text><i class="iconfont iconzailaiyidan"></i>再来一单</text>
						</view>
						<view class="content" @click="delet(item)">
							<text style="color: #FC441C;"><i style="color: #FC441C;" class="iconfont iconshanchu-hong"></i>删除</text>
						</view>
					</view>
				</view>
				<text class="orderBlean" v-if="orderBlean">~暂无货源~</text>
			</view>


		</view>

		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr state1">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu masterColor" @click="btnShu()">确认删除</button>
				<button class="btnShu" @click="show = false">暂不删除</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				type: 2,
				order: [

				],
				pageIndex: 1,
				pageSize: 10,
				orderIndex: "",
				orderBlean: false,
				current: 0,
				show: false,
				showErr: "请确认是否删除,一旦确认无法恢复",
				scale: 5,
				obj: {},
			}
		},
		onLoad(option) {

		},
		onShow() {
			this.order = []
			this.pageIndex = 1
			this.orderBlean = false
			this.pageList();
		},
		onReachBottom() {
			console.log('页面到底了')
			this.pageList();
		},
		methods: {
			timers(tim) {
				let date = new Date(tim);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '年' + MM + '月' + d + '日 ' + h + ":" + m + ":" + s;
			},
			timers1(tim) {
				let date = new Date(tim);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + ' ' + h + ":" + m;
			},
			pageList() {
				if (this.orderBlean == false) {
					ajax.get(config.supplyList_url, {
						pageIndex: this.pageIndex,
						pageSize: this.pageSize
					}).then(res => {
						console.log("pageList")
						console.log(res)
						if (res.code == 0) {
							if (res.data.list) {
								if (res.data.list.length > 0) {
									for (let i = 0; i < res.data.list.length; i++) {
										res.data.list[i].releaseTime = this.timers1(res.data.list[i].releaseTime)
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
									}
									this.order = this.order.concat(res.data.list)
									this.pageIndex++
								} else {
									this.orderBlean = true
								}
							} else {
								this.orderBlean = true
							}
						}else{
							uni.showToast({
								title:"网络错误,请重试",
								icon:'none',
								duration:2000
							})
						}
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
				}

			},
			//再来一单
			start(index) {
				console.log(index.id + "再来一单")
				ajax.get(config.freightCargoInfo_url + "/" + index.id, {})
					.then(res => {
						console.log(res)
						if (res.code == 0) {
							this.obj = res.data
							let shipFirst = {}
							if (this.obj.handlingType == 1) {
								//一装一卸
								shipFirst = {
									dollOriginArea1: this.obj.addressList[0].provinceName + this.obj.addressList[0].cityName + this.obj.addressList[
										0].regionName,
									dollEndArea1: this.obj.addressList[0].address,
									dollOriginArea2: "",
									dollEndArea2: "",
									dollSwitch: false,
									stripOriginArea1: this.obj.addressList[1].provinceName + this.obj.addressList[1].cityName + this.obj.addressList[
										1].regionName,
									stripEndArea1: this.obj.addressList[1].address,
									stripOriginArea2: "",
									stripEndArea2: "",
									stripSwitch: false,
									dollStripText: "一装一卸",
									dollStripType: "1",
									dollTimer: this.obj.appointedTime,
									locat1: {
										address: this.obj.addressList[0].address,
										idArr: [this.obj.addressList[0].provinceId, this.obj.addressList[0].cityId, this.obj.addressList[0].areaId],
										location: this.obj.addressList[0].lat + "," + this.obj.addressList[0].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[0].cityName,
										userQu: this.obj.addressList[0].regionName,
									},
									locat2: "",
									locat3: {
										address: this.obj.addressList[1].address,
										idArr: [this.obj.addressList[1].provinceId, this.obj.addressList[1].cityId, this.obj.addressList[1].areaId],
										location: this.obj.addressList[1].lat + "," + this.obj.addressList[1].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[1].cityName,
										userQu: this.obj.addressList[1].regionName,
									},
									locat4: "",
									startJin: this.obj.addressList[0].lnt + "," + this.obj.addressList[0].lat,
									endJin: this.obj.addressList[this.obj.addressList.length - 1].lnt + "," + this.obj.addressList[this.obj.addressList
										.length - 1].lat,
									km: this.obj.kilometers
								}
								if (this.obj.unloadingTime != "" && this.obj.unloadingTime != null) {
									shipFirst.stripTimer = this.obj.unloadingTime
								}
							} else if (this.obj.handlingType == 2) {
								//一装二卸
								shipFirst = {
									dollOriginArea1: this.obj.addressList[0].provinceName + this.obj.addressList[0].cityName + this.obj.addressList[
										0].regionName,
									dollEndArea1: this.obj.addressList[0].address,
									dollOriginArea2: "",
									dollEndArea2: "",
									dollSwitch: false,
									stripOriginArea1: this.obj.addressList[1].provinceName + this.obj.addressList[1].cityName + this.obj.addressList[
										1].regionName,
									stripEndArea1: this.obj.addressList[1].address,
									stripOriginArea2: this.obj.addressList[2].provinceName + this.obj.addressList[2].cityName + this.obj.addressList[
										2].regionName,
									stripEndArea2: this.obj.addressList[2].address,
									stripSwitch: true,
									dollStripText: "一装二卸",
									dollStripType: "2",
									dollTimer: this.obj.appointedTime,
									locat1: {
										address: this.obj.addressList[0].address,
										idArr: [this.obj.addressList[0].provinceId, this.obj.addressList[0].cityId, this.obj.addressList[0].areaId],
										location: this.obj.addressList[0].lat + "," + this.obj.addressList[0].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[0].cityName,
										userQu: this.obj.addressList[0].regionName,
									},
									locat2: "",
									locat3: {
										address: this.obj.addressList[1].address,
										idArr: [this.obj.addressList[1].provinceId, this.obj.addressList[1].cityId, this.obj.addressList[1].areaId],
										location: this.obj.addressList[1].lat + "," + this.obj.addressList[1].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[1].cityName,
										userQu: this.obj.addressList[1].regionName,
									},
									locat4: {
										address: this.obj.addressList[2].address,
										idArr: [this.obj.addressList[2].provinceId, this.obj.addressList[2].cityId, this.obj.addressList[2].areaId],
										location: this.obj.addressList[2].lat + "," + this.obj.addressList[2].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[2].cityName,
										userQu: this.obj.addressList[2].regionName,
									},
									startJin: this.obj.addressList[0].lnt + "," + this.obj.addressList[0].lat,
									endJin: this.obj.addressList[this.obj.addressList.length - 1].lnt + "," + this.obj.addressList[this.obj.addressList
										.length - 1].lat,
									km: this.obj.kilometers
								}
								if (this.obj.unloadingTime != "" && this.obj.unloadingTime != null) {
									shipFirst.stripTimer = this.obj.unloadingTime
								}
							} else if (this.obj.handlingType == 3) {
								//两装一卸
								shipFirst = {
									dollOriginArea1: this.obj.addressList[0].provinceName + this.obj.addressList[0].cityName + this.obj.addressList[
										0].regionName,
									dollEndArea1: this.obj.addressList[0].address,
									dollOriginArea2: this.obj.addressList[1].provinceName + this.obj.addressList[1].cityName + this.obj.addressList[
										1].regionName,
									dollEndArea2: this.obj.addressList[1].address,
									dollSwitch: true,
									stripOriginArea1: this.obj.addressList[2].provinceName + this.obj.addressList[2].cityName + this.obj.addressList[
										2].regionName,
									stripEndArea1: this.obj.addressList[2].address,
									stripOriginArea2: "",
									stripEndArea2: "",
									stripSwitch: false,
									dollStripText: "两装一卸",
									dollStripType: "3",
									dollTimer: this.obj.appointedTime,
									locat1: {
										address: this.obj.addressList[0].address,
										idArr: [this.obj.addressList[0].provinceId, this.obj.addressList[0].cityId, this.obj.addressList[0].areaId],
										location: this.obj.addressList[0].lat + "," + this.obj.addressList[0].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[0].cityName,
										userQu: this.obj.addressList[0].regionName,
									},
									locat2: {
										address: this.obj.addressList[1].address,
										idArr: [this.obj.addressList[1].provinceId, this.obj.addressList[1].cityId, this.obj.addressList[1].areaId],
										location: this.obj.addressList[1].lat + "," + this.obj.addressList[1].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[1].cityName,
										userQu: this.obj.addressList[1].regionName,
									},
									locat3: {
										address: this.obj.addressList[2].address,
										idArr: [this.obj.addressList[2].provinceId, this.obj.addressList[2].cityId, this.obj.addressList[2].areaId],
										location: this.obj.addressList[2].lat + "," + this.obj.addressList[2].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[2].cityName,
										userQu: this.obj.addressList[2].regionName,
									},
									locat4: "",
									startJin: this.obj.addressList[0].lnt + "," + this.obj.addressList[0].lat,
									endJin: this.obj.addressList[this.obj.addressList.length - 1].lnt + "," + this.obj.addressList[this.obj.addressList
										.length - 1].lat,
									km: this.obj.kilometers
								}
								if (this.obj.unloadingTime != "" && this.obj.unloadingTime != null) {
									shipFirst.stripTimer = this.obj.unloadingTime
								}

							} else if (this.obj.handlingType == 4) {
								//两装两卸
								shipFirst = {
									dollOriginArea1: this.obj.addressList[0].provinceName + this.obj.addressList[0].cityName + this.obj.addressList[
										0].regionName,
									dollEndArea1: this.obj.addressList[0].address,
									dollOriginArea2: this.obj.addressList[1].provinceName + this.obj.addressList[1].cityName + this.obj.addressList[
										1].regionName,
									dollEndArea2: this.obj.addressList[1].address,
									dollSwitch: true,
									stripOriginArea1: this.obj.addressList[2].provinceName + this.obj.addressList[2].cityName + this.obj.addressList[
										2].regionName,
									stripEndArea1: this.obj.addressList[2].address,
									stripOriginArea2: this.obj.addressList[3].provinceName + this.obj.addressList[3].cityName + this.obj.addressList[
										3].regionName,
									stripEndArea2: this.obj.addressList[3].address,
									stripSwitch: true,
									dollStripText: "两装两卸",
									dollStripType: "4",
									dollTimer: this.obj.appointedTime,
									locat1: {
										address: this.obj.addressList[0].address,
										idArr: [this.obj.addressList[0].provinceId, this.obj.addressList[0].cityId, this.obj.addressList[0].areaId],
										location: this.obj.addressList[0].lat + "," + this.obj.addressList[0].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[0].cityName,
										userQu: this.obj.addressList[0].regionName,
									},
									locat2: {
										address: this.obj.addressList[1].address,
										idArr: [this.obj.addressList[1].provinceId, this.obj.addressList[1].cityId, this.obj.addressList[1].areaId],
										location: this.obj.addressList[1].lat + "," + this.obj.addressList[1].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[1].cityName,
										userQu: this.obj.addressList[1].regionName,
									},
									locat3: {
										address: this.obj.addressList[2].address,
										idArr: [this.obj.addressList[2].provinceId, this.obj.addressList[2].cityId, this.obj.addressList[2].areaId],
										location: this.obj.addressList[2].lat + "," + this.obj.addressList[2].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[2].cityName,
										userQu: this.obj.addressList[2].regionName,
									},
									locat4: {
										address: this.obj.addressList[3].address,
										idArr: [this.obj.addressList[3].provinceId, this.obj.addressList[3].cityId, this.obj.addressList[3].areaId],
										location: this.obj.addressList[3].lat + "," + this.obj.addressList[3].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[3].cityName,
										userQu: this.obj.addressList[3].regionName,
									},
									startJin: this.obj.addressList[0].lnt + "," + this.obj.addressList[0].lat,
									endJin: this.obj.addressList[this.obj.addressList.length - 1].lnt + "," + this.obj.addressList[this.obj.addressList
										.length - 1].lat,
									km: this.obj.kilometers
								}
								if (this.obj.unloadingTime != "" && this.obj.unloadingTime != null) {
									shipFirst.stripTimer = this.obj.unloadingTime
								}
								console.log(shipFirst)
							}
							this.$store.commit("getShipFirst", shipFirst)
							//第二页
							let shipSecond = {
								goodsName: this.obj.name,
								goodsWeight: this.obj.weight,
								goodsSize: this.obj.volume,
								goodsType: this.obj.goodsTypeName,
								goodsTypeId: [this.obj.goodsTypeId],
								goodsPack: this.obj.packagingTypeName,
								goodsPackId: [this.obj.packagingTypeId],
							}
							this.$store.commit("getShipSecond", shipSecond)
							//第三页
							let cargorCarMode = this.obj.cargorCarMode
							if (cargorCarMode.indexOf(",") != "-1") {
								cargorCarMode = cargorCarMode.split(",")
							}
							let cargorCarConductor = this.obj.cargorCarConductor
							if (cargorCarConductor != "" && cargorCarConductor != null) {
								if (cargorCarConductor.indexOf(",") != "-1") {
									cargorCarConductor = cargorCarConductor.split(",")
								}
							}
							if (cargorCarConductor == null) {
								this.obj.cargorCarConductorName = "自定义 " + this.obj.occupyConductor
							}
							let service = this.obj.service
							if (service.indexOf(",") != "-1") {
								service = service.split(",")
							}
							let shipThird = {
								goodsCarTypes: this.obj.vehicleTypeName,
								goodsCarTypesId: this.obj.vehicleType,
								goodsCarType: this.obj.cargorCarModeName,
								goodsCarTypeId: cargorCarMode,
								goodsCarSize: this.obj.cargorCarConductorName,
								goodsCarSizeId: cargorCarConductor,
								goodsCarServe: this.obj.serviceName,
								goodsCarServeId: service,
								carLength:this.obj.occupyCarLength
							}
							console.log(shipThird)
							this.$store.commit("getShipThird", shipThird)
							//第四页
							let shipFourth = {
								haulMoney: this.obj.freight,
								haulMoneyType: this.obj.paymentMethod,
								// haulDriver: {
								// 	name:this.obj.driverName,
								// 	id:this.obj.driverUsername
								// },
								haulDriver: {
									name:"",
									id:"",
								},
								haulFrontMoney: this.obj.deposit,
								haulFrontMoneyType: this.obj.refundMethod,
								haulFrontRemark: "",
								haulBlean: true,
								haulYuanBlean: this.obj.isOften,
							}
							if (shipFourth.haulDriver == null) {
								shipFourth.haulDriver = ""
							}
							this.$store.commit("getShipFourth", shipFourth)
							this.$store.commit("getLocat", "")
							uni.navigateTo({
								url: "/pages/goods/ship/ship?type=1"
							})
						}else{
							uni.showToast({
								title:"网络错误,请重试",
								icon:'none',
								duration:2000
							})
						}
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
			},
			//删除货源
			delet(index) {
				console.log(index)
				this.show = true
				this.orderIndex = index.id
			},
			//确认删除
			btnShu() {

				// this.show = false
				// console.log("ceshi")
				// console.log(this.orderIndex)
				// uni.showToast({
				//   title:"成功",
				//   icon:"success",
				//   duration:2000
				// })
				ajax.dele(config.deleteById_url, {
					cargoId: this.orderIndex
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						uni.showToast({
							title: "成功",
							icon: "success",
							duration: 2000
						})
						this.show = false
						this.order = []
						this.pageIndex = 1
						this.orderBlean = false
						this.pageList();
					}else{
						uni.showToast({
							title:"网络错误,请重试",
							icon:'none',
							duration:2000
						})
					}
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})

			},
			//打电话
			call(e) {
				uni.makePhoneCall({
					phoneNumber: e.currentTarget.dataset.phone //仅为示例
				});
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
		margin-top: 50rpx;
		margin-bottom: 50rpx;
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
		position: relative;
		bottom: 20rpx;
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
			margin-top: 40rpx;

			.wanting {
				min-height: calc(100vh - 300rpx);

				.images {}

				view.text {
					width: 200rpx;
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

					.tp {
						padding: 22rpx 20rpx;
						display: flex;
						justify-content: start;
						border-bottom: 1px solid #eee;

						.status {
							width: 80rpx;
							height: 36rpx;
							text-align: center;
							font-size: 20rpx;
							line-height: 34rpx;
							border-radius: 8rpx;
							color: #F8F8F8;
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
							display: flex;
							justify-content: start;
							height: 46rpx;
							padding-top: 4rpx;
							.start {
								color: #3399FF;
								font-size: 32rpx;
								line-height: 46rpx;

								text {
									display: inline-block;
								}

								text:first-child {
									padding-right: 10rpx;
								}
							}

							.to {
								// width: 40rpx;
								// height: 28rpx;
								margin: 10rpx 30rpx 0;
							}

							.end {
								color: #F96F2B;
								font-size: 32rpx;
								line-height: 46rpx;

								text {
									display: inline-block;
								}

								text:first-child {
									padding-right: 10rpx;
								}
							}
						}
					}

					.ct {
						padding: 16rpx 20rpx 16rpx 20rpx;

						.type {
							font-size: 22rpx;
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
							padding-right: 24rpx;
							display: flex;
							justify-content: space-between;
							margin: 8rpx 0;

							text.money {
								color: #ff9900;
								font-size: 26rpx;
								line-height: 38rpx;
							}

							text.tim {
								color: #999999;
								font-size: 20rpx;
								line-height: 28rpx;
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
								font-size: 28rpx;
								line-height: 38rpx;
							}

							.call {
								position: absolute;
								right: 0;
								top: 0;
								width: 148rpx;
								height: 36rpx;
								background: #FFCC52;
								border-radius: 8rpx;
								text-align: center;

								image {
									width: 22rpx;
									height: 18rpx;
								}

								text {
									font-size: 20rpx;
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
							height: 74rpx;
							width: 50%;
							border-left: 2rpx solid #EEEEEE;

							image {
								margin-right: 20rpx;
							}

							text {
								font-size: 28rpx;
								color: #3399FF;
							}

							i {
								color: #3399FF;
								margin-right: 20rpx;
							}

							text.active {
								color: #999;
							}
						}

						.content:first-child {
							border-left: none;
						}
					}
				}
			}

		}
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
</style>
