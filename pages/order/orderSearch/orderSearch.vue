<template>
	<view class="page myOrder">
		<u-navbar z-index="90" is-back="false" title="" :border-bottom="false">
			<view class="slot-wrap">
				<u-search :show-action="false" placeholder="搜索司机/货源名称" @search="search" v-model="keyword"></u-search>
			</view>
		</u-navbar>
		<!-- 搜索区域 -->
		<view class="orderTop" :style="{top: `${barheight}px`}">
			<u-cell-group>
				<u-cell-item :value-style="{fontSize: '24rpx'}" style="height: 80rpx;" title="装货地" :value="loadingTit" @click="popupShow(1)"></u-cell-item>
				<u-cell-item :value-style="{fontSize: '24rpx'}" style="height: 80rpx;" title="卸货地" :value="unloadingTit" @click="popupShow(2)"></u-cell-item>
				<u-cell-item :value-style="{fontSize: '24rpx'}" style="height: 80rpx;" title="创建时间" :value="dataRange" @click="popupShow(3)"></u-cell-item>
			</u-cell-group>
			<view class="timeLabel">
				<button class="timeLabel-item" :class="[btnChange == 1 ? 'timeLabel-itemss' : '' ]" @click="btnChangess(1)">1个月内</button>
				<button class="timeLabel-item" :class="[btnChange == 2 ? 'timeLabel-itemss' : '' ]" @click="btnChangess(2)">3个月内</button>
				<button class="timeLabel-item" :class="[btnChange == 3 ? 'timeLabel-itemss' : '' ]" @click="btnChangess(3)">6个月内</button>
			</view>
		</view>
		
		<!-- 日期范围 -->
		<uni-calendar :range="true" ref="calendar" :insert="false" @confirm="timeChange"></uni-calendar>
		
		<!-- 装货地 -->
		<u-popup @close="loadClose" border-radius="40" v-model="loadShow" mode="bottom" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.3)'}">
			<view class="carConTit">
				<view class="carConTitBtn" @click="loadClear">重置</view>
				<view class="carConTitCon">装货地选择</view>
				<view class="carConTitBtn" style="background: #0080ff;color: #fff;" @click="loadClose">确认</view>
			</view>
			<view class="ranking-slot-title" v-if="showPlace != 1">
				<view class="indexes">
					<view class="indexesTit">选择：{{ loadingItem }}</view>
					<view class="indexesBtn" @click="back(1)">返回上一级</view>
				</view>
			</view>
			<view class="ranking-slot-content">
				<view class="conContent" :class="{conContents: showPlace == 1}">
					<view 
						@click="siteChange(1,1,item)" 
						v-for="(item, index) in nationwideList" :key="'nationwide'+index" 
						class="carType"
						:class="{ checkCarType: nationwideObj.id == item.id }"
						v-if="showPlace == 1"
					>
						{{item.name}}
					</view>
					<view
						@click="siteChange(1,2,item)" 
						v-for="(item, index) in provinceList" :key="'province'+index" 
						class="carType"
						:class="{ checkCarType: provinceObj.id == item.id }"
						v-if="showPlace == 2"
					>
						{{item.name}}
					</view>
					<view
						@click="siteChange(1,3,item)" 
						v-for="(item, index) in cityList" :key="'city'+index" 
						class="carType"
						:class="{ checkCarType: cityObj.id == item.id }"
						v-if="showPlace == 3"
					>
						{{item.name}}
					</view>
				</view>
			</view>
		</u-popup>
		
		<!-- 卸货地 -->
		<u-popup @close="unloadClose" border-radius="40" v-model="unloadShow" mode="bottom" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.3)'}">
			<view class="carConTit">
				<view class="carConTitBtn" @click="unloadClear">重置</view>
				<view class="carConTitCon">卸货地选择</view>
				<view class="carConTitBtn" style="background: #0080ff;color: #fff;" @click="unloadClose">确认</view>
			</view>
			<view class="ranking-slot-title" v-if="unshowPlace != 1">
				<view class="indexes">
					<view class="indexesTit">选择：{{ unloadingItem }}</view>
					<view class="indexesBtn" @click="back(2)">返回上一级</view>
				</view>
			</view>
			<view class="ranking-slot-content">
				<view class="conContent" :class="{conContents: unshowPlace == 1}">
					<view 
						@click="siteChange(2,1,item)" 
						v-for="(item, index) in nationwideList" :key="'nationwide'+index" 
						class="carType"
						:class="{ checkCarType: unnationwideObj.id == item.id }"
						v-if="unshowPlace == 1"
					>
						{{item.name}}
					</view>
					<view
						@click="siteChange(2,2,item)" 
						v-for="(item, index) in provinceList" :key="'province'+index" 
						class="carType"
						:class="{ checkCarType: unprovinceObj.id == item.id }"
						v-if="unshowPlace == 2"
					>
						{{item.name}}
					</view>
					<view
						@click="siteChange(2,3,item)" 
						v-for="(item, index) in cityList" :key="'city'+index" 
						class="carType"
						:class="{ checkCarType: uncityObj.id == item.id }"
						v-if="unshowPlace == 3"
					>
						{{item.name}}
					</view>
				</view>
			</view>
		</u-popup>
		
		<!-- 搜索区域 -->
		<view class="suggestBottom">
			<view class="contentList">
				<mescroll-body height="80%" ref="mescrollRef" @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
					<view class="list por" v-for="(item,index) in order" :key="index" @click="to(item,item.faceCargoState,item)" v-if="item.faceCargoState == 5 || item.faceCargoState == 3 || item.faceCargoState == 4 || item.faceCargoState == 6 || item.faceCargoState == 7">
						<!-- faceState -->
						<icon class="iconfont iconquxiaozhong to poa" v-if="item.cargoState == 4" style="color:#fc441c;font-size: 100rpx;top: 40rpx;right: 23rpx;"></icon>
						<!-- <image src="../../../static/pic61.png" style="width: 100rpx;" class="" mode="widthFix"></image> -->
						<view class="tp">
							<view class="status status1" v-if="item.faceCargoState == 1">
								待确认
							</view>
							<view class="status status2" v-else-if="item.faceCargoState == 3">
								运输中
							</view>
							<view class="status status3" v-else-if="item.faceCargoState == 4">
								待支付
							</view>
							<view class="status status4" v-else-if="item.faceCargoState == 5">
								待评价
							</view>
							<view class="status status5" v-else-if="item.faceCargoState == 6">
								已完成
							</view>
							<view class="status status5" v-else-if="item.faceCargoState == 7">
								已取消
							</view>
							<!-- <view class="status status3" v-else-if="item.faceCargoState == 5">
								退款中
							</view> -->
							<view class="site">
								<view class="start u-line-1" style="max-width: 220rpx;">
									<!-- item.freightCarg-o -->
									{{item.addressList[0].cityName}} {{item.addressList[0].regionName}}
								</view>
								<icon class="iconfont icondao to" style="font-size: 30rpx;"></icon>
								<view class="end u-line-1" style="max-width: 220rpx;">
									{{item.addressList[item.addressList.length-1].cityName}} {{item.addressList[item.addressList.length-1].regionName}}
								</view>
							</view>
						</view>
						<view class="ct">
							<view class="type">
								<text>{{item.goodsTypeName}}/{{item.weight}}吨</text>

								<text>{{item.cargorCarModeName}}</text>
								<text v-if="item.cargorCarConductorName == '' || item.cargorCarConductorName == null">{{item.occupyConductor}}</text>
								<text v-else>{{item.cargorCarConductorName}}</text>
							</view>
							<view class="money">
								<text class="money">
									￥{{item.freight}}/趟 {{item.vehicleTypeName}}
								</text>

								<text class="tim">
									<text>{{item.updateTime}}</text>
								</text>
							</view>
						</view>
					</view>
				</mescroll-body>
			</view>
			<!-- <text class="orderBlean" v-if="orderBlean">亲,没有更多了</text> -->
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				statusBarH: this.statusBar * 2,
				order: [],
				pageIndex: 1,
				pageSize: 20,
				//选择状态-1是全部
				orderIndex: -1,
				//判断状态.1是正常.2是搜索
				type: 1,
				//到底的监听 true就是到底了
				orderBlean: false,
				//搜索的内容
				keyword: "",
				//底部tab的内容
				list: [{
						iconPath: "../../../static/tabBar01.png",
						selectedIconPath: "../../../static/tabBar02.png",
						text: '发货',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar03.png",
						selectedIconPath: "../../../static/tabBar04.png",
						text: '消息',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar05.png",
						selectedIconPath: "../../../static/tabBar06.png",
						text: '订单',
						customIcon: false
					},
					{
						iconPath: "../../../static/tabBar07.png",
						selectedIconPath: "../../../static/tabBar08.png",
						text: '我的',
						isDot: false,
						customIcon: false
					},
				],
				current: 2,
				canReset:false,
				
				barheight: this.statusBar,
				height: null,
				
				// 禁用按钮
				btnChange: 0,
				
				// 搜索内容
				goodsSearch: null,
				
				// 订单列表
				allOrderList: [],
				
				// 联系电话列表
				phoneLists: [],
				
				// 联系电话列表显示
				phoneShow: false,
				
				// 当前页数
				pageIndex: 1,
				// 当前页面行数
				pageSize: 10,
				// 总数据量
				total: 0,
				upOption:{
					empty:{
						tip: '~ 搜索无结果 ~', // 提示
					},
					textNoMore: '-- 没有更多了 --',
					auto: false,
					isLock:true
				},
				downOption: {
					auto: false,
					isLock:true
				},
				
				faceState: '',
				
				searchObj: {
					startTime: '',
					endTime: '',
					timeType: '',
					startProId: '',
					startCityId: '',
					startAreaId: '',
					endProId: '',
					endCityId: '',
					endAreaId: ''
				},
				
				// 全省列表
				nationwideList: [
					{
						name: '全国',
						id: -1,
					}
				],
				
				// 全市列表
				provinceList: [
					{
						name: '全省',
						id: -1,
					}
				],
				
				// 全区列表
				cityList: [
					{
						name: '全市',
						id: -1,
					}
				],
				
				// 标题
				loadingTit: '请选择装货地',
				unloadingTit: '请选择卸货地',
				dataRange: '请选择日期范围',
				
				// 选中的全国装货地
				nationwideObj: {
					id: '',
					name: ''
				},
				// 选中的全省装货地
				provinceObj: {
					id: -1,
					name: '全省'
				},
				// 选中的全市装货地
				cityObj: {
					id: -1,
					name: '全市'
				},
				
				// 选中的全国卸货地
				unnationwideObj: {
					id: '',
					name: ''
				},
				// 选中的全省卸货地
				unprovinceObj: {
					id: -1,
					name: '全省'
				},
				// 选中的全市卸货地
				uncityObj: {
					id: -1,
					name: '全市'
				},
				
				// 装货地显示
				loadShow: false,
				// 卸货地显示
				unloadShow: false,
				// 日历显示
				timeShow: false,
				
				// 装货地显示全国/全省/全市
				showPlace: 1,
				// 卸货地显示全国/全省/全市
				unshowPlace: 1,
				
				// 装货地选择的索引
				loadingItem: '',
				// 卸货地选择的索引
				unloadingItem: '',
				
			}
		},
		mounted() {
			this.getProvince(-1,1);
			this.getHeight();
		},
		methods: {
			/*上拉加载的回调: */
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				
				let	data = {
					pageIndex: pageNum,
					pageSize: pageSize,
					param: this.keyword,
					faceState: this.orderIndex,
					selectType: 1,
					startTime: this.searchObj.startTime,
					endTime: this.searchObj.endTime,
					timeType: this.searchObj.timeType,
					startProId: this.searchObj.startProId,
					startCityId: this.searchObj.startCityId,
					startAreaId: this.searchObj.startAreaId,
					endProId: this.searchObj.endProId,
					endCityId: this.searchObj.endCityId,
					endAreaId: this.searchObj.endAreaId,
				}
				if(this.keyword || this.searchObj.startTime || this.searchObj.endTime || this.searchObj.timeType || this.searchObj.startProId ||
					this.searchObj.startCityId || this.searchObj.startAreaId || this.searchObj.endProId || this.searchObj.endCityId || this.searchObj.endAreaId
				) {
					this.mescroll.lockDownScroll(false);
					this.mescroll.lockUpScroll(false);
					ajax.get(config.getTime_url, {}).then(res1 => {
						ajax.get(config.orderList_url, data)
							.then(res => {
								console.log("pageList")
								console.log(res)
								if (res.code == 0) {
									// if (res.data.list != null && res.data.list != '') {
										// if (res.data.list.length > 0) {
											for (let i = 0; i < res.data.list.length; i++) {
												if (res.code == 0) {
													var dateTime = new Date(res.data.list[i].updateTime);
													var year = dateTime.getFullYear();
													var month = dateTime.getMonth() + 1;
													var day = dateTime.getDate();
													var hour = dateTime.getHours();
													var minute = dateTime.getMinutes();
													var second = dateTime.getSeconds();
													var now = new Date();
													// var now_new = Date.parse(now.toDateString()); //typescript转换写法
													var milliseconds = 0;
													var timeSpanStr;
													milliseconds = Number(res1.data) - res.data.list[i].updateTime;
													if (milliseconds <= 1000 * 60 * 1) {
														timeSpanStr = '刚刚';
													} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
														timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
													} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
														timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
													} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
														timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
													} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
														timeSpanStr = year + '-' + month + '-' + day;
														// + ' ' + hour + ':' + minute
													} else {
														timeSpanStr = year + '-' + month + '-' + day;
														// + ' ' + hour + ':' + minute
													}
													res.data.list[i].updateTime = timeSpanStr
												}
					
												// res.data.list[i].updateTime = this.timers(res.data.list[i].updateTime)
												if (res.data.list[i].cargorCarModeName.indexOf(",") != -1) {
													var str = res.data.list[i].cargorCarModeName.split(",")
													var strNew = ''
													for (let i = 0; i < str.length; i++) {
														if (i == 0) {
															strNew = str[i] + strNew
														} else {
															strNew = strNew + '/' + str[i]
														}
													}
													res.data.list[i].cargorCarModeName = strNew
												}
												if (res.data.list[i].cargorCarConductorName != null) {
													if (res.data.list[i].cargorCarConductorName.indexOf(",") != -1) {
														var str = res.data.list[i].cargorCarConductorName.split(",")
														var strNew = ''
														for (let i = 0; i < str.length; i++) {
															strNew = strNew + str[i] + '米'
														}
														res.data.list[i].cargorCarConductorName = strNew
													} else if (res.data.list[i].cargorCarConductorName != "") {
														res.data.list[i].cargorCarConductorName = res.data.list[i].cargorCarConductorName +
															"米"
													}
												}
					
												// item.cargorCarModeName
												// item.cargorCarConductorName
											}
											let curPageData = res.data.list;
											let curPageLen = res.data.list.length;
											let hasNext = res.data.hasNextPage;
											if (page.num == 1) this.order = []; //如果是第一页需手动置空列表
											this.order = this.order.concat(curPageData); //追加新数据
											this.mescroll.endSuccess(curPageLen, hasNext);
										// } else {
										// 	this.mescroll.endErr();
										// }
									// } else {
									// 	this.mescroll.endErr();
									// }
								}else {
									uni.showToast({
										title: "网络错误,请重试",
										icon: 'none',
										duration: 2000
									})
								}
							}).catch(err => {
								this.mescroll.endErr();
								//ajax.js反馈的reject结果
								console.log(err)
							})
					}).catch(err => {
						this.mescroll.endErr();
						//ajax.js反馈的reject结果
						console.log(err)
					})
				} else {
					this.mescroll.endSuccess(0,false)
				}
			

			},

			timers(timespan) {

				var dateTime = new Date(timespan);

				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() + 1;
				var day = dateTime.getDate();
				var hour = dateTime.getHours();
				var minute = dateTime.getMinutes();
				var second = dateTime.getSeconds();
				var now = new Date();
				var now_new = Date.parse(now.toDateString()); //typescript转换写法

				var milliseconds = 0;
				var timeSpanStr;

				milliseconds = now_new - timespan;

				if (milliseconds <= 1000 * 60 * 1) {
					timeSpanStr = '刚刚';
				} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
					timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
				} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
				} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
				} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
					timeSpanStr = year + '-' + month + '-' + day;
					// + ' ' + hour + ':' + minute
				} else {
					timeSpanStr = year + '-' + month + '-' + day;
					// + ' ' + hour + ':' + minute
				}
				return timeSpanStr;
			},
			to(id, status, item) {
				console.log("货源id:" + id)
				console.log(status)
				uni.navigateTo({
					url: "/pages/order/orderInfo/orderInfo?orderId=" + id.id + "&status=" + status
				})
			},
			tab(e) {
				if (e != this.orderIndex) {
					this.orderIndex = e
					console.log(this.orderIndex)
					if (this.orderBlean) {
						this.orderBlean = false
					}
					this.order = []
					this.pageIndex = 1
					//还原状态
					// if (this.type == 2) {
					// 	this.type = 1
					// }
				}
			},
			search(e) {
				console.log(e)
				//改变状态
				if (this.type == 1) {
					this.type = 2
				}
				
				// if (this.orderBlean) {
				// 	this.orderBlean = false
				// }
				// this.order = []
				// this.pageIndex = 1
				this.mescroll.resetUpScroll()
			},

			btnChangess(index) {
				this.btnChange = index;
				this.searchObj.timeType = index;
				this.searchObj.startTime = '';
				this.searchObj.endTime = '';
				this.dataRange = '请选择日期范围';
				this.order = [];
				this.mescroll.resetUpScroll();
			},
			
			// 关闭遮罩和下拉菜单
			loadClose() {
				if(this.loadingTit != '请选择装货地') {
					this.loadShow = false;
					this.order = [];
					this.mescroll.resetUpScroll();
				}
			},
			
			// 关闭遮罩和下拉菜单
			unloadClose() {
				if(this.unloadingTit != '请选择卸货地') {
					this.unloadShow = false;
					this.order = [];
					this.mescroll.resetUpScroll();
				}
			},
			
			// 装货地重置
			loadClear() {
				this.loadingTit = '请选择装货地';
				// 选中的全国装货地
				this.nationwideObj = {
					id: '',
					name: ''
				};
				// 选中的全省装货地
				this.provinceObj = {
					id: -1,
					name: '全省'
				};
				// 选中的全市装货地
				this.cityObj = {
					id: -1,
					name: '全市'
				};
				// 装货地显示全国/全省/全市
				this.showPlace = 1;
				// 装货地选择的索引
				this.loadingItem = '';
				this.searchObj.startProId = '';
				this.searchObj.startCityId = '';
				this.searchObj.startAreaId = '';
				this.order = [];
				this.mescroll.resetUpScroll();
			},
			
			// 卸货地重置
			unloadClear() {
				this.unloadingTit = '请选择装货地';
				// 选中的全国装货地
				this.unnationwideObj = {
					id: '',
					name: ''
				};
				// 选中的全省装货地
				this.unprovinceObj = {
					id: -1,
					name: '全省'
				};
				// 选中的全市装货地
				this.uncityObj = {
					id: -1,
					name: '全市'
				};
				// 装货地显示全国/全省/全市
				this.unshowPlace = 1;
				// 装货地选择的索引
				this.unloadingItem = '';
				this.searchObj.endProId = '';
				this.searchObj.endCityId = '';
				this.searchObj.endAreaId = '';
				this.order = [];
				this.mescroll.resetUpScroll();
			},
			
			// 动态获取高度
			getHeight() {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.orderTop').boundingClientRect(data => {
						this.height = data.height;
						console.log(this.height);
					}).exec();
				},300)
			},
			
			// 联系货主
			telShow(e) {
				this.getPhoneList(e);
				this.phoneShow = true;
			},
			
			// 关闭联系号码列表
			phonehide(e) {
				this.phoneShow = e;
			},
			
			timeChange(e) {
				this.searchObj.timeType = '';
				this.btnChange = 0;
				this.searchObj.startTime = e.range.before;
				this.searchObj.endTime = e.range.after;
				this.dataRange = e.range.before + ' 至 ' + e.range.after;
				this.order = [];
				this.mescroll.resetUpScroll();
			},
			
			// 返回上一级
			back(type) {
				if(type == 1) {
					if (this.showPlace == 2) {
						this.showPlace = 1;
						this.loadingTit = this.nationwideObj.name;
						this.provinceObj = {
							id: -1,
							name: '全省'
						};
					} else if(this.showPlace == 3) {
						this.cityObj = {
							id: -1,
							name: '全市'
						};
						this.showPlace = 2;
						this.loadingTit = this.provinceObj.name;
						this.loadingItem = this.nationwideObj.name + '-' + this.provinceObj.name;
					}
				} else {
					if (this.unshowPlace == 2) {
						this.unshowPlace = 1;
						this.unloadingTit = this.unnationwideObj.name;
						this.unprovinceObj = {
							id: -1,
							name: '全省'
						};
					} else if(this.unshowPlace == 3) {
						this.uncityObj = {
							id: -1,
							name: '全市'
						};
						this.unshowPlace = 2;
						this.unloadingTit = this.unprovinceObj.name;
						this.unloadingItem = this.unnationwideObj.name + '-' + this.unprovinceObj.name;
					}
				}
			},
			
			// 获取省/市/区
			getProvince($parentId,$type) {
				ajax.get(config.region_url,{
				  parentId: $parentId,
				  type: $type
				}).then(res => {
					console.log(res);
					if(res.code == 0){
						if($type == 1) {
							this.nationwideList = [
								{
									name: '全国',
									id: -1,
								}
							];
							res.data.forEach(item => {
								this.nationwideList.push(item);
							});
						} else if($type == 2) {
							this.provinceList = [
								{
									name: '全省',
									id: -1,
								}
							];
							res.data.forEach(item => {
								this.provinceList.push(item);
							});
						} else if($type == 3) {
							this.cityList = [
								{
									name: '全市',
									id: -1,
								}
							];
							res.data.forEach(item => {
								this.cityList.push(item);
							});
						}
					} else {
						console.log(res);
					}
				}).catch(err => {
					console.log("获取获取省/市/区接口数据返回失败 error is :" + err);
				})
			},
			
			// 选中装卸地
			siteChange(type,index,val) {
				console.log(val);
				if(type == 1) {
					if(index == 1) {
						this.loadingTit = val.name;
						this.nationwideObj = val;
						if(val.id == -1) {
							this.searchObj.startProId = -1;
							this.searchObj.startCityId = '';
							this.searchObj.startAreaId = '';
							this.loadShow = false;
							this.order = [];
							this.mescroll.resetUpScroll();
						} else {
							this.searchObj.startProId = val.id;
							this.searchObj.startCityId = '';
							this.searchObj.startAreaId = '';
							this.loadingItem = val.name;
							this.showPlace = 2;
							this.getProvince(val.uid,index+1);
						}
					} else if(index == 2) {
						this.provinceObj = val;
						if(val.id == -1) {
							this.loadShow = false;
							this.order = [];
							this.searchObj.startProId = this.nationwideObj.id;
							this.searchObj.startCityId = '';
							this.searchObj.startAreaId = '';
							this.loadingItem = this.nationwideObj.name;
							this.loadingTit = this.nationwideObj.name;
							this.mescroll.resetUpScroll();
						} else {
							this.searchObj.startProId = '';
							this.searchObj.startCityId = val.id;
							this.searchObj.startAreaId = '';
							this.loadingTit = val.name;
							this.loadingItem = this.nationwideObj.name + '-' + val.name;
							this.showPlace = 3;
							this.getProvince(val.uid,index+1);
						}
					} else if(index == 3) {
						this.order = [];
						this.cityObj = val;
						if(val.id == -1) {
							this.searchObj.startProId = '';
							this.searchObj.startCityId = this.provinceObj.id;
							this.searchObj.startAreaId = '';
							this.loadingItem = this.nationwideObj.name + '-' + this.provinceObj.name;
							this.loadingTit = this.provinceObj.name;
						} else {
							this.searchObj.startProId = '';
							this.searchObj.startCityId = '';
							this.searchObj.startAreaId = val.id;
							this.loadingTit = val.name;
							this.loadingItem = this.nationwideObj.name + '-' + this.provinceObj.name + '-' + val.name;
							this.showPlace = 3;
						}
						this.loadShow = false;
						this.mescroll.resetUpScroll();
					}
				} else {
					if(index == 1) {
						this.unloadingTit = val.name;
						this.unnationwideObj = val;
						if(val.id == -1) {
							this.searchObj.endProId = -1;
							this.searchObj.endCityId = '';
							this.searchObj.endAreaId = '';
							this.unloadShow = false;
							this.order = [];
							this.mescroll.resetUpScroll();
						} else {
							this.searchObj.endProId = val.id;
							this.searchObj.endCityId = '';
							this.searchObj.endAreaId = '';
							this.unloadingItem = val.name;
							this.unshowPlace = 2;
							this.getProvince(val.uid,index+1);
						}
					} else if(index == 2) {
						this.unprovinceObj = val;
						if(val.id == -1) {
							this.searchObj.endProId = this.unnationwideObj.id;
							this.searchObj.endCityId = '';
							this.searchObj.endAreaId = '';
							this.unloadingItem = this.unnationwideObj.name;
							this.order = [];
							this.unloadingTit = this.unnationwideObj.name;
							this.unloadShow = false;
							this.mescroll.resetUpScroll();
						} else {
							this.searchObj.endProId = '';
							this.searchObj.endCityId = val.id;
							this.searchObj.endAreaId = '';
							this.unloadingTit = val.name;
							this.unloadingItem = this.unnationwideObj.name + '-' + val.name;
							this.unshowPlace = 3;
							this.getProvince(val.uid,index+1);
						}
					} else if(index == 3) {
						this.order = [];
						this.uncityObj = val;
						if(val.id == -1) {
							this.searchObj.endProId = '';
							this.searchObj.endCityId = this.unprovinceObj.id;
							this.searchObj.endAreaId = '';
							this.unloadingItem = this.unnationwideObj.name + '-' + this.unprovinceObj.name;
							this.unloadingTit = this.unprovinceObj.name;
						} else {
							this.searchObj.endProId = '';
							this.searchObj.endCityId = '';
							this.searchObj.endAreaId = val.id;
							this.unloadingTit = val.name;
							this.unloadingItem = this.unnationwideObj.name + '-' + this.unprovinceObj.name + '-' + val.name;
							this.unshowPlace = 3;
						}
						this.unloadShow = false;
						this.mescroll.resetUpScroll();
					}
				}
			},
			
			// 弹框
			popupShow(index) {
				if(index == 1) {
					this.loadShow = true;
				} else if(index == 2) {
					this.unloadShow = true;
				} else if(index == 3) {
					// this.timeShow = true;
					console.log(this.$refs.calendar)
					this.$refs.calendar.opens();
				}
			},
			
			// 获取电话列表
			getPhoneList(phone) {
				ajax.get(config.phoneList_url,{
					username: phone
				}).then(res => {
					console.log(res);
					if(res.code == 0){
						this.phoneLists = res.data;
					} else {
						console.log(res);
					}
				}).catch(err => {
					console.log("获取电话列表接口数据返回失败 error is :" + err);
				})
			},
			
			// 打电话
			ringUp(phone) {
				uni.makePhoneCall({
				    phoneNumber: phone
				});
			},
			
			// 搜索订单
			search() {
				this.order = [];
				this.mescroll.resetUpScroll();
			},
		}
	}
