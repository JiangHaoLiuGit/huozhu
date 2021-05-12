<template>
	<view class="page">
		<u-navbar back-text="" title="更换手机号" title-color="#ffffff" back-icon-color="#333" :background="{ background: '#0080FF' }"
		 :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">
				<icon class="iconfont iconshezhi"></icon>
			</view> -->
		</u-navbar>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<u-gap height="2" bg-color="#EFEFEF" class="u-margin-top-24"></u-gap>

		<view v-if="type == 2">
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-28 fffBackground u-flex">
				<view class="title sixColor inText ">手机号码</view>
				<input type="number" maxlength="11" style="font-size: 28rpx;" v-model="editPhone" placeholder="输入您将要更换的手机号">
			</view>
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
				<view class="title sixColor inText ">验证码</view>
				<input type="number" style="width: 300rpx;" placeholder-class="inputPlace" v-model="phoneCode1" maxlength="6"
				 placeholder="请输入验证码">
				<u-line color="#bbb" style="height: 50rpx; width: 2rpx;" direction='col' />
				<u-verification-code :seconds="seconds1" @end="end1" @start="start1" ref="uCode" @change="codeChange1"></u-verification-code>
				<text class="masterColor tips" @tap="getCode1">{{tips1}}</text>
			</view>
		</view>
		<view v-else-if="type == 3">
			<view class="contents">
				<image class="titleImage" src="../../../static/pic09.png"></image>
				<view class="title">审核通过</view>
			</view>
		</view>
		<view v-else-if="type == 4">
			<view class="contents">
				<image class="titleImage" src="../../../static/pic10.png"></image>
				<view class="title">认证失败</view>
			</view>
		</view>
		<button class="u-margin-bottom-20 u-margin-top-30" :class="phoneCode1 == '' || editPhone == ''?'btnTypeTwo active':'btnTypeTwo'"
		 v-if="type == 2" :disabled="phoneCode1 == '' || editPhone == ''" @click="to3">确定</button>
		<button class="u-margin-bottom-20 u-margin-top-30 btnTypeTwo" v-else-if="type == 3" @click="to4">确定</button>
		<button class="u-margin-bottom-20 u-margin-top-30 btnTypeTwo" v-else-if="type == 4" @click="to5">确定</button>
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
				showErr: "",
				btnText: "",
				truePhone: "",
				//1是下一步,2是注销
				type: 2
			}
		},
		onLoad(option) {
			
			//去修改
			let data = {
				type:1
			}
			//#ifdef APP-PLUS
			let pinf = plus.push.getClientInfo()
			let cid = pinf.clientid;
			data.cid = cid
			//#endif
			ajax.get(config.ownerInfo_url, data).then(res => {
				console.log(res)
				if (res.code == 0) {
					this.truePhone = res.data.phone
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
			if (option.phone) {
				let phone = option.phone
				this.phone = phone.slice(0, 3) + "****" + phone.slice(7, 11)
				this.truePhone = option.phone
			}
		},
		methods: {
			btnShu() {
				this.show = false
			},
			to3() {
				//去验证
				ajax.get(config.phoneYan_url, {
					code: this.phoneCode1,
					type: 1,
					phone: this.editPhone
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						//去修改
						ajax.put(config.phoneYan_url, {
							code: this.phoneCode1,
							type: 1,
							phone: this.editPhone
						}).then(res => {
							console.log(res)
							if (res.code == 0) {
								this.type = 3
							} else {
								this.type = 4
							}
						}).catch(err => {
							//ajax.js反馈的reject结果
							console.log(err)
						})
					} else {
						this.show = true
						this.showErr = "验证码不正确"
						this.btnText = "重新输入"
					}
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})
			},
			//点击通过的确定
			to4() {
				uni.showToast({
					title: "修改成功,即将跳转登录页面",
					duration: 2000,
					icon: 'none'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/login/login",
					})
				}, 2000)
			},
			//点击失败的确定
			to5() {
				//再加一个手机号 
				uni.navigateTo({
					url: "/pages/user/userDeityan/userDeityan?phone=" + this.truePhone
				})
			},
			codeChange(text) {
				console.log("第一个")
				console.log(text)
				this.tips = text;
			},
			getCode1() {
				if (this.$refs.uCode.canGetCode) {
					if (this.editPhone.length == 11) {
						uni.showLoading({
							title: '正在获取验证码',
							mask: true
						})
						ajax.get(config.code_url, {
							phone: this.editPhone,
							type: "4"
						}).then(res => {
							console.log(res)
							if (res.code == 0) {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								this.$u.toast('验证码已发送');
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
						this.show = true
						this.showErr = "手机号格式不正确"
						this.btnText = "重新输入"
					}
				} else {
					this.$u.toast('倒计时结束后再发送2');
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
