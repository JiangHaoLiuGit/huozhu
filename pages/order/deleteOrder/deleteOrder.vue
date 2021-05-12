<template>
	<view class="orderRate">
		<u-navbar back-text="" title-color="#ffffff" title="取消订单" :background="{ background: '#0080FF' }" :border-bottom="false"></u-navbar>
		<view class="box">
			<view class="cont u-flex u-row-between u-padding-left-20 u-padding-right-30" style="height: 74rpx;" v-if="type == 1">
				<text class="u-font-xss nineColor">过错方</text>
				<view class="u-flex">
					<view class="textRight u-font-xss u-margin-top-6 sixColor" style="width: 400rpx;" @click="rencuo">
						{{ren}}
					</view>
					<view class="u-font-xss sixColor u-margin-left-16"></view>
				</view>
			</view>
			<view class="cont u-flex u-row-between u-padding-left-20 u-padding-right-30" style="height: 74rpx;" v-if="ren != '请选择过错方' && ren != '正常终止'">
				<text class="u-font-xss nineColor">补偿金额</text>
				<view class="u-flex">
					<input type="number" maxlength="7" class="textRight u-font-xss u-margin-top-6" v-model="yuan" placeholder-style="font-size:28rpx"
					 placeholder="请输入补偿金额 ">
					<view class="u-font-xss sixColor u-margin-left-16">元</view>
				</view>
			</view>
			<view style="min-height: 910rpx;">
				<view class="cont">
					<view style="height: 74rpx;" class="u-padding-left-20 u-border-bottom u-flex nineColor u-font-xss">
						请选择取消订单的原因
					</view>
					<view class="u-padding-left-20">
						<view style="height: 74rpx;" v-for="(item,index) in list" class="points u-row-between u-padding-right-30 u-border-bottom u-flex nineColor u-font-xss"
						 @click="haulMoneyType = index">
							<view class="textView" @click="cli(item)">{{item.name}}</view>
							<view :class="haulMoneyType === index?'boxs active':'boxs'" @click="cli(item)">
								<view></view>
							</view>
						</view>
						<view style="flex-wrap:wrap;" class="points u-row-between u-padding-right-30 u-border-bottom u-flex nineColor u-font-xss"
						 @click="haulMoneyType = 99">
							<view class="textView u-padding-top-20 u-padding-bottom-20" @click="haulMoneyType = 99">其它</view>
							<view :class="haulMoneyType == 99?'boxs active':'boxs'" class="" @click="haulMoneyType = 99">
								<view></view>
							</view>
							<view class="qita u-flex u-margin-bottom-20" v-if="haulMoneyType == 99">

								<icon class="iconfont iconshuru to" style="font-size: 30rpx;"></icon>
								<textarea v-model="qita" maxlength="100" placeholder="请简单描述您删除货源的原因" />
								</view>

						</view>
					</view>
				</view>
			</view>
			
		</view>
		<u-popup v-model="show" borderRadius="20" mode="center" :zoom="false" :duration="0" :closeable="true" :maskCloseAble="false">
			<view class="showErr state1">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu masterColor" @click="btnShu()">{{btnText1}}</button>
				<button class="btnShu" @click="show = false">{{btnText2}}</button>
			</view>
		</u-popup>
		<view class="rateButton u-margin-top-60" v-if="type == 1" >
			<button class="btn" v-if="ren == '正常终止'" :class="haulMoneyType == -1 || ren == '请选择过错方'?'submitBtnDDD':'submitBtnBlue'" :disabled="haulMoneyType == -1 || ren == '请选择过错方'" @click="getRateList()">确认取消</button>
			<button class="btn" v-else :class="haulMoneyType == -1 || ren == '请选择过错方' || yuan == ''?'submitBtnDDD':'submitBtnBlue'" :disabled="haulMoneyType == -1 || ren == '请选择过错方' || yuan == ''" @click="getRateList()">确认取消</button>
		</view>
		<view class="rateButton u-margin-top-60" v-else >
			<button class="btn" :class="haulMoneyType == -1?'submitBtnDDD':'submitBtnBlue'" :disabled="haulMoneyType == -1" @click="getRateList()">确认取消</button>
		</view>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				show: false,
				showErr: "请确认是否删除,一旦确认无法恢复",
				btnText1: "确认删除",
				btnText2: "暂不删除",

				orderId:"",
				haulMoneyType:-1,
				yuan:"",
				qita:"",
				//过错方
				ren:"请选择过错方",
				type:1,
				list:[
					{
						name:"厂家货没出来/临时不发货",
						id:"1"
					},
					{
						name:"已找到其他车辆",
						id:"2"
					},
					{
						name:"发货时资料填写有误",
						id:"3"
					},
					{
						name:"未告知司机有禁区",
						id:"4"
					},
					{
						name:"司机车辆和要求不符",
						id:"5"
					},
					{
						name:"司机车辆被限行（已告知有禁区）",
						id:"6"
					},
					{
						name:"司机要求加价",
						id:"7"
					},
					{
						name:"司机迟到、爽约",
						id:"8"
					}
					
				],
				blean:false
			}
		},
		onLoad(option){
			if(option.id){
				this.orderId = option.id
			}
			if(option.ids){
				this.type = 2
				this.orderId = option.ids
			}
			if(option.blean){
				this.blean = option.blean
				ajax.get(config.ship_url + "/" + option.id + "/cargo-owner-order",{
				}).then(res => {
					//订单详情
					console.log(res)
					if(res.code == 0){
						if(res.data.refundLiability){
							if(res.data.refundLiability == "1"){
								this.ren = "货主"
							}else if(res.data.refundLiability == "2"){
								console.log("wodiu")
								this.ren = "承运人"
							}else if(res.data.refundLiability == "3"){
								this.ren = "正常终止"
							}
							if(res.data.refundAmount){
								this.yuan = res.data.refundAmount
							}
						}
						let yuan = res.data.canceReasonsName
						for(let i = 0 ; i < this.list.length ; i ++){
							if(this.list[i].name == yuan){
								this.haulMoneyType = Number(this.list[i].id-1)
							}
						}
						if(this.haulMoneyType == -1){
							this.haulMoneyType = 99
							this.qita = yuan
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
		onShow(){
			ajax.get(config.canceReasons_url, {
			}).then(res => {
				console.log("取消原因")
				console.log(res)
				if (res.code == 0) {
					this.list = res.data
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
		methods: {
			rencuo(){
				let _this = this
				uni.showActionSheet({
				    itemList: ['货主', '承运人', '正常终止'],
				    success: function (res) {
				        if(res.tapIndex + 1 == 1){
							_this.ren = "货主"
						}else if(res.tapIndex + 1 == 2){
							_this.ren = "承运人"
						}else if(res.tapIndex + 1 == 3){
							_this.ren = "正常终止"
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			cli(item){
				this.haulMoneyType = item.id
				console.log(this.haulMoneyType)
			},
			//确认删除
			btnShu() {
				this.show = false
				uni.showLoading({
					title:"正在取消中...",
					mask:true
				})
				let yuanyin = ""
				if(this.haulMoneyType == 99){
					yuanyin = this.qita
				}else{
					yuanyin = this.list[this.haulMoneyType].name
				}
				let yuan = this.yuan
				if(yuan == ""){
					yuan = 0
				}
				let ren = ''
				console.log(this.ren)
				if(this.ren != '请选择过错方'){
					
					if(this.ren == '货主'){
						ren = 1
					}else if(this.ren == '承运人'){
						ren = 2
					}else if(this.ren == '正常终止'){
						ren = 3
					}
				}
				if(ren == 3){
					yuan = 0
				}
				ajax.dele(config.orderList_url + `/${this.orderId}/cancel`,{
					refundAmount: yuan,
					canceReasonsName: yuanyin,
					refundLiability:ren
				}).then(res => {
					if(res.code == 0){
						console.log(res)
						this.show = false
						uni.hideLoading()

						uni.showToast({title:"取消成功",icon: "none",mask:true,duration:2000})
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/goods/sendGoods/sendGoods"
							})
							// uni.navigateBack()
						},2000)
					} else {
						uni.hideLoading()
						uni.showToast({title:"取消失败",icon: "none",duration:2000})
					}
				}).catch(err => {
					console.log("获取评价列表数据返回失败 error is :" + err);
				})
			},
			// 点击确认取消
			getRateList() {
				
				console.log(this.haulMoneyType)
				if(this.qita == "" && this.haulMoneyType == 99){
					uni.showToast({title:"请填写具体原因",icon: "none",duration:2000})
					return
				}else if(this.qita != "" && this.haulMoneyType == 99){
					var reg=/^[\u4e00-\u9fa5\u3001\A-\Z\d]+$/
					if (reg.test(this.qita)){
						
					}else{
						uni.showToast({title:"取消原因只能是中文",icon: "none",duration:2000})
						return
					}
				}
				this.showErr = "请确认是否取消,一旦确认无法恢复"
				this.btnText1 = "确认取消"
				this.btnText2 = "暂不取消"
				this.show = true
				
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.box{
		padding: 0 30rpx;
		.cont{
			margin: 20rpx 0;
		}
	}
	.qita{
		justify-content: start;
		align-items: end;
		width: 100%;
		min-height: 162rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
		border: 2rpx solid #eee;
		textarea{
			width: 500rpx;
			min-height: 150rpx;
			padding-left: 20rpx;
			font-size: 24rpx;
		}
	}
	.points{
		.textView{
			padding-left: 14rpx;
			color: #666666;
			font-size: 24rpx;
			line-height: 32rpx;
		}
		.boxs{
			width: 20rpx;
			height: 20rpx;
			border: 2rpx solid #999;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			view{
				width: 12rpx;
				height: 12rpx;
				background-color: #f8f8f8;
				border-radius: 50%;
			}
		}
		.boxs.active{
			border-color: #F96F2B;
			view{
				background-color: #F96F2B;
			}
		}
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
