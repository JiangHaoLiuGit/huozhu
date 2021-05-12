<template>
	<view class="amap-container por">
		
		<map :class="`${show == true?'active':''}${Blean == true?'actives':''}`"  :latitude="latitude" :markers="covers" :scale="scale" :longitude="longitude">
		</map>
		<view class="box poa">
			<view class="search u-flex por">
				<s class="poa"></s>
				<view class="from content" @click="formSelect">
					<view class="fang active">{{shen}}</view>
					<view class="fang">{{shi}}</view>
					<view class="fang">{{qu}}</view>
					<image src="../../../static/pic17.png"></image>
				</view>
				<!-- @blur="inputes"  -->
				<input class="input" placeholder='此处填写详细地址（必填）' placeholder-style="font-size:28rpx" v-model="clientname" @input='inputes'></input>
			</view>
			<view class="selectView" v-if='local.length>0'>
				<view class="selectInput" v-for="(item, index) in local" :key="index" @click="selectLocation(item)">
					<view class="name u-line-1 widthB">{{item.name}}</view>
					<view class="address">{{item.district+item.address}}</view>
				</view>
			</view>
			<view class="btn" :class="clientname == ''?'submitBtnDDD':'submitBtnBlue'" :disabled="clientname == ''" @click="to" v-else>{{btn}}</view>
		</view>
		<u-popup v-model="show1" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr1}}</text>
				</view>
				<button class="btnShu" @click="btnShu">{{btnText}}</button>
			</view>
		</u-popup>
		<view class="selects">
			<u-select :default-value="defaultSelect" v-model="show" :list="list" mode="mutil-column-auto" :mask-close-able="false" @cancel="cancel" @confirm="confirm"></u-select>
		</view>
	</view>
</template>

