<template>
	<view class="page">
		<u-navbar back-icon-color="#333" :title="title" title-color="#F8F8F8" :background="{ background: '#0080FF' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">我草</view> -->
		</u-navbar>
		<view class="contentList">
			<view class="list list1">
				<view class="tp">
					<view class="status status2">
					</view>
					<view class="site">
						<view class="start">
							<text class="u-line-1">{{start}}</text>
						</view>
						<icon class="iconfont icondao to" style="font-size: 30rpx;"></icon>
						<view class="end">
							<!-- <text>杭州市</text>
							<text>萧山区</text> -->
							<text class="u-line-1">{{end}}</text>
						</view>
					</view>
				</view>
				<view class="bm u-flex u-row-between">
					<view class="left">
						<text class="text1">运输总路程约为</text>
						<text class="text2" style="position: relative;left:10rpx">{{obj.kilometers}}公里</text>
					</view>
					<view class="right" @click="to()">
						查看路线》
					</view>
				</view>
			</view>

			<view class="list list2">
				<view class="tp u-flex">
					<view class="lt">
						装卸信息
					</view>
					<view class="rt u-flex">
					</view>
				</view>
				<view class="bm">
					<view class="box boxNine">
						<view class="lt">{{obj.handlingTypeName}}</view>
						<view class="rt u-line-1" style="font-size: 24rpx;">{{obj.appointedTime}}装货</view>
					</view>
					<view v-for="(item , index) in obj.addressList" :key="index">
						<view class="box boxThree te" v-if="item.type == 1">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconzhuang" style="font-size: 48rpx;color: #0080FF;"></icon></view>
							<view class="rt u-line-1" style="font-size: 32rpx;">{{item.cityName}} {{item.regionName}}</view>
							<view class="rt te" style="font-size: 24rpx;color: rgb(102, 102, 102)">{{item.cityName}} {{item.regionName}} {{item.address}}</view>
						</view>
						<view class="box boxThree te" v-else>
							<view class="lt u-flex u-row-center"><icon class="iconfont iconxie" style="font-size: 48rpx;color: #f96f2b ;"></icon></view>
							<view class="rt u-line-1" style="font-size: 32rpx;">{{item.cityName}} {{item.regionName}}</view>
							<view class="rt te" style="font-size: 24rpx;color: rgb(102, 102, 102)">{{item.cityName}} {{item.regionName}} {{item.address}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list list2">
				<view class="tp u-flex">
					<view class="lt">
						货物信息
					</view>
					<view class="rt u-flex">
					</view>
				</view>
				<view class="bm">
					<view class="box">
						<view class="lt boxNine">名称类型</view>
						<view class="rt u-line-1">{{obj.name}} {{obj.goodsTypeName}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">重量体积</view>
						<view class="rt u-line-1">{{obj.weight}}吨 {{obj.volume}}方</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">包装方式</view>
						<view class="rt u-line-1">{{obj.packagingTypeName}}</view>
					</view>
				</view>
			</view>
			<view class="list list2">
				<view class="tp u-flex">
					<view class="lt">
						车辆信息
					</view>
					<view class="rt u-flex">
					</view>
				</view>
				<view class="bm">
					<view class="box">
						<view class="lt boxNine">用车类型</view>
						<view class="rt u-line-1">{{obj.vehicleTypeName}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">装货车型</view>
						<view class="rt u-line-1">{{obj.cargorCarModeName}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">装货车长</view>
						<view v-if="obj.cargorCarConductorName == '' || obj.cargorCarConductorName == null">{{obj.occupyConductor}}</view>
						<view v-else class="rt u-line-1">{{obj.cargorCarConductorName}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">占用车长</view>
						<view class="rt u-line-1">{{obj.occupyCarLength}}米</view>
					</view>
					
					<view class="box boxThree">
						<view class="lt boxNine">服务要求</view>
						<view class="rt u-line-1" v-if="obj.serviceName == ''">无</view>
						<view class="rt u-line-1" v-else>{{obj.serviceName}}</view>
					</view>
				</view>
			</view>

			<view class="list list2">
				<view class="tp u-flex">
					<view class="lt">
						支付信息
					</view>
					<view class="rt u-flex">
					</view>
				</view>
				<view class="bm">
					<view class="box">
						<view class="lt boxNine">运输费用</view>
						<view class="rt u-line-1" v-if="obj.paymentMethod == 1">
							{{obj.freight}}元/趟 到付
						</view>
						<view class="rt u-line-1" v-else>
							{{obj.freight}}元/趟 回单付
						</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">定金支付</view>
						<view class="rt u-line-1" v-if="obj.refundMethod == 1">{{obj.deposit}}元 退还</view>
						<view class="rt u-line-1" v-else>{{obj.deposit}}元 不退还</view>
					</view>
					<view class="box boxThree" v-if="obj.driverName != '' && obj.driverName != null">
						<view class="lt boxNine">指定司机</view>
						<view class="rt u-line-1">{{obj.driverName}}</view>
					</view>
					<view class="box boxThree" style="align-items:baseline;min-height: 46rpx;height:auto">
						<view class="lt boxNine">备注信息</view>
						<view></view>
						<view class="rt u-line-1" v-if="obj.remark == '' || obj.remark == null">无</view>
						<view class="rt" style="height: auto;" v-else>{{obj.remark}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn u-flex u-row-between" v-if="this.type != 3">
			<button class="submitBtnDDD" @click="delet">删除</button>
			<button class="submitBtnBlue" @click="go">编辑</button>
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
				title: "货源信息",
				obj: {},
				start: "",
				end: "",
				show: false,
				showErr: "请确认是否删除,一旦确认无法恢复",
				type: "1",
				startJin: "",
				endJin: "",
			}
		},
		onLoad(option) {
			if (option.type) {
				this.type = option.type
				if (this.type == 3) {
					this.title = "货源详情"
				}
			}
			if (option.id) {
				this.id = option.id
				ajax.get(config.freightCargoInfo_url + "/" + this.id, {})
					.then(res => {
						console.log(res)
						if (res.code == 0) {
							if (res.data.cargorCarModeName.indexOf(",") != -1) {
								var str = res.data.cargorCarModeName.split(",")
								var strNew = ''
								for (let i = 0; i < str.length; i++) {
									if (i == 0) {
										strNew = str[i] + strNew
									} else {
										strNew = strNew + '/' + str[i]
									}
								}
								res.data.cargorCarModeName = strNew
							}
							if (res.data.serviceName.indexOf(",") != -1) {
								var str = res.data.serviceName.split(",")
								var strNew = ''
								for (let i = 0; i < str.length; i++) {
									if (i == 0) {
										strNew = str[i] + strNew
									} else {
										strNew = strNew + '/' + str[i]
									}
								}
								res.data.serviceName = strNew
							}
							if (res.data.cargorCarConductorName != null) {
								if (res.data.cargorCarConductorName.indexOf(",") != -1) {
									var str = res.data.cargorCarConductorName.split(",")
									var strNew = ''
									for (let i = 0; i < str.length; i++) {
										strNew = strNew + str[i] + '米'
									}
									res.data.cargorCarConductorName = strNew
								} else if (res.data.cargorCarConductorName != "") {
									res.data.cargorCarConductorName = res.data.cargorCarConductorName + "米"
								}
							}

							this.obj = res.data
							// this.obj.appointedTime = this.timers(this.obj.appointedTime)
							this.start = this.obj.addressList[0].cityName + " " + this.obj.addressList[0].regionName
							if (this.obj.addressList[1].type == 2) {
								this.end = this.obj.addressList[1].cityName + " " + this.obj.addressList[1].regionName
							} else {
								this.end = this.obj.addressList[2].cityName + " " + this.obj.addressList[2].regionName
							}

							// cargorCarModeName cargorCarConductorName
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
		onShow() {

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
				return y + '-' + MM + '-' + d + ' ' + h + ":" + m;
			},
			go() {
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
					
				}
				console.log(shipFirst)
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
					goodsSize: this.obj.volume,
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
				// console.log(shipThird)
				this.$store.commit("getShipThird", shipThird)
				//第四页
				let shipFourth = {
					haulMoney: this.obj.freight,
					haulMoneyType: this.obj.paymentMethod,
					haulDriver: {
						name:this.obj.driverName,
						id:this.obj.driverUsername
					},
					haulFrontMoney: this.obj.deposit,
					driverUsername:this.obj.driverUsername,
					haulFrontMoneyType: this.obj.refundMethod,
					haulFrontRemark: this.obj.remark,
					haulBlean: true,
					haulYuanBlean: this.obj.isOften,
				}
				if (shipFourth.haulDriver == null) {
					shipFourth.haulDriver = ""
				}
				//把值存到缓存里,修改需要的时候再取
				
				this.$store.commit("getEditObj", {
					cargoState:this.obj.cargoState,
					state:this.obj.state,
					cargoCode:this.obj.cargoCode
				})
				this.$store.commit("getShipFourth", shipFourth)
				this.$store.commit("getLocat","")
				uni.navigateTo({
					url: "/pages/goods/ship/ship?type=1&orderId=" + this.obj.id
				})
			},
			//删除货源
			delet() {
				this.show = true
				this.orderIndex = this.obj.id
			},
			//确认删除
			btnShu() {
				this.show = false
				console.log("ceshi")
				console.log(this.orderIndex)
				ajax.dele(config.deleteCargo_url, {
					id: this.orderIndex
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						uni.showToast({
							title: "成功",
							icon: "success",
							duration: 2000
						})
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/goods/sendGoods/sendGoods"
							})
						}, 2000)
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
			to(x, y) {
				let arr = JSON.stringify(this.obj.addressList)
				uni.navigateTo({
					url:"/pages/order/amap/amap?arr=" + arr + "&long=" + this.obj.kilometers
				})
				// uni.navigateTo({
					// url: "/pages/goods/goodsRoute/goodsRoute?start=" + this.start + "&end=" + this.end
				// })
			}
		}
	}
</script>

<style scoped lang="less">
	.boxThree.te .lt {
		padding-top: 20rpx;
	}

	.btn {
		margin-top: 86rpx;
		margin-bottom: 50rpx;

		button {
			width: 320rpx;
		}

		.submitBtnDDD {
			background-color: #999 !important;
			color: #fff !important;
		}
	}

	//.page .suggestBottom
	.contentList {
		width: 100%;
		padding: 0 30rpx 40rpx 30rpx;

		.list.list1 {
			background-color: #fff;
			border-radius: 8rpx;
			box-shadow: 0px 2px 8px #C8C8C8;
			margin-top: 20rpx;

			.tp {
				padding: 26rpx 20rpx;
				display: flex;
				justify-content: start;

				.status {
					width: 20rpx;
					height: 20rpx;
					text-align: center;
					margin-top: 6rpx;
					font-size: 20rpx;
					line-height: 34rpx;
					border-radius: 20rpx;
					color: #F8F8F8;
				}

				.status.status1 {
					background-color: #FC441C;
				}

				.status.status2 {
					background-color: #3399FF;
				}

				.site {
					height: 32rpx;
					padding-left: 20rpx;
					display: flex;
					justify-content: start;

					.start {
						color: #3399FF;
						font-size: 34rpx;
						line-height: 30rpx;

						text {
							display: inline-block;
							max-width: 250rpx;
						}

						text:first-child {
							// padding-right: 10rpx;
						}
					}

					.to {
						margin: 0 30rpx;
					}

					.end {
						color: #F96F2B;
						font-size: 32rpx;
						line-height: 30rpx;

						text {
							max-width: 250rpx;
							display: inline-block;
						}

						text:first-child {
							// padding-right: 10rpx;
						}
					}
				}
			}

			.bm {
				font-size: 24rpx;
				padding: 0 30rpx 20rpx;

				.left {
					.text1 {
						color: #999999;
					}

					.text2 {
						color: #333333;
					}
				}

				.right {
					color: #F96F2B;
				}
			}
		}

		.list.list2 {
			background-color: #fff;
			border-radius: 8rpx;
			box-shadow: 0px 2px 8px #C8C8C8;
			margin-top: 20rpx;
			padding: 20rpx 0 2rpx 20rpx;

			.tp {
				padding-right: 40rpx;
				justify-content: space-between;
				height: 60rpx;
				border-bottom: 2rpx solid #eee;

				.lt {
					font-size: 32rpx;
					color: #333;
				}

				.rt {
					font-size: 24rpx;
					
					color: #3399FF;
				}
			}

			.bm {
				font-size: 24rpx;
				margin-top: 16rpx;

				.box {
					color: #333;
					margin-bottom: 20rpx;
					display: flex;
					justify-content: start;
					align-items: center;
					height: 46rpx;
					flex-wrap: wrap;

					.lt {
						width: 120rpx;
						margin-right: 38rpx;

						image {
							margin-left: 28rpx;
						}
					}

					.rt {
						width: calc(100% - 158rpx);
						padding-right: 20rpx;
						font-size: 28rpx;
					}


				}

				.boxNine {
					color: #999;
				}

			}

		}
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
