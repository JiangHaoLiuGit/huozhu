<template>
	<view class="page">
		<u-navbar back-text="" title="个人资料" title-color="#ffffff" back-icon-color="#333" :background="{ background: '#0080FF' }" :borderBottom="false">
			<!-- <view slot="right" class="u-padding-right-40">
				<icon class="iconfont iconshezhi"></icon>
			</view> -->
		</u-navbar>
		<view class="my por">
			<!-- <view class="myImg">
				<view class="image">
					<icon class="iconfont userImg icontouxiang1" v-if="userImg == ''"></icon>
					<image :src="userImg" mode="aspectFit" v-else></image>
				</view>
				<view class="phone u-flex">
					<view class="call">
						{{phoneList}}
					</view>
					<view class="rest u-flex">
						<view class="add">
							企业认证
						</view>
						<view class="add active">
							实名认证
						</view>
					</view>
				</view>
			</view> -->
			<view class="touxiang">
				<avatar
					selWidth="120upx" selHeight="120upx"  ref='avatar' fileType='png'
					:avatarSrc="userImg" @upload="myUpload" quality="1" inner=true
					avatarStyle="width: 60upx; height: 60upx; border-radius: 50%;">
				</avatar>
			</view>
			<view class="cont">
				
				<view class="conts" @click="clk">

					<view class="contslf">
						头像
					</view>
					<view class="contsct">
						<icon class="iconfont userImg icontouxiang1" v-if="userImg == ''"></icon>
						<image :src="userImg" class="userImg" v-else></image>

					</view>
					<view class="contsrt"><icon class="iconfont right iconfanhui-you"></icon></view>
				</view>
				<!-- <view class="conts" @click="editPhone">
					<view class="contslf">
						手机号
					</view>
					<view class="contsct">
						
					</view>
					<view class="contsrt"><icon class="iconfont right iconfanhui-you"></icon></view>
				</view> -->
				<view class="conts" @click="addPhone">
					<view class="contslf">
						联系电话
					</view>
					<view class="contsct threeColor">
						<!-- {{phoneList}} -->
					</view>
					<view class="contsrt"><icon class="iconfont right iconfanhui-you"></icon></view>
				</view>
				<view class="conts" @click="password">
					<view class="contslf">
						重置密码
					</view>
					<view class="contsct redColor">
						<!-- 未设置 -->
					</view>
					<view class="contsrt"><icon class="iconfont right iconfanhui-you"></icon></view>
				</view>
				<view class="conts" @click="shimin">
					<view class="contslf">
						实名信息
					</view>
					<view class="contsct greenColor" v-if="obj.userCertificationStatus == 1">
						已认证
					</view>
					<view class="contsct redColor" v-else-if="obj.userCertificationStatus == 0">
						未认证
					</view>
					<view class="contsrt"><icon class="iconfont right iconfanhui-you"></icon></view>
				</view>
				<view class="conts" @click="qiye">
					<view class="contslf">
						企业信息
					</view>
					<view class="contsct greenColor" v-if="obj.enterpriseCertificationStatus == 1">
						已认证
					</view>
					<view class="contsct redColor" v-else-if="obj.enterpriseCertificationStatus == 0">
						未认证
					</view>
					<view class="contsrt"><icon class="iconfont right iconfanhui-you"></icon></view>
				</view>
			</view>
		</view>
		<button class="submitBtnBlue u-margin-bottom-50" @click="qie">切换账户</button>
	</view>
</template>

