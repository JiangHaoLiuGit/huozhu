<template>
	<view class="page">
		<u-navbar back-text="" title="联系电话" title-color="#ffffff" back-icon-color="#333" :background="{ background: '#0080FF' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">
				<icon class="iconfont iconshezhi"></icon>
			</view> -->
		</u-navbar>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		
		
		<view class="u-margin-top-40" v-if="type == 2">
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-28 fffBackground u-flex">
				<view class="title sixColor inText ">手机号码</view>
				<input type="number" maxlength="11" style="font-size: 28rpx;width: 400rpx;" v-model="editPhone" placeholder="输入您将要添加的手机号">
			</view>
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
				<view class="title sixColor inText ">验证码</view>
				<input type="number" style="width: 300rpx;" placeholder-class="inputPlace" v-model="phoneCode1" maxlength="6" placeholder="请输入验证码">
				<u-line color="#bbb" style="height: 50rpx; width: 2rpx;" direction='col' />
				<u-verification-code :seconds="seconds1" @end="end1" @start="start1" ref="uCode" 
						@change="codeChange1"></u-verification-code>
				<text class="masterColor tips" @tap="getCode1">{{tips1}}</text>
			</view>
		</view>
		<view class="contx u-margin-top-40" v-else-if="type == 1">
			<view class="cont">
				<view class="conts" v-for="(item,index) in phoneList" :key="index" v-if="phoneList.length > 0">
					<view class="contslf">
						{{item.phone}}
					</view>
					<view class="contsct">
					</view>
					<view class="contsrt" @click="delet(item.id,item.phone)" v-if="phoneList.length > 1"><icon class="iconfont right iconshanchu-hong"></icon></view>
				</view>
				<view class="conts" v-if="sbBlean">
					<view class="contslf nineColor" style="width: 400rpx;color: #999;" >
						当前暂无联系电话
					</view>
					<view class="contsct" style="width: 0;">
					</view>
					<view class="contsrt"></view>
				</view>
			</view>
			<view class="texts u-flex u-margin-top-20">
				<view class="block u-margin-right-10 borderRadius" style="width: 8rpx;height: 8rpx; background-color: #999999;"></view>
				<view class="text nineColor" style="font-size: 20rpx;">最多添加5个联系电话</view>
			</view>
		</view>
		<button class="u-margin-bottom-20 u-margin-top-30" :class="phoneCode1 == '' || editPhone == ''?'btnTypeTwo active':'btnTypeTwo'" v-if="type == 2" :disabled="phoneCode1 == '' || editPhone == ''" @click="to3">确定添加</button>
		<button class="u-margin-bottom-20 u-margin-top-30 btnTypeTwo" v-else-if="type == 1" @click="to4">添加联系电话</button>
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
			<view class="showErr showErr1">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr1}}</text>
				</view>
				<button class="btnShu masterColor" @click="btnShu1">确认删除</button>
				<button class="btnShu" @click="show1 = false">暂不删除</button>
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
				//修改手机号
				editPhone:"",
				phone:"",
				//验证码
				tips:"",
				tips1:"",
				seconds:"60",
				seconds1:"60",
				phoneCode:"",
				phoneCode1:"",
				boxBlean:false,
				show:false,
				show1:false,
				showErr:"",
				showErr1:"",
				btnText:"",
				truePhone:"",
				type:1,
				phoneList:[],
				sbBlean:false,
				phoneId:"",
				obj:{}
			}
		},
		onLoad(option) {
			
			ajax.get(config.userPhone_url,{
			}).then(res => {
				console.log(res)
				if(res.code == 0){
					this.phoneList = res.data
					if(this.phoneList.length > 0){
						for(let i = 0 ; i < this.phoneList.length ; i ++){
							this.phoneList[i].phones = this.phoneList[i].phone.slice(0,3) + "****" + this.phoneList[i].phone.slice(7,11)
						}
					}else{
						this.sbBlean = true
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
			
			if(option.phone){
				let phone = option.phone
				this.phone = phone.slice(0,3) + "****" + phone.slice(7,11)
				this.truePhone = option.phone
			}
		},
		methods: {
			btnShu(){
				this.show = false
			},
			btnShu1(){
				this.show1 = false
				console.log(this.phoneId)
				if(parseInt(this.phoneId) > 0){
					ajax.dele(config.userPhone_url+"/"+this.phoneId,{
						id:this.phoneId
					}).then(res => {
						console.log(res)
						if(res.code == 0){
							// this.phoneList = res.data.contactPhone
							this.type = 1
							this.phoneCode1 = ''
							this.editPhone = ''
							this.show = true
							this.showErr = "删除成功"
							this.btnText = "好的"
							ajax.get(config.userPhone_url,{
							}).then(res => {
								console.log(res)
								if(res.code == 0){
									this.phoneList = res.data
									this.type = 1
									if(this.phoneList.length > 0){
										for(let i = 0 ; i < this.phoneList.length ; i ++){
											this.phoneList[i].phones = this.phoneList[i].phone.slice(0,3) + "****" + this.phoneList[i].phone.slice(7,11)
										}
									}else{
										this.sbBlean = true
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
				}else{
					this.show = true
					this.showErr = "该手机号id不存在"
					this.btnText = "我知道了"
				}
				
				//
			},
			delet(id,phone){
				// if(phone == this.obj.phone){
				// 	this.show = true
				// 	this.showErr = "原手机号联系电话不能删除"
				// 	this.btnText = "重新选择"
				// 	return 
				// }
				this.phoneId = id
				this.show1 = true
				this.showErr1 = "删除后不可恢复，确定要继续吗？"
			},
			to3(){
				
				ajax.post(config.userPhone_url,{
					code:this.phoneCode1,
					phone:this.editPhone
				}).then(res => {
				  console.log(res)
				  if(res.code == 0){
					  //重新加载数据
					  ajax.get(config.userPhone_url,{
					  }).then(res => {
					  	console.log(res)
					  	if(res.code == 0){
					  		this.phoneList = res.data
					  		this.type = 1
							this.phoneCode1 = ''
							this.editPhone = ""
					  		if(this.phoneList.length > 0){
					  			for(let i = 0 ; i < this.phoneList.length ; i ++){
					  				this.phoneList[i].phones = this.phoneList[i].phone.slice(0,3) + "****" + this.phoneList[i].phone.slice(7,11)
					  			}
					  		}else{
					  			this.sbBlean = true
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
				  }else{
					  this.show = true
					  this.showErr = res.msg
					  this.btnText = "重新输入"
				  }
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
				
			},
			//点击通过的确定
			to4(){
				this.type = 2
			},
			//点击失败的确定
			to5(){
				//再加一个手机号 
				uni.navigateTo({
					url: "/pages/user/userDeityan/userDeityan?phone="+this.truePhone
				})
			},
			codeChange(text) {
				console.log("第一个")
				console.log(text)
				this.tips = text;
			},
			getCode1() {
				if(this.$refs.uCode.canGetCode) {
					if(this.editPhone.length == 11){
						if(!(/^1[123456789]\d{9}$/.test(this.editPhone))) {
							this.show = true
							this.showErr = "手机号格式不正确"
							this.btnText = "重新输入"
							return
						}
						uni.showLoading({
							title: '正在获取验证码',
					mask:true
						})
						ajax.get(config.code_url,{
						  phone:this.editPhone,
						  type:"5"
						}).then(res => {
						  console.log(res)
						  if(res.code == 0){
							  uni.hideLoading();
							  // 这里此提示会被this.start()方法中的提示覆盖
							  this.$u.toast('验证码已发送');
							  // 通知验证码组件内部开始倒计时
							  this.$refs.uCode.start();
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
					}else{
						this.show = true
						this.showErr = "手机号格式不正确"
						this.btnText = "重新输入"
					}
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange1(text) {
				this.tips1 = text;
			},
			end() {
				
			},
			start() {
				
			},
			end1() {
				
			},
			start1() {
				
			}
		}
	}	
</script>

<style scoped lang="less">
	
	.contsrt{
		position: relative;
		right: 20rpx;
		icon{
			color: #FC441C;
		}
	}
	.contx{
		padding: 0 30rpx;
	}
	.contents{
		
		text-align: center;
		padding-top: 200upx;
		.titleImage{
			width: 160rpx;
			height: 160rpx;
		}
		.title{
			font-size: 32rpx;
			line-height: 42rpx;
			color: #333;
			font-weight: bold;
			margin: 40rpx 0 22rpx;
		}
	}
	.inputPlace{
		font-size: 28rpx;
		color: #999999;
	}
	.title{
		min-width: 168rpx;
	}
	.tips{
		width: 280rpx;
		text-align: center;
	}
	.btnTypeTwo{
		width: 690rpx;
		height: 80rpx;
		background-color: #3399FF;
		color: #fff;
		line-height: 80rpx;
		font-size: 32rpx;
		position: absolute;
		bottom: 100rpx;
		left: 30rpx;
		box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
	}
	.btnTypeTwo.active{
		background-color: #CCCCCC;
		color: #F8F8F8;
	}
	.btnTypeTwo:after{
		content: "";
	}
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
