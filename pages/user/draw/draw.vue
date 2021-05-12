<template>
	<view class="page">
		<u-navbar back-text=""  title="提现" title-color="#ffffff" back-icon-color="#333" :background="{ background: '#0080FF' }" :borderBottom="false">
		</u-navbar>
		<view class="box">
			<view class="cont">
				<view class="conts te" @click="payShow = true">
					<view class="contslf">
						选择收款账户
					</view>
					<view class="contsct">
						<view class="u-flex u-row-right" v-if="type == 1">
							<icon class="iconfont iconweixin1" style="font-size: 40rpx;color: #19BE6B;"></icon>
							<view class="" style="width: 120rpx;">微信</view>
						</view>
						<view class="u-flex u-row-right" v-else-if="type == 2">
							<icon class="iconfont iconweixin2" style="font-size: 40rpx;color: #1677ff;"></icon>
							<view class="" style="width: 120rpx;">支付宝</view>
						</view>
						<view class="u-flex u-row-right" v-else-if="type == 3">
							<icon class="iconfont iconlingqianzhifu" style="font-size: 40rpx;color: #333;"></icon>
							<view class="" style="width: 130rpx;">银联支付</view>
						</view>
					</view>
					<view class="contsrt">
						<icon class="iconfont iconfanhui-you nineColor" style="font-size: 14rpx;"></icon>
					</view>
				</view>
			</view>
			<view class="cont u-margin-top-20 u-margin-buttom-20">
				<view class="conts u-padding-top-20">
					<view class="inText sixColor">
						收款账号
					</view>
					<view class=" u-flex u-row-right u-padding-right-30">
						<input type="text" placeholder="请输入您用来收款的账户" v-model="userHao" class="inText u-padding-right-20" style="position: relative;bottom: 10rpx;width: 400rpx;text-align: right;">
						<icon class="iconfont iconshuru" style="font-size: 40rpx;color: #999;position: relative;bottom: 10rpx;"></icon>
					</view>
				</view>
			</view>
			<view class="cont u-margin-top-20 u-margin-buttom-20">
				<view class="conts u-padding-top-20">
					<view class="inText sixColor">
						真实姓名
					</view>
					<view class=" u-flex u-row-right u-padding-right-30">
						<input type="text" placeholder="请输入您的真实姓名" v-model="userMin" class="inText u-padding-right-20" style="position: relative;bottom: 10rpx;width: 400rpx;text-align: right;">
						<icon class="iconfont iconshuru" style="font-size: 40rpx;color: #999;position: relative;bottom: 10rpx;"></icon>
					</view>
				</view>
			</view>
			<view class="cont u-margin-top-20 u-margin-buttom-20">
				<view class="conts u-padding-top-20">
					<view class="widthB">
						<view class="inText threeColor">提现金额</view>
						<view class="money u-flex u-margin-bottom-20" style="border-bottom: 2rpx solid #F5F5F5;" @click="moneyShow = true">
							<view class="three fontWeight" style="font-size: 50rpx;">￥</view>
							<input type="text" disabled maxlength="10" v-model="tiMoney" placeholder="请输入提现金额" style="font-size: 30rpx;" class="u-padding-left-40">
							<u-keyboard :mask="false" mode="number" @change="goodsHfChange" @backspace="goodsHfDelete" v-model="moneyShow"></u-keyboard>
						</view>
						<view class="u-flex u-row-between u-padding-right-20 u-margin-bottom-20">
							<view>当前可提现余额 {{money}}元</view>
							<view style="color: #F96F2B;" @click="ti">全部提现</view>
						</view>
					</view>
				</view>
			</view>
			<button class="submitBtnBlue btn u-margin-bottom-50" :class="userHao == '' || tiMoney == '' || userMin == ''?'submitBtnDDD':'submitBtnBlue'" :disabled="userHao == '' || tiMoney == '' || userMin == ''" @click="tixian">提现</button>
		</view>
		<view class="warp" v-show="payShow" @tap="dian">
			<view class="rect u-padding-bottom-80" @tap.stop>
				<view class="top u-padding-left-50 u-padding-top-20 u-padding-bottom-22 u-padding-right-50 u-flex u-row-between">
					<image src="../../../static/pic17.png" style="width: 20rpx;" mode="widthFix" @click="payShow = false"></image>
					<text class="u-font-xl fontWeight threeColor">请选择您的提现方式</text>
					<view></view>
				</view>
				<!-- <s class="twoS"></s>
				<view style="height: 80rpx;" class="u-flex u-row-center" data-index="weixin" @click="payMoney">
					<icon class="iconfont first iconweixin1" style="font-size: 40rpx;color: #3abf11;"></icon>
					<view class="u-margin-left-32" style="width: 150rpx;color:#000;text-align:left;">微信</view>
				</view> -->
				
				<s class="oneS" style="background: #f4f4f4;"></s>
				<view style="height: 80rpx;" class="u-flex u-row-center" data-index="zhifubao" @click="payMoney">
					<!-- iconweixin1 -->
					<icon class="iconfont first iconweixin2" style="font-size: 40rpx;color: #1677ff;"></icon>
					<view class="u-margin-left-32" style="width: 150rpx;color:#000;text-align:left;">支付宝</view>
				</view>
				<!-- <s class="oneS" style="background: #f4f4f4;"></s>
				<view style="height: 80rpx;" class="u-flex u-row-center" data-index="yinglian" @click="payMoney">
					<icon class="iconfont first iconlingqianzhifu" style="font-size: 40rpx;color: #333;"></icon>
					<view class="u-margin-left-32" style="width: 150rpx;color:#000;text-align:left;">银联支付</view>
				</view> -->
			</view>
		</view>
		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu" @click="btnShu">{{btnText}}</button>
			</view>
		</u-popup>
		<u-popup v-model="show1" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<!-- <text class="title" style="padding-top: 50rpx;font-size: 32rpx;">{{showErr1}}</text> -->
					<view class="err u-padding-left-50 u-padding-right-50" style="padding-top: 96rpx;">
						<view style="display:flex;justify-content: space-between;border-bottom: 1px solid #dddddd;">
							<text class="threeColor u-padding-top-20">提现金额：</text>
							<text class="threeColor" style="font-size: 60rpx;line-height: 80rpx;color: #333;font-weight: bold;">￥{{tis}}</text>
						</view>
					</view>
					<view class="u-padding-left-50 u-padding-right-50 u-padding-bottom-30 fffBackground u-flex u-row-between" style="padding-top: 46rpx;">
						<view class="threeColor">验证码：</view>
						<input type="number" style="width: 240rpx;text-align: left;padding-left: 30rpx;font-size: 30rpx;" placeholder-class="inputPlace" v-model="phoneCode" maxlength="6" placeholder="请输入验证码">
						<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
						<text class="masterColor tips" style="border-left: 1px solid #dddddd;padding-left: 20rpx;" @tap="getCode">{{tips}}</text>
					</view>
				</view>
				<button class="btnShu" :class="phoneCode == ''?'active':''" :disabled="phoneCode == ''" @click="btnShu1">{{btnText1}}</button>
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
				show1:false,
				showErr1:"",
				money:"",
				type:2,
				payShow:false,
				userHao:"",
				userMin:"",
				tiMoney:"",
				moneyShow:false,
				show:false,
				showErr:"",
				btnText:"确定",
				btnText1:"确认提现",
				tis:"",
				//提现成功失败blooean值
				tiBlooean:false,
				//验证码
				tips:"",
				seconds:"60",
				phoneCode:"",
				phone:""
			}
		},
		onLoad(option) {
			if(option.money){
				this.money = option.money
			}
		},
		onShow(){
			let data = {
				type:1
			}
			//#ifdef APP-PLUS
			let pinf = plus.push.getClientInfo()
			let cid = pinf.clientid;
			data.cid = cid
			//#endif
			ajax.get(config.ownerInfo_url,data).then(res => {
				console.log(res)
				if(res.code == 0){
					//res.data.availableBalance.toFixed(2)
					this.money = res.data.availableBalance.toFixed(2)
					this.phone = res.data.phone
				}
			}).catch(err => {
				//ajax.js反馈的reject结果
				console.log(err)
			})
		},
		methods: {
			//获取验证码
			getCode() {
				
				if(this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码',
					mask:true
					})
					ajax.get(config.code_url,{
					  phone:this.phone,
					  type:"7"
					}).then(res => {
					  console.log(res)
					  if(res.code == 0){
						  uni.hideLoading();
						  // 这里此提示会被this.start()方法中的提示覆盖
						  this.$u.toast('验证码将会发送到您的注册手机上');
						  // 通知验证码组件内部开始倒计时
						  this.$refs.uCode.start();
						  //后台给的验证码赋值this.phoneType.code 先写死1234
						  
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
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			//数字框
			goodsHfChange(val){
				 if(this.tiMoney.length <= 10){
					 if(val == '.'){
						 if(this.tiMoney.indexOf(".") != -1){
							 this.tiMoney = parseFloat(this.tiMoney)
							 this.tiMoney += ""
							 return
						 }
					 }
					 this.tiMoney += val
				 }
			},
			goodsHfDelete(){
				this.tiMoney += ""
				if(this.tiMoney){
					this.tiMoney = this.tiMoney.substr(0,this.tiMoney.length - 1)
				}
			},
			dian() {
				this.payShow = false
			},
			btnShu(){
				this.show = false
				if(this.tiBlooean){
					uni.redirectTo({
						url: "/pages/user/over/over"
					})
				}
			},
			btnShu1(){
				ajax.get(config.withdrawal_url, {
					phone: this.phone,
					code: this.phoneCode
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					if (res.code == 0) {
						uni.showLoading({
							title: "正在提现中,请稍后",
							mask: true
						})
						this.show1 = false
						//this.tis金额 this.userHao账号 去提现
						let moneyType = ''
						if (this.type == 2) {
							moneyType = "ALY_PAY"
						} else if (this.type == 1) {
							moneyType = "WEIXIN_PAY"
						} else if (this.type == 3) {
							moneyType = "UNION_PAY"
						}
						ajax.put(config.transferAccounts_url, {
							payType: moneyType,
							transferAccountsAmount: this.tis,
							payeeAccount: this.userHao,
							payeeRealName: this.userMin
						}).then(res => {
							console.log(res)
							uni.hideLoading()
							if (res.code == 0) {
								this.show = true
								this.tiBlooean = true
								this.showErr = "提现成功,请查收"
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
					}else if(res.code == -7003){
						uni.showToast({
							title:"验证码错误,请重新输入",
							icon:'none',
							duration:2000
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
			ti(){
				this.tiMoney = this.money
			},
			payMoney(e){
				let index = e.currentTarget.dataset.index
				console.log(index)
				if(index == "weixin"){
					this.type = 1
				}else if(index == "zhifubao"){
					this.type = 2
				}else if(index == "yinglian"){
					this.type = 3
				}
				this.payShow = false
			},
			tixian(){
				this.tis = Number(this.tiMoney)
				this.tis = this.tis.toFixed(2)
				console.log(this.tis)
				console.log(parseInt(this.money))
				if(this.tiMoney > Number(this.money)){
					this.show = true
					this.showErr = "余额不足"
					
				}else if(this.tis == "0.00"){
					this.show = true
					this.showErr = "提现金额不能是0.00"
				}else{
					if(this.type == 1){
						this.showErr1 = "将余额提现到微信账户"
					}else if(this.type == 2){
						this.showErr1 = "将余额提现到支付宝账户"
					}
					this.show1 = true
				}
				
			}
		}
	}	
</script>

<style scoped lang="less">
	
	.btn{
		position: absolute;
		bottom: 60rpx;
		left: 30rpx;
	}
	.warp{
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100%;
		background-color: rgba(0,0,0,.3);
		z-index: 2000;
		.box{
			width: 100%;
			height: 100vh;
			position: relative;
		}
		.rect{
			position: absolute;
			left: 0;
			bottom: 0;
			color: #fff;
			height: auto;
			margin: 0;
			background-color: #fff;
		}
	}
	.box{
		padding: 50rpx 30rpx 0;
		.cont{
			box-shadow: none;
			.conts.te{
				text-align: center;
				.contslf{
					width: 180rpx;
					font-size: 28rpx;
					color: #333;
					line-height: 38rpx;
					padding-top: 6rpx;
				}
				.contsct{
					width: calc(100% - 180rpx - 54rpx);
				}
				.contsrt{
					width: 54rpx;
					// bottom:12rpx;
					icon{
						
					}
				}
			}
		}
	}
	.showErr .btnShu.active{
		color: #a2a2a2;
	}
	
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