<script>
	import avatar from "../../../components/yq-avatar/yq-avatar.vue";

	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	import uploadImage from '@/components/ossutil/uploadFile.js';
	import { pathToBase64, base64ToPath } from '@/components/image-tools/index.js'
	export default {
		components:{
			avatar
		},
		data() {
			return {
				phone:"",
				phoneList:"",
				obj:"",
				//
				userImg:"",
			}
		},
		onLoad(option) {
			
			
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
					this.obj = res.data
					this.phone = res.data.phone
					let phones = res.data.phone
					if(res.data.headPortrait != null && res.data.headPortrait != "" && res.data.headPortrait != undefined && res.data.headPortrait.slice(0,6) != "/ajaxI"){
						this.userImg = res.data.headPortrait
					}
					this.phoneList = phones.slice(0,3) + "****" + phones.slice(7,11)
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
			// 图片上传
			upload(url) {
				ajax.put(config.userImg_url,{
				  headPortrait: url,
				  type:"1"
				}).then(res => {
					console.log("修改头像")
					console.log(res)
				  if(res.code == 0){
					  uni.showToast({title:"上传成功",icon: "success",duration:2000})
					  this.userImg = url
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
			myUpload(rsp) {
				pathToBase64(rsp.path).then(base64 => {
					this.upload(base64);
				})
			},
			clk(){
				let avatar = this.$refs.avatar;
				console.log(avatar)
				avatar.fChooseImg(1, {selWidth: "480upx", selHeight: "480upx", expWidth: "480px", expHeight: "480upx"});
				//userImg_url
				//上传头像
				console.log("上传")
				// uni.chooseImage({
				//     count: 1, // 默认最多一次选择9张图
				//     // 	sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
				//     success: res=> {
				//         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				//         var tempFilePaths = res.tempFilePaths;
				// 		let url = res.tempFilePaths[0]
				// 		pathToBase64(url)
				// 		.then(base64 => {
				// 			console.log("base64----------")
				// 			console.log(base64)
							
				// 		})
				// 		.catch(error => {
				// 			console.error(error)
				// 		})
				//     }
				// })
			},
			shimin(){
				if(this.obj.userCertificationStatus == 0){
					uni.navigateTo({
						url: "/pages/attest/attest/attest?type=3"
					})
				}else{
					uni.navigateTo({
						url: "/pages/attest/attest/attest?type=2"
					})
				}
				
			},
			qiye(){
				if(this.obj.enterpriseCertificationStatus == 0){
					uni.navigateTo({
						url: "/pages/attest/attestFirm/attestFirm?type=3"
					})
				}else{
					uni.navigateTo({
						url: "/pages/attest/attestFirm/attestFirm?type=2"
					})
				}
			},
			editPhone(){
				//pages/user/userDeitPhone/userDeitPhone
				// uni.navigateTo({
				// 	url: "/pages/user/userDeityan/userDeityan?phone="+this.phone
				// })
			},
			password(){
				uni.navigateTo({
					url: "/pages/user/userEditPass/userEditPass?phone=" + this.phone
				})
			},
			addPhone(){
				//pages/user/userAddPhone/userAddPhone
				uni.navigateTo({
					url: "/pages/user/userAddPhone/userAddPhone"
				})
			},
			go(e){
				let index = e.currentTarget.dataset.index
				uni.navigateTo({
					url: "/pages/order/orderList/orderList?type="+index
				})
			},
			qie(){
				//删除用户数据
				//往vuex里面塞token
				this.$store.commit("getAccessToken", "")
				this.$store.commit("getRefreshToken", "")
				//往手机缓存里面塞token
				uni.removeStorage({
					key:'accessToken'
				})
				uni.removeStorage({
					key:'refreshToken'
				})
				uni.reLaunch({
					url: "/pages/login/login"
				})
			}
		}
	}	
</script>

<style scoped lang="less">
	.touxiang {
		// width: 60rpx;
		// height: 60rpx;
		// position: absolute;
		// top: 12rpx;
		// right: 64rpx;
		    width: 48rpx;
		    height: 48rpx;
		    position: absolute;
		    top: 64rpx;
		    overflow: hidden;
		    right: 104rpx;
		    border-radius: 50%;
	}

	icon.userImg{
		position: relative;
		top: -8rpx;
		font-size: 48rpx;
		color: #999;
	}
	image.userImg{
		width: 48rpx;
		height: 48rpx;
		position: relative;
		top: -6rpx;
		border-radius: 50%;
	}
	.submitBtnBlue{
		position: absolute;
		bottom: 30rpx;
		left: 30rpx;
	}
	.right{
		display: block;
		font-size: 14rpx;
		color: #999;
		line-height: 30rpx;
	}
	.my{
		padding: 50rpx 30rpx;
		.cont{
			.conts{
				padding-right: 20rpx;
				.contsct{
					padding-top: 4rpx;
				}
			}
		}
		.myImg{
			padding: 0 20rpx;
			.image{
				width: fit-content;
				margin: 0 auto;
				image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 8rpx;
				}
				.userImg{
					font-size: 120rpx;
					color: #0080FF;
				}
			}
			.phone{
				width: fit-content;
				margin: 0 auto;
				padding-left: 48rpx;
				.call{
					color: #333;
					font-size: 36rpx;
					line-height: 48rpx;
					margin-right: 20rpx;
					font-weight: 400;
				}
				.rest{
					.add{
						width: max-content;
						height: 36rpx;
						line-height: 32rpx;
						padding: 0 20rpx;
						background-color: #eee;
						font-size: 20rpx;
						color: #999;
						border-radius: 8rpx;
						margin-right: 20rpx;
					}
					.add.active{
						background-color: #07CC10;
						color: #F8F8F8;
					}
				}
			}
		}
	}
	.iconshezhi{
		font-size: 30rpx;
		color: #333;
	}
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>