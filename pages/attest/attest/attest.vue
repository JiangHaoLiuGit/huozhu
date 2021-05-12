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
					<image v-else :src="peopleCardZhen"  mode="aspectFit"></image>
				</view>
				<view class="peopleCard" @click="addImg" data-img="peopleCardFan">
					<view class="viewImg por" v-if="peopleCardFan == ''">
						<text class="tooSmallText threeColor poa">点击上传身份证反面</text>
						
						<!-- <icon class="iconfont iconshangchuan" style="font-size: 100rpx;color: #666;"></icon> -->
						<image src="../../../static/pic12.png" ></image>
					</view>
					<image v-else :src="peopleCardFan" mode="aspectFit"></image>
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
	const permissionUtils = require('../../../utils/permissionUtils.js')
	const bdOCR = uni.requireNativePlugin('liyahong-BDOCR')
	var useOCR = false
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
				obj:{},
				compressImgPath:""
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
				uni.showLoading({
					title:"正在解析",
					mask:true
				})
				console.log("licenseFace_url")
				let data = {
					base64: url,
					type:"1",
					url:this.peopleCardZhen
				}
				ajax.post(config.licenseFace_url,data).then(res => {
					console.log("活体检测")
					console.log(res)
					uni.hideLoading()
					if(res.code == 0){
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
						  uni.getImageInfo({
						  	src: res.data.url,
						  	success: img => {
						  		console.log(img);
								console.log(res.data.cardAreas)
						  		let orgArea = img.width * img.height;
						  		console.log(orgArea);
						  		let maxWidth = Math.max.apply(Math,res.data.cardAreas.map(item => { return item.x }));
						  		let minWidth = Math.min.apply(Math,res.data.cardAreas.map(item => { return item.x }));
						  		let nowWidth = parseInt(maxWidth) - parseInt(minWidth);
						  		console.log(maxWidth);
						  		console.log(minWidth);
						  		console.log(nowWidth);
						  		let maxHeight = Math.max.apply(Math,res.data.cardAreas.map(item => { return item.y }));
						  		let minHeight = Math.min.apply(Math,res.data.cardAreas.map(item => { return item.y }));
						  		let nowHeight = parseInt(maxHeight) - parseInt(minHeight);
						  		console.log(maxHeight);
						  		console.log(minHeight);
						  		console.log(nowHeight);
						  		let nowArea = parseInt(nowWidth) * parseInt(nowHeight);
						  		console.log(nowArea);
						  		let proportion = (nowArea/orgArea) * 100;
						  		console.log(proportion);
						  		if(proportion > 50) {
						  			this.zhenType = true
						  			this.peopleCardZhen = res.data.url
						  			this.name = res.data.name
						  			this.idCard = res.data.iDNumber
						  		} else {
						  			uni.showToast({title:"身份证占比应不低于图片大小的50%，请重新拍摄", icon: "none",duration:2000});
						  		}
						  	},
						})
						  
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
				  type:"2",
				  roleType:"1"
				}).then(res => {
					console.log("背面检测")
				  console.log(res)
				  uni.hideLoading()
				  if(res.code == 0){
					  
						
						this.fanType = true
						this.peopleCardFan = res.data.url
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
			},getPermission(name) {
				let that = this
				permissionUtils.requestPhonePermission(
					'camera',
					[
						'android.permission.CAMERA'
					],
					function success() {
						that.ocr(name)
					},
					function fail(permission) {
				
					}
				)
			},
			ocr(name) {
				console.log("进来了")
				let ocrType = "idCardFront"
				if(name == "peopleCardZhen"){
					ocrType = 'idCardFront'
				}else if(name == "peopleCardFan"){
					ocrType = 'idCardBack'
				}
				// 2.使用自定义样式
				bdOCR.ocr({
					/**
					 * v2.4.2版本加入此功能
					 * 我们注意到有些小伙伴担心前端直接请求百度api会有安全问题，所以我们开放了此功能
					 * 如果此属性设置为false，仅会返回识别图片，不会使用SDK调用OCR相关接口
					 * 如果此属性设置为true，则会返回识别图片，同时也会调用SDK的OCR识别接口，返回OCR识别结果
					 */
					ocr: useOCR, // 选填【是否启用ocr功能】，默认值：true，会返回识别图片+ocr文字信息，设置为false则仅返回被识别的图片
					ocrType: ocrType, // 选填【识别类型】默认值：idCardFront，身份证正面识别，ocrType说明见插件文档
					hintTextColor: '#FF0000', // 选填【提示文字颜色】默认值：#FFFFFF
					hintTextBackgroundColor: '#FFFFFF', // 选填【提示文字背景颜色】默认值：#000000
					backgroundColor: '#000000', // 选填【页面背景颜色】默认值：#000000
					autoScanIdCard: 0, // 选填【是否开启自动识别】默认值：0，0：是|1：否，仅ocrType=‘idCardBack’ 或 ‘idCardFront’时有效
					templateId: '1e6faf0ec8b93006ad5fa31b9238d3b3', // 选填【自定义模板ID】，仅ocrType=‘custom’时有效
					albumEnable: 1 // 选填【是否启用相册选择】默认值：0，0：是|1：否
				}, result => {
					
					switch (result.code) {
						case 1: //ocr文字提取成功
							// 只有开启OCR功能才会返回OCR结果
							if (useOCR) {
								// 为了安全起见，验证下是否为JSON字符串，是则转换为对象
								if (typeof result.ocrResult === 'string') {
									result.ocrResult = JSON.parse(result.ocrResult)
								}
							}
							let base64Result = `data:image/jpg;base64,${result.base64Image}`
							if(name == "peopleCardZhen"){
								this.peopleCardZhenFun(base64Result)
							}else if(name == "peopleCardFan"){
								this.peopleCardFanFun(base64Result)
							}
							delete result.base64Image
							this.ocrResult = JSON.stringify(result)
							break
						case -1: //其他错误，如so加载错误，sdk加载失败等
						case -2: //用户主动关闭
						case -3: //没有提取到文字信息
						case -4: //ocr识别失败，会返回ocrSDK错误信息
							this.ocrResult = JSON.stringify(result)
							break
							/**
							 * 设计以下状态码是考虑到可能有需求要显示自定义弹窗的情况！
							 */
						case 100100: //开始初始化SDK，注意此处如果在网络不好的时候会耗时，为了更好的用户体验，建议设置弹窗等待
							uni.showLoading({
								title: 'SDK加载中...'
							})
							break
						case 100101: //SDK初始化完成，如果100100设置了弹窗等待，那么就在这里关闭
							uni.hideLoading()
							break
						case 100102: //获取文字提取结果，如果精度高会耗时，为了更好的用户体验，建议设置弹窗等待
							uni.showLoading({
								title: '获取结果...'
							})
							break
						case 100103: //提取文字结果完成，如果100102设置了弹窗等待，那么就在这里关闭
							uni.hideLoading()
							break
					}
				})
			},
			addImg(e){
				if(this.type == 2){
					return
				}
				
				let name = e.currentTarget.dataset.img
				
				//身份证识别走别的路
				if(name == "peopleCardZhen" || name == "peopleCardFan"){
					console.log("走起")
					
					this.getPermission(name)
				}else{
					uni.chooseImage({
					    count: 1, // 默认最多一次选择9张图
					    // 	sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
					    success: res=> {
							this.compressImgPath = "";
					        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
							
							let url = res.tempFilePaths[0];
							//#ifdef APP-PLUS
							let resPath = url;
							let path=plus.io.convertLocalFileSystemURL(resPath);
							// let imageSize = res.tempFiles[0].size/1000
							let compressImgTool=uni.requireNativePlugin("CL-CompressImg");
							//app走压缩
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
										if(name == "people"){
											this.peopleFun(base64)
										}
									})
									.catch(error => {
										uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
									})
								}
							})
							//#endif
							
							//#ifdef H5
							
							//#endif
							
							
							// this.$refs.helangCompress.compress({
							//     src: url,
							//     maxSize: 1920,
							//     fileType:'jpg',
							//     quality: 1,
							//     minSize: -1 //最小压缩尺寸，图片尺寸小于该时值不压缩，非H5平台有效。若需要忽略该设置，可设置为一个极小的值，比如负数。
							// }).then((res)=>{
								
							// }).catch((err)=>{
							// 	uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
							// })
							
							
							
							
					    }
					})
				}
			},addImg1(){
				//拍人脸开始
				uni.chooseImage({
				    count: 1, // 默认最多一次选择9张图
				    // 	sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
				    success: res=> {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;
						let url = res.tempFilePaths[0]
						this.compressImgPath = "";
						
						//#ifdef APP-PLUS
						let path=plus.io.convertLocalFileSystemURL(url);
						// let imageSize = res.tempFiles[0].size/1000
						let compressImgTool=uni.requireNativePlugin("CL-CompressImg");
						//app走压缩
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
								pathToBase64(this.compressImgPath)
								.then(base64 => {
									this.peopleFun(base64)
								})
								.catch(error => {
									uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
								})
								
							}
						})
						// this.$refs.helangCompress.compress({
						//     src: url,
						//     maxSize: 1920,
						//     fileType:'jpg',
						//     quality: 1,
						//     minSize: -1 //最小压缩尺寸，图片尺寸小于该时值不压缩，非H5平台有效。若需要忽略该设置，可设置为一个极小的值，比如负数。
						// }).then((res)=>{
							
						// })
						// .catch(error => {
						// 	uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
						// })
						
						//#endif
						
						//#ifdef H5
						pathToBase64(url)
						.then(base64 => {
							this.peopleFun(base64)
						})
						.catch(error => {
							uni.showToast({title:"上传失败,请重新上传", icon: "none",duration:2000})
						})
						//#endif
				        
						
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
	@import "https://at.alicdn.com/t/font_2282532_ta8yur8akfq.css"
	
</style>
