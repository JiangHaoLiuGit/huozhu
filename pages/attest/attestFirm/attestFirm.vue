<template>
	<view class="page">
		<u-navbar title="企业信息认证" :is-back="type == 2 || type == 3">
			<view slot="right" v-if="type != 2 && type != 3" class="masterColor u-padding-right-40" @click="to">跳过</view>
		</u-navbar>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<u-gap height="2" class="u-margin-top-8" bg-color="#EFEFEF"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
			<view class="title sixColor inText" style="width: 150rpx;">
				营业执照
			</view>
			<view class="uploadImg">
				<view class="peopleCard" @click="addImg" data-img="peopleCardFan">
					<view class="viewImg por" v-if="peopleCardFan == ''">
						<text class="tooSmallText threeColor poa">点击上传</text>
						<image src="../../../static/pic15.png"></image>
					</view>
					<image v-else :src="peopleCardFan" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<u-gap height="2" class="u-margin-top-20" bg-color="#EFEFEF"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
			<view class="title sixColor inText" style="width: 150rpx;">
				我的身份
			</view>
			<view class="title1 nineColor inText">{{firmPeople}}</view>
		</view>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<u-gap height="2" class="u-margin-top-20" bg-color="#EFEFEF"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex">
			<view class="title sixColor inText" style="width: 150rpx;">
				企业名称
			</view>
			<view class="title1 nineColor inText">{{firmName}}</view>
		</view>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<view class="u-padding-left-30 u-padding-right-30 u-padding-top-20 u-padding-bottom-20 fffBackground u-flex" style="align-items: baseline;">
			<view class="title sixColor inText" style="width: 150rpx;">
				企业地址
			</view>
			<view class="title1 nineColor inText">{{firmForm}}</view>
		</view>
		<u-gap height="2" bg-color="#EFEFEF"></u-gap>
		<button v-if="type != 2" class="u-margin-bottom-20" :class="firmName != '自动获取企业信息'&&firmForm != '自动获取企业信息'?'btnTypeTwo':'btnTypeTwo active'"
		 :disabled="firmName == '自动获取企业信息'||firmForm == '自动获取企业信息'" @click="to1">提交审核</button>
		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu" @click="btnShu">{{ btnText }}</button>
			</view>
		</u-popup>
		<!-- 压缩工具 -->
		<helang-compress ref="helangCompress"></helang-compress>
		<!-- 图片放大 -->
		<swiperImage :maskShow="imgShow" v-if="imgShow" @change="imghide" :swiperImages="swiperImages" :currentIndex="currentIndex"></swiperImage>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '@/components/image-tools/index.js'
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
				
				peopleCardFan: "",
				firmName: "自动获取企业信息",
				firmForm: "自动获取企业地址",
				firmPeople: "自动获取身份",
				firmPeopleType: "",
				data1: {},
				type: 1,
				show: false,
				showErr: "",
				btnText: "重新上传",
				compressImgPath:""
			}
		},
		onLoad(option) {
			if (option.type) {
				this.type = option.type
			}
		},
		mounted(){
			if(this.type == 2){
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
						this.peopleCardFan = res.data.businessLicensePath
						if(res.data.businessLicenseLegalperson && res.data.idCardName){
							if(res.data.businessLicenseLegalperson == res.data.idCardName){
								this.firmPeople = "我是法人"
							}else{
								this.firmPeople = "不是法人"
							}
						}else{
							this.firmPeople = "不是法人"
						}
						
						this.firmName = res.data.businessLicenseName
						this.firmForm = res.data.businessLicenseAddress
						
						// 图片集合
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
			
			btnShu() {
				this.show = false
				
			},
			to() {
				//去配货大厅
				uni.navigateTo({
					url: "/pages/goods/sendGoods/sendGoods"
				})
			},
			to1() {
				//提交审核
				// firmName firmForm
				
				if(this.firmName == '自动获取企业信息'){
					this.show = true
					this.showErr = "营业执照照片无法解析企业名称"
					this.btnText = "重新上传"
					return 
				}
				if(this.firmForm == '自动获取企业地址'){
					this.show = true
					this.showErr = "营业执照照片无法解析企业地址"
					this.btnText = "重新上传"
					return 
				}
				ajax.post(config.approve_url,{
					type:"1",
					transportNature:null
				}).then(res => {
					console.log("认证")
					console.log(res)
					if (res.code == 0) {
						// this.$store.commit("getUsername", this.name)
						uni.navigateTo({
							url: "/pages/attest/attestStatus/attestStatus?type=" + 1 + "&&typePage=2"
						})
					} else if (res.code < 0) {
						uni.navigateTo({
							url: "/pages/attest/attestStatus/attestStatus?type=" + 2 + "&&typePage=2"
						})
					}
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})
			},
			addImg(e) {
				if (this.type == 2) {
					return
				}
				let name = e.currentTarget.dataset.img
				console.log("上传")
				uni.chooseImage({
					count: 1, // 默认最多一次选择9张图
					// 	sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
					success: res => {
						this.compressImgPath = "";
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						
						let url = res.tempFilePaths[0];
						
						//#ifdef APP-PLUS
						let resPath = url;							
						let path=plus.io.convertLocalFileSystemURL(resPath);
						// let imageSize = res.tempFiles[0].size/1000
						let compressImgTool=uni.requireNativePlugin("CL-CompressImg");
						compressImgTool.imageCompressToByteOptions({
							path: path,
							toByte: 500
						}, res => {
							const {code} = res;
							if (code == 1) {
								console.log(res.filePath)
								//路径转换;将绝对路径转为平台的相对路径
								let compressPath = plus.io.convertAbsoluteFileSystem(res.filePath);
								if (uni.getSystemInfoSync().platform == 'android') {
									if (compressPath.startsWith("_doc/")) {
										this.compressImgPath = compressPath;
									} else {
										this.compressImgPath = "file://" + compressPath;
									}
								} else {
									this.compressImgPath = compressPath;
								}
								pathToBase64(this.compressImgPath).then(base64 => {
									console.log("base64----------")
									console.log(base64)
									if (name == "peopleCardFan") {
										this.peopleCardFanFun(base64)
									}
								})
								.catch(error => {
									console.error(error)
								})
								// plus.io.getFileInfo({
								// 	filePath: compressPath,
								// 	success: (event) => {
								// 		this.compressImgSize = event.size;
								// 	},
								// 	fail: (error) => {
								// 		console.log(error);
								// 	}
								// });
							}
						})
						//#endif
						//#ifdef H5
						pathToBase64(res.tempFilePaths[0]).then(base64 => {
							console.log("base64----------")
							console.log(base64)
							if (name == "peopleCardFan") {
								this.peopleCardFanFun(base64)
							}
						})
						.catch(error => {
							console.error(error)
						})
						//#endif
						
						// this.$refs.helangCompress.compress({
						//     src: url,
						//     maxSize: 1920,
						//     fileType:'jpg',
						//     quality: 1,
						//     minSize: -1 //最小压缩尺寸，图片尺寸小于该时值不压缩，非H5平台有效。若需要忽略该设置，可设置为一个极小的值，比如负数。
						// }).then((res)=>{
						// 	//app走压缩
							
						// }).catch((err)=>{
						// 	uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
						// })
						
						
						
						
						
						
					}
				})
				//
			},
			peopleCardFanFun(url) {
				uni.showLoading({
					title:"正在解析",
					mask:true
				})
				
				ajax.post(config.oss_url, {
					base64: url,
					type: "7",
					roleType: "1"
				}).then(res => {
					console.log("正面检测")
					console.log(res)
					uni.hideLoading()
					if (res.code == 0) {
						//无效代码
						// this.data1 = {
						//  cardNum:res.data.idNumber,//身份证号码
						//  cardGender:res.data.gender,//性别
						//  cardBirth:res.data.birthDate,//生日
						//  cardNationality:res.data.nationality,//名族
						//  cardName:res.data.name//姓名
						// }
						// this.zhenType = true
						this.peopleCardFan = res.data.url
						this.firmName = res.data.companyName
						this.firmForm = res.data.address
						//暂时写死
						this.firmPeople = "我不是法人"
						this.firmPeopleType = "0"
						if (this.$store.state.username) {
							if (res.data.legalPerson == this.$store.state.username) {
								this.firmPeople = "我是法人"
								this.firmPeopleType = "1"
							} else {
								this.firmPeople = "我不是法人"
								this.firmPeopleType = "0"
							}
						}
					} else {
						this.show = true
						this.showErr = res.msg
						this.btnText = "重新上传"
						this.peopleCardFan = ''
						this.firmName = '自动获取企业信息' 
						this.firmForm = '自动获取企业地址'
						this.firmPeople = '自动获取身份'
						// this.peopleCardZhen = ''
						// this.name = ''
						// this.idCard = ''
						
					}
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.btnTypeTwo {
		width: 690rpx;
		height: 80rpx;
		background-color: #3399FF;
		color: #fff;
		line-height: 80rpx;
		font-size: 32rpx;
		box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
		position: absolute;
		bottom: 50rpx;
		left: 30rpx;
	}

	.btnTypeTwo.active {
		background-color: #CCCCCC;
		color: #F8F8F8;
	}

	.title1 {
		width: 540rpx;
	}

	.uploadImg {
		width: 500rpx;

		.peopleCard {
			margin: 0 auto;
			width: 248rpx;
			height: 168rpx;
			background: #cbe1fa;

			image {
				max-width: 248rpx;
				max-height: 168rpx;
			}

			.viewImg {
				text {
					bottom: 30rpx;
					left: 76rpx;
					z-index: 2;
				}
			}
		}
	}
</style>
