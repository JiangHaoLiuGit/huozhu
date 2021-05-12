<template>
	<view class="page">
		<u-navbar title="快速重发货源" title-color="#fff" back-icon-color="#333" :background="{ background: '#0080FF' }">
		</u-navbar>
		<view class="fixed" :style="[{'top':statusBarH+ 'rpx'}]">
			<view class="top u-flex u-row-between">
				<view class="content">
					<view class="father" @click="select" data-index="1">
						<view class="text u-flex" :class="centerType == 1?'active':''" v-if="start == ''">
							<view>出发地</view>
							<i v-if="centerType == 1" class="iconfont iconshang acitve"></i>
							<i v-else class="iconfont iconxia"></i>
						</view>
						<view class="text active u-flex" v-else>
							<view>{{start}}</view>
							<i v-if="centerType == 1" class="iconfont iconshang acitve"></i>
							<i v-else class="iconfont iconxia"></i>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="father" @click="select" data-index="2">
						<view class="text u-flex" :class="centerType == 2?'active':''" v-if="end == ''">
							<view>目的地</view>
							<i v-if="centerType == 2" class="iconfont iconshang acitve"></i>
							<i v-else class="iconfont iconxia"></i>
						</view>
						<view class="text active u-flex" v-else>
							<view>{{end}}</view>
							<i v-if="centerType == 2" class="iconfont iconshang acitve"></i>
							<i v-else class="iconfont iconxia"></i>
						</view>
						<!-- <view class="text" :class="centerType == 2?'active':''" v-if="end == ''">目的地</view>
						<view class="text active">{{end}}</view> -->
					</view>
				</view>
				<view class="content">
					<view class="father" @click="select" data-index="3">
						<view class="text u-flex" :class="centerType == 3?'active':''" v-if="tim == ''">
							<view>时间</view>
							<i v-if="centerType == 3" class="iconfont iconshang acitve"></i>
							<i v-else class="iconfont iconxia"></i>
						</view>
						<view class="text active u-flex" v-else>
							<view>{{tim}}</view>
							<i v-if="centerType == 3" class="iconfont iconshang acitve"></i>
							<i v-else class="iconfont iconxia"></i>
						</view>
						<!-- <view class="text" :class="centerType == 3?'active':''" v-if="tim == ''">时间</view>
						<view class="text active">{{tim}}</view> -->
					</view>
				</view>
			</view>
			<view class="center" v-show="center" @click.self="close">
				<view class="box clearfix" v-if="centerType == 1">
					<view class="content left u-line-1" :class="item.check?'active':''" v-for="(item,index) in startDi" @click="clicks(item.name,1,index,item.id)"
					 data-index="1" data-name="item.name">
						{{item.name}}
					</view>
				</view>
				<view class="box clearfix" v-if="centerType == 2">
					<view class="content left u-line-1" :class="item.check?'active':''" v-for="(item,index) in endDi" @click="clicks(item.name,2,index,item.id)"
					 data-index="2" data-name="item.name">
						{{item.name}}
					</view>
				</view>
				<view class="box1" v-if="centerType == 3">
					<view class="content" v-for="(item,index) in timList" @click="clicks(item.name,3,index,item.id)" data-index="3"
					 data-name="item">
						<view class="item" :class="item.check?'active':''">{{item.name}}</view>
					</view>
				</view>
				<view class="block"></view>
			</view>
		</view>
		<view class="nineColor smallText u-margin-top-76 u-padding-left-30" @click="go">仅显示近期货源</view>
		<view class="suggestBottom">
			<view class="contentList">
				<view class="list u-padding-left-30" v-for="(item,index) in order" :key="index" @click="goShip(item)">
					<view class="tp por u-flex u-row-between u-padding-right-40">
						<view>
							<view class="u-flex u-margin-bottom-22">
								<view class="status status1">
								</view>
								<view class="site">
									<view class="start status1 u-line-1">
										{{item.addressList[0].provinceName}} {{item.addressList[0].cityName}} {{item.addressList[0].cityName}} {{item.addressList[0].address}}
										
									</view>
								</view>
							</view>
							<view class="u-flex">
								<view class="status status2">
								</view>
								<view class="site">
									<view class="start end status2 u-line-1">
										{{item.addressList[item.addressList.length-1].provinceName}} {{item.addressList[item.addressList.length-1].cityName}} {{item.addressList[item.addressList.length-1].cityName}} {{item.addressList[item.addressList.length-1].address}}
									</view>
								</view>
							</view>
						</view>

						<view class="hide">
							<view class="u-line-1" style="max-width: 160rpx;font-size: 30rpx;">{{item.name}}</view>
							<text>{{item.weight}}吨/{{item.goodsTypeName}}</text>
						</view>
					</view>
					<view class="bottom">
						<view class="info" v-if="item.cargorCarConductorName != null">
							<!-- 整车 平板/厢式/高栏 不限车长 -->
							{{item.vehicleTypeName}} {{item.cargorCarModeName}} {{item.cargorCarConductorName}}
						</view>
						<view class="info" v-else>
							<!-- 整车 平板/厢式/高栏 不限车长 -->
							{{item.vehicleTypeName}} {{item.cargorCarModeName}} {{item.occupyConductor}}
						</view>
						<view class="text u-flex u-row-between">
							<text>
								￥{{item.freight}}/趟
							</text>
							<text>
								{{item.createTime}}
							</text>
						</view>
					</view>
				</view>
				<view>
					<view class="orderBlean" style="text-align: center;" v-if="orderSize">
						<image :src="srcs" style="width: 400rpx;" mode="aspectFit"></image>
						<text class="nineColor" style="display: block;">暂无数据</text>
					</view>
					<view class="orderBlean nineColor smallText" style="padding-top: 50rpx;" v-if="orderBlean">已加载全部</view>
				</view>
				<!-- <text class="orderBlean nineColor smallText" v-if="orderBlean">已加载全部</text> -->
			</view>

		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				srcs:"../../../static/huoyuan.png",
				type: 2,
				order: [

				],
				statusBarH: this.statusBar * 2,
				//搜索内容显示影藏
				index: "",
				center: false,
				centerType: "",
				startDi: [],
				endDi: [],
				timList: [
					// "全部","今天","近三天","近一周","近一个月","近三个月"
					{
						name: "全部",
						id: "",
						check: false
					},
					{
						name: "今天",
						id: "1",
						check: false
					},
					{
						name: "近三天",
						id: "2",
						check: false
					},
					{
						name: "近一周",
						id: "3",
						check: false
					},
					{
						name: "近一个月",
						id: "4",
						check: false
					},
					{
						name: "近三个月",
						id: "5",
						check: false
					}
				],
				start: "",
				startId: "",
				end: "",
				endId: "",
				tim: "",
				timId: "",
				pageIndex: 1,
				pageSize: 10,
				orderIndex: "",
				orderBlean: false,
				orderSize:false
			}
		},
		onLoad(option) {
			ajax.get(config.basicDataTwo_url, {
				parentId: "-1",
				type: "1",
			}).then(res => {
				console.log("省市区")
				console.log(res)
				if (res.code == 0) {
					res.data.unshift({
						name: "全国",
						id: "-1"
					})
					for (let i = 0; i < res.data.length; i++) {
						res.data.check = false
					}
					this.startDi = res.data
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
		onShow() {
			this.order = []
			this.pageIndex = 1
			this.orderBlean = false
			this.orderSize = false
			this.pageList();
		},
		onReachBottom() {
			console.log('页面到底了')
			this.pageList();
		},
		methods: {
			goShip(index) {
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
			// 筛选的内容点击事件
			clicks(name, index, ind, id) {
				if (index == "1") {
					this.start = name
					this.startId = id
					for (let i = 0; i < this.startDi.length; i++) {
						this.startDi[i].check = false
					}
					this.startDi[ind].check = true

				} else if (index == "2") {
					this.end = name
					this.endId = id
					for (let i = 0; i < this.endDi.length; i++) {
						this.endDi[i].check = false
					}
					this.endDi[ind].check = true
				} else if (index == "3") {
					this.tim = name
					this.timId = id
					for (let i = 0; i < this.timList.length; i++) {
						this.timList[i].check = false
					}
					this.timList[ind].check = true
				}
				this.center = false
				this.order = []
				this.pageIndex = 1
				this.orderBlean = false
				this.orderSize = false
				this.pageList()
			},
			close() {
				console.log("调试")
				this.index = ''
				this.centerType = ""
				this.center = false
			},
			go() {
				uni.navigateTo({
					url: "/pages/goods/demo/demo"
				})
			},
			//选择筛选类型
			select(e) {
				let index = e.currentTarget.dataset.index
				this.centerType = index
				if (this.index == '') {
					this.center = true
				} else if (this.index == index) {
					this.center = false
				}
				this.index = index
				if (this.center == false) {
					this.index = ''
					this.centerType = ""
				}
			},
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
			pageList() {
				if (this.orderBlean == false) {
					let data = {
						departureType: "",
						//出发地id
						departureId: "",
						destinationType: "",
						//目的地id
						destinationId: "",
						//时间类型
						timeType: "",
						pageIndex: this.pageIndex,
						pageSize: this.pageSize
					}
					if (this.startId != "") {
						data.departureId = this.startId
						data.departureType = "1"
						if (data.departureId == -1) {
							data.departureId = ""
							data.departureType = ""
						}
					}
					if (this.endId != "") {
						data.destinationId = this.endId
						data.destinationType = "1"
						if (data.destinationId == -1) {
							data.destinationId = ""
							data.destinationType = ""
						}
					}
					if (this.timId != "") {
						data.timeType = this.timId
					}
					ajax.get(config.resendList_url, data).then(res => {
						console.log("pageList")
						console.log(res)
						if (res.code == 0) {

							if (res.data.list != '' && res.data.list != null) {
								if (res.data.list.length > 0) {
									for (let i = 0; i < res.data.list.length; i++) {
										res.data.list[i].createTime = this.timers(res.data.list[i].createTime)
										if(res.data.list[i].cargorCarModeName != null && res.data.list[i].cargorCarModeName != ''){
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
									if(this.pageIndex == 1){
										this.orderSize = true
										this.orderBlean = false
									}
								}
							}else {
								this.orderBlean = true
								if(this.pageIndex == 1){
									this.orderSize = true
									this.orderBlean = false
								}
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
		}
	}
</script>


<style scoped lang="less">
	.fixed {
		position: fixed;
		width: 100%;
		left: 0;
		top: 44px;
		z-index: 200;
		padding-top: 20rpx;
		.top {
			width: 100%;
			height: 54rpx;
			border-bottom: 2rpx solid #dddddd;
			background-color: #f8f8f8;

			.content {
				width: 33.3%;

				.father {
					.text {
						color: #666;
						font-size: 24rpx;
					}

					.text.active {
						color: #3399FF;
					}
				}
			}
		}

		.center {
			height: calc(100vh - 73px);
			width: 100%;
			background-color: rgba(0, 0, 0, .2);
			position: relative;

			.block {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				z-index: -1;
			}

			.box {
				z-index: 2;
				padding: 20rpx 50rpx 0;
				background-color: #f8f8f8;


				.content {
					display: block;
					text-align: center;
					padding: 0 0rpx 0 14rpx;
					width: 134rpx;
					height: 54rpx;
					color: #666;
					font-size: 24rpx;
					line-height: 50rpx;
					background-color: #eee;
					border: 2rpx solid #ddd;
					border-radius: 8rpx;
					margin-right: 36rpx;
					margin-bottom: 20rpx;
				}

				.content.active {
					background-color: #3399FF;
					color: #fff;
				}

				.content:nth-of-type(4n) {
					margin-right: 0;
				}
			}

			.box1 {
				background-color: #f8f8f8;

				.content {
					color: #666;
					font-size: 24rpx;
					height: 60rpx;
					line-height: 55rpx;
					text-align: center;

					.item {
						width: 150rpx;
					}

					.item.active {
						color: #3399FF;
					}
				}
			}
		}



	}

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
			margin-top: 20rpx;

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
						padding: 26rpx 20rpx 26rpx 0;

						.hide {
							view {
								color: #333333;
								font-size: 32rpx;
								line-height: 42rpx;
								text-align: right;
							}

							text {
								color: #999;
								font-size: 20rpx;
								line-height: 28rpx;
							}
						}

						.status {
							width: 12rpx;
							height: 12rpx;
							text-align: center;
							margin-top: 2rpx;
							font-size: 20rpx;
							line-height: 36rpx;
							border-radius: 20rpx;
							color: #F8F8F8;
						}

						.status.status1 {
							background-color: #3399FF;
						}

						.status.status2 {
							background-color: #F96F2B;
						}

						.status.status3 {
							background-color: #FFCC52;
						}

						.status.status4 {
							background-color: #5252FF;
						}

						.status.status5 {
							background-color: #999999;
						}

						.img {
							width: 100rpx;
							height: 100rpx;
							top: 16rpx;
							right: 36rpx;
						}

						.site {
							text-align: left;
							height: 32rpx;
							padding-left: 20rpx;
							display: flex;
							justify-content: start;

							.start {
								color: #3399FF;
								font-size: 28rpx;
								line-height: 32rpx;
								width: 400rpx;

								text {
									display: inline-block;
								}

								text:first-child {
									padding-right: 10rpx;
								}
							}

							.start.status1 {
								color: #3399FF;
							}

							.start.status2 {
								color: #F96F2B;
							}

							.to {
								margin: 0 30rpx;
							}

							.end {
								color: #F96F2B;
								font-size: 28rpx;
								line-height: 32rpx;

								text {
									display: inline-block;
								}

								text:first-child {
									padding-right: 10rpx;
								}
							}
						}
					}

					.bm {
						font-size: 20rpx;
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

					.bottom {
						padding-top: 20rpx;
						border-top: 2rpx solid #EEEEEE;
						font-size: 24rpx;
						color: #333;
						padding-right: 44rpx;
						padding-bottom: 22rpx;
						text-align: left;

						.info {}

						.text {
							padding-top: 22rpx;

							text:nth-of-type(1) {
								color: #333;
								font-size: 28rpx;
							}

							text:nth-of-type(2) {
								color: #999;
								font-size: 20rpx;
							}
						}
					}
				}
			}

		}
	}

	.iconfont {
		margin-left: 4rpx;
		font-size: 24rpx;
		transform: scale(0.5);
	}

	.iconfont.acitve {
		color: #3399FF !important;
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
</style>
