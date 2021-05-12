<template>
	<view class="page">
		<u-navbar :is-back="type == 2 || type == 3" title="实名认证" :borderBottom="false">
			<view slot="right" v-if="type != 1 &&type != 2 &&type != 3" class="masterColor u-padding-right-40" @click="toNew">跳过</view>
		</u-navbar>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<view class="upload" v-show="false">
			<view class="title threeColor inText fontWeight u-padding-left-30 u-padding-right-30 u-margin-bottom-22 u-margin-top-20">
				人脸识别
			</view>
			<view class="imgUpload u-flex u-row-center">
				<view class="people" @click="addImg" data-img="people">
					<image :src="people" v-if="people != ''" mode="aspectFit"></image>
					<image v-else src="../../../static/pic11.png" ></image>
				</view>
			</view>
		</view>
		<view class="upload">
			<view class="title threeColor inText fontWeight u-padding-left-30 u-padding-right-30 u-margin-bottom-22 u-margin-top-20">
				身份证照片
			</view>
			<view class="imgUpload u-flex u-row-around">
				<view class="peopleCard" @click="addImg" data-img="peopleCardZhen">
					<view class="viewImg por" v-if="peopleCardZhen == ''">
						<text class="tooSmallText threeColor poa">点击上传身份证正面</text>
						<!-- <icon class="iconfont iconshenfenzhengzhengmian" style="font-size: 100rpx;color: #666;"></icon> -->
						<image src="../../../static/pic14.png" mode="aspectFit"></image>
					</view>
					<image v-else :src="peopleCardZhen" @click="imgMagnify(0)" mode="aspectFit"></image>
				</view>
				<view class="peopleCard" @click="addImg" data-img="peopleCardFan">
					<view class="viewImg por" v-if="peopleCardFan == ''">
						<text class="tooSmallText threeColor poa">点击上传身份证反面</text>
						
						<!-- <icon class="iconfont iconshangchuan" style="font-size: 100rpx;color: #666;"></icon> -->
						<image src="../../../static/pic12.png" ></image>
					</view>
					<image v-else :src="peopleCardFan" @click="imgMagnify(1)" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="upload">
			<view class="title threeColor inText fontWeight u-padding-left-30 u-padding-right-30 u-margin-bottom-22 u-margin-top-20">
				本人信息
			</view>
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
				<view class="title sixColor inText" style="width: 150rpx;">
					姓名
				</view>
				<view class="nineColor inText">{{name}}</view>
			</view>
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
				<view class="title sixColor inText" style="width: 150rpx;">
					身份证
				</view>
				<view class="nineColor inText">{{idCard}}</view>
			</view>
			<u-gap height="2" bg-color="#EFEFEF"></u-gap>
			<view class="nineColor smallText u-padding-left-30 u-padding-right-30 u-margin-top-20">
				根据页面提示内容输入真实姓名和居民身份证号码，也可以选择上传身份证照片识别即可；实名认证资料一旦填写正确，无法随意更改或解除，请填写个人正确身份信息，谨慎操作。
			</view>
			<button v-if="type != 2" class="u-margin-bottom-20 btnTypeTwo " :class="peopleCardFan != ''&&peopleCardZhen != ''?'':'active'" :disabled="peopleCardFan == ''||peopleCardZhen == ''" @click="to">提交审核</button>
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
		<!-- 压缩工具 -->
		<helang-compress ref="helangCompress"></helang-compress>
		<!-- 图片放大 -->
		<swiperImage :maskShow="imgShow" v-if="imgShow" @change="imghide" :swiperImages="swiperImages" :currentIndex="currentIndex"></swiperImage>
	</view>
</template>
<!--  @click="addImg" data-img="people" -->