</script>

<style scoped lang="less">
	.orderTop {
		width: 100%;
		position: fixed;
		top: 88rpx;
		z-index: 10;
		.timeLabel {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 38rpx;
			background: #ffffff;
			.timeLabel-item {
				width: 200rpx;
				height: 55rpx;
				background: #f3f3f3;
				font-size: 23rpx;
				line-height: 55rpx;
				text-align: center;
				border-radius: 55rpx;
			}
			.timeLabel-item::after { border: none }
			.timeLabel-itemss {
				color: #fff;
				background: #0080ff !important;
			}
		}
	}
	.tab {
		z-index: 200;
		position: fixed;
		// top: 88rpx;
		// top:148rpx;
		left: 0;
		width: 100%;
		height: 80rpx;
		background-color: #f8f8f8;
		padding: 0 30rpx;
		border-bottom: 2rpx solid #DDDDDD;

		.conts {
			height: 80rpx;
			border-bottom: 2rpx solid #DDDDDD;
			line-height: 86rpx;
			font-size: 24rpx;
			color: #666666;
		}

		.conts.active {
			border-color: #3399FF;
			color: #3399FF;
		}
	}
.timeLabel {
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 38rpx;
				background: #ffffff;
				.timeLabel-item {
					width: 200rpx;
					height: 55rpx;
					background: #f3f3f3;
					font-size: 23rpx;
					line-height: 55rpx;
					text-align: center;
					border-radius: 55rpx;
				}
				.timeLabel-item::after { border: none }
				.timeLabel-itemss {
					color: #fff;
					background: #0080ff !important;
				}
			}
	.slot-wrap.center {
		width: 100%;
		padding: 0 30rpx;
	}

	.btn {
		margin-bottom: 50rpx;

	}

	.orderBlean {
		color: #666;
		position: relative;
		bottom: 20rpx;
	}

	.page {
		.slotRight {
			color: #f8f8f8;
			font-size: 24rpx;
		}

		.suggestBottom {
			padding-top: 330rpx;

			min-height: calc(100vh - 446rpx);
			text-align: center;
			margin-top: 20rpx;

			.wanting {
				.images {
					width: 142rpx;
					height: 134rpx;
					margin-top: 220rpx;
					margin-bottom: 42rpx;
				}

				view.text {
					width: 280rpx;
					margin: 0 auto;
					text-align: center;
				}
			}

			//.page .suggestBottom 
			.contentList {
				width: 100%;
				padding: 0 30rpx 40rpx 30rpx;

				.list {
					background-color: #fff;
					border-radius: 8rpx;
					box-shadow: 0px 2px 8px #C8C8C8;
					margin-bottom: 20rpx;
					display: grid;
					
					.tp {
						padding: 0 20rpx 26rpx;

						border-bottom: 2rpx solid #EEEEEE;
						display: flex;
						justify-content: start;
						margin-top: 26rpx;
						.status {
							width: 80rpx;
							height: 36rpx;
							text-align: center;
							font-size: 20rpx;
							line-height: 34rpx;
							border-radius: 8rpx;
							color: #F8F8F8;
							margin-top: 4rpx;
						}

						.status.status1 {
							background-color: #FC441C;
						}

						.status.status2 {
							background-color: #07CC10;
						}

						.status.status3 {
							background-color: #FFCC52;
						}

						.status.status4 {
							background-color: #5252FF;
						}

						.status.status5 {
							background-color: #999999;
						}

						.site {
							padding-left: 20rpx;
							display: flex;
							justify-content: start;
							height: 46rpx;
							text {
								max-width: 115rpx;
								display: inline-block;
							}
							.start {
								color: #3399FF;
								font-size: 32rpx;
								line-height: 48rpx;

								text {
									display: inline-block;
								}

								text:first-child {
									padding-right: 10rpx;
								}
							}

							.to {
								// width: 40rpx;
								// height: 28rpx;
								margin: 10rpx 30rpx 0;
							}

							.end {
								color: #F96F2B;
								font-size: 32rpx;
								line-height: 48rpx;

								text {
									display: inline-block;
								}

								text:first-child {
									padding-right: 10rpx;
								}
							}
						}
					}

					.ct {
						padding: 16rpx 20rpx 1rpx 20rpx;

						.type {
							font-size: 22rpx;
							line-height: 38rpx;
							color: #666;
							display: flex;
							justify-contnt: start;

							text {
								display: inline-block;
								margin-right: 20rpx;
							}
						}

						view.money {
							padding-right: 24rpx;
							display: flex;
							justify-content: space-between;
							margin: 22rpx 0;

							text.money {
								color: #333;
								font-size: 28rpx;
								line-height: 38rpx;
							}

							text.tim {
								color: #999999;
								font-size: 20rpx;
								line-height: 42rpx;
							}
						}
					}
				}
			}

		}
	}
	.myOrder {
		.order-cont {
			width: 100%;
			margin-top: 460rpx;
		}
		.orderTop {
			width: 100%;
			position: fixed;
			top: 88rpx;
			z-index: 10;
			.timeLabel {
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 38rpx;
				background: #ffffff;
				.timeLabel-item {
					width: 200rpx;
					height: 55rpx;
					background: #f3f3f3;
					font-size: 23rpx;
					line-height: 55rpx;
					text-align: center;
					border-radius: 55rpx;
				}
				.timeLabel-item::after { border: none }
				.timeLabel-itemss {
					background: #0080ff !important;
					color: #fff;
				}
			}
		}
		.ranking-slot-content {
			background: #ffffff;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-bottom: 15rpx;
			border-radius: 0 0 40rpx 40rpx;
			.conContents {
				border-top: 1rpx solid #f5f5f5;
			}
			.conContent {
				width: 92%;
				background: #ffffff;
				display: flex;
				margin-bottom: 30rpx;
				padding-top: 10rpx;
				align-items: center;
				flex-wrap: wrap;
				.carType {
					width: 160rpx !important;
					margin-top: 16rpx;
					height: 64rpx;
					line-height: 64rpx;
					background: #F1F2F6;
					border-radius: 8rpx;
					font-size: 24rpx;
					text-align: center;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					&:not(:nth-child(4n)) {
					  margin-right: 16rpx; 
					}
				}
				.checkCarType {
					color: #0080ff;
					background: url(../../../static/img19.png);
					background-position: center center;
					background-repeat: no-repeat;
					background-size: auto;
				}
			}
			.rankingItem {
				width: 92%;
				height: 66rpx;
				border-top: 1rpx solid #f5f5f5;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;
				padding: 0 10rpx;
				.duigouCheng {
					font-size: 22rpx;
					color: #0080ff;
				}
				.rankingColor {
					color: #0080ff;
				}
			}
		}
		.ranking-slot-title {
			background: #ffffff;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.indexes {
				width: 92%;
				background: #ffffff;
				padding: 10rpx 0 0 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-top: 1rpx solid #f5f5f5;
				.indexesTit {
					font-size: 20rpx;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				.indexesBtn {
					font-size: 20rpx;
					color: #0080ff;
				}
			}
		}
		.carConTit {
			width: 100%;
			height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			border-bottom: 1px solid #DDDDDD;
			.carConTitBtn {
				width: 100rpx;
				height: 44rpx;
				background: #CCCCCC;
				border-radius: 40rpx;
				font-size: 24rpx;
				line-height: 44rpx;
				color: #333333;
				text-align: center;
			}
			.carConTitCon {
				font-size: 32rpx;
				font-weight: 600;
				color: #0080ff;
			}
		}
		.slot-wrap {
			display: flex;
			align-items: center;
			/* 如果您想让slot内容占满整个导航栏的宽度 */
			flex: 1;
		}
		.site-content {
			margin: 32rpx auto auto auto;
			width: 94%;
			height: 364rpx;
			background: #ffffff;
			border-radius: 20rpx;
			box-shadow: 0 0 10rpx #bfbfbf;
			.site-content-top {
				width: 100%;
				height: 284rpx;
				padding: 24rpx 20rpx;
				position: relative;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				.site-content-top-right {
					.site-content-top-right-both {
						font-size: 24rpx;
						color: #333333;
						height: 130rpx;
						.site-content-top-right-both-text {
							font-size: 20rpx;
							color: #999999;
						}
						view {
							height: 32rpx;
							line-height: 32rpx;
						}
					}
				}
				.site-content-top-left {
					width: 5%;
					height: 100%;
					margin-right: 12rpx;
					padding-bottom: 70rpx;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: center;
					.site-content-top-left-both {
						width: 32rpx;
						height: 32rpx;
						background: #1bb68a;
						border-radius: 50%;
						line-height: 32rpx;
						text-align: center;
						font-size: 16rpx;
						color: #ffffff;
					}
				}
				.listTop-right {
					width: 160rpx;
					height: 44rpx;
					text-align: center;
					line-height: 44rpx;
					background: #FFF3DB;
					border-radius: 0rpx 20rpx 0rpx 20rpx;
					font-size: 20rpx;
					font-weight: 600;
					color: #0080ff;
					position: absolute;
					top: 0;
					right: 0;
				}
			}
			.site-content-bot {
				width: 100%;
				height: 80rpx;
				background: #f0f0f0;
				border-radius: 0 0 20rpx 20rpx;
				.listBots {
					width: 100%;
					height: 100%;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.listBots-left {
						margin-left: 20rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.listBots-left-left {
							display: flex;
							justify-content: center;
							align-items: center;
							margin-right: 12rpx;
						}
						.listBots-left-right {
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: flex-start;
							.listBots-con {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								.listBots-con1 {
									height: 32rpx;
									line-height: 32rpx;
									font-size: 24rpx;
									color: #666666;
									margin-right: 7rpx;
								}
								.listBots-con2 {
									height: 28rpx;
									line-height: 28rpx;
									font-size: 20rpx;
									color: #999999;
									margin-right: 7rpx;
								}
							}
						}
					}
					.listBots-right {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 100rpx;
						height: 80rpx;
						background: #E8E8E8;
						border-radius: 0rpx 0rpx 20rpx 0rpx;
						.listBots-con2 {
							height: 28rpx;
							line-height: 28rpx;
							font-size: 20rpx;
							color: #0080ff;;
							margin-right: 7rpx;
						}
					}
				}
			}
		}
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
