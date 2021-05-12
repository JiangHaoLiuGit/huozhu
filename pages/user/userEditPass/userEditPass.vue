<template>
	<view class="page">
		<u-navbar back-text="" title="设置密码" title-color="#ffffff" back-icon-color="#333" :background="{ background: '#0080FF' }"
		 :borderBottom="false">
		</u-navbar>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<view class="u-margin-top-48">
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
				<view class="title sixColor inText ">重置密码</view>
				<input type="password" style="font-size: 28rpx;width: 400rpx;" v-model="editPhone" placeholder="请输入6-20位密码">
			</view>
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
				<view class="title sixColor inText ">确认密码</view>
				<input type="password" style="font-size: 28rpx;width: 400rpx;" v-model="miTwo" placeholder="请再次输入您要修改的密码">
			</view>
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
				<view class="title sixColor inText ">验证码</view>
				<input type="number" style="width: 300rpx;" placeholder-class="inputPlace" v-model="phoneCode1" maxlength="6"
				 placeholder="请输入验证码">
				<u-line color="#bbb" style="height: 50rpx; width: 2rpx;" direction='col' />
				<u-verification-code :seconds="seconds1" @end="end1" @start="start1" ref="uCode" @change="codeChange"></u-verification-code>
				<text class="masterColor tips" @tap="getCode1">{{tips1}}</text>
			</view>
		</view>

		<button class="u-margin-bottom-20 u-margin-top-30" :class="phoneCode1 == '' || editPhone == '' || miTwo == ''?'btnTypeTwo active':'btnTypeTwo'"
		 :disabled="phoneCode1 == '' || editPhone == '' || miTwo == ''" @click="to3">确定修改</button>
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
				editPhone: "",
				phone: "",
				//验证码
				tips: "",
				tips1: "",
				seconds: "60",
				seconds1: "60",
				phoneCode: "",
				phoneCode1: "",
				boxBlean: false,
				show: false,
				show1: false,
				showErr: "",
				showErr1: "",
				btnText: "",
				truePhone: "",
				type: 1,
				phoneList: [],
				sbBlean: false,
				phoneId: "",
				obj: {},
				miTwo: ""
			}
		},
		onLoad(option) {

			//去修改
			if (option.phone) {
				this.phone = option.phone
				console.log(this.phone)
			}
		},
		methods: {
			btnShu() {
				this.show = false
			},
			to3() {
				if (!this.editPhone) {
					this.show = true
					this.showErr = "密码不能为空"
					this.btnText = "请重新输入"
					return
				} else if (!this.miTwo) {
					this.show = true
					this.showErr = "确认密码不能为空"
					this.btnText = "请重新输入"
					return
				} else if (this.editPhone != this.miTwo) {
					this.show = true
					this.showErr = "两次密码输入不一致"
					this.btnText = "请重新输入"
					return
				} else if (this.editPhone.length < 6 || this.editPhone.length > 20) {
					this.show = true
					this.showErr = "密码长度应该为6-20位"
					this.btnText = "请重新输入"
					return
				} else if (!this.phoneCode1 || this.phoneCode1.length < 6) {
					this.show = true
					this.showErr = "验证码输入有误"
					this.btnText = "请重新输入"
					return
				} else {
					ajax.put(config.passwd_url, {
						code: this.phoneCode1,
						newPass: this.editPhone,
						phone: this.phone
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								title: "修改成功,即将跳转登录页面",
								duration: 2000,
								icon: "none"
							})
							setTimeout(function() {
								uni.navigateTo({
									url: "/pages/login/login",
								})
							}, 2000)
						} else {
							this.show = true
							this.showErr = res.msg
							this.btnText = "重新输入"
						}
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
				}
			},

			getCode1() {
				if (!this.editPhone) {
					this.show = true
					this.showErr = "密码不能为空"
					this.btnText = "请重新输入"
					return
				} else if (!this.miTwo) {
					this.show = true
					this.showErr = "确认密码不能为空"
					this.btnText = "请重新输入"
					return
				} else if (this.editPhone != this.miTwo) {
					this.show = true
					this.showErr = "两次密码输入不一致"
					this.btnText = "请重新输入"
					return
				} else if (this.editPhone.length < 6 || this.editPhone.length > 20) {
					this.show = true
					this.showErr = "密码长度应该为6-20位"
					this.btnText = "请重新输入"
					return
				} else if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					console.log(this.phone)
					ajax.get(config.code_url, {
						phone: this.phone,
						type: "6"
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							this.$u.toast('验证码将会发送到您的注册手机上');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
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
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange(text) {
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
	.contsrt {
		position: relative;
		right: 20rpx;

		icon {
			color: #FC441C;
		}
	}

	.contx {
		padding: 0 30rpx;
	}

	.contents {

		text-align: center;
		padding-top: 200upx;

		.titleImage {
			width: 160rpx;
			height: 160rpx;
		}

		.title {
			font-size: 32rpx;
			line-height: 42rpx;
			color: #333;
			font-weight: bold;
			margin: 40rpx 0 22rpx;
		}
	}

	.inputPlace {
		font-size: 28rpx;
		color: #999999;
	}

	.title {
		min-width: 168rpx;
	}

	.tips {
		width: 280rpx;
		text-align: center;
	}

	.btnTypeTwo {
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

	.btnTypeTwo.active {
		background-color: #CCCCCC;
		color: #F8F8F8;
	}

	.btnTypeTwo:after {
		content: "";
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
</style>