<script>
	// import headerNav from '@/components/amap/amap.vue'
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		
		data() {
			return {
				defaultSelect:[],
				covers: [],
				show1:false,
				showErr1:"",
				btnText:"确定",
				//详细地址
				clientname:"",
				markerList: [],
				currentPosition: {},
				show:false,
				shen:"",
				shi:"",
				qu:"",
				Blean:false,
				formSheng:"",
				formShengId:"",
				formShi:"",
				formShiId:"",
				formQu:"",
				formQuId:"",
				scale:11,
				//请求的地址
				local:[],
				location:{},
				locat:{},
				btn:"",
				type:"",
				//后端传的省市区
				list: [
					
				],
				//经纬度
				locations:"",
				//latitude小的
				latitude:"39.933085",
				//100以上的
				longitude:"116.475068",
				//用于是否可以跳页面
				pageType:false,
				locatList:{},
				start:true,
				types:1
			}
		},
		onLoad(option){
			if(option.index == 1){
				this.btn = "选择为装货地点"
			}else if(option.index == 2){
				this.btn = "选择为二次装货地点"
			}else if(option.index == 3){
				this.btn = "选择为卸货地点"
			}else if(option.index == 4){
				this.btn = "选择为二次卸货地点"
			}else{
				this.btn = "选择为装货地点"
			}
			if(option.locat){
				uni.showLoading({
					title:"正在初始化数据...",
					mask:true
				})
				this.types = 2
				console.log(option.locat)
				this.locatList = JSON.parse(option.locat)
				console.log(this.locatList)
				// this.formSheng = e[0].label
				// this.formShi = e[1].label
				this.formShengId = this.locatList.idArr[0]
				this.formShiId = this.locatList.idArr[1]
				this.formQuId = this.locatList.idArr[2]
				let shen = this.locatList.idArr[0]
				let shi = this.locatList.idArr[1]
				let qu = this.locatList.idArr[2]
				let shenId = ''
				let shiId = ''
				let quId = ''
				ajax.get(config.basicData_url,{
				}).then(res => {
					console.log("区域树")
					console.log(res)
					if(res.code == 0){
						uni.hideLoading()
						let list = res.data
						this.list = list
						this.show = false
						for(let i = 0 ; i < list.length ; i ++){
							if(list[i].value == shen){
								shenId = i
								this.shen = list[i].label
								console.log(list[shenId].children)
								for(let j = 0 ; j < list[shenId].children.length ; j ++){
									if(list[shenId].children[j].value == shi){
										shiId = j
										this.shi = list[shenId].children[j].label
										for(let k = 0 ; k < list[shenId].children[shiId].children.length ; k ++){
											if(list[shenId].children[shiId].children[k].value == qu){
												quId = k
												this.qu = list[shenId].children[shiId].children[k].label
												this.defaultSelect = [i,j,k]
												if(this.locatList.name){
													this.clientname = this.locatList.name
												}else{
													this.clientname = this.locatList.address
												}
												this.pageType = true
												
												let loca = this.locatList.location.split(",")
												this.scale = 18
												this.covers=[{
													latitude: loca[0],
													longitude: loca[1],
													iconPath: '../../../static/location.png',
												}]
												this.latitude = loca[0]
												this.longitude = loca[1]
												if(this.start){
													this.start = false
												}
												this.locat = this.locatList
												this.locatList.location = loca[1] + ',' + loca[0]
												let arr = this.locat.location.split(",");
												this.locat.district = this.shen + this.shi + this.qu
												this.locat.userCity = this.locat.shi
												this.locat.userQu = this.locat.qu
												this.formSheng = this.shen
												this.formShi = this.shi
												this.formQu = this.qu
												
												// this.formSheng + this.formShi + this.formQu
												console.log(this.shen)
												console.log(this.shi)
												console.log(this.qu)
												console.log(this.locat)
												// this.locat.name = this.locat.address
												// this.locat.address = ''
												let item = this.locat
												if(arr.length == 0){
													let shen = item.district.split("市")[0]
													this.formSheng = shen + "市"
													this.formShi = ""
													this.clientname = "";
													this.local = [];
												}else{
													if(item.district.indexOf("省") != -1){
														let shen = item.district.split("省")[0]
														let city = item.district.split("省")[1]
														let shi = city.split("市")[0]
														
														this.formSheng = shen + "省"
														this.formShi = shi + "市"
													}else if(item.district.indexOf("自治区") != -1){
														let shen = item.district.split("自治区")[0]
														this.formSheng = shen + "自治区"
														this.formShi = ""
													}else{
														let shen = item.district.split("市")[0]
														this.formSheng = shen + "市"
														this.formShi = ""
													}
													// this.locat.district = this.locat
													this.local = [];
												}
												
												console.log(this.formSheng)
												console.log(this.formShi)
												console.log(this.formQu)
											}
										}
									}
								}
							}
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
				uni.showLoading({
					title:"正在初始化数据...",
					mask:true
				})
				ajax.get(config.basicData_url,{
				}).then(res => {
					console.log("区域树")
					console.log(res)
					uni.hideLoading()
					if(res.code == 0){
						this.list = res.data
						this.show = true
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
			this.type = option.index
			uni.getLocation({
				type:'gcj02',
				altitude:true,
				geocode:true,
				success: (res) => {
					this.location = res;
				}
			})
			
		},
		mounted() {
			
		},
		methods: {
			formSelect(){
				if(this.show){
					this.show = false
				}else{
					this.show = true
					// this.defaultSelect = [2,3,5]
				}
			},

			btnShu(){
				this.show1 = false
			},
			to(){
				if(this.clientname == ''){
					uni.showToast({
						title:"详细地址必填,请重新选择",
						duration:2000,
						icon:"none"
					})
					// this.show1 = true
					// this.showErr1 = "详细地址必填"
				}else{
					if(this.pageType){
						let tions = this.locat.location
						tions = tions.split(",")
						this.locat.location = tions[1] + ',' + tions[0]
						if(this.locat.idArr){
							
						}else{
							this.locat.idArr = [this.formShengId,this.formShiId,this.formQuId]
						}
						if(this.formShengId != '' && this.formShiId != '' && this.formQuId != ''){
							this.locat.idArr = [this.formShengId,this.formShiId,this.formQuId]
						}
						if(this.formShi == ""){
							this.locat.userCity = this.formSheng
						}else{
							this.locat.userCity = this.formShi
						}
						console.log(this.locat)
						this.locat.userQu = this.formQu
						if(this.locat.userQu.indexOf("区") == "-1"){
							this.locat.userQu += "区"
						}
						this.locat.type = this.type
						console.log(this.locat)
						this.$store.commit("getLocat",this.locat)
						uni.navigateBack()
					}else{
						// this.show1 = true
						// this.showErr1 = "暂时不支持自定义地址,请重新选择"
						uni.showToast({
							title:"暂时不支持自定义地址,请重新选择",
							duration:2000,
							icon:"none"
						})
						// uni.showToast({
						// 	title:"暂时不支持自定义地址,请重新选择",
						// 	duration::2000,
						// 	icon:"none"
						// })
					}
					
				}
				
			},
			inputes(e){
				if(this.shen == "全国"){
					this.getLocationList(e.detail.value);
				}else{
					this.getLocationList(this.formSheng + this.formShi + this.formQu + e.detail.value);
				}
				// this.local = [];
			},
			getLocationList(keywords) {
				let _this = this;
				let data = {};
				data.keywords = keywords;
				data.location = this.location.latitude+','+this.location.longitude;
				//196e78135f0bc48a751225a336646ecb
				data.key="caf4407c08913c5daa391957a662b11d";
				uni.request({
					url: 'https://restapi.amap.com/v3/assistant/inputtips?parameters',
					method: 'GET',
					data: data,
					success:res => {
						_this.local = res.data.tips;
						if(res.data.tips.length > 0){
							_this.Blean = true
						}else{
							_this.Blean = false
							_this.pageType = false
						}
						
					},
					fail:res => {
						console.log("fail")
						console.log(res)
					}
				})
			},
			selectLocation(item){
				
				this.pageType = true
				this.locat = item
				this.locations = this.locat.location
				
				let loca = this.locations.split(",")
				this.Blean = false
				this.covers=[{
					latitude: loca[1],
					longitude: loca[0],
					iconPath: '../../../static/location.png',
				}]
				this.latitude = loca[1]
				this.longitude = loca[0]
				this.scale = 18
				let arr = this.locat.location.split(",");
				
				
				if(arr.length == 0){
					let shen = item.district.split("市")[0]
					this.shen = shen
					this.formSheng = shen + "市"
					this.formShi = ""
					this.shi = ""
					this.clientname = "";
					this.local = [];
				}else{
					if(item.district.indexOf("省") != -1){
						let shen = item.district.split("省")[0]
						let city = item.district.split("省")[1]
						let shi = city.split("市")[0]
						this.formSheng = shen + "省"
						this.formShi = shi + "市"
						this.shen = shen
						this.shi = shi
					}else if(item.district.indexOf("自治区") != -1){
						let shen = item.district.split("自治区")[0]
						this.shen = shen + "自治区"
						this.formSheng = shen + "自治区"
						// this.formShi = ""
						// this.shi = ""
						// this.qu = ""
					}else{
						
						let shen = item.district.split("市")[0]
						this.shen = shen
						this.formSheng = shen + "市"
						// this.formShi = ""
						// this.shi = ""
						// this.qu = ""
					}
					
					this.clientname = item.name;
					this.local = [];
					console.log(this.locat)
				}
			},
			cancel(e){
				if(this.start){
					uni.navigateBack()
				}else{
					this.show = false
				}
				
			},
			
			confirm(e){
				let start = this.defaultSelect
				console.log(e)
				
				if(this.start){
					this.start = false
				}
				this.formSheng = e[0].label
				this.formShengId = e[0].value
				this.formShi = e[1].label
				this.formShiId = e[1].value
				this.formQu = e[2].label
				this.formQuId = e[2].value
				// this.defaultSelect = [e[0].value,e[1].value,e[2].value]
				let list = this.list
				let shenId = ''
				let shiId = ''
				let quId = ''
				for(let i = 0 ; i < list.length ; i ++){
					if(list[i].value == this.formShengId){
						shenId = i
						for(let j = 0 ; j < list[shenId].children.length ; j ++){
							if(list[shenId].children[j].value == this.formShiId){
								shiId = j
								for(let k = 0 ; k < list[shenId].children[shiId].children.length ; k ++){
									if(list[shenId].children[shiId].children[k].value == this.formQuId){
										quId = k
										this.defaultSelect = [i,j,k]
										if(start.length > 0 && this.defaultSelect.length > 0){
											if(start[0] == this.defaultSelect[0] && start[0] == this.defaultSelect[0] && start[1] == this.defaultSelect[2]){
												
											}else{
												console.log("清数据")
												if(this.clientname != ''){
													this.clientname = ''
												}
											}
										}
										
									}
								}
							}
						}
					}
				}
				console.log(this.defaultSelect)
				let shen = e[0].label
				let shi = e[1].label
				let qu = e[2].label
				if(shen.slice(shen.length-1,shen.length) == "省"){
					this.shen = shen.slice(0,shen.length-1)
				}else{
					this.shen = e[0].label
				}
				if(shi.slice(shi.length-1,shen.length) == "市"){
					this.shi = shi.slice(0,shi.length-1)
				}else{
					this.shi = e[1].label
				}
				if(qu.slice(qu.length-1,qu.length) == "区"){
					this.qu = qu.slice(0,qu.length-1)
				}else{
					this.qu = e[2].label
				}
				if(this.types == 2){
					this.locat.district = this.shen + this.shi + this.qu
					console.log(this.locat)
				}
				console.log(this.formSheng)
				console.log(this.formShi)
				console.log(this.formQu)
				// this.shen = 
				//给省市区 跟地图联动
				let _this = this;
				let data = {};
				data.keywords = this.formSheng + this.formShi + this.formQu;
				data.location =this.location.latitude +','+this.location.longitude;
				//196e78135f0bc48a751225a336646ecb
				data.key="caf4407c08913c5daa391957a662b11d";
				uni.request({
					url: 'https://restapi.amap.com/v3/assistant/inputtips?parameters',
					method: 'GET',
					data: data,
					success(res) {
						// _this.local = res.data.tips;
						let sum = res.data.tips[0].location.split(",")
						_this.latitude = sum[1]
						_this.longitude = sum[0]
						_this.scale = 13
					}
				})
			},
		}
	}
</script>



<style lang="scss" scoped>
	
		map {
			width: 100%;
			// calc(100vh - 36rpx)
			height: calc(100vh - 318rpx);
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
		}
		map.active{
			height: calc(100vh - 580rpx);
		}
		map.actives{
			height: calc(100vh - 670rpx);
		}

.selects{
	z-index: 10;
	position: absolute;
	bottom: 0;
	left: 0;
}
.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #ffffff;
	}
	.input{
		padding-left: 10px;
	}
	.selectView{
		z-index: 9999;
		width:100%;
		height: 500rpx;
		overflow-y: scroll;
		
		margin-bottom: 20rpx;
	}
	.selectInput{
		height:50px;
		background-color: #ffffff;
		border-bottom: 1px solid #eeeeee;
		padding-left: 15px;
	}
	.name{
		color:#000000;
		font-size: 16px;
		padding-top: 4px;
	}
	.address{
		color:#6c6c6c;
		font-size: 14px;
		display: block;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
.amap-container{
	height: 100vh;
	.box{
		width: 100%;
		bottom: 0;
		left: 0rpx;
		background-color: #fff;
		z-index: 10;
		.search{
			width: 690rpx;
			height: 80rpx;
			margin: 48rpx 30rpx 20rpx 30rpx;
			background: #f8f8f8;
			border: 2rpx solid #DDDDDD;
			border-radius: 8rpx;
			padding-right: 20rpx;
			s{
				top:-28rpx;
				left: 296rpx;
				display: block;
				width: 100rpx;
				height: 8rpx;
				border-radius: 8rpx;
				background-color: #ddd;
			}
			.from{
				min-width: 260rpx;
				border-right: 2rpx solid #ddd;
				height: 80rpx;
				padding-right: 10rpx;
				.fang{
					margin: 0 4rpx;
					max-width: 200rpx;
					text-overflow: ellipsis;
					overflow:hidden;
					white-space: nowrap;
				}
				
				image{
					margin-left: 14rpx;
					transform: rotate(-90deg);
					width: 16rpx;
					height: 26rpx;
				}
			}
			.input{
				width: 480rpx;
				height: 80rpx;
				padding-left: 20rpx;
				font-size: 28rpx;
			}
		}
	}
	.btn{
		margin: 60rpx 30rpx 50rpx;
	}
	
}
</style>
