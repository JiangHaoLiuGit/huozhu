<template>
	<view class="page">
		<u-navbar title="订单详情" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#0080FF' }"
		 :borderBottom="false">
			<!--   -->
			<view slot="right" class="u-padding-right-40 fffColor" v-if="status == 2 || status == 3" @click="delet">取消订单</view>
		</u-navbar>
		<view class="contentList">
			<view class="list list1 list2 por" style="padding-top: 0;padding-left: 0;">
				<view class="tp" style="height: auto;padding: 12rpx 20rpx 12rpx 20rpx;">
					<view class="lt">
						装卸信息
					</view>
					<view class="rt u-flex">
					</view>
					
					<icon class="iconfont icondaiqueren poa icon" v-if="status == 2" style="color:#fc441c;"></icon>
					<icon class="iconfont iconyunshuzhong poa icon" v-else-if="status == 3" style="color:#07cc10;"></icon>
					<icon class="iconfont icondaizhifu poa icon" v-else-if="status == 4" style="color:#ffcc52;"></icon>
					<!-- icondaipingjia -->
					<icon class="iconfont icondaipingjia poa icon" v-else-if="status == 5" style="color:#6666ff;"></icon>
					<!-- <image src="../../../static/pic48.png" v-else-if="status == 5" class="poa img" mode=""></image> -->
					<icon class="iconfont iconyiwancheng poa icon" v-else-if="status == 6" style="color:#9a9a9a;"></icon>
					<icon class="iconfont iconyiquxiao poa icon" v-else-if="status == 7" style="color:#9a9a9a;"></icon>
					<!-- <image src="../../../static/pic55.png" v-else-if="status == 5" class="poa img" mode=""></image> -->
				</view>
				<view class="bm" style="padding-left: 20rpx">
					<view v-for="(item , index) in obj.freightCargoDTO.addressList" :key="index">
						<view class="box boxThree te" v-if="item.type == 1">
							<view class="lt u-flex u-row-center"><icon class="iconfont iconzhuang" style="font-size: 46rpx;color: #0080FF;"></icon></view>
							<view class="rt u-line-1" style="font-size: 32rpx;">{{item.cityName}} {{item.regionName}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{item.address}}</view>

						</view>
						<view class="box boxThree te" v-else>
							<view class="lt u-flex u-row-center"><icon class="iconfont iconxie" style="font-size: 46rpx;color: #f96f2b ;"></icon></view>
							<view class="rt u-line-1" style="font-size: 32rpx;">{{item.cityName}} {{item.regionName}}</view>
							<view class="rt te" style="font-size: 24rpx;color: #666;">{{item.address}}</view>
						</view>
					</view>
				</view>
				<view class="bottom u-flex">
					<view class="left u-flex">
						<view class="zhuang">装货时间：{{obj.freightCargoDTO.appointedTime}} </view>
						<view class="xie" v-if="obj.freightCargoDTO.unloadingTime != 0 && obj.freightCargoDTO.unloadingTime != null">卸货时间：{{obj.freightCargoDTO.unloadingTime}}</view>
					</view>
					<view class="right u-text-center">
						<view class="tpp u-padding-top-10 u-padding-bottom-6" style="color: #F96F2B;font-size: 32rpx;" @tap="openMap">
							查看路线
						</view>
						<view class="bmm u-font-ss">
							运输总路程 {{kilometers}} 公里
						</view>
					</view>
					<!-- <view class="left">
						<text class="text1">运输总路程约为</text>
						<text class="text2" style="position: relative;left:10rpx">{{kilometers}}公里</text>
					</view>
					<view class="right" style="position: relative;left:50rpx" @tap="openMap">
						查看路线》
					</view> -->
				</view>
			</view>

			<view class="list list2" v-if="status >= 5 && obj.orderEvaluationList != null && obj.orderEvaluationList.length > 0 && obj.orderEvaluationList != null">
				<view class="tp u-flex">
					<view class="lt">
						评价信息
					</view>
					<view class="rt u-flex">
					</view>
				</view>
				<view class="bm">
					<view class="box" style="height: auto;align-items: baseline;" v-if="freightCargoOrderEvaluation.score != null">
						<view class="lt boxNine">货主评价</view>
						<view class="rt u-line-1">
							<view>
								<u-rate active-color="#FFCC52" disabled="true" :count="5" v-model="freightCargoOrderEvaluation.score"></u-rate>
							</view>
							<view class="u-flex" style="width: auto;flex-wrap:wrap;">
								<view class="blockView sixColor u-margin-top-20" v-for="(item,index) in cargoName" :key="index">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
					<view class="box" style="height: auto;align-items: baseline;" v-if="freightDriverOrderEvaluation.score != null">
						<view class="lt boxNine">司机评价</view>
						<view class="rt u-line-1">
							<view>
								<u-rate active-color="#FFCC52" disabled="true" :count="5" v-model="freightDriverOrderEvaluation.score"></u-rate>
							</view>
							<view class="u-flex" style="width: auto;flex-wrap:wrap;">
								<view class="blockView sixColor u-margin-top-20" v-for="(item,index) in driverName" :key="index">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--   -->
			<view class="list list2" v-if="pictureList1 != '' || pictureList2 != '' || pictureList3 != '' ">

				<view class="tp u-flex">
					<view class="lt">
						运输信息
					</view>
				</view>
				<view v-if="status >= 3">
					<!-- 司机上传的图片 -->
					<view class="driver u-flex u-row-between u-padding-top-20 u-padding-bottom-10 u-padding-right-20" v-if="pictureList1 != '' && pictureList1 != null"
					 style="border-top: 2rpx solid #EEEEEE;">
						<text class="u-font-md threeColor">装货凭证</text>
						<view class="u-flex u-row-center" style="width: 166rpx;height: 78rpx;" v-if="pictureList1 != ''">
							<image :src="pictureList1" @click="imgMagnify(0)" style="max-width: 166rpx;height: 78rpx;" mode="aspectFit"></image>
						</view>
						
					</view>
					<!-- 司机上传的图片 -->
					<view class="driver u-flex u-row-between u-padding-top-20 u-padding-bottom-10 u-padding-right-20" v-if="pictureList2 != '' && pictureList2 != null"
					 style="border-top: 2rpx solid #EEEEEE;">
						<text class="u-font-md threeColor">卸货凭证</text>
						<view class="u-flex u-row-center" style="width: 166rpx;height: 78rpx;" v-if="pictureList2 != ''">
							<image :src="pictureList2" @click="imgMagnify((!pictureList1 && !pictureList3) || (!pictureList1 && pictureList3) ? 0 : 1)" style="max-width: 166rpx;height: 78rpx;" mode="aspectFit"></image>
						</view>
						
					</view>
					<!-- 司机上传的图片 -->
					<view class="driver u-flex u-row-between u-padding-top-20 u-padding-bottom-10 u-padding-right-20" v-if="pictureList3 != ''"
					 style="border-top: 2rpx solid #EEEEEE;">
						<text class="u-font-md threeColor">回单</text>
						<view class="u-flex u-row-center" style="width: 166rpx;height: 78rpx;" v-if="pictureList3 != ''">
							<image :src="pictureList3" @click="imgMagnify(!pictureList1 && !pictureList2 ? 0 : (pictureList1 && !pictureList2) || (!pictureList1 && pictureList2) ? 1 : pictureList1 && pictureList2 ? 2 : '')" style="max-width: 166rpx;height: 78rpx;" mode="aspectFit"></image>
						</view>
						
					</view>
				</view>
			</view>
			<view class="list list2 por" v-if="faceDriverList.length > 0">
				<!-- <view class="tishi blue">
					
				</view> -->
				<view class="tishi blue" v-if="tishi == 1">
					请指定司机
				</view>
				<!-- <view class="tishi yellow" v-else-if="tishi == 2">
					您已指定承运司机,待司机确认
				</view> -->
				<view class="tp u-flex">
					<view class="lt">
						承运司机信息
					</view>
				</view>
				<!-- 司机信息 faceDriverList -->
				<view class="driver u-padding-top-20 u-padding-bottom-32 u-padding-right-20" style="border-top: 2rpx solid #EEEEEE;"
				 v-for="(item , index) in faceDriverList" :key="index">
					<view class="user u-flex u-row-between">
						<!-- obj.cargoOwner.cargoOwnerId -->
						<view class="userInfo u-flex" @click="promise(item)">
							<icon class="iconfont userImg icontouxiang1" style="font-size: 60rpx;" v-if="item.headPortrait == '' || item.headPortrait == null"></icon>
							<image class="img borderRadius" v-else :src="item.headPortrait" style="width: 68rpx;height: 68rpx;" mode="scaleToFill"></image>

							<view class="u-margin-left-20">
								<view class="u-flex">
									<view class="u-font-md threeColor u-margin-right-28">{{item.idCardName}}</view><!-- 汪琪 -->
									<!-- 浙A88888 -->
									<view class="u-font-md nineColor" v-if="item.carList != null && item.carList != ''">
										<view v-for="(items,indexs) in item.carList" :key="indexs" v-if="items.isDefault == 1">
											{{item.carList[0].plateNumber}}
										</view>
									</view>
								</view>
								<view class="u-flex">
									<view class="u-font-ss nineColor u-margin-right-20">交易数 {{item.turnoverTotal}}</view><!-- {{obj.cargoOwner.tradingVolume}} -->
									<view class="u-font-ss nineColor u-margin-right-20">好评率 {{item.highPraiseRate}}%</view><!-- {{obj.cargoOwner.highPraiseRate}} -->
									<view class="u-font-ss nineColor">{{item.createOrderTime}}</view>
								</view>
							</view>
						</view>
						<!-- <icon class="iconfont icondianhualianxi" style="font-size: 68rpx;color: #ffcc52;"></icon> -->
						<!-- <image class="borderRadius" src="../../../static/pic51.png" style="width: 68rpx;" @click="call(item.phone)" mode="widthFix"></image> -->
						<image class="borderRadius" src="../../../static/pic51.png" style="width: 68rpx;" @click="callTel(item.creator)" mode="widthFix"></image>
					</view>
				</view>
			</view>

			<view class="list list2" style="padding-bottom: 0; padding-left: 0;">
				<view class="tp u-flex" style="border-bottom:none; margin-left: 20rpx;width: calc(100% - 20rpx);">
					<view class="lt">
						货源信息
					</view>
					<view class="rt u-flex">
					</view>
				</view>
				<view class="bm" style="border-top: 2rpx solid #eee;padding-top: 16rpx; margin-left: 20rpx;width: calc(100% - 20rpx);">
					<view class="box">
						<view class="lt boxNine">名称类型</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.name}} {{obj.freightCargoDTO.goodsTypeName}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">重量体积</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.weight}}吨 {{obj.freightCargoDTO.volume}}方</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">包装方式</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.packagingTypeName}}</view>
					</view>
				</view>
				<view class="bm" style="border-top: 2rpx solid #eee;padding-top: 16rpx; margin-left: 20rpx;width: calc(100% - 20rpx);"
				 v-if="textBtn">
					<view class="box">
						<view class="lt boxNine">用车类型</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.vehicleTypeName}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">装货车型</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.cargorCarModeName}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">装货车长</view>
						<view v-if="obj.freightCargoDTO.cargorCarConductorName == '' || obj.freightCargoDTO.cargorCarConductorName == null">{{obj.freightCargoDTO.occupyConductor}}</view>
						<view v-else class="rt u-line-1">{{obj.freightCargoDTO.cargorCarConductorName}}</view>
					</view>
					<view class="box">
						<view class="lt boxNine">占用车长</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.occupyCarLength}}</view>
					</view>
					
					<view class="box boxThree">
						<view class="lt boxNine">服务要求</view>
						<view class="rt u-line-1" v-if="obj.freightCargoDTO.serviceName == ''">无</view>
						<view class="rt u-line-1" v-else>{{obj.freightCargoDTO.serviceName}}</view>
					</view>
				</view>
				<view class="bm" style="border-top: 2rpx solid #eee;padding-top: 16rpx; margin-left: 20rpx;width: calc(100% - 20rpx);"
				 v-if="textBtn">
					<view class="box">
						<view class="lt boxNine">运输费用</view>
						<view class="rt u-line-1" v-if="obj.freightCargoDTO.paymentMethod == 1">
							{{obj.freightCargoDTO.freight}}元/趟 到付
						</view>
						<view class="rt u-line-1" v-else>
							{{obj.freightCargoDTO.freight}}元/趟 回单付
						</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">定金支付</view>
						<view class="rt u-line-1" v-if="obj.freightCargoDTO.refundMethod == 1">{{obj.freightCargoDTO.deposit}}元 退还</view>
						<view class="rt u-line-1" v-else>{{obj.freightCargoDTO.deposit}}元 不退还</view>

					</view>
					<view class="box boxThree" v-if="obj.freightCargoDTO.driverName != '' && obj.freightCargoDTO.driverName != null">
						<view class="lt boxNine">指定司机</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.driverName}}</view>
					</view>
					<view class="box boxThree" v-if="obj.freightCargoDTO.remark != null && obj.freightCargoDTO.remark != ''">
						<view class="lt boxNine">备注信息</view>
						<view></view>
						<view class="rt u-line-1" v-if="obj.freightCargoDTO.remark == ''">无</view>
						<view class="rt u-line-1" v-else>{{obj.freightCargoDTO.remark}}</view>
					</view>
				</view>
				<view class="btnView">
					<icon class="iconfont iconmore u-padding-top-30 u-padding-bottom-30" :class="textBtn?'active':''" @click="textBtn = !textBtn"></icon>
				</view>
			</view>


			<!-- <view class="list list2" v-if="status == 5">
				<view class="tp u-flex">
					<view class="lt">
						评价信息
					</view>
					<view class="rt u-flex">
					</view>
				</view>
				<view class="bm">
					<view class="box" style="height: auto;align-items: baseline;" v-if="freightCargoOrderEvaluation.score != null">
						<view class="lt boxNine">货主评价</view>
						<view class="rt u-line-1">
							<view><u-rate active-color="#FFCC52" disabled="true" :count="5" v-model="freightCargoOrderEvaluation.score"></u-rate></view>
							<view class="u-flex u-margin-top-20">
								<view class="blockView sixColor" v-for="(item,index) in cargoName" :key="index">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
					<view class="box" style="height: auto;align-items: baseline;" v-if="freightDriverOrderEvaluation.score != null">
						<view class="lt boxNine">司机评价</view>
						<view class="rt u-line-1">
							<view><u-rate active-color="#FFCC52" disabled="true" :count="5" v-model="freightDriverOrderEvaluation.score"></u-rate></view>
							<view class="u-flex u-margin-top-20">
								<view class="blockView sixColor" v-for="(item,index) in driverName" :key="index">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<view class="list list2" v-if="status >= 2">
				<view class="tp u-flex">
					<view class="lt">
						订单信息
					</view>
					<view class="rt u-flex">
					</view>
				</view>
				<view class="bm">
					<view class="box" v-if="status == 7 && obj.canceReasonsName != '' && obj.canceReasonsName != null">
						<view class="lt boxNine">取消原因</view>
						<view class="rt u-line-1">{{obj.canceReasonsName}}</view>
					</view>
					<view class="box">
						<view class="lt boxNine">货源编码</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.cargoCode}}</view>
					</view>
					<view class="box boxThree">
						<view class="lt boxNine">创建时间</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.createTime}}</view>
					</view>
					<view class="box boxThree" v-if="status == 3">
						<view class="lt boxNine">开始运输</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.updateTime}}</view>
					</view>
					<view class="box boxThree" v-if="status == 4">
						<view class="lt boxNine">运输完成</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.updateTime}}</view>
					</view>
					<view class="box boxThree" v-if="status == 5">
						<view class="lt boxNine">支付时间</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.updateTime}}</view>
					</view>
					<view class="box boxThree" v-if="status == 6">
						<view class="lt boxNine">评价时间</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.updateTime}}</view>
					</view>
					<view class="box boxThree" v-if="status == 7">
						<view class="lt boxNine">取消时间</view>
						<view class="rt u-line-1">{{obj.freightCargoDTO.updateTime}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view v-if="status == 2 || status == 3">
			<button class="submitBtnDDD u-margin-bottom-50" v-if="obj.orderState == 6">等待司机同意取消</button>
			<button class="submitBtnBlue u-margin-bottom-50" v-else @click="delet">取消订单</button>
		</view> -->

		<button class="submitBtnBlue u-margin-bottom-50" v-if="status == 4" @click="payShow = true">确认完成并支付</button>
		<button class="submitBtnBlue u-margin-bottom-50" v-else-if="status == 5" @click="ping">立即评价</button>
		<button class="submitBtnBlue u-margin-bottom-50" v-else-if="status == 6 || status == 7" @click="chong">再来一单</button>
		<!-- <button class="submitBtnBlue u-margin-bottom-50" v-else-if="status == 5" @click="tui">查看退款流程</button> -->
		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr state1">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu masterColor" @click="btnShu()">确认取消</button>
				<button class="btnShu" @click="show = false">暂不取消</button>
			</view>
		</u-popup>
		<u-popup v-model="show1" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr state1">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr1}}</text>
				</view>
				<button class="btnShu masterColor" @click="btnShu1()">确认支付</button>
				<button class="btnShu" @click="show1 = false">重新选择</button>
			</view>
		</u-popup>

		<view class="warp" v-show="payShow" @tap="dian">
			<view class="rect u-padding-bottom-80" @tap.stop>
				<view class="top u-padding-left-50 u-padding-top-20 u-padding-bottom-22 u-padding-right-50 u-flex u-row-between">
					<image src="../../../static/pic17.png" style="width: 20rpx;" mode="widthFix" @click="payShow = false"></image>
					<text class="u-font-xl fontWeight threeColor">请选择您的支付方式</text>
					<view></view>
				</view>
				<s class="twoS"></s>
				<view style="height: 136rpx;" class="u-flex u-row-center">
					<view class="threeColor u-font-md">应付运费：<text class="u-margin-right-10" style="color: #FC441C;font-size: 40rpx;">￥{{freightReceivable}}</text>元</view>
				</view>
				<s class="oneS" style="background: #f4f4f4;"></s>
				<view style="height: 80rpx;margin-left: 260rpx;" class="u-flex" data-index="zhifubao" @click="payMoney">
					<!-- iconweixin1 -->
					<icon class="iconfont first iconweixin2" style="font-size: 40rpx;color: #1677ff;"></icon>
					<view class="u-margin-left-32" style="color:#000;text-align:left;">支付宝</view>
				</view>
				<!-- <s class="oneS" style="background: #f4f4f4;"></s>
					<view style="height: 80rpx;margin-left: 260rpx;" class="u-flex" data-index="weixin" @click="payMoney">
						<icon class="iconfont first iconweixin1" style="font-size: 40rpx;color: #3abf11;"></icon>
						<view class="u-margin-left-32" style="color:#000;text-align:left;">微信</view>
					</view>
					<s class="oneS" style="background: #f4f4f4;"></s> -->

				<!-- <view style="height: 80rpx;margin-left: 260rpx;" class="u-flex" data-index="xianxia" @click="payMoney">
						<icon class="iconfont first iconxianxiazhifu" style="font-size: 40rpx;color: #ffd03f;"></icon>
						<view class="u-margin-left-32" style="color:#000;text-align:left;">线下支付</view>
					</view> -->
					<s class="oneS" style="background: #f4f4f4;"></s> 
				<view style="height: 80rpx;margin-left: 260rpx;" class="u-flex" data-index="qianbao" @click="payMoney">
					<icon class="iconfont first iconlingqianzhifu" v-if="availableBalance >= freightReceivable" style="font-size: 40rpx;color: #f58b31;"></icon>
					<icon class="iconfont first iconlingqianzhifu" v-else style="font-size: 40rpx;color: #333;"></icon>
					<view class="u-margin-left-32" style="color:#000;text-align:left;">钱包 (余额:{{availableBalance}}元)</view>
				</view>
			</view>
		</view>
		
		<!-- 联系电话列表 -->
		<view class="warp" v-if="telShow" @tap="closeTelList">
			<view class="rect" style="padding-bottom: 40rpx;" @tap.stop>
				<view class="top u-padding-left-50 u-padding-top-20 u-padding-bottom-22 u-padding-right-50 u-flex u-row-between" style="border-bottom: 1px solid #efefef;">
					<image src="../../../static/pic17.png" style="width: 20rpx;" mode="widthFix" @click="telShow = false"></image>
					<text class="u-font-xl fontWeight threeColor" style="font-size: 32rpx;">请选择司机联系方式</text>
					<view></view>
				</view>
				<view class="telList" v-for="(telItem, index) in telData" :key="index" @click="call(telItem.phone)">
					<view class="telIcon"><icon class="iconfont icondianhua-hei telIconStyle"></icon></view>
					<view class="telNumb">{{telItem.phone}}</view>
				</view>
			</view>
		</view>
		
		<!-- <view class="blockBox" v-show="imgs" @click="imgs = false">
			<image :src="imgRul" class="img" @click="imgs = false" mode="aspectFit"></image>
		</view> -->
		<!-- 图片放大 -->
		<swiperImage :maskShow="imgShow" v-if="imgShow" @change="imghide" :swiperImages="swiperImages" :currentIndex="currentIndex"></swiperImage>
	</view>
</template>

<script>
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	export default {
		data() {
			return {
				// 图片放大
				imgShow: false,
				currentIndex: 0,
				swiperImages: [],
				
				show1: false,
				showErr1: "",
				status: "",
				orderId: "",
				show: false,
				showErr: "请确认是否取消,一旦确认无法恢复",
				obj: {
					freightCargoDTO: {}
				},
				tishi:"0",
				payShow: false,
				// imgRul: "",
				// imgs: false,
				start: "",
				end: "",
				freightCargo: "",
				//司机信息
				faceDriverList: "",
				//支付信息
				freightWalletTransaction: "",
				cargorCarModeName: "",
				cargorCarConductorName: "",
				startJin: "",
				startWei: "",
				endJin: "",
				endWei: "",
				//货主评价
				freightCargoOrderEvaluation: "",
				cargoName: [],
				//司机评价
				freightDriverOrderEvaluation: "",
				driverName: [],
				//取消原因
				canceReasonsName: "",
				//公里
				kilometers: "0",
				//货源信息
				goodsTypeName: "",
				weight: "",
				packagingTypeName: "",
				//运费
				freightReceivable: "",
				//支付密匙
				tradeNO: "",
				//司机上传的图片
				pictureList1: "",
				pictureList2: "",
				pictureList3: "",
				textBtn: false,
				//余额
				availableBalance:"",
				
				telShow:false,
				telData:[],
			}
		},
		onLoad(option) {
			console.log("=======================")
			console.log(option.status)
			this.status = option.status
			this.orderId = option.orderId

		},
		onShow() {
			this.site()
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
					this.availableBalance = res.data.availableBalance
				}
			}).catch(err => {
				//ajax.js反馈的reject结果
				console.log(err)
			})
		},
		created() {

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
			
			timers1(tim) {
				let date = new Date(tim);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + ' ' + h + ":" + m;
			},
			timers2(tim) {
				let date = new Date(tim);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				if (h >= 12) {
					return y + '年' + MM + '月' + d + '日 下午' + h + ":" + m;
				} else {
					return y + '年' + MM + '月' + d + '日 上午' + h + ":" + m;
				}
			},

			site() {
				ajax.get(config.ship_url + "/" + this.orderId + "/cargo-owner-order", {}).then(res => {
					//订单详情
					console.log("订单详情")
					console.log(res)
					if (res.code == 0) {
						if(res.data.freightCargoDTO.faceCargoState == 2){
							this.tishi = 1
						}
						if (res.data.freightCargoDTO.cargorCarModeName.indexOf(",") != -1) {
							var str = res.data.freightCargoDTO.cargorCarModeName.split(",")
							var strNew = ''
							for (let i = 0; i < str.length; i++) {
								if (i == 0) {
									strNew = str[i] + strNew
								} else {
									strNew = strNew + '/' + str[i]
								}
							}
							res.data.freightCargoDTO.cargorCarModeName = strNew
						}
						if (res.data.freightCargoDTO.serviceName.indexOf(",") != -1) {
							var str = res.data.freightCargoDTO.serviceName.split(",")
							var strNew = ''
							for (let i = 0; i < str.length; i++) {
								if (i == 0) {
									strNew = str[i] + strNew
								} else {
									strNew = strNew + '/' + str[i]
								}
							}
							res.data.freightCargoDTO.serviceName = strNew
						}
						if (res.data.freightCargoDTO.cargorCarConductorName != null) {
							if (res.data.freightCargoDTO.cargorCarConductorName.indexOf(",") != -1) {
								var str = res.data.freightCargoDTO.cargorCarConductorName.split(",")
								var strNew = ''
								for (let i = 0; i < str.length; i++) {
									strNew = strNew + str[i] + '米'
								}
								res.data.freightCargoDTO.cargorCarConductorName = strNew
							} else if (res.data.freightCargoDTO.cargorCarConductorName != "") {
								res.data.freightCargoDTO.cargorCarConductorName = res.data.freightCargoDTO.cargorCarConductorName + "米"
							}
						}
						if (res.data.freightCargoDTO.remark) {
							res.data.freightCargoDTO.remark = res.data.freightCargoDTO.remark.split("(")[0]
						}
						this.obj = res.data

						// this.obj.freightCargoDTO.appointedTime = this.timers2(this.obj.freightCargoDTO.appointedTime)
						this.obj.freightCargoDTO.createTime = this.timers(this.obj.freightCargoDTO.createTime)
						if (this.obj.freightCargoDTO.updateTime > 0) {
							this.obj.freightCargoDTO.updateTime = this.timers(this.obj.freightCargoDTO.updateTime)
						}

						if (this.obj.freightCargoDTO.unloadingTime > 0) {
							this.obj.freightCargoDTO.unloadingTime = this.obj.freightCargoDTO.unloadingTime
						}
						if (this.obj.faceOrderState != "") {
							this.status = this.obj.freightCargoDTO.faceCargoState
						}
						if (this.obj.pictureList != null && this.obj.pictureList != [] && this.obj.pictureList.length > 0) {
							for(let i = 0 ; i < this.obj.pictureList.length ; i ++){
								if(this.obj.pictureList[i].imageType == 1){
									this.pictureList1 = this.obj.pictureList[i].imagePath
									
								}else if(this.obj.pictureList[i].imageType == 2){
									this.pictureList2 = this.obj.pictureList[i].imagePath
									
								}else if(this.obj.pictureList[i].imageType == 3){
									this.pictureList3 = this.obj.pictureList[i].imagePath
								}
							}
							if(this.pictureList1) {
								this.swiperImages.push(this.pictureList1)
							}
							if(this.pictureList2) {
								this.swiperImages.push(this.pictureList2)
							}
							if(this.pictureList3) {
								this.swiperImages.push(this.pictureList3)
							}
						}
						if (this.status >= 5) {
							if (res.data.orderEvaluationList) {
								if (res.data.orderEvaluationList.length > 0) {
									for (let i = 0; i < res.data.orderEvaluationList.length; i++) {
										if (res.data.orderEvaluationList[i].type == "1") {
											//货主
											this.freightCargoOrderEvaluation = res.data.orderEvaluationList[i]
											this.cargoName = res.data.orderEvaluationList[i].typeList
										} else {
											this.freightDriverOrderEvaluation = res.data.orderEvaluationList[i]
											this.driverName = res.data.orderEvaluationList[i].typeList
										}
									}
								}
							}
						}
						if (this.status == 6) {
							if (res.data.orderEvaluationList) {
								if (res.data.orderEvaluationList.length > 0) {
									for (let i = 0; i < res.data.orderEvaluationList.length; i++) {
										if (res.data.orderEvaluationList[i].type == "1") {
											//货主
											this.freightCargoOrderEvaluation = res.data.orderEvaluationList[i]
											this.cargoName = res.data.orderEvaluationList[i].typeList
										} else {
											this.freightDriverOrderEvaluation = res.data.orderEvaluationList[i]
											this.driverName = res.data.orderEvaluationList[i].typeList
										}
									}
								}
							}
							
						}

						this.freightCargo = this.obj.freightCargoDTO
						this.freightReceivable = this.freightCargo.freight.toFixed(2)
						if (this.obj.freightCargoDTO.kilometers) {
							this.kilometers = this.obj.freightCargoDTO.kilometers
						}
						if (this.obj.freightCargoDTO.goodsTypeName) {
							this.goodsTypeName = this.freightCargo.goodsTypeName
						}
						if (this.obj.freightCargoDTO.weight) {
							this.weight = this.freightCargo.weight
						}

						if (this.obj.freightCargoDTO.packagingTypeName) {
							this.packagingTypeName = this.freightCargo.packagingTypeName
						}

						
						if (this.obj.driverList.length > 0) {
							var driverlength= this.obj.driverList.length
							   for(var i=0; i<driverlength; i++){
								let formatDate = new Date(this.obj.driverList[i].createOrderTime);
								let y = formatDate.getFullYear();
								let MM = formatDate.getMonth() + 1;
								MM = MM < 10 ? ('0' + MM) : MM;
								let d = formatDate.getDate();
								d = d < 10 ? ('0' + d) : d;
								let h = formatDate.getHours();
								h = h < 10 ? ('0' + h) : h;
								let m = formatDate.getMinutes();
								m = m < 10 ? ('0' + m) : m;
								let s = formatDate.getSeconds();
								s = s < 10 ? ('0' + s) : s;
								this.obj.driverList[i].createOrderTime = y + '-' + MM + '-' + d + ' ' + h + ":" + m + ":" + s;
							}
							this.faceDriverList = this.obj.driverList
							
						}
						let local = res.data.freightCargoDTO.addressList
						this.start = local[0].cityName + " " + local[0].regionName

						if (local[1].type == 2) {
							this.endJin = local[1].lnt
							this.endWei = local[1].lat
						} else {
							this.endJin = local[2].lnt
							this.endWei = local[2].lat
						}
						this.startJin = local[0].lnt
						this.startWei = local[0].lat

						if (local[1].type == 2) {
							this.end = local[1].cityName + " " + local[1].regionName
						} else {
							this.end = local[2].cityName + " " + local[2].regionName
						}
					}else {
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
			},
			dian() {
				this.payShow = false
			},
			
			//关闭电话列表
			closeTelList(){
				this.telShow = false
			},
			//获取电话列表
			callTel(userName){
				this.telShow = true
				ajax.get(config.telList_url,{
					username:userName
				}).then(res => {
					console.log("+++++电话列表+++++")
					console.log(res)
					if(res.code == 0){
						this.telData = res.data;
					}
				}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
			},
			
			chong() {
				this.$store.commit("getLocat", "")
				ajax.get(config.freightCargoInfo_url + "/" + this.orderId, {})
					.then(res => {
						console.log(res)
						if (res.code == 0) {
							this.obj = res.data
							let shipFirst = {}
							if (this.obj.handlingType == 1) {
								//一装一卸
								shipFirst = {
									dollOriginArea1: this.obj.addressList[0].provinceName + this.obj.addressList[0].cityName + this.obj.addressList[
										0].regionName,
									dollEndArea1: this.obj.addressList[0].address,
									dollOriginArea2: "",
									dollEndArea2: "",
									dollSwitch: false,
									stripOriginArea1: this.obj.addressList[1].provinceName + this.obj.addressList[1].cityName + this.obj.addressList[
										1].regionName,
									stripEndArea1: this.obj.addressList[1].address,
									stripOriginArea2: "",
									stripEndArea2: "",
									stripSwitch: false,
									dollStripText: "一装一卸",
									dollStripType: "1",
									dollTimer: this.obj.appointedTime,
									locat1: {
										address: this.obj.addressList[0].address,
										idArr: [this.obj.addressList[0].provinceId, this.obj.addressList[0].cityId, this.obj.addressList[0].areaId],
										location: this.obj.addressList[0].lat + "," + this.obj.addressList[0].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[0].cityName,
										userQu: this.obj.addressList[0].regionName,
									},
									locat2: "",
									locat3: {
										address: this.obj.addressList[1].address,
										idArr: [this.obj.addressList[1].provinceId, this.obj.addressList[1].cityId, this.obj.addressList[1].areaId],
										location: this.obj.addressList[1].lat + "," + this.obj.addressList[1].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[1].cityName,
										userQu: this.obj.addressList[1].regionName,
									},
									locat4: "",
									startJin: this.obj.addressList[0].lnt + "," + this.obj.addressList[0].lat,
									endJin: this.obj.addressList[this.obj.addressList.length - 1].lnt + "," + this.obj.addressList[this.obj.addressList
										.length - 1].lat,
									km: this.obj.kilometers
								}
								if (this.obj.unloadingTime != "" && this.obj.unloadingTime != null) {
									shipFirst.stripTimer = this.obj.unloadingTime
								}
							} else if (this.obj.handlingType == 2) {
								//一装二卸
								shipFirst = {
									dollOriginArea1: this.obj.addressList[0].provinceName + this.obj.addressList[0].cityName + this.obj.addressList[
										0].regionName,
									dollEndArea1: this.obj.addressList[0].address,
									dollOriginArea2: "",
									dollEndArea2: "",
									dollSwitch: false,
									stripOriginArea1: this.obj.addressList[1].provinceName + this.obj.addressList[1].cityName + this.obj.addressList[
										1].regionName,
									stripEndArea1: this.obj.addressList[1].address,
									stripOriginArea2: this.obj.addressList[2].provinceName + this.obj.addressList[2].cityName + this.obj.addressList[
										2].regionName,
									stripEndArea2: this.obj.addressList[2].address,
									stripSwitch: true,
									dollStripText: "一装二卸",
									dollStripType: "2",
									dollTimer: this.obj.appointedTime,
									locat1: {
										address: this.obj.addressList[0].address,
										idArr: [this.obj.addressList[0].provinceId, this.obj.addressList[0].cityId, this.obj.addressList[0].areaId],
										location: this.obj.addressList[0].lat + "," + this.obj.addressList[0].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[0].cityName,
										userQu: this.obj.addressList[0].regionName,
									},
									locat2: "",
									locat3: {
										address: this.obj.addressList[1].address,
										idArr: [this.obj.addressList[1].provinceId, this.obj.addressList[1].cityId, this.obj.addressList[1].areaId],
										location: this.obj.addressList[1].lat + "," + this.obj.addressList[1].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[1].cityName,
										userQu: this.obj.addressList[1].regionName,
									},
									locat4: {
										address: this.obj.addressList[2].address,
										idArr: [this.obj.addressList[2].provinceId, this.obj.addressList[2].cityId, this.obj.addressList[2].areaId],
										location: this.obj.addressList[2].lat + "," + this.obj.addressList[2].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[2].cityName,
										userQu: this.obj.addressList[2].regionName,
									},
									startJin: this.obj.addressList[0].lnt + "," + this.obj.addressList[0].lat,
									endJin: this.obj.addressList[this.obj.addressList.length - 1].lnt + "," + this.obj.addressList[this.obj.addressList
										.length - 1].lat,
									km: this.obj.kilometers
								}
								if (this.obj.unloadingTime != "" && this.obj.unloadingTime != null) {
									shipFirst.stripTimer = this.obj.unloadingTime
								}
							} else if (this.obj.handlingType == 3) {
								//两装一卸
								shipFirst = {
									dollOriginArea1: this.obj.addressList[0].provinceName + this.obj.addressList[0].cityName + this.obj.addressList[
										0].regionName,
									dollEndArea1: this.obj.addressList[0].address,
									dollOriginArea2: this.obj.addressList[1].provinceName + this.obj.addressList[1].cityName + this.obj.addressList[
										1].regionName,
									dollEndArea2: this.obj.addressList[1].address,
									dollSwitch: true,
									stripOriginArea1: this.obj.addressList[2].provinceName + this.obj.addressList[2].cityName + this.obj.addressList[
										2].regionName,
									stripEndArea1: this.obj.addressList[2].address,
									stripOriginArea2: "",
									stripEndArea2: "",
									stripSwitch: false,
									dollStripText: "两装一卸",
									dollStripType: "3",
									dollTimer: this.obj.appointedTime,
									locat1: {
										address: this.obj.addressList[0].address,
										idArr: [this.obj.addressList[0].provinceId, this.obj.addressList[0].cityId, this.obj.addressList[0].areaId],
										location: this.obj.addressList[0].lat + "," + this.obj.addressList[0].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[0].cityName,
										userQu: this.obj.addressList[0].regionName,
									},
									locat2: {
										address: this.obj.addressList[1].address,
										idArr: [this.obj.addressList[1].provinceId, this.obj.addressList[1].cityId, this.obj.addressList[1].areaId],
										location: this.obj.addressList[1].lat + "," + this.obj.addressList[1].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[1].cityName,
										userQu: this.obj.addressList[1].regionName,
									},
									locat3: {
										address: this.obj.addressList[2].address,
										idArr: [this.obj.addressList[2].provinceId, this.obj.addressList[2].cityId, this.obj.addressList[2].areaId],
										location: this.obj.addressList[2].lat + "," + this.obj.addressList[2].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[2].cityName,
										userQu: this.obj.addressList[2].regionName,
									},
									locat4: "",
									startJin: this.obj.addressList[0].lnt + "," + this.obj.addressList[0].lat,
									endJin: this.obj.addressList[this.obj.addressList.length - 1].lnt + "," + this.obj.addressList[this.obj.addressList
										.length - 1].lat,
									km: this.obj.kilometers
								}
								if (this.obj.unloadingTime != "" && this.obj.unloadingTime != null) {
									shipFirst.stripTimer = this.obj.unloadingTime
								}

							} else if (this.obj.handlingType == 4) {
								//两装两卸
								shipFirst = {
									dollOriginArea1: this.obj.addressList[0].provinceName + this.obj.addressList[0].cityName + this.obj.addressList[
										0].regionName,
									dollEndArea1: this.obj.addressList[0].address,
									dollOriginArea2: this.obj.addressList[1].provinceName + this.obj.addressList[1].cityName + this.obj.addressList[
										1].regionName,
									dollEndArea2: this.obj.addressList[1].address,
									dollSwitch: true,
									stripOriginArea1: this.obj.addressList[2].provinceName + this.obj.addressList[2].cityName + this.obj.addressList[
										2].regionName,
									stripEndArea1: this.obj.addressList[2].address,
									stripOriginArea2: this.obj.addressList[3].provinceName + this.obj.addressList[3].cityName + this.obj.addressList[
										3].regionName,
									stripEndArea2: this.obj.addressList[3].address,
									stripSwitch: true,
									dollStripText: "两装两卸",
									dollStripType: "4",
									dollTimer: this.obj.appointedTime,
									locat1: {
										address: this.obj.addressList[0].address,
										idArr: [this.obj.addressList[0].provinceId, this.obj.addressList[0].cityId, this.obj.addressList[0].areaId],
										location: this.obj.addressList[0].lat + "," + this.obj.addressList[0].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[0].cityName,
										userQu: this.obj.addressList[0].regionName,
									},
									locat2: {
										address: this.obj.addressList[1].address,
										idArr: [this.obj.addressList[1].provinceId, this.obj.addressList[1].cityId, this.obj.addressList[1].areaId],
										location: this.obj.addressList[1].lat + "," + this.obj.addressList[1].lnt,
										name: "",
										type: "1",
										userCity: this.obj.addressList[1].cityName,
										userQu: this.obj.addressList[1].regionName,
									},
									locat3: {
										address: this.obj.addressList[2].address,
										idArr: [this.obj.addressList[2].provinceId, this.obj.addressList[2].cityId, this.obj.addressList[2].areaId],
										location: this.obj.addressList[2].lat + "," + this.obj.addressList[2].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[2].cityName,
										userQu: this.obj.addressList[2].regionName,
									},
									locat4: {
										address: this.obj.addressList[3].address,
										idArr: [this.obj.addressList[3].provinceId, this.obj.addressList[3].cityId, this.obj.addressList[3].areaId],
										location: this.obj.addressList[3].lat + "," + this.obj.addressList[3].lnt,
										name: "",
										type: "2",
										userCity: this.obj.addressList[3].cityName,
										userQu: this.obj.addressList[3].regionName,
									},
									startJin: this.obj.addressList[0].lnt + "," + this.obj.addressList[0].lat,
									endJin: this.obj.addressList[this.obj.addressList.length - 1].lnt + "," + this.obj.addressList[this.obj.addressList
										.length - 1].lat,
									km: this.obj.kilometers
								}
								if (this.obj.unloadingTime != "" && this.obj.unloadingTime != null) {
									shipFirst.stripTimer = this.obj.unloadingTime
								}
								console.log(shipFirst)
							}
							this.$store.commit("getShipFirst", shipFirst)
							//第二页
							let shipSecond = {
								goodsName: this.obj.name,
								goodsWeight: this.obj.weight,
								goodsSize: this.obj.volume,
								goodsType: this.obj.goodsTypeName,
								goodsTypeId: [this.obj.goodsTypeId],
								goodsPack: this.obj.packagingTypeName,
								goodsPackId: [this.obj.packagingTypeId],
							}
							this.$store.commit("getShipSecond", shipSecond)
							//第三页
							let cargorCarMode = this.obj.cargorCarMode
							if (cargorCarMode.indexOf(",") != "-1") {
								cargorCarMode = cargorCarMode.split(",")
							}
							let cargorCarConductor = this.obj.cargorCarConductor
							if (cargorCarConductor != "" && cargorCarConductor != null) {
								if (cargorCarConductor.indexOf(",") != "-1") {
									cargorCarConductor = cargorCarConductor.split(",")
								}
							}
							if (cargorCarConductor == null) {
								this.obj.cargorCarConductorName = "自定义 " + this.obj.occupyConductor
							}
							let service = this.obj.service
							if (service.indexOf(",") != "-1") {
								service = service.split(",")
							}
							let shipThird = {
								goodsCarTypes: this.obj.vehicleTypeName,
								goodsCarTypesId: this.obj.vehicleType,
								goodsCarType: this.obj.cargorCarModeName,
								goodsCarTypeId: cargorCarMode,
								goodsCarSize: this.obj.cargorCarConductorName,
								goodsCarSizeId: cargorCarConductor,
								goodsCarServe: this.obj.serviceName,
								goodsCarServeId: service,
								carLength:this.obj.occupyCarLength
							}
							console.log(shipThird)
							this.$store.commit("getShipThird", shipThird)
							//第四页
							let shipFourth = {
								haulMoney: this.obj.freight,
								haulMoneyType: this.obj.paymentMethod,
								// haulDriver: {
								// 	name: this.obj.driverName,
								// 	id: this.obj.driverUsername
								// },
								haulDriver: {
									name:"",
									id:"",
								},
								haulFrontMoney: this.obj.deposit,
								haulFrontMoneyType: this.obj.refundMethod,
								haulFrontRemark: "",
								haulBlean: true,
								haulYuanBlean: this.obj.isOften,
							}
							if (shipFourth.haulDriver == null) {
								shipFourth.haulDriver = ""
							}
							this.$store.commit("getShipFourth", shipFourth)
							this.$store.commit("getLocat", "")
							uni.navigateTo({
								url: "/pages/goods/ship/ship?type=1"
							})
						}else {
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
			},


			timers(tim) {
				let date = new Date(tim);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '年' + MM + '月' + d + '日 ' + h + ":" + m + ":" + s;
			},
			openMap() {
				
				let arr = JSON.stringify(this.obj.freightCargoDTO.addressList)
				if (this.obj.freightCargoDTO.cargoState == 3) {
					uni.navigateTo({
						url: "/pages/order/amap/amap?arr=" + arr + "&long=" + this.kilometers + "&id=" + this.obj.freightCargoDTO.id
					})
				} else {
					uni.navigateTo({
						url: "/pages/order/amap/amap?arr=" + arr + "&long=" + this.kilometers
					})
				}


			},
			promise(e) {
				let phone = e.updator
				console.log(phone)

				if (this.status == 2) {
					//司机耍滑没有付钱.
					// if(this.obj.orderState == 1){
					// 	//待确认.需要货主指定承运
					// 	uni.navigateTo({
					// 		url:"/pages/order/driverBrief/driverBrief?id="+e.phone + '&order=' + this.orderId + '&freightOrderId=' + this.obj.id + '&type=3'
					// 	})
					// }else{
					//待确认.需要货主指定承运
					uni.navigateTo({
						url: "/pages/order/driverBrief/driverBrief?id=" + e.updator + '&order=' + this.orderId + '&freightOrderId=' +
							this.obj.id + '&type=1'
					})
					// }

				} else {
					uni.navigateTo({
						url: "/pages/order/driverBrief/driverBrief?id=" + e.updator + '&type=2'
					})
				}
			},
			call(e) {
				
				uni.makePhoneCall({
					phoneNumber: e //仅为示例
				});
			},
			ping() {
				uni.navigateTo({
					url: "/pages/order/orderRate/orderRate?id=" + this.obj.id
				})
			},
			tui() {
				uni.navigateTo({
					url: "/pages/order/refundFlow1/refundFlow1?id=" + this.obj.freightOrderId
				})
			},
			// img(url) {
			// 	this.imgs = true
			// 	this.imgRul = url
			// },
			btnShu1() {
				this.payShow = false
				uni.showLoading({
					title: "正在前往支付",
					mask: true
				})
				if (this.payIndex == "zhifubao") {
					let _this = this

					//支付宝支付
					ajax.put(config.ship_url + "/" + this.obj.id + "/payment_freight", {
						freight: this.freightReceivable,
						id: this.obj.id,
						paymentMethod: "ALY_PAY"
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							this.tradeNO = res.data.tradeNO
							uni.hideLoading()
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: this.tradeNO,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									_this.payShow = false
									_this.site()

								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
				} else if (this.payIndex == "weixin") {

				} else if (this.payIndex == "xianxia") {

				} else if (this.payIndex == "qianbao") {
					//钱包支付
					ajax.put(config.ship_url + "/" + this.obj.id + "/payment_freight", {
						freight: this.freightReceivable,
						id: this.obj.id,
						paymentMethod: "PURSE_PAY"
					}).then(res => {
						console.log(res)
						if (res.code == 0) {
							// this.tradeNO = res.data.tradeNO
							this.payShow = false
							this.site()
							uni.hideLoading()
							uni.showToast({
								title: "付款成功",
								icon: 'success',
								duration: 2000
							})
							// uni.requestPayment({
							// 	provider: 'alipay',
							// 	orderInfo: this.tradeNO,
							// 	success: function(res) {
							// 		console.log('success:' + JSON.stringify(res));
									

							// 	},
							// 	fail: function(err) {
							// 		console.log('fail:' + JSON.stringify(err));
							// 	}
							// });
						}else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					})
				}
				this.show1 = false
			},
			//去支付宝支付
			payMoney(e) {
				let index = e.currentTarget.dataset.index
				if (index == "qianbao"){
					//判断余额够不够
					// console.log(this.availableBalance)
					// console.log(this.freightReceivable)
					if(this.availableBalance < this.freightReceivable){
						return
					}
				}
				this.show1 = true
				if (index == "zhifubao") {
					this.showErr1 = "确定选择用支付宝支付吗?"
				} else if (index == "weixin") {
					this.showErr1 = "确定选择用微信支付吗?"
				} else if (index == "xianxia") {
					this.showErr1 = "确定选择用线下支付吗?"
				} else if (index == "qianbao") {
					this.showErr1 = "确定选择用钱包支付吗?"
				}
				this.payIndex = index
				// uni.requestPayment({
				//     provider: 'alipay',
				//     orderInfo: "alipay_sdk=alipay-sdk-java-4.10.192.ALL&app_id=2021002114647333&biz_content=%7B%22body%22%3A%22%E6%94%AF%E4%BB%98%E8%BF%90%E8%B4%B9%22%2C%22out_trade_no%22%3A%22D499110022060453888%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22%E6%94%AF%E4%BB%98%E8%BF%90%E8%B4%B9%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%2210.00%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&sign=ForIQZqts960m8NzUUJxvlkEOB8Prf01iwGMST5rQErSFXSbPcN0fZRYujB6YeqOyx6r3nWFDzSr76%2BV9%2BAj5PVGSsgqVVIV6%2F%2BZuAaoy%2BqYTCc02begLHgwcG0fyY9q8wWu0XNs9uuheCbT%2B1NvgPu5n04eA5S1T%2B%2BZvCqsIxl7jgTqk%2FwUgqjyiqpOVG0hJU3ZqXuF7ZciDt8Cwl8s9Nwxx%2F5GK75%2B8tQkkcMzLwQ3%2BoycAHy907ADW%2FXwQUt7sQmxqxqpQcCrZl2nHOLuRtHpTmkbODn%2F0oHNMDQp33fImYgrNTcpiE7qIbeDktGgtjSYTmWkFlTl15QOc9g8sQ%3D%3D&sign_type=RSA2&timestamp=2020-12-17+17%3A18%3A17&version=1.0",
				//     success: function (res) {
				//         console.log('success:' + JSON.stringify(res));
				// 		this.start()
				//     },
				//     fail: function (err) {
				//         console.log('fail:' + JSON.stringify(err));
				//     }
				// });



			},
			//查看详情去货源修改页面
			look() {
				//goodsEdit
				uni.navigateTo({
					url: "/pages/goods/goodsEdit/goodsEdit?id=" + this.obj.freightCargoDTO.id + "&type=3"
				})
			},
			//删除货源
			delet() {

				if (this.status == 1) {
					this.show = true
				} else if (this.status == 2) {
					this.$store.commit("getServiceIds", this.obj.freightCargoDTO.id)
					uni.navigateTo({
						url: "/pages/order/deleteOrderDai/deleteOrderDai"
					})
					// uni.navigateTo({
					// 	url: "/pages/order/deleteOrder/deleteOrder?ids=" + this.orderIndex + "&type=2"
					// })
				} else if (this.status == 3) {
					if (this.obj.freightCargoDTO.cargoState == 4) {
						uni.navigateTo({
							url: "/pages/order/deleteOrder/deleteOrder?id=" + this.obj.freightCargoDTO.id + "&blean=true"
						})
					} else {
						uni.navigateTo({
							url: "/pages/order/deleteOrder/deleteOrder?id=" + this.obj.freightCargoDTO.id
						})
					}

				}


			},
			//确认删除
			btnShu() {
				this.show = false
				ajax.dele(config.orderList_url + `/${this.obj.freightCargoDTO.id}/cancel`, {
					refundAmount: "",
					canceReasonsName: "",
				}).then(res => {
					if (res.code == 0) {
						console.log(res)
						uni.showToast({
							title: "取消成功",
							icon: "none",
							duration: 2000
						})
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/goods/sendGoods/sendGoods"
							})
							// uni.navigateBack()
						}, 2000)
					}else {
						uni.showToast({
							title: "网络错误,请重试",
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(err => {
					console.log("获取评价列表数据返回失败 error is :" + err);
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.btnView {
		width: 100%;
		height: 50rpx;
		background-color: #F6F6F6;
		text-align: center;

		icon {
			font-size: 30rpx;
			// transform: rotate(90deg);
			color: #007AFF;
			position: relative;
			top: -20rpx;
		}

		icon.active {
			transform: rotate(-180deg);
		}
	}

	.page {
		position: relative;
	}

	.blockBox {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100%;
		background-color: rgba(0, 0, 0, .3);
		z-index: 2000;
		display: flex;
		justify-content: center;
		align-items: center;

		.img {
			max-width: 90%;
			max-height: 90vh;
			width: inherit;
			height: inherit;
		}
	}

	.warp {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100%;
		background-color: rgba(0, 0, 0, .3);
		z-index: 2000;

		.box {
			width: 100%;
			height: 100vh;
			position: relative;
		}

		.rect {
			position: absolute;
			left: 0;
			bottom: 0;
			color: #fff;
			height: auto;
			margin: 0;
			background-color: #fff;
		}
	}

	.boxThree.te .lt {
		padding-top: 20rpx;
	}

	//.page .suggestBottom
	.contentList {
		width: 100%;
		min-height: calc(100vh - 260rpx);
		padding: 0 30rpx 40rpx 30rpx;

		.list.list1 {
			background-color: #fff;
			border-radius: 8rpx;
			box-shadow: 0px 2px 8px #C8C8C8;
			margin-top: 20rpx;
			
			.tp {
				padding: 26rpx 20rpx;
				display: flex;
				justify-content: start;

				.status {
					width: 20rpx;
					height: 20rpx;
					text-align: center;
					margin-top: 6rpx;
					font-size: 20rpx;
					line-height: 34rpx;
					border-radius: 20rpx;
					color: #F8F8F8;
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

				.img {
					width: 100rpx;
					height: 100rpx;
					top: 16rpx;
					right: 14rpx;
				}
				.icon {
					font-size: 100rpx;
					top: 16rpx;
					right: 14rpx;
				}

				.site {
					height: 32rpx;
					padding-left: 20rpx;
					display: flex;
					justify-content: start;

					.start {
						color: #3399FF;
						font-size: 32rpx;
						line-height: 30rpx;

						text {
							display: inline-block;
						}

						text:first-child {
							padding-right: 10rpx;
						}
					}

					.to {
						margin: 0 20rpx;
					}

					.end {
						color: #F96F2B;
						font-size: 32rpx;
						line-height: 30rpx;

						text {
							display: inline-block;
						}

						text:first-child {
							padding-right: 10rpx;
						}
					}
				}
			}

			.bm {
				font-size: 20rpx;
				padding: 0 30rpx 20rpx;

				.left {
					.text1 {
						color: #999999;
					}

					.text2 {
						color: #333333;
					}
				}

				.right {
					color: #F96F2B;
				}
			}

			.bottom {
				height: 100rpx;

				.left {
					height: 100rpx;
					width: calc(100% - 258rpx);
					padding: 0 14rpx;

					color: #666666;
					font-size: 22rpx;
					background-color: #F6F6F6;
					flex-wrap: wrap;

					.zhuang {
						width: 100%;
						height: 40rpx;
						line-height: 56rpx;
					}

					.xie {

						height: 44rpx;
						width: 100%;
						line-height: 42rpx;
						border-top: 2rpx dotted #DBDBDB;
					}
				}

				.right {
					height: 100rpx;
					width: 258rpx;
					background-color: #DEDEDE;

					.tp {}
				}
			}
		}

		.list.list2.list1 {
			background-color: #fff;
			border-radius: 8rpx;
			box-shadow: 0px 2px 8px #C8C8C8;
			margin-top: 20rpx;
			padding: 20rpx 0 0rpx 20rpx;

			.tp {
				padding-right: 40rpx;
				justify-content: space-between;
				height: 60rpx;
				border-bottom: 2rpx solid #eee;

				.lt {
					font-size: 32rpx;
					color: #333;
				}

				.rt {
					font-size: 24rpx;

					color: #3399FF;
				}
			}

			.bm {
				padding: 0;
				font-size: 28rpx;
				margin-top: 16rpx;

				.box {
					color: #333;
					margin-bottom: 20rpx;
					display: flex;
					justify-content: start;
					align-items: center;
					height: 46rpx;
					flex-wrap: wrap;

					.lt {
						width: 120rpx;
						margin-right: 38rpx;

						image {
							margin-left: 28rpx;
						}
					}

					.rt {
						width: calc(100% - 158rpx);
						padding-right: 20rpx;
					}


				}

				.boxNine {
					color: #999;
				}

			}

		}

		.blockView {
			padding: 0 10rpx;
			height: 48rpx;
			border-radius: 8rpx;
			background-color: #EEEEEE;
			border: 2rpx solid #ddd;
			margin-right: 20rpx;
			text-align: center;
			line-height: 45rpx;

		}

		.list.list2 {
			background-color: #fff;
			border-radius: 8rpx;
			box-shadow: 0px 2px 8px #C8C8C8;
			margin-top: 20rpx;
			padding: 20rpx 0 2rpx 20rpx;
			.tishi{
				position: absolute;
				font-size: 24rpx;
				right: 0;
				top: 0;
				color: #fff;
				border-radius: 8rpx;
				padding: 6rpx 10rpx;
			}
			.tishi.blue{
				background: #007AFF;
			}
			.tishi.yellow{
				background: #f96f2b;
			}
			.tp {
				padding-right: 40rpx;
				justify-content: space-between;
				height: 60rpx;
				border-bottom: 2rpx solid #eee;

				.lt {
					font-size: 32rpx;
					color: #333;
				}

				.rt {
					font-size: 24rpx;

					color: #3399FF;
				}
			}

			.bm {
				font-size: 28rpx;
				margin-top: 16rpx;

				.box {
					color: #333;
					margin-bottom: 20rpx;
					display: flex;
					justify-content: start;
					align-items: center;
					height: 46rpx;

					.lt {
						width: 120rpx;
						margin-right: 100rpx;

						image {
							margin-left: 28rpx;
						}
					}

					.rt {
						width: 400rpx;
					}
				}

				.boxNine {
					color: #999;
				}

			}

		}
	}
	.telList{
		width: 100%;
		height: 90rpx;
		border-bottom: 2rpx solid #efefef;
		.telIcon{
			float: left;
		    width: 130rpx;
		    height: 90rpx;
		    line-height: 90rpx;
			.telIconStyle{
				color: #007AFF;
				font-size: 18px;
			}
		}
		.telNumb{
			float: right;
			width: calc(100% - 130rpx);
			color: #007AFF;
			text-align: left;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 40rpx;
		}
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
</style>
