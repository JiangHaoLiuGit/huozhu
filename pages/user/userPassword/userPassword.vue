<template>
	<view class="page">
		<u-navbar back-text="" title="修改密码" title-color="#ffffff" back-icon-color="#333" :background="{ background: '#0080FF' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">
				<icon class="iconfont iconshezhi"></icon>
			</view> -->
		</u-navbar>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		
		
		
		<view class="u-margin-top-40">
			<view class="cont">
				<view class="conts">
					<view class="contslf">
						原密码
					</view>
					<view class="contsct">
						<input type="password" placeholder="请输入您的原密码" v-model="yuan">
					</view>
					<view class="contsrt"></view>
				</view>
				<view class="conts">
					<view class="contslf">
						新密码
					</view>
					<view class="contsct">
						<input type="password" placeholder="请输入6-20位密码" v-model="miOne">
					</view>
					<view class="contsrt"></view>
				</view>
				<view class="conts">
					<view class="contslf">
						确认密码
					</view>
					<view class="contsct">
						<input type="password" placeholder="请再次输入您要修改的密码" v-model="miTwo">
					</view>
					<view class="contsrt"></view>
				</view>
			</view>
		</view>
		<button class="u-margin-bottom-20 u-margin-top-30"
		 :class="yuan == '' || miOne == '' || miTwo == ''?'btnTypeTwo active':'btnTypeTwo'" 
		 :disabled="yuan == '' || miOne == '' || miTwo == ''" 
		 @click="to3">
			下一步
		 </button>
		
		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu" @click="btnShu">{{btnText}}</button>
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
				showErr:"",
				btnText:"",
				truePhone:"",
				type:1,
				phoneList:[],
				sbBlean:false,
				yuan:"",
				miOne:"",
				miTwo:"",
				blean:false
			}
		},
		onLoad(option) {
			
		},
		methods: {
			// this.show = true
			// this.showErr = "验证码不正确"
			// this.btnText = "重新输入"
			btnShu(){
				this.show = false
				if(this.blean){
					uni.navigateTo({
						url:"/pages/login/login",
					})
				}
			},
			to3(){
				if(this.miOne == this.miTwo){
					if(this.miOne.length >= 6 && this.miOne.length <= 20){
						ajax.put(config.passwd_url,{
							oldPass:this.yuan,
							newPass:this.miOne
						}).then(res => {
						  console.log(res)
						  if(res.code == 0){
							  this.show = true
							  this.showErr = "修改成功,即将跳转登录页面"
							  this.btnText = "重新登录"
							  
							  this.blean = true
						  }else{
							  this.show = true
							  this.showErr = "信息不正确,请核实"
							  this.btnText = "重新输入"
						  }
						}).catch(err => {
						  //ajax.js反馈的reject结果
						  console.log(err)
						})
					}else{
						this.show = true
						this.showErr = "密码长度应该为6-20位"
						this.btnText = "重新输入"
					}
				}else{
					this.show = true
					this.showErr = "两次密码输入不一致"
					this.btnText = "重新输入"
				}
				
				
				
			},
		}
	}	
</script>

<style scoped lang="less">
	.cont .conts{
		margin-left: 0;
		padding-left: 30rpx;
	}
	.cont .conts .contsct{
		text-align: left;
		line-height: 47rpx;
		padding-left: 48rpx;
		padding-top: 4rpx;
		input{
			font-size: 28rpx;
		}
	}
	.cont .conts .contslf{
		text-align: right;
	}
	.cont .conts .contsrt{
		
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
