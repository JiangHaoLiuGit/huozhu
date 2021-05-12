<template>
	<view class="page">
		<u-navbar title="" :isBack="false" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#0080FF' }">
			<!-- 发货平台 -->
			<view class="slot-wrap center u-flex u-row-between widthB u-padding-left-30 u-padding-right-30">
				<!--  class="u-margin-right-80" -->
				<icon class="iconfont iconfanhui" style="font-size: 30rpx;color: #333 ;" @click="tui"></icon>
				<!-- <image src="../../../static/pic17.png" style="width: 20rpx;" @click="tui" mode="widthFix"></image> -->
				<view class="title fffColor">{{title}}</view>
				<!-- 快速发货 -->
				<view class="title fffColor"></view>
			</view>
		</u-navbar>
		<view class="contentList">
			<view class="list list1">
				<view class="tp">
					<view class="status status1">
					</view>
					<view class="site">
						<view class="start">
							<text class="u-line-1">{{obj1.locat1.userCity}}</text>
							<text class="u-line-1">{{obj1.locat1.userQu}}</text>
						</view>
						<icon class="iconfont icondao to" style="font-size: 30rpx;"></icon>
						<view class="end" v-if="obj1.locat4 == '' ||obj1.locat4 == null">
							<text class="u-line-1">{{obj1.locat3.userCity}}</text>
							<text class="u-line-1">{{obj1.locat3.userQu}}</text>
						</view>
						<view class="end" v-else>
							<text class="u-line-1">{{obj1.locat4.userCity}}</text>
							<text class="u-line-1">{{obj1.locat4.userQu}}</text>
						</view>
					</view>
				</view>
				<view class="bm u-flex u-row-between">
					<view class="left">
						<text class="text1">运输总路程约为</text>
						<text class="text2">{{obj1.km}}公里</text>
					</view>
					<view class="right" @click="to(obj1.startJin,obj1.endJin)">
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
						<icon class="iconfont iconxiugai-hui" style="font-size: 22rpx;color: #3399FF;"></icon>
						<view class="u-margin-left-20" @click="xiu(1)">修改</view>
					</view>
				</view>
				<view class="bm">
					<view class="box boxNine">
						<view class="lt">{{obj1.dollStripText}}</view>
						<view class="rt u-line-1" style="font-size: 24rpx;">{{obj1.dollTimer.value}}装货</view>
					</view>
					<view v-if="obj1.dollStripType == 1">
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconzhuang" style="font-size: 48rpx;color: #0080FF;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.dollOriginArea1}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.dollOriginArea1}} {{obj1.dollEndArea1}}</view>
						</view>
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconxie" style="font-size: 48rpx;color: #f96f2b ;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.stripOriginArea1}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.stripOriginArea1}} {{obj1.stripEndArea1}}</view>
						</view>
					</view>
					<view v-else-if="obj1.dollStripType == 3">
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconzhuang" style="font-size: 48rpx;color: #0080FF;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.dollOriginArea1}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.dollOriginArea1}} {{obj1.dollEndArea1}}</view>
						</view>
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconzhuang" style="font-size: 48rpx;color: #0080FF;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.dollOriginArea2}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.dollOriginArea2}} {{obj1.dollEndArea2}}</view>
						</view>
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconxie" style="font-size: 48rpx;color: #f96f2b ;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.stripOriginArea1}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.stripOriginArea1}} {{obj1.stripEndArea1}}</view>
						</view>
					</view>
					<view v-else-if="obj1.dollStripType == 2">
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconzhuang" style="font-size: 48rpx;color: #0080FF;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.dollOriginArea1}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.dollOriginArea1}} {{obj1.dollEndArea1}}</view>
						</view>
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconxie" style="font-size: 48rpx;color: #f96f2b ;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.stripOriginArea1}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.stripOriginArea1}} {{obj1.stripEndArea1}}</view>
						</view>
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconxie" style="font-size: 48rpx;color: #f96f2b ;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.stripOriginArea2}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.stripOriginArea2}} {{obj1.stripEndArea2}}</view>
						</view>
					</view>
					<view v-else-if="obj1.dollStripType == 4">
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconzhuang" style="font-size: 48rpx;color: #0080FF;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.dollOriginArea1}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.dollOriginArea1}} {{obj1.dollEndArea1}}</view>
						</view>
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconzhuang" style="font-size: 48rpx;color: #0080FF;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.dollOriginArea2}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.dollOriginArea2}} {{obj1.dollEndArea2}}</view>
						</view>
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconxie" style="font-size: 48rpx;color: #f96f2b ;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.stripOriginArea1}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.stripOriginArea1}} {{obj1.stripEndArea1}}</view>
						</view>
						<view class="box boxThree te">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconxie" style="font-size: 48rpx;color: #f96f2b ;"></icon></view>
							<view class="rt u-line-1" style="font-size:32rpx;">{{obj1.stripOriginArea2}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{obj1.stripOriginArea2}} {{obj1.stripEndArea2}}</view>
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
						<icon class="iconfont iconxiugai-hui" style="font-size: 22rpx;color: #3399FF;"></icon>
						<view class="u-margin-left-20" @click="xiu(2)">修改</view>
					</view>
				</view>
				<view class="bm">
					<view class="box">
						<view class="lt boxNine">名称类型</view>
						<view class="rt u-line-1">{{obj2.goodsName}} {{obj2.goodsType}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">重量体积</view>
						<view class="rt u-line-1">{{obj2.goodsWeight}}吨 {{obj2.goodsSize}}方</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">包装方式</view>
						<view class="rt u-line-1">{{obj2.goodsPack}}</view>
					</view>
				</view>
			</view>
			
			<view class="list list2">
				<view class="tp u-flex">
					<view class="lt">
						车辆信息
					</view>
					<view class="rt u-flex">
						<icon class="iconfont iconxiugai-hui" style="font-size: 22rpx;color: #3399FF;"></icon>
						<view class="u-margin-left-20" @click="xiu(3)">修改</view>
					</view>
				</view>
				<view class="bm">
					<view class="box">
						<view class="lt boxNine">用车类型</view>
						<view class="rt u-line-1">{{obj3.goodsCarTypes}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">装货车型</view>
						<view class="rt u-line-1">{{obj3.goodsCarType}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">装货车长</view>
						<view class="rt u-line-1">{{obj3.goodsCarSize}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">占用车长</view>
						<view class="rt u-line-1">{{obj3.carLength}}米</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">服务要求</view>
						<view class="rt u-line-1" v-if="obj3.goodsCarServe == ''">无</view>
						<view class="rt u-line-1" v-else>{{obj3.goodsCarServe}}</view>
					</view>
				</view>
			</view>
			
			<view class="list list2">
				<view class="tp u-flex">
					<view class="lt">
						支付信息
					</view>
					<view class="rt u-flex">
						<icon class="iconfont iconxiugai-hui" style="font-size: 22rpx;color: #3399FF;"></icon>
						<view class="u-margin-left-20" @click="xiu(4)">修改</view>
					</view>
				</view>
				<view class="bm">
					<view class="box">
						<view class="lt boxNine">运输费用</view>
						<view class="rt u-line-1 u-flex">
							<view class="u-margin-right-15">{{obj4.haulMoney}}元/趟</view>  
							<text v-if="obj4.haulMoneyType ==1">到付</text>
							<text v-else>回单付</text>
						</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">定金支付</view>
						<view class="rt u-line-1 u-flex">
							<view class="u-margin-right-15">{{obj4.haulFrontMoney}}元</view>  
						
							<text v-if="obj4.haulFrontMoneyType ==1"> 退还</text>
							<text v-else> 不退还</text>
						</view>
					</view>
					<view class="box boxThree" v-if="obj4.haulDriver.name != '' && obj4.haulDriver.name != undefined">
						<view class="lt boxNine">指定司机</view>
						<view class="rt u-line-1">{{obj4.haulDriver.name}}</view>
					</view>
					<view class="box boxThree" style="align-items:baseline;min-height: 46rpx;height:auto">
						<view class="lt boxNine">备注信息</view>
						<view class="rt u-line-1" v-if="obj4.haulFrontRemark == ''">无</view>
						<view class="rt" style="height:auto" v-else>{{obj4.haulFrontRemark}}</view>
					</view>
				</view>
			</view>
			
		</view>
		<u-popup v-model="show1" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr1}}</text>
				</view>
				<view class="u-flex u-row-between">
					<button class="btnShu masterColor" @click="btnShu1" style="width: 50%;border-radius: 0;">确认退出</button>
					<button class="btnShu" @click="show1 = false" style="width: 50%;border-left: 2rpx solid #ddd;border-radius: 0;color: #333;">暂不退出</button>
				</view>
			</view>
		</u-popup>
		<button class="btn submitBtnBlue" @click="forms">{{btnTitle}}</button>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				show1:false,
				showErr1:"一旦退出,内容将会被清空",
				title:"核实货源信息",
				obj1:{},
				obj2:{},
				obj3:{},
				obj4:{},
				id:"",
				list:[],
				orderId:"",
				btnTitle:"确认发布"
			}
		},
		onLoad(option) {
			if(option.orderId){
				this.orderId = option.orderId
				this.title = "修改货源"
				this.btnTitle = "确认修改"
			}
		},
		onShow(){
			this.obj1 = this.$store.state.shipFirst
			this.obj2 = this.$store.state.shipSecond
			this.obj3 = this.$store.state.shipThird
			// goodsCarType goodsCarSize goodsCarServe
			this.obj4 = this.$store.state.shipFourth
			console.log("找bug")
			console.log(this.obj1)
			
			console.log(this.obj2)
			console.log(this.obj3)
			console.log(this.obj4)
		},
		methods: {
			btnShu1(){
				this.show1 = false
				uni.reLaunch({
					url:"/pages/goods/sendGoods/sendGoods"
				})
			},
			tui(){
				// uni.navigateBack({
				// 	delta: 3
				// })
				this.show1 = true
			},
			forms(){
				let loadingAddres = []
				
				if(this.obj1.locat1 != ''){
					let locat = {}
					let obj = this.obj1.locat1
					let jin = obj.location.split(",")
					locat.provinceId = obj.idArr[0]
					locat.cityId = obj.idArr[1]
					locat.areaId = obj.idArr[2]
					locat.address = obj.name + obj.address
					locat.lat = jin[0]
					locat.lnt = jin[1]
					locat.type = "1"
					loadingAddres.push(locat)
				}
				if(this.obj1.locat2 != ''){
					let locat = {}
					let obj = this.obj1.locat2
					let jin = obj.location.split(",")
					locat.provinceId = obj.idArr[0]
					locat.cityId = obj.idArr[1]
					locat.areaId = obj.idArr[2]
					locat.address = obj.name + obj.address
					locat.lat = jin[0]
					locat.lnt = jin[1]
					locat.type = "1"
					loadingAddres.push(locat)
				}
				if(this.obj1.locat3 != ''){
					let locat = {}
					let obj = this.obj1.locat3
					let jin = obj.location.split(",")
					locat.provinceId = obj.idArr[0]
					locat.cityId = obj.idArr[1]
					locat.areaId = obj.idArr[2]
					locat.address = obj.name + obj.address
					locat.lat = jin[0]
					locat.lnt = jin[1]
					locat.type = "2"
					loadingAddres.push(locat)
				}
				if(this.obj1.locat4 != ''){
					let locat = {}
					let obj = this.obj1.locat4
					let jin = obj.location.split(",")
					locat.provinceId = obj.idArr[0]
					locat.cityId = obj.idArr[1]
					locat.areaId = obj.idArr[2]
					locat.address = obj.name + obj.address
					locat.lat = jin[0]
					locat.lnt = jin[1]
					locat.type = "2"
					loadingAddres.push(locat)
				}
				loadingAddres = JSON.stringify(loadingAddres)
				console.log(loadingAddres)
				//自定义车长
				let dingyi = ""
				let time = ""
				let time1 = ""
				time = this.obj1.dollTimer.value
				if(this.obj1.stripTimer != "" && this.obj1.stripTimer != undefined){
					time1 = this.obj1.stripTimer.value
				}
				let driverType = 0
				let driverPhone = ""
				if(this.obj4.haulDriver.id != "" && this.obj4.haulDriver.id != undefined){
					driverType = 1
					driverPhone = this.obj4.haulDriver.id
				}
				let source = "0"
				if(this.obj4.haulYuanBlean){
					source = "1"
				}
				//判断自定义车长
				// if(this.obj3.goodsCarSizeId[0] == "999"){
				// 	this.obj3.goodsCarSizeId = ""
				// 	let chang = this.obj3.goodsCarSize.split(" ")
				// 	dingyi = chang[1]
				// }
				if(this.obj3.goodsCarSize.substring(0,3) == "自定义"){
					dingyi = this.obj3.goodsCarSizeId
					this.obj3.goodsCarSizeId = ""
				}
				let beizhu = ''
				if(this.obj4.haulFrontRemark){
					beizhu = this.obj4.haulFrontRemark
				}
				
				
				let formData = {
					loadingAddresss:loadingAddres,//装卸信息列表+++
					handlingType:this.obj1.dollStripType,//装卸类型  1:一装一卸,2:一装两卸,3:两装一卸,4:两装两卸 +++
					appointedTime:time,//约定装货时间 ++
					unloadingTime:time1,//约定卸货时间 ++
					kilometers:this.obj1.km,//公里数 +++
					//第二步
					//货物名称
					weight:this.obj2.goodsWeight,//重量 +++ 
					volume:this.obj2.goodsSize,//体积 +++
					goodsTypeId:this.obj2.goodsTypeId,//货物类型id +++
					packagingTypeId:this.obj2.goodsPackId,//包装方式id +++
					//第三步:
					vehicleType:this.obj3.goodsCarTypesId,//用车类型 +++
					cargorCarMode:this.obj3.goodsCarTypeId,//车型 +++
					cargorCarConductor:this.obj3.goodsCarSizeId,//车长 +++
					occupyCarLength:this.obj3.carLength,//车长 +++
					service:this.obj3.goodsCarServeId,//服务与备注：[1,2,3] +++
					//第四步：
					freight:this.obj4.haulMoney,//运费 +++
					paymentMethod:this.obj4.haulMoneyType,//支付方式 1:到付,2:回单付 +++
					namedCarrier:driverType,//是否制定承运人 1:是，0:否 +++
					driverUsername:driverPhone,//承运司机id +++
					deposit:this.obj4.haulFrontMoney,//定金+++
					refundMethod:this.obj4.haulFrontMoneyType,//定金退款方式 1:退还,2:不退还 +++
					billingMethod:"1",//发票 +++
					remark:beizhu,//备注
					//暂时写死的
					freightInsurance:"2",//运费险 1:购买，2:不购买 +++
					occupyConductor:dingyi,//占用车长 +++
					sourceGoods:source,
					name:this.obj2.goodsName
				}
				console.log(formData)
				if(this.orderId == ""){
					uni.showLoading({
						title:"正在新增",
					mask:true
					})
					ajax.post(config.cargoAdd_url,formData).then(res => {
						console.log(res)
						if(res.code == 0){
							uni.hideLoading()
							uni.showToast({
								title:"新增成功",
								duration:2000,
								icon:"success",
								mask:true
							})
							setTimeout(()=> {
								uni.reLaunch({
									url:"/pages/goods/sendGoods/sendGoods"
								})
							},2000)
						}else{
							uni.showToast({
								title:res.msg,
								icon:'none',
								duration:2000
							})
						}
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}else{
					uni.showLoading({
						title:"正在修改",
						mask:true
					})
					formData.id = this.orderId
					let text = this.obj3.goodsCarSize
					//
					
					if(text.substring(0,1) == "自"){
						formData.cargorCarConductor = ""
						formData.occupyConductor = this.obj3.goodsCarSizeId
					}
					ajax.put(config.cargoEdit_url,formData).then(res => {
						console.log(res)
						if(res.code == 0){
							uni.hideLoading()
							uni.showToast({
								title:"修改成功",
								duration:2000,
								icon:"success",
								mask:true
							})
							this.$store.commit("getEditObj", '')
							setTimeout(()=> {
								uni.reLaunch({
									url:"/pages/goods/sendGoods/sendGoods"
								})
							},2000)
						}else{
							uni.hideLoading()
							uni.showToast({
								title:res.msg,
								duration:2000,
								icon:"none",
								mask:true
							})
						}
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}
				
			},
			xiu(index){
				console.log(index + "去修改")
				this.$store.commit("getLocat","")
				if(this.orderId != ""){
					uni.navigateTo({
						url:"/pages/goods/ship/ship?type=1&next="+index+"&orderId=" + this.orderId
					})
				}else{
					uni.navigateTo({
						url:"/pages/goods/ship/ship?type=1&next="+index
					})
				}
				
			},
			to(x,y){
				let loadingAddres = []
				
				if(this.obj1.locat1 != ''){
					let locat = {}
					let obj = this.obj1.locat1
					let jin = obj.location.split(",")
					locat.provinceId = obj.idArr[0]
					locat.cityId = obj.idArr[1]
					locat.areaId = obj.idArr[2]
					locat.address = obj.name + obj.address
					locat.lat = jin[0]
					locat.lnt = jin[1]
					locat.type = "1"
					loadingAddres.push(locat)
				}
				if(this.obj1.locat2 != ''){
					let locat = {}
					let obj = this.obj1.locat2
					let jin = obj.location.split(",")
					locat.provinceId = obj.idArr[0]
					locat.cityId = obj.idArr[1]
					locat.areaId = obj.idArr[2]
					locat.address = obj.name + obj.address
					locat.lat = jin[0]
					locat.lnt = jin[1]
					locat.type = "1"
					loadingAddres.push(locat)
				}
				if(this.obj1.locat3 != ''){
					let locat = {}
					let obj = this.obj1.locat3
					let jin = obj.location.split(",")
					locat.provinceId = obj.idArr[0]
					locat.cityId = obj.idArr[1]
					locat.areaId = obj.idArr[2]
					locat.address = obj.name + obj.address
					locat.lat = jin[0]
					locat.lnt = jin[1]
					locat.type = "2"
					loadingAddres.push(locat)
				}
				if(this.obj1.locat4 != ''){
					let locat = {}
					let obj = this.obj1.locat4
					let jin = obj.location.split(",")
					locat.provinceId = obj.idArr[0]
					locat.cityId = obj.idArr[1]
					locat.areaId = obj.idArr[2]
					locat.address = obj.name + obj.address
					locat.lat = jin[0]
					locat.lnt = jin[1]
					locat.type = "2"
					loadingAddres.push(locat)
				}
				loadingAddres = JSON.stringify(loadingAddres)
				console.log(loadingAddres)
				console.log(this.obj1.km)
				uni.navigateTo({
					url:"/pages/order/amap/amap?arr=" + loadingAddres + "&long=" + this.kilometers
				})
			}
			
		}
	}	
</script>

<style scoped lang="less">
	.rt.te{
		margin-left: 190rpx;
	}
	.boxThree.te .lt{
		padding-top:20rpx;
	}
	.btn{
		margin-top: 86rpx;
		margin-bottom: 50rpx;
	}
	//.page .suggestBottom
	.contentList{
		width: 100%;
		padding:0 30rpx 40rpx 30rpx;
		.list.list1{
			background-color: #fff;
			border-radius: 8rpx;
			box-shadow: 0px 2px 8px #C8C8C8;
			margin-top: 20rpx;
			.tp{
				padding: 26rpx 20rpx;
				display: flex;
				justify-content:start;
				.status{
					width: 20rpx;
					height: 20rpx;
					text-align: center;
					margin-top: 6rpx;
					font-size: 20rpx;
					line-height: 34rpx;
					border-radius: 20rpx;
					color: #F8F8F8;
				}
				.status.status1{
					background-color: #FC441C;
				}
				.site{
					height: 32rpx;
					padding-left: 20rpx;
					display: flex;
					justify-content:start;
					.start{
						color: #3399FF;
						font-size: 34rpx;
						line-height: 34rpx;
						text{
							display: inline-block;
							max-width:125rpx;
						}
						text:first-child{
							padding-right: 10rpx;
						}
					}
					.to{
						margin: 0 30rpx;
					}
					.end{
						color: #F96F2B;
						font-size: 32rpx;
						line-height: 34rpx;
						text{
							max-width:125rpx;
							display: inline-block;
						}
						text:first-child{
							
						}
					}
				}
			}
			.bm{
				font-size: 24rpx;
				padding: 0 30rpx 20rpx;
				.left{
					.text1{
						color: #999999;
					}
					.text2{
						color: #333333;
					}
				}
				.right{
					color: #F96F2B;
				}
			}
		}
		.list.list2{
			background-color: #fff;
			border-radius: 8rpx;
			box-shadow: 0px 2px 8px #C8C8C8;
			margin-top: 20rpx;
			padding: 20rpx 0 2rpx 20rpx;
			.tp{
				padding-right: 40rpx;
				justify-content: space-between;
				height: 60rpx;
				border-bottom:2rpx solid #eee;
				.lt{
					font-size: 32rpx;
					color: #333;
				}
				.rt{
					font-size: 24rpx;
					
					color: #3399FF;
				}
			}
			.bm{
				font-size: 24rpx;
				margin-top: 16rpx;
				.box{
					color: #333;
					margin-bottom: 20rpx;
					display: flex;
					justify-content: start;
					align-items: center;
					height: 46rpx;
					flex-wrap: wrap;
					.lt{
						width: 120rpx;
						margin-right: 70rpx;
						image{
							margin-left: 28rpx;
						}
					}
					.rt{
						width: 440rpx;
						font-size: 28rpx;
					}
				}
				.boxNine{
					color: #999;
				}
				
			}
			
		}
	}
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