<script>
	import { pathToBase64, base64ToPath } from '@/components/image-tools/index.js'
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	import uploadImage from '@/components/ossutil/uploadFile.js';
	import helangCompress from '@/components/helang-compress/helang-compress';
	export default {
		components:{
			helangCompress
		},
		data() {
			return {
				// 图片放大
				imgShow: false,
				currentIndex: 0,
				swiperImages: [],
				
				show:false,
				showErr:"",
				people:"",
				peopleCardFan:"",
				peopleCardZhen:"",
				btnText:"",
				name:"姓名必须和身份证上一致",
				idCard:"请输入身份证号",
				find:{
					people:"",
					peopleCardZhen:""
				},
				data1:{},
				data2:{},
				type:0,
				types:1,
				zhenType:false,
				fanType:false,
				obj:{}
			}
		},
		onLoad(option) {
			//Object.assign(this.obj1,this.obj2)
			if(option.type){
				this.type = option.type
			}
			
		},
		mounted(){
			if(this.type == 2){
				let data = {
					type:1,
					phone:this.$store.state.phone
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
						this.peopleCardZhen = res.data.idCardFacePath
						this.peopleCardFan = res.data.idCardFaceBack
						this.name = res.data.idCardName
						this.idCard = res.data.idCard
						
						// 图片集合
						if(this.peopleCardZhen) {
							this.swiperImages.push(this.peopleCardZhen)
						}
						if(this.peopleCardFan) {
							this.swiperImages.push(this.peopleCardFan)
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
		methods: {
			// 图片放大
			imgMagnify(index) {
				this.imgShow = true;
				this.currentIndex = index;
			},
			
			imghide(e) {
				this.imgShow = e;
			},
			
			btnShu(){
				this.show = false
				if(this.types == 1){
					//上传人脸图片(启用人脸插件)
					this.addImg1()
				}else if(this.types == 2){
					this.types = 1
				}
			},
			toNew(){
				//去企业认证
				uni.redirectTo({
					url:"/pages/attest/attestFirm/attestFirm"
				})
			},
			to(){
				console.log(this.find)
				if(this.zhenType == false){
					this.show = true
					this.showErr = "请上传身份证正面照片"
					this.btnText = "马上上传"
					this.types = 2
					return 
				}
				if(this.name == ''){
					this.show = true
					this.showErr = "上传身份证照片无法解析名字"
					this.btnText = "重新上传"
					this.types = 2
					return 
				}
				if(this.idCard == ''){
					this.show = true
					this.showErr = "上传身份证照片无法解析身份证号码"
					this.btnText = "重新上传"
					this.types = 2
					return 
				}
				if(this.fanType == false){
					this.show = true
					this.showErr = "请上传身份证反面照片"
					this.btnText = "马上上传"
					this.types = 2
					return 
				}
				
				this.show = true
				this.showErr = "实名认证需要人证比对"
				this.btnText = "马上比对"
				this.types = 1
				
				
				
			},
			shangchuan(){
				if(this.find.people == this.people && this.peopleCardFan != ""&& this.find.peopleCardZhen == this.peopleCardZhen){
					let data = {},
					data3 = {
						identity:this.$store.state.type,
						cardAddress:this.peopleCardZhen
					}
					console.log("去认证")
					console.log(data3)
					console.log(this.data1)
					console.log(this.data2)
					data = Object.assign(data3,this.data1,this.data2)
					console.log(data)
					ajax.put(config.mock+config.faceUser+"/"+this.$store.state.phone+"/"+config.authen_url,data).then(res => {
						console.log("认证")
						console.log(res)
						if(res.code == 0){
							this.$store.commit("getUsername",this.name)
						  uni.redirectTo({
						  	url:"/pages/attest/attestStatus/attestStatus?type="+1+"&&typePage=1"
						  })
						}else if(res.code < 0){
						  uni.navigateTo({
						  	url:"/pages/attest/attestStatus/attestStatus?type="+2+"&&typePage=1"
						  })
						}
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}else{
					uni.showToast({ title: "人脸比对未通过,请检查原因", icon: "none",duration: 2000 })
				}
			},
			//人和身份证证比对
			peopleFun(url){
				console.log("licenseFace_url")
				let data = {
					base64: url,
					type:"1",
					url:this.peopleCardZhen
				}
				ajax.post(config.licenseFace_url,data).then(res => {
					console.log("活体检测")
					console.log(res)
					if(res.code == 0){
					  // if(res.data.confidence >= this.$store.state.confidence){
						  // this.people = url
						  // if(this.peopleCardZhen != ""&&this.people != ""){
							 //  this.peopleFace()
						  // }
					  // }
					  // if(res.code == -7025)
					  if(res.code == 0){
						this.$store.commit("getUsername",this.name)
						uni.redirectTo({
							url:"/pages/attest/attestStatus/attestStatus?type="+1+"&&typePage=1"
						})
					  }else if(res.code < 0){
						uni.navigateTo({
							url:"/pages/attest/attestStatus/attestStatus?type="+2+"&&typePage=1"
						})
					  }
					}else{
					  this.show = true
					  this.showErr = "身份证正面和人脸检测不是同一个人"
					  this.btnText = "重新人脸识别"
					  this.types = 1
					}
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			},
			peopleCardZhenFun(url){
				uni.showLoading({
					title:"正在解析",
					mask:true
				})
				
				ajax.post(config.oss_url,{
				  base64: url,
				  type:"1",
				  roleType:"1"
				}).then(res => {
					console.log("正面检测")
					  console.log(res)
					  uni.hideLoading()
					  if(res.code == 0){
						  //无效代码
						  // this.data1 = {
							 //  cardNum:res.data.idNumber,//身份证号码
							 //  cardGender:res.data.gender,//性别
							 //  cardBirth:res.data.birthDate,//生日
							 //  cardNationality:res.data.nationality,//名族
							 //  cardName:res.data.name//姓名
						  // }
						  this.zhenType = true
						  this.peopleCardZhen = res.data.url
						  
						  this.name = res.data.name
						  this.idCard = res.data.iDNumber
					  }else{
						  this.zhenType = false
						  this.show = true
						  this.showErr = res.msg
						  this.btnText = "重新上传"
						  this.types = 2
						  this.peopleCardZhen = ''
						  this.name = ''
						  this.idCard = ''
					  }
					}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			},
			peopleCardFanFun(url){
				uni.showLoading({
					title:"正在解析",
					mask:true
				})
				
				ajax.post(config.oss_url,{
				  base64: url,
				  type:"2"
				}).then(res => {
					console.log("背面检测")
				  console.log(res)
				  uni.hideLoading()
				  if(res.code == 0){
					  this.fanType = true
					  this.peopleCardFan = url
					  //无效代码
					  // this.data2 = {
						 //  cardStartDate:res.data.startDate,//有效期开始
						 //  cardEndDate:res.data.endDate,//有效期结束
						 //  cardIssue:res.data.issue//签发机关
					  // }
				  }else{
					  this.fanType = false
					  this.show = true
					  this.showErr = res.msg
					  this.btnText = "重新上传"
					  this.types = 2
					  this.this.peopleCardFan = ''
				  }
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			},
			//人证比对
			peopleFace(){
				// uni.showLoading({
				// 	title:"人证比对中"
				// })
				// uni.hideLoading()
				// uni.showToast({ title: "人脸比对成功", icon: "success",duration: 2000 })
				// this.find.people = this.people
				// this.find.peopleCardZhen = this.peopleCardZhen
				uni.showLoading({
					title:"人证比对中",
					mask:true
				})
				
				ajax.get(config.faceAuthen_url,{
				  url1: this.people,
				  url2: this.peopleCardZhen,
				}).then(res => {
					console.log("人证比对")
				  console.log(res)
				  if(res.code == 0){
					  uni.hideLoading()
					  uni.showToast({ title: "人脸比对成功", icon: "success",duration: 2000 })
					  this.find.people = this.people
					  this.find.peopleCardZhen = this.peopleCardZhen
					  this.shangchuan()
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
				  this.show = true
				  this.showErr = "人证比对失败"
				  this.btnText = "重新比对"
				  this.types = 2
				})
			},addImg(e){
				if(this.type == 2){
					return
				}
				
				let name = e.currentTarget.dataset.img
				console.log("上传")
				uni.chooseImage({
				    count: 1, // 默认最多一次选择9张图
				    // 	sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
				    success: res=> {
				        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				        var tempFilePaths = res.tempFilePaths;
						console.log(res.tempFilePaths[0])
						let url = res.tempFilePaths[0]
						let imageSize = res.tempFiles[0].size/1000
						this.$refs.helangCompress.compress({
							src: url,
							maxSize: 1400,
							fileType: 'jpg',
							quality: 1,
							minSize: 1100
						}).then((res) => {
							//#ifdef APP-PLUS
							if(imageSize > 1000){
								uni.compressImage({
									src: res,
									quality: 95,
									success: res => {
										pathToBase64(res.tempFilePath).then(base64 => {
											console.log("base64----------")
											console.log(base64)
											if(name == "people"){
												this.peopleFun(base64)
											}else if(name == "peopleCardZhen"){
												this.peopleCardZhenFun(base64)
											}else if(name == "peopleCardFan"){
												this.peopleCardFanFun(base64)
											}
										})
										.catch(error => {
											console.error(error)
										})
									}
								})
							}else{
								pathToBase64(res.tempFilePath).then(base64 => {
									console.log("base64----------")
									console.log(base64)
									if(name == "people"){
										this.peopleFun(base64)
									}else if(name == "peopleCardZhen"){
										this.peopleCardZhenFun(base64)
									}else if(name == "peopleCardFan"){
										this.peopleCardFanFun(base64)
									}
								})
								.catch(error => {
									console.error(error)
								})
							}
							
							//#endif
							
							//#ifdef H5
							pathToBase64(res).then(base64 => {
								console.log("base64----------")
								console.log(base64)
								if(name == "people"){
									this.peopleFun(base64)
								}else if(name == "peopleCardZhen"){
									this.peopleCardZhenFun(base64)
								}else if(name == "peopleCardFan"){
									this.peopleCardFanFun(base64)
								}
							})
							.catch(error => {
								console.error(error)
							})
							//#endif
							
							
						}).catch((err) => {
							uni.showToast({
								title: "上传失败,请重新上传",
								icon: "none",
								duration:2000
							})
						})
				    }
				})
				//
			},addImg1(){
				uni.chooseImage({
				    count: 1, // 默认最多一次选择9张图
				    // 	sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
				    success: res=> {
				        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				        var tempFilePaths = res.tempFilePaths;
						console.log(res.tempFilePaths[0])
						let url = res.tempFilePaths[0]
						pathToBase64(url)
						.then(base64 => {
							console.log("base64----------")
							console.log(base64)
							this.peopleFun(base64)
						})
						.catch(error => {
							console.error(error)
						})
				    }
				})
				//
			}
		}
	}	
</script>

<style scoped lang="less">
	
	.btnTypeTwo{
		width: 690rpx;
		height: 80rpx;
		background-color: #3399FF;
		color: #fff;
		line-height: 80rpx;
		font-size: 32rpx;
		box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
		margin-top: 100rpx;
		position: absolute;
		bottom: 40rpx;
		left: 30rpx;
	}
	.btnTypeTwo.active{
		background-color: #CCCCCC;
		color: #F8F8F8;
	}
	.btnTypeTwo:after{
		content: "";
	}
	.upload{
		.title{
			
		}
		.imgUpload{
			.people{
				width: 200rpx;
				height: 200rpx;
				border-radius: 20rpx;
				overflow: hidden;
				background: #cbe1fa;
				image{
					max-width: 200rpx;
					max-height: 200rpx;
				}
			}
			.peopleCard{
				width: 248rpx;
				height: 168rpx;
				background: #cbe1fa;
				image{
					max-width: 248rpx;
					max-height: 168rpx;
				}
				.viewImg{
					text{
						bottom:30rpx;
						left:20rpx;
						z-index: 2;
					}
				}
			}
		}
	}
	
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
