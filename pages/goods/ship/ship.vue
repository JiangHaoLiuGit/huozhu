<template>
	<view class="page">
		<u-navbar title="" :isBack="false" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#0080FF' }">
			<!-- 发货平台 -->
			<view class="slot-wrap center u-flex u-row-between widthB u-padding-left-30 u-padding-right-30">
				<!--  class="u-margin-right-80" -->
				<icon class="iconfont iconfanhui" style="font-size: 30rpx;color: #333 ;" @click="tui"></icon>
				<!-- <image src="../../../static/pic17.png" style="width: 20rpx;" mode="widthFix"></image> -->
				<view class="title fffColor u-padding-left-50">发货</view>
				<!-- 快速发货 -->
				<view class="title fffColor" @click="chongfa">快速重发</view>
			</view>
			<!-- <view slot="right" class="slotRight u-padding-right-40" @click="to1">快速重发</view> -->
		</u-navbar>
		<view class="suggestBottom">
			<!-- 第一步 -->
			<view class="contentList" v-if="next == 1">
				<view class="box">
					<view class="top content">
						<!-- <icon class="iconfont iconzhuangxiedizhi" style="font-size: 44rpx;color: #f00;"></icon> -->
						<image src="../../../static/pic33.png" style="width: 534rpx;" mode="widthFix"></image>
						<view class="text u-flex u-row-between">
							<text class="active">装卸地址</text>
							<text class="none">货物信息</text>
							<text class="none">车辆信息</text>
							<text class="none">发布货源</text>
						</view>
					</view>
					<view class="cont">
						<view class="area u-flex">
							<view class="lf content por">
								<view class="poa">
									装
								</view>
								<!-- <icon class="iconfont icontouxiang1" style="font-size: 44rpx;color: #666;"></icon> -->
								<icon class="iconfont iconzhuang" style="font-size: 60rpx;color: #0080FF ;"></icon>
								<!-- <image style="width: 60rpx;" mode="widthFix" src="../../../static/pic29.png"></image> -->
							</view>
							<view class="ct" data-index="1" @click="openMap">
								<view class="big" v-show="dollOriginArea1 == ''">
									请选择装货地
								</view>
								<view class="big active" v-show="dollOriginArea1 != ''">
									{{dollOriginArea1}}
								</view>
								<view class="small" v-show="dollEndArea1 == ''">
									点击填写详细地址（必填）
								</view>
								<view class="small active" v-show="dollEndArea1 != ''">
									{{dollEndArea1}}
								</view>
							</view>
							<view class="rt content" v-show="dollSwitch == false">
								<image style="width: 52rpx;" mode="widthFix" src="../../../static/pic25.png" @click="doll1"></image>
							</view>
						</view>
						<view class="area u-flex" v-show="dollSwitch == true">
							<view class="lf content por">
							</view>
							<view class="ct" data-index="2" @click="openMap">
								<view class="big" v-show="dollOriginArea2 == ''">
									请选择二次装货地
								</view>
								<view class="big active" v-show="dollOriginArea2 != ''">
									{{dollOriginArea2}}
								</view>
								<view class="small" v-show="dollEndArea2 == ''">
									点击填写详细地址（必填）
								</view>
								<view class="small active" v-show="dollEndArea2 != ''">
									{{dollEndArea2}}
								</view>
							</view>
							<view class="rt content" v-show="dollSwitch == true">
								<image style="width: 52rpx;" mode="widthFix" src="../../../static/pic32.png" @click="doll2"></image>
							</view>
						</view>
					</view>
					<view class="cont u-margin-top-20">
						<view class="area xie u-flex">
							<view class="lf content por">
								<view class="poa">
									卸
								</view>
								<icon class="iconfont iconxie" style="font-size: 60rpx;color: #f96f2b ;"></icon>
							</view>
							<view class="ct" data-index="3" @click="openMap">
								<view class="big" v-show="stripOriginArea1 == ''">
									请选择卸货地
								</view>
								<view class="big active" v-show="stripOriginArea1 != ''">
									{{stripOriginArea1}}
								</view>
								<view class="small" v-show="stripEndArea1 == ''">
									点击填写详细地址（必填）
								</view>
								<view class="small active" v-show="stripEndArea1 != ''">
									{{stripEndArea1}}
								</view>
							</view>
							<view class="rt content" v-show="stripSwitch == false">
								<image style="width: 52rpx;" mode="widthFix" src="../../../static/pic25.png" @click="strip1"></image>
							</view>
						</view>

						<view class="area xie u-flex" v-show="stripSwitch == true">
							<view class="lf content por">

							</view>
							<view class="ct" data-index="4" @click="openMap">
								<view class="big" v-show="stripOriginArea2 == ''">
									请选择二次卸货地
								</view>
								<view class="big active" v-show="stripOriginArea2 != ''">
									{{stripOriginArea2}}
								</view>
								<view class="small" v-show="stripEndArea2 == ''">
									点击填写详细地址（必填）
								</view>
								<view class="small active" v-show="stripEndArea2 != ''">
									{{stripEndArea2}}
								</view>
							</view>
							<view class="rt content" v-show="stripSwitch == true">
								<image style="width: 52rpx;" mode="widthFix" src="../../../static/pic32.png" @click="strip2"></image>
							</view>
						</view>
					</view>
					<view class="km">
						<view v-show="km != ''">
							运输总路程约为 {{km}} 公里
						</view>
					</view>
					<view class="cont">
						<view class="conts">
							<view class="contslf">
								装卸详情
							</view>
							<view class="contsct">
								<text class="active">{{dollStripText}}</text>
							</view>
							<view class="contsrt">

							</view>
						</view>
						<view class="conts">
							<view class="contslf">
								装货时间
							</view>
							<view class="contsct" @click="dollTime = true">


								<text class="active" v-show="dollTimer.result != ''">{{dollTimer.result}}</text>
								<text v-show="dollTimer == ''"></text>
							</view>
							<view class="contsrt">
								<icon class="iconfont iconfanhui-you" style="font-size: 26rpx;color: #333 ;"></icon>
							</view>
						</view>
						<view class="conts">
							<view class="contslf">
								卸货时间
							</view>
							<view class="contsct" @click="stripTime = true">
								<!-- <u-picker mode="time" v-model="stripTime" :params="params" @confirm="timer2" :default-time="stripTimerDefult"></u-picker> -->
								<text class="active" v-show="stripTimer.result != ''">{{stripTimer.result}}</text>
								<text v-show="stripTimer.result == ''">以实际时间为准，非必填</text>
							</view>
							<view class="contsrt">
								<icon class="iconfont iconfanhui-you" style="font-size: 26rpx;color: #333 ;"></icon>
							</view>
						</view>
					</view>
					<!-- <button @click="pay">打开地图</button> -->
					<input type="text" style="display: none;" v-model="name1">
				</view>
				<button class="btn" :class="name1 == ''?'submitBtnDDD':'submitBtnBlue'" :disabled="name1 == ''" @click="nexts">下一步</button>
			</view>
			<!-- 第二步 -->
			<view class="contentList" v-else-if="next == 2">
				<view class="box">
					<view class="top content">
						<image src="../../../static/pic34.png" style="width: 534rpx;" mode="widthFix"></image>
						<view class="text u-flex u-row-between">
							<text>装卸地址</text>
							<text class="active">货物信息</text>
							<text class="none">车辆信息</text>
							<text class="none">发布货源</text>
						</view>
					</view>
					<view class="cont u-margin-top-22">
						<view class="contsTwo">
							<view class="topList">
								<text class="name">货物名称</text>
								<text class="wei"></text>
							</view>
							<view class="bottomList u-flex">
								<icon class="iconfont iconshuru" style="font-size: 40rpx;color: #999;position: relative;bottom: 4rpx;"></icon>
								<input type="text" placeholder="请如实规范填写货物信息" maxlength="10" v-model="goodsName">
							</view>
						</view>
						<view class="contsTwo">
							<view class="topList">
								<text class="name">货重</text>
								<text class="wei">（单位：吨）</text>
							</view>
							<!--   -->
							<view class="bottomList u-flex" @click="goodsWtShow = true">
								<icon class="iconfont iconshuru" style="font-size: 40rpx;color: #999;position: relative;bottom: 4rpx;"></icon>
								<input type="text" disabled maxlength="5" placeholder="填写货重不要与实际重量偏差太多" v-model="goodsWeight">
								<u-keyboard :mask="false" mode="number" @change="goodsWtChange" @backspace="goodsWtDelete" v-model="goodsWtShow"></u-keyboard>
							</view>
						</view>
						<view class="contsTwo">
							<view class="topList">
								<text class="name">体积</text>
								<text class="wei">（单位：方）</text>
							</view>
							<view class="bottomList u-flex" @click="goodsSeShow = true">
								<icon class="iconfont iconshuru" style="font-size: 40rpx;color: #999;position: relative;bottom: 4rpx;"></icon>
								<input type="text" disabled maxlength="5" placeholder="填写体积不要与实际体积偏差太多" v-model="goodsSize">
								<u-keyboard :mask="false" mode="number" @change="goodsSeChange" @backspace="goodsSeDelete" v-model="goodsSeShow"></u-keyboard>
							</view>
						</view>
					</view>
					<view class="cont u-margin-top-20">
						<view class="conts">
							<view class="contslf">
								货物类型
							</view>
							<view class="contsct" @click="goodsTypeBlean = !goodsTypeBlean">
								<text class="active" v-show="goodsType != ''">{{goodsType}}</text>
								<text v-show="goodsType == ''">请选择您的货物类型</text>
							</view>
							<view class="contsrt">
								<!-- iconfanhui-xia -->
								<icon class="iconfont iconfanhui-xia" style="font-size: 18rpx;color: #666 ;position: relative;top: 10rpx;" v-if="goodsTypeBlean == true "></icon>
								<icon class="iconfont iconfanhui-you" style="font-size: 26rpx;color: #666 ;" v-else></icon>
								<!-- <image src="../../../static/pic37.png" style="width: 14rpx;" :class="goodsTypeBlean == true ? 'active':''" mode="widthFix"></image> -->
							</view>
							<view class="contsbt" v-show="goodsTypeBlean">
								<goods-arr :goodsList="goodsListFirst" :ListDefault="ListFirstDefault" :goodsSum="goodsSum" @goodsTextId="goodstypeI"
								 @goodsText="goodsTyp"></goods-arr>
							</view>
						</view>
						<view class="conts">
							<view class="contslf">
								包装方式
							</view>
							<view class="contsct" @click="goodsPackBlean = !goodsPackBlean;goodsTypeBlean = false">
								<text class="active" v-show="goodsPack != ''">{{goodsPack}}</text>
								<text v-show="goodsPack == ''">请选择货物包装方式</text>
							</view>
							<view class="contsrt">
								<icon class="iconfont iconfanhui-xia" style="font-size: 18rpx;color: #666 ;position: relative;top: 10rpx;" v-if="goodsPackBlean == true "></icon>
								<icon class="iconfont iconfanhui-you" style="font-size: 26rpx;color: #666 ;" v-else></icon>
								<!-- <image src="../../../static/pic37.png" style="width: 14rpx;" :class="goodsPackBlean == true ? 'active':''" mode="widthFix"></image> -->
							</view>
							<view class="contsbt" v-show="goodsPackBlean">
								<goods-arr :goodsList="goodsPackList" :ListDefault="packListDefault" :goodsSum="goodsPackSum" @goodsTextId="goodsPackI"
								 @goodsText="goodsPac"></goods-arr>
							</view>
						</view>
					</view>
				</view>
				<button class="btn" :class="goodsName == '' || goodsWeight == '' || goodsSize == '' || goodsType == '' || goodsPack == ''?'submitBtnDDD':'submitBtnBlue'"
				 :disabled="goodsName == '' || goodsWeight == '' || goodsSize == '' || goodsType == '' || goodsPack == ''" @click="nexts">下一步</button>
			</view>
			<!-- 第三步 -->
			<view class="contentList" v-else-if="next == 3">
				<view class="box">
					<view class="top content">
						<image src="../../../static/pic35.png" style="width: 534rpx;" mode="widthFix"></image>
						<view class="text u-flex u-row-between">
							<text>装卸地址</text>
							<text>货物信息</text>
							<text class="active">车辆信息</text>
							<text class="none">发布货源</text>
						</view>
					</view>
					<view class="cont u-margin-top-20">
						<view class="conts">
							<view class="contslf ">
								<text class="name">用车类型</text>
							</view>
							<view class="contsct" style="width: 520rpx;">
								<view style="width: 510rpx;float: right;position: relative;left: 10rpx;">
									<goods-arr :goodsList="goodsCarTypesList" :ListDefault="carTypesListDefault" :goodsDan="true" :goodsSum="goodsCarTypesSum"
									 @goodsTextId="goodsCarTypesI" @goodsText="goodsCarTypee"></goods-arr>
								</view>
							</view>
						</view>
						<view class="conts">
							<view class="contslf ">
								<text class="name">装货车型</text>
							</view>
							<view class="contsct" @click="goodsCarTypeBlean = !goodsCarTypeBlean;goodsCarSizeBlean = false;goodsCarServeBlean = false">
								<text class="active" v-show="goodsCarType != ''">{{goodsCarType}}</text>
								<text v-show="goodsCarType == ''">最多可选三项</text>
							</view>
							<view class="contsrt">
								<icon class="iconfont iconfanhui-xia" style="font-size: 18rpx;color: #666 ;position: relative;top: 10rpx;" v-if="goodsCarTypeBlean == true "></icon>
								<icon class="iconfont iconfanhui-you" style="font-size: 26rpx;color: #666 ;" v-else></icon>
								<!-- <image src="../../../static/pic37.png" style="width: 14rpx;" :class="goodsCarTypeBlean == true ? 'active':''"
								 mode="widthFix"></image> -->
							</view>
							<view class="contsbt" v-show="goodsCarTypeBlean">
								<goods-arr :goodsList="goodsCarTypeList" :ListDefault="carTypeListDefault" :goodsSum="goodsCarTypeSum"
								 @goodsTextId="goodsCarTypeI" @goodsText="goodsCarTyp"></goods-arr>
							</view>
						</view>
						<view class="conts">
							<view class="contslf" style="width: 280rpx;">
								<text class="name">装货车长</text>
								<text class="wei" style="color: #999;font-size: 24rpx;">（单位：米）</text>
							</view>
							<view class="contsct" style="width: 336rpx;" @click="goodsCarSizeBlean = !goodsCarSizeBlean;goodsCarTypeBlean = false;goodsCarServeBlean = false">
								<text class="active" v-show="goodsCarSize != ''">{{goodsCarSize}}</text>
								<text v-show="goodsCarSize == ''">最多可选三项</text>
							</view>
							<view class="contsrt">
								<icon class="iconfont iconfanhui-xia" style="font-size: 18rpx;color: #666 ;position: relative;top: 10rpx;" v-if="goodsCarSizeBlean == true "></icon>
								<icon class="iconfont iconfanhui-you" style="font-size: 26rpx;color: #666 ;" v-else></icon>
								<!-- <image src="../../../static/pic37.png" style="width: 14rpx;" :class="goodsCarSizeBlean == true ? 'active':''"
								 mode="widthFix"></image> -->
							</view>
							<view class="contsbt" v-show="goodsCarSizeBlean">
								<goods-arr :goodsList="goodsCarSizeList" :ListDefault="carSizeListDefault" :goodsSum="goodsCarSizeSum"
								 :goodsDing="true" :goodsDingHidden="goodsDingHidden" :goodsDingTypes="goodsDingType" @goodsTextId="goodsCarSizeI" @goodsText="goodsCarSiz"></goods-arr>
							</view>
						</view>
						<view class="conts contsThree">
							<view class="contslf">
								占用车长
							</view>
							<view class="contsrf u-flex" style="padding-bottom: 14rpx;padding-right: 0rpx;" @click="goodsCarShow = true;goodsCarTypeBlean = false;goodsCarSizeBlean = false;goodsCarServeBlean = false">
								<input type="text" disabled v-model="carLength" maxlength="6" style="position: relative;right: 6rpx;" class="textRight"
								 placeholder="请输入货源占用车长">
								<view class="wei u-margin-left-6" style="width: 110rpx;font-size:26rpx;white-space:nowrap;">米</view>
								<u-keyboard :mask="false" mode="number" @change="goodsCarChange" @backspace="goodsCarDelete" v-model="goodsCarShow"></u-keyboard>
							</view>
						</view>
						<view class="conts">
							<view class="contslf ">
								<text class="name">服务要求</text>
							</view>
							<view class="contsct" @click="goodsCarServeBlean = !goodsCarServeBlean;goodsCarSizeBlean = false;goodsCarTypeBlean = false">
								<text class="active" v-show="goodsCarServe != ''">{{goodsCarServe}}</text>
								<text v-show="goodsCarServe == ''">防止司机误抢，必填项</text>
							</view>
							<view class="contsrt">
								<icon class="iconfont iconfanhui-xia" style="font-size: 18rpx;color: #666 ;position: relative;top: 10rpx;" v-if="goodsCarServeBlean == true "></icon>
								<icon class="iconfont iconfanhui-you" style="font-size: 26rpx;color: #666 ;" v-else></icon>
								<!-- <image src="../../../static/pic37.png" style="width: 14rpx;" :class="goodsCarServeBlean == true ? 'active':''"
								 mode="widthFix"></image> -->
							</view>
							<view class="contsbt" v-show="goodsCarServeBlean">
								<goods-arr :goodsList="goodsCarServeList" :ListDefault="carServeListDefault" :goodsSum="goodsCarServeSum"
								 @goodsTextId="goodsCarServeI" @goodsText="goodsCarServ"></goods-arr>
							</view>
						</view>
					</view>
				</view>
				<button class="btn" :class="goodsCarTypes == '' || goodsCarType == '' || goodsCarSize == '' || goodsCarServe == '' || carLength == ''?'submitBtnDDD':'submitBtnBlue'"
				 :disabled="goodsCarTypes == '' || goodsCarType == '' || goodsCarSize == '' || goodsCarServe == '' || carLength == ''"
				 @click="nexts">下一步</button>
			</view>
			<!-- 第四步 -->
			<view class="contentList" v-else-if="next == 4">
				<view class="box">
					<view class="top content">
						<image src="../../../static/pic36.png" style="width: 534rpx;" mode="widthFix"></image>
						<view class="text u-flex u-row-between">
							<text>装卸地址</text>
							<text>货物信息</text>
							<text>车辆信息</text>
							<text class="active">发布货源</text>
						</view>
					</view>
					<view class="cont u-margin-top-26">
						<view class="conts contsThree">
							<view class="contslf">
								运输费用
							</view>
							<view class="contsrf u-flex" @click="goodsHlShow = true">
								<input type="text" disabled v-model="haulMoney" maxlength="6" class="textRight" placeholder="请输入运输费用 ">
								<view class="wei u-margin-left-6" style="width: 120rpx;white-space:nowrap;">元/趟</view>
								<u-keyboard :mask="false" mode="number" @change="goodsHlChange" @backspace="goodsHlDelete" v-model="goodsHlShow"></u-keyboard>
							</view>
						</view>
						<view class="conts contsThree">
							<view class="contslf">
								支付方式
							</view>
							<view class="contsrf u-flex u-row-right">
								<view class="points u-flex u-margin-right-30">
									<view :class="haulMoneyType == 1?'boxs active':'boxs'" @click="haulMoneyType = 1">
										<view></view>
									</view>
									<view class="textView" @click="haulMoneyType = 1">到付</view>
								</view>
								<view class="points u-flex">
									<view :class="haulMoneyType == 2?'boxs active':'boxs'" @click="haulMoneyType = 2">
										<view></view>
									</view>
									<view class="textView" @click="haulMoneyType = 2">回单付</view>
								</view>
							</view>
						</view>
						<view class="conts contsThree">
							<view class="contslf">
								指定司机
							</view>
							<view class="contsrf u-flex u-row-right">
								<view class="pointss u-flex">
									<!-- haulDriver -->
									<view class="textView u-margin-right-22" v-if="haulDriver.name != '' && haulDriver.name != undefined" @click="toDriver">{{haulDriver.name}}</view>
									<view class="textView u-margin-right-22" v-else @click="toDriver">可不选</view>
									<view :class="haulDriver.name != '' && haulDriver.name != undefined?'boxs active':'boxs'" @click="clearDriver">
										<view></view>
									</view>
								</view>
							</view>
						</view>
						<view class="conts contsThree">
							<view class="contslf">
								定金支付
							</view>
							<view class="contsrf u-flex" @click="goodsHfShow = true">
								<input type="text" disabled v-model="haulFrontMoney" maxlength="6" class="textRight" placeholder="请输入定金支付 ">
								<text class="wei u-margin-left-6" style="width: 22rpx;">元</text>
								<u-keyboard :mask="false" mode="number" @change="goodsHfChange" @backspace="goodsHfDelete" v-model="goodsHfShow"></u-keyboard>
							</view>
							<view class="contsbm u-flex u-row-right widthB u-padding-top-10 u-padding-bottom-20 u-padding-right-40">
								<view class="points u-flex u-margin-right-30">
									<view :class="haulFrontMoneyType == 1?'boxs active':'boxs'" @click="haulFrontMoneyType = 1">
										<view></view>
									</view>
									<view class="textView" @click="haulFrontMoneyType = 1">退还</view>
								</view>
								<view class="points u-flex">
									<view :class="haulFrontMoneyType == 2?'boxs active':'boxs'" @click="haulFrontMoneyType = 2">
										<view></view>
									</view>
									<view class="textView" @click="haulFrontMoneyType = 2">不退还</view>
								</view>
							</view>
						</view>
						<view class="conts contsThree">
							<view class="contslf">
								发票
							</view>
							<view class="contsrf u-flex u-row-right" style="width: 370rpx;">
								撮合服务(平台不开发票)
							</view>
						</view>
						<view class="conts contsThree">
							<view class="contslf" style="width: 100rpx;">
								备注
							</view>
							<view class="contsrf u-flex u-row-right" style="width:500rpx;">
								<!-- <input type="text" class="textRight" v-model="haulFrontRemark" maxlength="23" placeholder="输入您的其它需求"> -->
								<textarea style="color: #333;font-size: 14px;height: 100rpx;width: 100%;padding-top: 4rpx;" v-model="haulFrontRemark"
								 placeholder="" maxlength="23" />
								</view>
						</view>
					</view>
					<view class="points u-flex u-margin-top-30">
						<view :class="haulBlean == true?'boxs active':'boxs'" @click="haulBlean = !haulBlean">
							<view></view>
						</view>
						<view class="textView" style="font-size: 26rpx;" @click="haulBlean = !haulBlean">我已阅读并同意<text class="masterColor" @click="toXie">《货物运输协议》</text></view>
					</view>
					<view class="points u-flex u-margin-top-20">
						<view :class="haulYuanBlean == true?'boxs active':'boxs'" @click="haulYuanBlean = !haulYuanBlean">
							<view></view>
						</view>
						<view class="textView" style="font-size: 26rpx;" @click="haulYuanBlean = !haulYuanBlean">存为常发货源</view>
					</view>
				</view>
				<!-- haulMoney haulMoneyType haulFrontMoney haulFrontMoneyType haulBlean -->
				<button class="btn" :class="haulMoney == '' || haulMoneyType == '' || haulFrontMoney == '' || haulFrontMoneyType == '' || haulBlean == false?'submitBtnDDD':'submitBtnBlue'"
				 :disabled="haulMoney == '' || haulMoneyType == '' || haulFrontMoney == '' || haulFrontMoneyType == '' || haulBlean == false"
				 @click="nexts">发布货源</button>
			</view>
		</view>
		<!-- :class="type == 1?'submitBtnDDD':'submitBtnBlue'" :disabled="type == 1" -->

		<u-popup v-model="show" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr state1">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr}}</text>
				</view>
				<button class="btnShu masterColor" @click="btnShu()">确认删除</button>
				<button class="btnShu" @click="show = false">暂不删除</button>
			</view>
		</u-popup>
		<u-popup v-model="show1" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr1}}</text>
				</view>
				<view class="u-flex u-row-between">
					<button class="btnShu masterColor" @click="btnShu1" style="width: 50%;border-radius: 0;">确认退出</button>
					<button class="btnShu" @click="show1 = false" style="width: 50%;border-left: 2rpx solid #ddd;border-radius: 0;color: #333;">暂不退出</button>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="show2" borderRadius="20" mode="center" :closeable="true" :maskCloseAble="false">
			<view class="showErr">
				<view class="point">
					<text class="title">温馨提示</text>
					<text class="err">{{showErr2}}</text>
				</view>
				<button class="btnShu" @click="show2 = false">确定</button>
			</view>
		</u-popup>
		<!-- 装货时间 --> 
		<w-picker 
			:visible.sync="dollTime"
			mode="shortTerm"
			:value=dollTimerDefult
			:current="true"
			@confirm="onConfirm1($event)"
			@cancel="onCancel1"
			ref="shortTerm" 
		></w-picker>
		<!-- 卸货时间 -->
		<w-picker 
			:visible.sync="stripTime"
			mode="shortTerm"
			:value=stripTimerDefult
			:current="true"
			@confirm="onConfirm2($event)"
			@cancel="onCancel2"
			ref="shortTerm" 
		></w-picker>
		<view class="warp" v-show="payShow" @tap="payShow = false">
			<view class="rect u-padding-bottom-20" @tap.stop >
				<view class="top u-padding-left-50 u-padding-top-20 u-padding-bottom-22 u-padding-right-50 u-flex u-row-between">
					<image src="../../../static/pic17.png" style="width: 20rpx;" mode="widthFix" @click="payShow = false"></image>
					<text class="u-font-xl fontWeight threeColor">常用路线推荐</text>
					<view class="defint" @click="openNowMap">自定义</view>
				</view>
				<view style="max-height: 600rpx;min-height:400rpx;overflow-y: scroll;">
					<view v-if="hallHist.length == 0" class="u-text-center">
						<image src="../../../static/huoyuan.png" style="width: 300rpx;" mode="aspectFit"></image>
						<text class="nineColor" style="display: block;position: relative;bottom: 100rpx;">~ 暂无常用路线推荐 ~</text>
					</view>
					<view v-else>
						<view v-for="(item,index) in hallHist" :key="index">
								<s class="oneS" style="background: #f4f4f4;"></s>
								<view class="onul u-padding-left-30 u-padding-right-30" @click="clickHall(index)">
									<view class="u-line-1" style="line-height: 68rpx;height: 60rpx;">{{item.provinceName}} {{item.cityName}} {{item.regionName}}</view>
									<view class="u-padding-bottom-10" v-if="item.address" style="line-height: 36rpx;height: auto;">详细地址: {{item.address}}</view>
								</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
62 53 
<script>
	// import wPicker from '@/components/w-picker/shortterm-picker.vue'
	// import pcikerViewTs from '@/components/FL-pciker_view_ts/FL-pciker_view_ts.vue'
	import testCom from '@/components/test_com.vue'
	import ajax from '../../../service/ajax.js'
	import config from '../../../service/config.js'
	import goodsArr from '@/components/goodsArr/goodsArr.vue'
	export default {
		components: {
			// wPicker,
			// pcikerViewTc
			goodsArr,
			testCom

		},
		data() {
			return {
				//0是默认 1是修改。
				type: 0,
				//货源id
				orderId: "",
				//测试
				name1: "111",
				name2: "23",
				name3: "",
				name4: "",
				//错误提示框的选项
				showErr: "",
				show: false,
				show1: false,
				showErr1: "",
				show2: false,
				showErr2: "",
				//第next步.总共发货有四步
				next: 1,
				//第一步
				//记录装卸类型1为1装,2为2装3为1卸货
				hallType:"",
				//常用发货地参数
				hallHist:"",
				//装货地
				dollOriginArea1: "",
				dollEndArea1: "",
				//二次装货地
				dollOriginArea2: "",
				dollEndArea2: "",
				dollSwitch: false,
				//卸货地
				stripOriginArea1: "",
				stripEndArea1: "",
				//二次卸货地
				stripOriginArea2: "",
				stripEndArea2: "",
				stripSwitch: false,
				//装卸详情
				dollStripText: "一装一卸",
				//装卸详情给后端的值
				dollStripType: "1",
				//装货时间
				dollTimer: {
					result:"",
					value:""
				},
				//卸货时间
				stripTimer: {
					result:"",
					value:""
				},
				//地图穿过来的参数
				locat: "",
				//装卸地1数据
				locat1: "",
				//装卸地2数据
				locat2: "",
				//装卸地3数据
				locat3: "",
				//装卸地4数据
				locat4: "",
				//时间控件对时分秒的把控
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				//装货时间控件的显示
				dollTime: false,
				//卸货时间控件的显示
				stripTime: false,
				//装卸货时间控件的默认显示
				dollTimerDefult: "",
				stripTimerDefult: "",
				//两地的距离
				km: "",
				//开始金纬度
				startJin: "",
				//结束金纬度
				endJin: "",
				//第二步
				//货物名称
				goodsName: "",
				goodsWeight: "",
				goodsWtShow:false,
				goodsSize: "",
				goodsSeShow:false,
				goodsType: "",
				goodsTypeId: [],
				goodsTypeBlean: false,
				goodsSum: 1,
				//货物类型
				goodsListFirst: [],
				ListFirstDefault: [],
				goodsPack: "",
				goodsPackId: [],
				goodsPackBlean: false,
				goodsPackSum: 1,
				//包装方式
				goodsPackList: [],
				//修改时的默认值
				packListDefault: [],
				//第三步
				//用车类型
				goodsCarTypes: "整车",
				goodsCarTypesId: [1],
				goodsCarTypesBlean: "",
				//用车类型列表
				goodsCarTypesList: [{
						name: "整车",
						id: "1",
						check: false
					},
					{
						name: "零担",
						id: "2",
						check: false
					}
				],
				//默认值
				carTypesListDefault: [1],
				goodsCarTypesSum: 1,
				//车型
				goodsCarType: "",
				goodsCarTypeId: [],
				goodsCarTypeBlean: "",
				//车型列表
				goodsCarTypeList: [],
				//默认值
				carTypeListDefault: [],
				goodsCarTypeSum: 3,
				//车长
				goodsCarSize: "",
				goodsCarSizeId: [],
				goodsCarSizeBlean: "",
				//车长列表
				goodsCarSizeList: [],
				//占用车长
				carLength:"",
				goodsCarShow:false,
				//默认值
				carSizeListDefault: [],
				goodsCarSizeSum: 3,
				//服务
				goodsCarServe: "",
				goodsCarServeId: [],
				goodsCarServeBlean: "",
				//服务列表
				goodsCarServeList: [],
				//默认值
				carServeListDefault: [],
				goodsCarServeSum: 3,
				//控制自定义显示隐藏
				goodsDingHidden:false,
				//第四步
				//运输费用
				haulMoney: "",
				goodsHlShow:false,
				//支付方式(2回单付,1到付)
				haulMoneyType: "1",
				//指定司机
				haulDriver: {
					name: "",
					id: ""
				},
				haulDriverItem: {},
				//定金
				haulFrontMoney: "",
				goodsHfShow:false,
				//定金退还还是不退还.1是退还
				haulFrontMoneyType: "1",
				//备注
				haulFrontRemark: "",
				//运输协议
				haulBlean: false,
				//长发货源
				haulYuanBlean: false,
				//自定义车长默认显示
				goodsDingType: false,
				//补丁
				nextBlean:false,
				payShow:false,
				openIndex:"",
				//最小运费
				minShipping:0
			}
		},
		onLoad(option) {
			if (option.type == 1) {
				this.type = option.type
				if (option.next) {
					this.next = option.next
					this.nextBlean = true
				}
				if (option.orderId) {
					this.orderId = option.orderId
				}
			}
			//指定司机过来的
			if (option.next == 4 && option.itemName != "" && option.itemName != undefined) {
				this.next = 4
				console.log(option)
				console.log(option.itemName)
				console.log(option.itemId)
				this.haulDriver = {
					name : option.itemName,
					id : option.itemId
				}
				console.log(this.haulDriver)
				let shipFourth = this.$store.state.shipFourth
				console.log(shipFourth)
				if (shipFourth.haulMoney) {
					this.haulMoney = shipFourth.haulMoney
					this.haulMoneyType = shipFourth.haulMoneyType
					this.haulFrontMoney = shipFourth.haulFrontMoney
					this.haulFrontMoneyType = shipFourth.haulFrontMoneyType
					this.haulFrontRemark = shipFourth.haulFrontRemark
					this.haulBlean = shipFourth.haulBlean
					this.haulYuanBlean = shipFourth.haulYuanBlean
				}
			}
			if (option.locat) {
				this.locat = option.locat
			}
			if (option.index == 1) {

			}
			ajax.get(config.carModel_url, {}).then(res => {
				console.log("车型列表")
				console.log(res)
				if (res.code == 0) {
					//车型列表
					// goodsCarTypeList
					let list = res.data
					for (let i = 0; i < list.length; i++) {
						list[i].check = false
					}
					this.goodsCarTypeList = list
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
			this.goodsCarSizeList = [{
					name: "1米",
					id: "1",
					check: false
				},
				{
					name: "1米",
					id: "1",
					check: false
				},
				{
					name: "1米",
					id: "1",
					check: false
				},
				{
					name: "2米",
					id: "1",
					check: false
				}
			]
			this.goodsCarSizeList.push({
				name: "自定义",
				id: "999",
				check: false
			})
			ajax.get(config.carConductor_url, {}).then(res => {
				console.log("车长列表")
				console.log(res)
				if (res.code == 0) {
					//车长列表
					// goodsCarSizeList
					let list = res.data
					for (let i = 0; i < list.length; i++) {
						if (list[i].name.indexOf("米") == "-1") {
							list[i].name = list[i].name + "米"
						}
						list[i].check = false
					}

					this.goodsCarSizeList = list
					this.goodsCarSizeList.push({
						name: "自定义",
						id: "999",
						check: false
					})
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
			//货源类型列表
			ajax.get(config.bdGoodsType_url, {}).then(res => {
				console.log("货源类型列表")
				console.log(res)
				if (res.code == 0) {
					//货源类型列表
					// goodsCarSizeList
					let list = res.data
					for (let i = 0; i < list.length; i++) {
						list[i].check = false
					}
					this.goodsListFirst = list
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
			ajax.get(config.serviceCargo_url, {}).then(res => {
				console.log("服务类型")
				console.log(res)
				if (res.code == 0) {
					//服务类型
					// goodsCarServeList
					let list = res.data
					for (let i = 0; i < list.length; i++) {
						list[i].check = false
					}
					this.goodsCarServeList = list
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
			//获取最小运费
			ajax.get(config.minShipping_url, {}).then(res => {
				console.log("最小运费")
				console.log(res)
				if (res.code == 0) {
					//服务类型
					// goodsCarServeList
					this.minShipping = Number(res.data)
				}else if(res.code == -3401){
					this.minShipping = 0
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
			//服务列表 走本地配置
			// let list3 = this.$store.state.serviceType
			// for(let i = 0 ; i < list3.length ; i ++){
			// 	list3[i].check = false
			// }
			// this.goodsCarServeList = list3

		},
		onShow() {
			console.log("onShow")
			console.log(this.locat1)
			console.log(this.locat2)
			console.log(this.locat3)
			console.log(this.locat4)
			//给装卸货时间默认选中
			let data = new Date();
			this.dollTimerDefult = data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate() + " " + data.getHours() +
				":" + data.getMinutes()
			this.stripTimerDefult = data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate() + " " + data.getHours() +
				":" + data.getMinutes()
			if (this.type == 1) {
				if (this.next == 1) {
					if(this.dollStripText == "一装一卸"){
						this.dollSwitch = false
						this.stripSwitch = false
					}else if(this.dollStripText == "两装两卸"){
						this.dollSwitch = true
						this.stripSwitch = true
					}else if(this.dollStripText == "一装两卸"){
						this.dollSwitch = false
						this.stripSwitch = true
					}else if(this.dollStripText == "两装一卸"){
						this.dollSwitch = true
						this.stripSwitch = false
					}
				}
				
				let obj1 = this.$store.state.shipFirst
				console.log(obj1)
				//判断是否需要替换数据.否则数据就会被覆盖.
				if(this.dollOriginArea1 == '' && this.dollEndArea1 == '' &&  this.dollOriginArea2 == '' &&  this.dollEndArea2 == ''){
					this.locat1 = obj1.locat1
					this.locat2 = obj1.locat2
					this.locat3 = obj1.locat3
					this.locat4 = obj1.locat4
				}
				
				
				console.log(this.dollStripType)
				//如果地图返回来是有值的话不走修改默认赋值这一步
				if (this.$store.state.locat){
					
				}else{
					if (obj1.dollEndArea1 != "") {
						this.dollEndArea1 = obj1.dollEndArea1
					}
					
					if (obj1.dollEndArea2 != "") {
						this.dollEndArea2 = obj1.dollEndArea2
					}
					if (obj1.dollOriginArea1 != "") {
						this.dollOriginArea1 = obj1.dollOriginArea1
					}
					if (obj1.dollOriginArea2 != "") {
						this.dollOriginArea2 = obj1.dollOriginArea2
					}
					
					if (obj1.stripEndArea1 != "") {
						this.stripEndArea1 = obj1.stripEndArea1
					}
					if (obj1.stripEndArea2 != "") {
						this.stripEndArea2 = obj1.stripEndArea2
					}
					if (obj1.stripOriginArea1 != "") {
						this.stripOriginArea1 = obj1.stripOriginArea1
					}
					if (obj1.stripOriginArea2 != "") {
						this.stripOriginArea2 = obj1.stripOriginArea2
					}
					
					this.dollStripType = obj1.dollStripType
					this.stripSwitch = obj1.stripSwitch
					this.dollSwitch = obj1.dollSwitch
					this.dollStripText = obj1.dollStripText
				}
				this.endJin = obj1.endJin
				this.km = obj1.km
				this.startJin = obj1.startJin
				if(this.orderId != '' || this.type == 1){
					console.log("时间更新")
					console.log(obj1.dollTimer)
					let sber = this.getDval()
					let nowTime = sber[0] + " " + sber[1] + ":00"
					if(typeof obj1.dollTimer == "string"){
						if(obj1.dollTimer != '' && obj1.dollTimer != undefined){
							if(this.judge1(nowTime,obj1.dollTimer)){
								this.dollTimer.result = this.getData(obj1.dollTimer)
								this.dollTimer.value = obj1.dollTimer
								this.dollTimerDefult = obj1.dollTimer
							}
						}
					}else{
						if(obj1.dollTimer){
							if(obj1.dollTimer.value != '' && obj1.dollTimer.value != undefined){
								if(this.judge1(nowTime,obj1.dollTimer.value)){
									this.dollTimer.result = this.getData(obj1.dollTimer.value)
									this.dollTimer.value = obj1.dollTimer.value
									this.dollTimerDefult = obj1.dollTimer.value
								}
							}
						}
					}
					if(typeof obj1.stripTimer == "string"){
						if(obj1.stripTimer != '' && obj1.stripTimer != undefined){
							if(this.judge1(nowTime,obj1.stripTimer)){
								this.stripTimer.result = this.getData(obj1.stripTimer)
								this.stripTimer.value = obj1.stripTimer
								this.stripTimerDefult = obj1.stripTimer
							}
						}
					}else{
						if(obj1.stripTimer){
							if(obj1.stripTimer.value != '' && obj1.stripTimer.value != undefined){
								if(this.judge1(nowTime,obj1.stripTimer.value)){
									this.stripTimer.result = this.getData(obj1.stripTimer.value)
									this.stripTimer.value = obj1.stripTimer.value
									this.stripTimerDefult = obj1.stripTimer.value
								}
							}
						}
						
					}
					
					
					
				}else{
					this.dollTimer = {
						result:"",
						value:""
					}
					this.stripTimer = {
						result:"",
						value:""
					}
				}
				//this.judge(this.dollTimer.value,this.stripTimer.value)
				//打补丁.在doodsList页面过来修改的时候时间得带上
				if(this.nextBlean){
					console.log(obj1)
					let sber = this.getDval()
					let nowTime = sber[0] + " " + sber[1] + ":00"
					if(obj1.dollTimer.value != '' && obj1.dollTimer.value != undefined){
						if(this.judge1(nowTime,obj1.dollTimer.value)){
							this.dollTimer.result = this.getData(obj1.dollTimer.value)
							this.dollTimer.value = obj1.dollTimer.value
							this.dollTimerDefult = obj1.dollTimer.value
						}
					}
					if(obj1.stripTimer.value != '' && obj1.stripTimer.value != undefined){
						if(this.judge1(nowTime,obj1.stripTimer.value)){
							this.stripTimer.result = this.getData(obj1.stripTimer.value)
							this.stripTimer.value = obj1.stripTimer.value
							this.stripTimerDefult = obj1.stripTimer.value
						}
					}
				}
				let obj2 = this.$store.state.shipSecond
				//包装方式修改
				ajax.get(config.packagingType_url, {
					goodsTypeId: obj2.goodsTypeId[0]
				}).then(res => {
					console.log("包装类型")
					console.log(res)
					if (res.code == 0) {
						//包装类型
						// goodsCarTypeList
						let list = res.data
						for (let i = 0; i < list.length; i++) {
							list[i].check = false
						}
						this.goodsPackList = list
						// console.log(this.list)
						// this.show = true
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
				this.goodsName = obj2.goodsName
				this.goodsPack = obj2.goodsPack
				this.goodsSize = obj2.goodsSize
				this.goodsType = obj2.goodsType
				this.goodsWeight = obj2.goodsWeight
				//packListDefault ListFirstDefault
				this.packListDefault = obj2.goodsPackId
				this.goodsPackId = obj2.goodsPackId
				this.ListFirstDefault = obj2.goodsTypeId
				this.goodsTypeId = obj2.goodsTypeId
				// } else if (this.next == 3) {
				let obj3 = this.$store.state.shipThird
				
				if (obj3.goodsCarSizeId == null) {
					
					let str = obj3.goodsCarSize
					str = str.split(" ")
					str = str[1]
					obj3.goodsCarSizeId = str
					this.goodsDingType = true
				}
				let goodsCarServes = ''
				if (obj3.goodsCarServe.indexOf(",") != -1) {
					var arr = obj3.goodsCarServe.split(",")
					for (let i = 0; i < arr.length; i++) {
						if (i != arr.length - 1) {
							goodsCarServes = goodsCarServes + arr[i] + "/"
						} else {
							goodsCarServes = goodsCarServes + arr[i]
						}
					}
				}
				let goodsCarSizes = ''
				if (obj3.goodsCarSize.indexOf(",") != -1) {
					var arr = obj3.goodsCarSize.split(",")
					for (let i = 0; i < arr.length; i++) {
						goodsCarSizes += arr[i] + "米"
					}
				}
				let goodsCarTypes = ''
				if (obj3.goodsCarType.indexOf(",") != -1) {
					var arr = obj3.goodsCarType.split(",")
					for (let i = 0; i < arr.length; i++) {
						if (i != arr.length - 1) {
							goodsCarTypes += arr[i] + "/"
						} else {
							goodsCarTypes += arr[i]
						}
					}
				}
				this.goodsCarSize = obj3.goodsCarSize
				this.carLength = obj3.carLength
				this.goodsCarServe = obj3.goodsCarServe
				this.goodsCarType = obj3.goodsCarType
				this.goodsCarTypesId = obj3.goodsCarTypesId
				this.goodsCarTypes = obj3.goodsCarTypes
				this.carTypeListDefault = obj3.goodsCarTypeId
				this.goodsCarTypeId = obj3.goodsCarTypeId
				this.carSizeListDefault = obj3.goodsCarSizeId
				this.goodsCarSizeId = obj3.goodsCarSizeId
				this.carTypesListDefault = [obj3.goodsCarTypesId]
				if (obj3.goodsCarSize.substring(0, 3) == "自定义") {
					this.carSizeListDefault = []
					this.carSizeListDefault.push(obj3.goodsCarSizeId)
					console.log(this.carSizeListDefault)
				}
				this.carServeListDefault = obj3.goodsCarServeId
				this.goodsCarServeId = obj3.goodsCarServeId

				// } else if (this.next == 4) {
				let shipFourth = this.$store.state.shipFourth
				if (shipFourth.haulMoney) {
					if(this.haulDriver.name == '' && this.haulDriver.id == ''){
						this.haulDriver.name = shipFourth.haulDriver.name
						this.haulDriver.id = shipFourth.haulDriver.id
					}

					this.haulMoney = shipFourth.haulMoney
					this.haulMoneyType = shipFourth.haulMoneyType
					this.haulFrontMoney = shipFourth.haulFrontMoney
					this.haulFrontMoneyType = shipFourth.haulFrontMoneyType
					this.haulFrontRemark = shipFourth.haulFrontRemark
					//有需求(测试提的):下面俩个值默认是false
					if(shipFourth.haulType){
						this.haulBlean = shipFourth.haulBlean  
						this.haulYuanBlean = shipFourth.haulYuanBlean
					}else{
						this.haulBlean = false
						this.haulYuanBlean = false
					}

				}
			}
			
			console.log("地图传过来的参数")
			console.log(this.$store.state.locat)
			if (this.$store.state.locat) {
				this.locat = this.$store.state.locat
				if (this.locat.type == 1) {
					this.dollOriginArea1 = this.locat.district
					if(this.locat.address != ''){
						this.dollEndArea1 = this.locat.name + "(" + this.locat.address + ")"
					}else{
						this.dollEndArea1 = this.locat.name
					}
					
					this.locat1 = this.locat
				} else if (this.locat.type == 2) {
					this.dollSwitch = true
					//需要判断

					if (this.stripOriginArea2 != '') {
						this.stripSwitch = true
					} else {
						this.stripSwitch = false
					}
					if (this.stripSwitch) {
						this.dollStripType = "4"
					} else {
						this.dollStripType = "3"
					}
					this.dollOriginArea2 = this.locat.district
					if(this.locat.address != ''){
						this.dollEndArea2 = this.locat.name + "(" + this.locat.address + ")"
					}else{
						this.dollEndArea2 = this.locat.name
					}
					
					this.locat2 = this.locat
				} else if (this.locat.type == 3) {
					this.stripOriginArea1 = this.locat.district
					if(this.locat.address != ''){
						this.stripEndArea1 = this.locat.name + "(" + this.locat.address + ")"
					}else{
						this.stripEndArea1 = this.locat.name
					}
					
					this.locat3 = this.locat
				} else if (this.locat.type == 4) {
					this.stripOriginArea2 = this.locat.district
					if(this.locat.address != ''){
						this.stripEndArea2 = this.locat.name + "(" + this.locat.address + ")"
					}else{
						this.stripEndArea2 = this.locat.name
					}
					
					this.locat4 = this.locat
					this.stripSwitch = true
					//需要判断
					if (this.dollOriginArea2 != '') {
						this.dollSwitch = true
					} else {
						this.dollSwitch = false
					}
					if (this.dollSwitch) {
						this.dollStripType = "4"
					} else {
						this.dollStripType = "2"
					}
				}
				// if (this.km == "") {
					
					// if(this.type != 1){
						if(this.dollStripText == "一装一卸"){
							this.dollSwitch = false
							this.stripSwitch = false
						}else if(this.dollStripText == "两装两卸"){
							this.dollSwitch = true
							this.stripSwitch = true
						}else if(this.dollStripText == "一装两卸"){
							this.dollSwitch = false
							this.stripSwitch = true
						}else if(this.dollStripText == "两装一卸"){
							this.dollSwitch = true
							this.stripSwitch = false
						}
					// }
					//去计算公里数
					this.jisuan()
			}
		},
		methods: {
			formatNum(n){
				return (Number(n)<10?'0'+Number(n):Number(n)+'');
			},
			//返回一个数组 当前年月日 - 时 - 分
			getDval(){
				let dVal=null;
				let aDate=new Date();
				let year=this.formatNum(aDate.getFullYear());
				let month=this.formatNum(aDate.getMonth()+1);
				let day=this.formatNum(aDate.getDate());
				let date=this.formatNum(year)+"/"+this.formatNum(month)+"/"+this.formatNum(day);
				let hour=aDate.getHours();
				let minute=aDate.getMinutes();
				dVal=[date,hour,minute]
				return dVal;
			},
			onConfirm1(res){
				this.dollTimer=res;
			},
			onCancel1(){
				
			},
			onConfirm2(res){
				this.stripTimer=res;
			},
			onCancel2(){
				
			},
			//货重
			goodsWtChange(val){
				console.log("goods")
				 if(this.goodsWeight.length <= 5){
					 if(val == '.'){
						 if(this.goodsWeight.indexOf(".") != -1){
							 this.goodsWeight = parseFloat(this.goodsWeight)
							 this.goodsWeight += ""
							 return
						 }
					 }
					 this.goodsWeight += val
					 
					 // this.goodsWeight = parseFloat(this.goodsWeight)
				 }
			},
			goodsWtDelete(){
				console.log("Delete")
				this.goodsWeight += ""
				if(this.goodsWeight){
					this.goodsWeight = this.goodsWeight.substr(0,this.goodsWeight.length - 1)
				}
			},
			//货的体积
			goodsSeChange(val){
				 if(this.goodsSize.length <= 5){
					 if(val == '.'){
						 if(this.goodsSize.indexOf(".") != -1){
							 this.goodsSize = parseFloat(this.goodsSize)
							 this.goodsSize += ""
							 return
						 }
					 }
					 this.goodsSize += val
				 }
			},
			goodsSeDelete(){
				this.goodsSize += ""
				if(this.goodsSize){
					this.goodsSize = this.goodsSize.substr(0,this.goodsSize.length - 1)
				}
			},
			
			//运费数字框
			goodsHlChange(val){				
				 if(this.haulMoney.length <= 6){
					 if(val == '.'){
						 if(this.haulMoney.indexOf(".") != -1){
							 this.haulMoney = parseFloat(this.haulMoney)
							 this.haulMoney += ""
							 return
						 }
					 }
					 this.haulMoney += val
				 }
			},
			//运费数字框
			goodsCarChange(val){				
				 if(this.carLength.length <= 6){
					 if(val == '.'){
						 if(this.carLength.indexOf(".") != -1){
							 this.carLength = parseFloat(this.carLength)
							 this.carLength += ""
							 return
						 }
					 }
					 this.carLength += val
				 }
			},
			//
			goodsHlDelete(){
				this.haulMoney += ""
				if(this.haulMoney){
					this.haulMoney = this.haulMoney.substr(0,this.haulMoney.length - 1)
				}
			},
			//占用车长删减
			goodsCarDelete(){
				this.carLength += ""
				if(this.carLength){
					this.carLength = this.carLength.substr(0,this.carLength.length - 1)
				}
			},
			//定金数字框
			goodsHfChange(val){
				 if(this.haulFrontMoney.length <= 6){
					 if(val == '.'){
						 if(this.haulFrontMoney.indexOf(".") != -1){
							 this.haulFrontMoney = parseFloat(this.haulFrontMoney)
							 this.haulFrontMoney += ""
							 return
						 }
					 }
					 this.haulFrontMoney += val
				 }
			},
			goodsHfDelete(){
				this.haulFrontMoney += ""
				if(this.haulFrontMoney){
					this.haulFrontMoney = this.haulFrontMoney.substr(0,this.haulFrontMoney.length - 1)
				}
				
			},
			//
			
			//去计算公里数
			jisuan(){
				//一装一卸(四种情况,我草,可悲的程序员)
				if (this.dollOriginArea1 != '' && this.stripOriginArea1 != ''){
					let obj1 = this.locat1.location.split(",")
					let obj2 = this.locat3.location.split(",")
					this.km = Number(this.distance(obj1[0],obj1[1],obj2[0],obj2[1])).toFixed(4)
				}
				if (this.dollOriginArea1 != '' && this.stripOriginArea2 != ''){
					let obj1 = this.locat1.location.split(",")
					let obj2 = this.locat4.location.split(",")
					this.km = Number(this.distance(obj1[0],obj1[1],obj2[0],obj2[1])).toFixed(4)
				}
				if (this.dollOriginArea2 != '' && this.stripOriginArea1 != ''){
					let obj1 = this.locat2.location.split(",")
					let obj2 = this.locat3.location.split(",")
					this.km = Number(this.distance(obj1[0],obj1[1],obj2[0],obj2[1])).toFixed(4)
				}
				if (this.dollOriginArea2 != '' && this.stripOriginArea2 != ''){
					let obj1 = this.locat2.location.split(",")
					let obj2 = this.locat4.location.split(",")
					this.km = Number(this.distance(obj1[0],obj1[1],obj2[0],obj2[1])).toFixed(4)
				}
				//一装两卸(两种情况)
				if (this.dollOriginArea1 != '' && this.stripOriginArea1 != '' && this.stripOriginArea2 != ''){
					let obj1 = this.locat1.location.split(",")
					let obj2 = this.locat3.location.split(",")
					let obj3 = this.locat4.location.split(",")
					this.km = Number(Number(this.distance(obj1[0],obj1[1],obj2[0],obj2[1])) + Number(this.distance(obj3[0],obj3[1],obj2[0],obj2[1]))).toFixed(4)
				}
				if (this.dollOriginArea2 != '' && this.stripOriginArea1 != '' && this.stripOriginArea2 != ''){
					let obj1 = this.locat2.location.split(",")
					let obj2 = this.locat3.location.split(",")
					let obj3 = this.locat4.location.split(",")
					this.km = Number(Number(this.distance(obj1[0],obj1[1],obj2[0],obj2[1])) + Number(this.distance(obj3[0],obj3[1],obj2[0],obj2[1]))).toFixed(4)
				}
				//两装一卸(两种情况)
				if (this.dollOriginArea1 != '' && this.dollOriginArea2 != '' && this.stripOriginArea1 != ''){
					let obj1 = this.locat1.location.split(",")
					let obj2 = this.locat2.location.split(",")
					let obj3 = this.locat3.location.split(",")
					this.km = Number(Number(this.distance(obj1[0],obj1[1],obj2[0],obj2[1])) + Number(this.distance(obj3[0],obj3[1],obj2[0],obj2[1]))).toFixed(4)
				}
				if (this.dollOriginArea1 != '' && this.dollOriginArea2 != '' && this.stripOriginArea2 != ''){
					let obj1 = this.locat1.location.split(",")
					let obj2 = this.locat2.location.split(",")
					let obj3 = this.locat4.location.split(",")
					this.km = Number(Number(this.distance(obj1[0],obj1[1],obj2[0],obj2[1])) + Number(this.distance(obj3[0],obj3[1],obj2[0],obj2[1]))).toFixed(4)
				}
				//两装两卸
				if (this.dollOriginArea1 != '' && this.dollOriginArea2 != '' && this.stripOriginArea1 != '' && this.stripOriginArea2 != ''){
					let obj1 = this.locat1.location.split(",")
					let obj2 = this.locat2.location.split(",")
					let obj3 = this.locat3.location.split(",")
					let obj4 = this.locat4.location.split(",")
					this.km = Number(Number(this.distance(obj1[0],obj1[1],obj2[0],obj2[1])) + Number(this.distance(obj3[0],obj3[1],obj2[0],obj2[1])) + Number(this.distance(obj3[0],obj3[1],obj4[0],obj4[1]))).toFixed(4)
				}
			},
			//金纬度算距离
			distance(la1, lo1, la2, lo2) {  
				var La1 = la1 * Math.PI / 180.0;  
				var La2 = la2 * Math.PI / 180.0;  
				var La3 = La1 - La2;  
				var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;  
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2)  + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));  
				s = s * 6378.137;//地球半径  
				s = Number(Math.round(s * 10000) / 10000).toFixed(4);  
				return s
			},
			btnShu1() {
				this.$store.commit("getLocat", "")
				uni.navigateTo({
					url: "/pages/goods/sendGoods/sendGoods"
				})
			},
			//后退一步
			tui() {
				console.log(this.next)
				if (this.next == 1) {
					// if (this.type == 1) {
					// 	uni.navigateTo({
					// 		url: "/pages/goods/sendGoods/sendGoods"
					// 	})
					// 	return
					// }
					this.show1 = true
					this.showErr1 = "一旦退出,内容将会被清空"
					return
				} else {
					if (this.type == 1) {
						if (this.orderId == "") {
							uni.navigateTo({
								url: "/pages/goods/goodsList/goodsList"
							})
						} else {
							uni.navigateTo({
								url: "/pages/goods/goodsList/goodsList?orderId=" + this.orderId
							})
						}
						return
					}
					this.next = this.next - 1
					if(this.next == 3){
						if(this.goodsCarSizeId[0] == '999'){
							this.goodsDingHidden = true
						}
					}
				}


			},
			wrong(){
				uni.showToast({
					title:"卸货时间不能晚于装货时间",
					duration: 2000,
					icon: "none"
				})
				return false
			},
			judge(d,s){
				let dollTimer = d
				if(typeof dollTimer == "object"){
					dollTimer = dollTimer.value
				}
				let dollLeft = dollTimer.split(" ")[0]
				let dollRight = dollTimer.split(" ")[1]
				let firstDoll = dollLeft.split("/")
				let stripTimer = s
				if(stripTimer == '' || stripTimer == undefined){
					return true
				}
				if(typeof stripTimer == "object"){
					stripTimer = stripTimer.value
				}
				let stripLeft = stripTimer.split(" ")[0]
				let stripRight = stripTimer.split(" ")[1]
				let firstStrip = stripLeft.split("/")
				// stripRight = "19:00-24:00"
				// let secondStrip = stripRight.split("-")
				console.log(firstStrip)
				if(Number(firstStrip[0]) >= Number(firstDoll[0])){
					if(Number(firstStrip[0]) > Number(firstDoll[0])){
						return true
					}else{
						if(Number(firstStrip[1]) >= Number(firstDoll[1])){
							if(Number(firstStrip[1]) > Number(firstDoll[1])){
								return true
							}else{
								if(Number(firstStrip[2]) >= Number(firstDoll[2])){
									if(Number(firstStrip[2]) > Number(firstDoll[2])){
										return true
									}else{
										let dollNumber = ''
										let stripNumber = ''
										if(dollRight.indexOf("-") != -1){
											let dollNum = dollRight.split("-")[1]
											dollNumber = Number(dollNum.split(":")[0])
										}else{
											dollNumber = Number(dollRight.split(":")[0])
										}
										if(stripRight.indexOf("-") != -1){
											let stripNum = stripRight.split("-")[0]
											stripNumber = Number(stripNum.split(":")[0])
										}else{
											stripNumber = Number(stripRight.split(":")[0])
										}
										console.log("检测")
										console.log(dollNumber)
										console.log(stripNumber)
										if(stripNumber > dollNumber){
											return true
										}else{
											uni.showToast({
												title: "卸货时间不能早于装货时间",
												duration: 2000,
												icon: "none"
											})
											return false
										}
									}
								}else{
									this.wrong()
								}
							}
						}else{
							this.wrong()
						}
					}
				}else{
					this.wrong()
				}
			},
			judge1(d,s){
				let dollTimer = d
				console.log(d)
				console.log(s)
				if(typeof dollTimer == "object"){
					dollTimer = dollTimer.value
				}
				let dollLeft = dollTimer.split(" ")[0]
				let dollRight = dollTimer.split(" ")[1]
				let firstDoll = dollLeft.split("/")
				let stripTimer = s
				if(stripTimer == '' || stripTimer == undefined){
					return true
				}
				
				console.log(typeof stripTimer)
				console.log(typeof stripTimer == "object")
				if(typeof stripTimer == "object"){
					stripTimer = stripTimer.value
				}
				let stripLeft = stripTimer.split(" ")[0]
				let stripRight = stripTimer.split(" ")[1]
				let firstStrip = stripLeft.split("/")
				// stripRight = "19:00-24:00"
				// let secondStrip = stripRight.split("-")
				console.log(firstStrip)
				if(Number(firstStrip[0]) >= Number(firstDoll[0])){
					if(Number(firstStrip[0]) > Number(firstDoll[0])){
						return true
					}else{
						if(Number(firstStrip[1]) >= Number(firstDoll[1])){
							if(Number(firstStrip[1]) > Number(firstDoll[1])){
								return true
							}else{
								if(Number(firstStrip[2]) >= Number(firstDoll[2])){
									if(Number(firstStrip[2]) > Number(firstDoll[2])){
										return true
									}else{
										let dollNumber = '' 
										let stripNumber = ''
										if(dollRight.indexOf("-") != -1){
											let dollNum = dollRight.split("-")[1]
											dollNumber = Number(dollNum.split(":")[0])
										}else{
											dollNumber = Number(dollRight.split(":")[0])
										}
										if(stripRight.indexOf("-") != -1){
											let stripNum = stripRight.split("-")[0]
											let stripNum1 = stripRight.split("-")[1]
											stripNumber = Number(stripNum.split(":")[0])
											if(dollNumber > stripNumber && dollNumber <= Number(stripNum1.split(":")[0])){
												return true
											}else{
												return false
											}
										}else{
											stripNumber = Number(stripRight.split(":")[0])
											if(stripNumber > dollNumber){
												return true
											}else{
												return false
											}
										}
										
										
										if(dollRight.indexOf("-") != -1){
											let dollNum = dollRight.split("-")[0]
											let dollNum1 = dollRight.split("-")[1]
											dollNumber = Number(dollNum.split(":")[0])
											console.log(Number(dollNum1.split(":")[0]))
											if(stripNumber > dollNumber && stripNumber <= Number(dollNum1.split(":")[0])){
												return true
											}else{
												return false
											}
										}else{
											dollNumber = Number(dollRight.split(":")[0])
											if(stripNumber > dollNumber){
												return true
											}else{
												return false
											}
										}
										if(stripRight.indexOf("-") != -1){
											let stripNum = stripRight.split("-")[0]
											stripNumber = Number(stripNum.split(":")[0])
											
										}else{
											stripNumber = Number(stripRight.split(":")[0])
											
										}
										
										
									}
								}else{
									return false
								}
							}
						}else{
							return false
						}
					}
				}else{
					return false
				}
			},
			getData(time){
				
				let dates=[];
				let curDate=new Date();
				let curYear=curDate.getFullYear();
				let curMonth=curDate.getMonth();
				let curDay=curDate.getDate();
				let aDate=new Date(curYear,curMonth,curDay);
				for(let i=0;i<7;i++){
					aDate=new Date(curYear,curMonth,curDay+i);
					let year=aDate.getFullYear();
					let month=aDate.getMonth()+1;
					let day=aDate.getDate();
					
					let label=this.formatNum(month)+"/"+this.formatNum(day);
					switch(i){
						case 0:
							label="今天(" + this.formatNum(month)+"/"+this.formatNum(day) +")";
							break;
						case 1:
							label="明天(" + this.formatNum(month)+"/"+this.formatNum(day) +")";
							break;
						case 2:
							label="后天(" + this.formatNum(month)+"/"+this.formatNum(day) +")";
							break
					}
					dates.push({
						label:label,
						value:year+"/"+this.formatNum(month)+"/"+this.formatNum(day)
					})
					if(typeof time == "object"){
						time = time.value
					}
					let tim1 = time.split(" ")[0]
					let tim2 = time.split(" ")[1]
					for(let i = 0 ; i < dates.length ; i++){
						if(dates[i].value == tim1){
							console.log(dates[i].label)
							return dates[i].label + " " + tim2
						}
					}
				};
			},
			//下一步
			nexts() {
				if (this.next >= 4) {
					console.log(this.haulFrontMoney)
					let haulMoneys = ''
					if (Number(this.haulMoney).toFixed(2) >= 0.01) {
						haulMoneys = Number(this.haulMoney).toFixed(2)
					} else {
						this.show2 = true
						this.showErr2 = "运费必须大于一分钱"
						return
					}
					let haulFrontMoneys = ''
					if (Number(this.haulFrontMoney).toFixed(2) >= 0.01) {
						haulFrontMoneys = Number(this.haulFrontMoney).toFixed(2)
					} else {
						this.show2 = true
						this.showErr2 = "定金必须大于一分钱"
						return
					}
					
					if(this.haulFrontRemark != '' && this.haulFrontRemark != null){
						// [\/=\?%\-&_~`@[\]\':+!]
						var reg=/[`~!#$%^&*()_\+=<>?:"{}|~！#￥%……&*（）={}|《》？：“”【】、；‘’，。、\s+]/g
						console.log(this.haulFrontRemark)
						console.log(reg.test(this.haulFrontRemark));
						if (reg.test(this.haulFrontRemark)){
							uni.showToast({title:"备注不能含有特殊字符或表情",icon: "none",duration:2000})
							return
						}
					}
					if(Number(this.minShipping) > Number(this.haulMoney)){
						uni.showToast({title:"运费不能小于" + this.minShipping + "元",icon: "none",duration:2000})
						return
					}
					//发货第四步的数据
					let shipFourth = {
						haulMoney: haulMoneys,
						haulMoneyType: this.haulMoneyType,
						haulDriver: this.haulDriver,
						haulFrontMoney: haulFrontMoneys,
						haulFrontMoneyType: this.haulFrontMoneyType,
						haulFrontRemark: this.haulFrontRemark,
						haulBlean: this.haulBlean,
						haulYuanBlean: this.haulYuanBlean,
					}
					console.log(shipFourth)
					this.$store.commit("getShipFourth", shipFourth)
					// this.$store.commit("getLocat",'')
					if (this.orderId == "") {
						uni.navigateTo({
							url: "/pages/goods/goodsList/goodsList"
						})
					} else {
						uni.navigateTo({
							url: "/pages/goods/goodsList/goodsList?orderId=" + this.orderId
						})
					}


				} else {

					if (this.next == 1) {
						if (this.dollOriginArea1 == "" || this.dollEndArea1 == "") {
							uni.showToast({
								title: "装货地必填",
								duration: 2000,
								icon: "none"
							})
							return false
						}
						if (this.dollSwitch) {
							if (this.dollOriginArea2 == "" || this.dollEndArea2 == "") {
								uni.showToast({
									title: "二次装货地必填",
									duration: 2000,
									icon: "none"
								})
								return false
							}
						}
						if (this.stripOriginArea1 == "" || this.stripEndArea1 == "") {
							uni.showToast({
								title: "卸货地必填",
								duration: 2000,
								icon: "none"
							})
							return false
						}
						if (this.stripSwitch) {
							if (this.stripOriginArea2 == "" || this.stripEndArea2 == "") {
								uni.showToast({
									title: "二次卸货地必填",
									duration: 2000,
									icon: "none"
								})
								return false
							}
						}
						if (this.dollTimer.value == "") {
							uni.showToast({
								title: "装货时间必填",
								duration: 2000,
								icon: "none"
							})
							return false
						}
						if(this.dollTimer.value != '' && this.stripTimer.value != '' ){
							//传装货时间,卸货时间判断是否符合常理
							if(this.judge(this.dollTimer.value,this.stripTimer.value)){
								
							}else{
								return false
							}
						}
						//发货第一步的数据
						let shipFirst = {
							dollOriginArea1: this.dollOriginArea1,
							dollEndArea1: this.dollEndArea1,
							dollOriginArea2: this.dollOriginArea2,
							dollEndArea2: this.dollEndArea2,
							dollSwitch: this.dollSwitch,
							stripOriginArea1: this.stripOriginArea1,
							stripEndArea1: this.stripEndArea1,
							stripOriginArea2: this.stripOriginArea2,
							stripEndArea2: this.stripEndArea2,
							stripSwitch: this.stripSwitch,
							dollStripText: this.dollStripText,
							dollStripType: this.dollStripType,
							dollTimer: this.dollTimer,
							stripTimer: this.stripTimer,
							locat1: this.locat1,
							locat2: this.locat2,
							locat3: this.locat3,
							locat4: this.locat4,
							startJin: this.startJin,
							endJin: this.endJin,
							km: this.km
						}
						console.log("..显示")
						console.log(shipFirst)
						this.$store.commit("getLocat", "")
						this.$store.commit("getShipFirst", shipFirst)
						console.log("小显示")
					} else if (this.next == 2) {
						var reg=/^[\u4e00-\u9fa5\u3001\A-\Z\d]+$/
						if (reg.test(this.goodsName)){
							
						}else{
							uni.showToast({title:"货物名称不能含有特殊字符和表情",icon: "none",duration:2000})
							return
						}
						//发货第二步的数据
						let shipSecond = {
							goodsName: this.goodsName,
							goodsWeight: this.goodsWeight,
							goodsSize: this.goodsSize,
							goodsType: this.goodsType,
							goodsTypeId: this.goodsTypeId,
							goodsPack: this.goodsPack,
							goodsPackId: this.goodsPackId,
						}
						this.$store.commit("getShipSecond", shipSecond)
					} else if (this.next == 3) {
						//发货第三步的数据
						let shipThird = {
							goodsCarTypes: this.goodsCarTypes,
							goodsCarTypesId: this.goodsCarTypesId,
							goodsCarType: this.goodsCarType,
							goodsCarTypeId: this.goodsCarTypeId,
							goodsCarSize: this.goodsCarSize,
							goodsCarSizeId: this.goodsCarSizeId,
							goodsCarServe: this.goodsCarServe,
							goodsCarServeId: this.goodsCarServeId,
							carLength: this.carLength,
						}
						if(this.goodsCarSize.substring(0,1) == "自"){
							let str = this.goodsCarSize
							str = str.split(" ")
							if (str[1].length == 1 || str[1] == '') {
								this.show2 = true
								this.showErr2 = "自定义车长必填"
								return
							}
							shipThird.goodsCarSizeId = str[1]
						}
						this.$store.commit("getShipThird", shipThird)
					} else if (this.next == 4) {

					}
					this.next++
					if (this.type == 1) {
						if (this.next == 1) {
							let obj1 = this.$store.state.shipFirst
							if (obj1.dollEndArea1 != "") {
								this.dollEndArea1 = obj1.dollEndArea1
							}
							if (obj1.dollEndArea2 != "") {
								this.dollEndArea2 = obj1.dollEndArea2
							}
							if (obj1.dollOriginArea1 != "") {
								this.dollOriginArea1 = obj1.dollOriginArea1
							}
							if (obj1.dollOriginArea2 != "") {
								this.dollOriginArea2 = obj1.dollOriginArea2
							}

							if (obj1.stripEndArea1 != "") {
								this.stripEndArea1 = obj1.stripEndArea1
							}
							if (obj1.stripEndArea2 != "") {
								this.stripEndArea2 = obj1.stripEndArea2
							}
							if (obj1.stripOriginArea1 != "") {
								this.stripOriginArea1 = obj1.stripOriginArea1
							}
							if (obj1.stripOriginArea2 != "") {
								this.stripOriginArea2 = obj1.stripOriginArea2
							}
							this.dollStripText = obj1.dollStripText
							this.dollStripType = obj1.dollStripType
							this.dollSwitch = obj1.dollSwitch
							this.dollTimer = obj1.dollTimer
							this.endJin = obj1.endJin
							this.km = obj1.km
							this.startJin = obj1.startJin
							this.stripSwitch = obj1.stripSwitch
							this.stripTimer = obj1.stripTimer
						} else if (this.next == 2) {
							let obj2 = this.$store.state.shipSecond
							console.log(obj2)
							this.goodsName = obj2.goodsName
							this.goodsPack = obj2.goodsPack
							this.goodsSize = obj2.goodsSize
							this.goodsType = obj2.goodsType
							this.goodsWeight = obj2.goodsWeight
							//packListDefault ListFirstDefault
							this.packListDefault = obj2.goodsPackId
							this.ListFirstDefault = obj2.goodsTypeId
						} else if (this.next == 3) {
							let obj3 = this.$store.state.shipThird
							console.log(obj3)
							let goodsCarServes = ''
							if (obj3.goodsCarServe.indexOf(",") != -1) {
								var arr = obj3.goodsCarServe.split(",")
								for (let i = 0; i < arr.length; i++) {
									if (i != arr.length - 1) {
										goodsCarServes = goodsCarServes + arr[i] + "/"
									} else {
										goodsCarServes = goodsCarServes + arr[i]
									}
								}
							}
							let goodsCarSizes = ''
							if (obj3.goodsCarSize.indexOf(",") != -1) {
								var arr = obj3.goodsCarSize.split(",")
								for (let i = 0; i < arr.length; i++) {
									goodsCarSizes += arr[i] + "米"
								}
							}
							let goodsCarTypes = ''
							if (obj3.goodsCarType.indexOf(",") != -1) {
								var arr = obj3.goodsCarType.split(",")
								for (let i = 0; i < arr.length; i++) {
									if (i != arr.length - 1) {
										goodsCarTypes += arr[i] + "/"
									} else {
										goodsCarTypes += arr[i]
									}
								}
							}
							this.goodsCarSize = obj3.goodsCarSize //goodsCarSizes
							this.goodsCarServe = obj3.goodsCarServe //goodsCarServes
							this.goodsCarType = obj3.goodsCarType //goodsCarTypes
							this.goodsCarTypesId = obj3.goodsCarTypesId
							this.goodsCarTypes = obj3.goodsCarTypes
							this.carTypeListDefault = obj3.goodsCarTypeId
							if (obj3.goodsCarSize.substring(0, 3) == "自定义") {
							} else {
								this.carSizeListDefault = obj3.goodsCarSizeId
								console.log(obj3.goodsCarSizeId)
							}

							this.carServeListDefault = obj3.goodsCarServeId

						} else if (this.next == 4) {
							let shipFourth = this.$store.state.shipFourth
							console.log(shipFourth)
							if (shipFourth.haulMoney) {
								this.haulDriver.name = shipFourth.haulDriver.name
								this.haulDriver.id = shipFourth.haulDriver.id
								this.haulMoney = shipFourth.haulMoney
								this.haulMoneyType = shipFourth.haulMoneyType
								this.haulFrontMoney = shipFourth.haulFrontMoney
								this.haulFrontMoneyType = shipFourth.haulFrontMoneyType
								this.haulFrontRemark = shipFourth.haulFrontRemark
								//有需求(测试提的):下面俩个值默认是false
								this.haulBlean = false
								this.haulYuanBlean = false
							}
						}
					}
				}
			},
			//计算经纬度之间的距离
			getDistance(from, to) {
				uni.request({
					url: 'https://apis.map.qq.com/ws/distance/v1/', //仅为示例，并非真实接口地址。
					method: 'GET',
					data: {
						mode: 'driving',
						from: from,
						to: to,
						key: 'G4HBZ-CQVR4-YOAU6-DHIIE-ET7WF-JPFHY' //获取key
					},
					success: (res) => {
						console.log(res);
						if (res.statusCode != 200) {
							this.km = "500"
							return
						}
						let hw = res.data.result.elements[0].distance; //拿到距离(米)
						if (hw && hw !== -1) {
							if (hw < 1000) {
								hw = hw + 'm';
							}
							//转换成公里
							else {
								hw = (hw / 2 / 500).toFixed(2)
							}
						} else {
							hw = "距离太近或请刷新重试"
						}
						this.km = hw
						console.log(hw + "公里");
					},
					fail: (res) => {
						this.km = "500"
						return
						console.log(res)
					}
				});
			},
			//子组件传值开始
			//第二步
			goodsCarTypee(e) {
				this.goodsCarTypes = e
			},

			goodsCarTyp(e) {
				//装货车型
				if (e.indexOf(" ") != -1) {
					var str = e.split(" ")
					var strNew = ''
					for (let i = 0; i < str.length - 1; i++) {
						if (i == 0) {
							strNew = str[i] + strNew
						} else {
							strNew = strNew + '/' + str[i]
						}
					}
					e = strNew
				}
				console.log(e)
				this.goodsCarType = e
			},
			goodsCarTypeI(e) {
				console.log(e)
				this.goodsCarTypeId = e
			},
			goodsCarSiz(e) {
				//装货车长
				// if (e.indexOf(" ") != -1) {
				// 	var str = e.split(" ")
				// 	var strNew = ''
				// 	for (let i = 0; i < str.length - 1; i++) {
				// 		strNew = strNew + str[i] + '米'
				// 	}
				// 	e = strNew
				// }
				console.log(e)
				this.goodsCarSize = e
			},
			goodsCarSizeI(e) {
				
				
				this.goodsCarSizeId = e
			},
			goodsCarServeI(e) {
				this.goodsCarServeId = e
			},
			goodsCarServ(e) {
				//服务要求
				if (e.indexOf(" ") != -1) {
					var str = e.split(" ")
					var strNew = ''
					for (let i = 0; i < str.length - 1; i++) {
						if (i == 0) {
							strNew = str[i] + strNew
						} else {
							strNew = strNew + '/' + str[i]
						}
					}
					e = strNew
				}
				console.log(e)

				this.goodsCarServe = e
			},
			//第一步
			goodsPac(e) {
				console.log("pac")
				this.goodsPack = e
			},
			goodsPackI(e) {
				console.log("ki")
				this.goodsPackId = e
			},
			goodsTyp(e) {
				this.goodsType = e
			},
			goodstypeI(e) {
				
				if (e[0] != "" && e[0] != undefined && e[0] != null) {
					ajax.get(config.packagingType_url, {
						goodsTypeId: e[0]
					}).then(res => {
						console.log("包装类型")
						console.log(res)
						if (res.code == 0) {
							//包装类型
							// goodsCarTypeList
							let list = res.data
							for (let i = 0; i < list.length; i++) {
								list[i].check = false
							}
							this.goodsPackBlean = true
							this.goodsPackList = list
							this.goodsPack = ''
							this.goodsPackId = ''
							// console.log(this.list)
							// this.show = true
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
				} else {
					this.goodsPackList = []
					this.goodsPackBlean = false
					this.goodsPack = ''
					this.goodsPackId = ''
				}
				this.goodsTypeId = e
			},


			goodsCarTypesI(e) {
				this.goodsCarTypesId = e
			},

			//点击自定义
			openNowMap(){
				let index = this.openIndex
				this.payShow = false
				if(index == 1){
					if(this.locat1 != ''){
						uni.navigateTo({
							url: "/pages/goods/place/place?index=" + index + '&locat=' + JSON.stringify(this.locat1)
						})
					}else{
						uni.navigateTo({
							url: "/pages/goods/place/place?index=" + index
						})
					}
				}else if(index == 2){
					if(this.locat2 != ''){
						uni.navigateTo({
							url: "/pages/goods/place/place?index=" + index + '&locat=' + JSON.stringify(this.locat2)
						})
					}else{
						uni.navigateTo({
							url: "/pages/goods/place/place?index=" + index
						})
					}
				}else if(index == 3){
					if(this.locat3 != ''){
						uni.navigateTo({
							url: "/pages/goods/place/place?index=" + index + '&locat=' + JSON.stringify(this.locat3)
						})
					}else{
						uni.navigateTo({
							url: "/pages/goods/place/place?index=" + index
						})
					}
				}else if(index == 4){
					if(this.locat4 != ''){
						uni.navigateTo({
							url: "/pages/goods/place/place?index=" + index + '&locat=' + JSON.stringify(this.locat4)
						})
					}else{
						uni.navigateTo({
							url: "/pages/goods/place/place?index=" + index
						})
					}
				}
			},
			//点击常用货源
			clickHall(index){
				//关闭推荐
				this.payShow = false
				// let obj = {
				// 	address: "准格尔旗第三中学薛家湾镇"
				// 	areaId: "398"
				// 	cargoId: "470"
				// 	cityId: "405"
				// 	cityName: "鄂尔多斯市"
				// 	id: "1234"
				// 	lat: "39.865449"
				// 	lnt: "111.215888"
				// 	provinceId: "511"
				// 	provinceName: "内蒙古自治区"
				// 	regionName: "准格尔旗"
				// 	type: 1
				// }
				let object = {}
				object.type = this.hallType
				object.location = this.hallHist[index].lat + "," + this.hallHist[index].lnt
				object.district = this.hallHist[index].provinceName + this.hallHist[index].cityName + this.hallHist[index].regionName
				object.name = this.hallHist[index].address
				object.address = ""
				object.idArr = [this.hallHist[index].provinceId,this.hallHist[index].cityId,this.hallHist[index].areaId]
				object.userCity = this.hallHist[index].cityName
				object.userQu = this.hallHist[index].regionName
				console.log(object)
				//location: "39.865449,111.215888"
				//idArr: (3) ["511", "405", "398"]
				//name: "准格尔旗第三中学" + address: "薛家湾镇"
				this.locat = object
				if (this.locat.type == 1) {
					this.dollOriginArea1 = this.locat.district
					if(this.locat.address != ''){
						this.dollEndArea1 = this.locat.name + "(" + this.locat.address + ")"
					}else{
						this.dollEndArea1 = this.locat.name
					}
					
					this.locat1 = this.locat
				} else if (this.locat.type == 2) {
					this.dollSwitch = true
					//需要判断
				
					if (this.stripOriginArea2 != '') {
						this.stripSwitch = true
					} else {
						this.stripSwitch = false
					}
					if (this.stripSwitch) {
						this.dollStripType = "4"
					} else {
						this.dollStripType = "3"
					}
					this.dollOriginArea2 = this.locat.district
					if(this.locat.address != ''){
						this.dollEndArea2 = this.locat.name + "(" + this.locat.address + ")"
					}else{
						this.dollEndArea2 = this.locat.name
					}
					
					this.locat2 = this.locat
				} else if (this.locat.type == 3) {
					this.stripOriginArea1 = this.locat.district
					if(this.locat.address != ''){
						this.stripEndArea1 = this.locat.name + "(" + this.locat.address + ")"
					}else{
						this.stripEndArea1 = this.locat.name
					}
					
					this.locat3 = this.locat
				} else if (this.locat.type == 4) {
					this.stripOriginArea2 = this.locat.district
					if(this.locat.address != ''){
						this.stripEndArea2 = this.locat.name + "(" + this.locat.address + ")"
					}else{
						this.stripEndArea2 = this.locat.name
					}
					
					this.locat4 = this.locat
					this.stripSwitch = true
					//需要判断
					if (this.dollOriginArea2 != '') {
						this.dollSwitch = true
					} else {
						this.dollSwitch = false
					}
					if (this.dollSwitch) {
						this.dollStripType = "4"
					} else {
						this.dollStripType = "2"
					}
				}
				this.jisuan()
			},
			openMap(e) {
				this.hallType = e.currentTarget.dataset.index
				this.openIndex = e.currentTarget.dataset.index
				this.payShow = true 
				this.hallHist = ["1"]
				if(e.currentTarget.dataset.index > 2){
					 ajax.get(config.hallHistory_url, {
					 	type:2
					 }).then(res => {
					 	console.log("卸货地个人历史列表")
					 	console.log(res)
					 	if (res.code == 0) {
							this.hallHist = res.data
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
					//装货地
					//装货地个人历史列表
					ajax.get(config.hallHistory_url, {
						type:1
					}).then(res => {
						console.log("装货地个人历史列表")
						console.log(res)
						if (res.code == 0) {
							this.hallHist = res.data
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
			chongfa() {
				uni.navigateTo({
					url: "/pages/goods/againGoods/againGoods"
				})
			},
			//装货时间
			

			timer1(e) {
				this.dollTimer = e.year + "-" + e.month + "-" + e.day + " " + e.hour + ":" + e.minute
			},
			//卸货时间
			timer2(e) {
				this.stripTimer = e.year + "-" + e.month + "-" + e.day + " " + e.hour + ":" + e.minute
			},
			//顶部右侧常发货源
			to1() {
				console.log("快速重发")
			},
			toXie() {
				
				let shipFourth = {
					haulMoney: this.haulMoney,
					haulMoneyType: this.haulMoneyType,
					haulDriver: this.haulDriver,
					haulFrontMoney: this.haulFrontMoney,
					haulFrontMoneyType: this.haulFrontMoneyType,
					haulFrontRemark: this.haulFrontRemark,
					haulBlean: this.haulBlean,
					haulYuanBlean: this.haulYuanBlean,
					haulType:true
				}
				this.$store.commit("getShipFourth", shipFourth)
				//货物协议页面
				
				uni.navigateTo({
					url: "/pages/user/pact/transportProtocol/transportProtocol",
				});
				// uni.navigateTo({
				// 	url:"/pages/user/pact/pact"
				// })
			},

			doll1() {
				//二次装货地开启
				
				this.dollSwitch = true
				if (this.stripSwitch == false) {
					this.dollStripText = "两装一卸"
					this.dollStripType = "3"
				} else {
					this.dollStripText = "两装两卸"
					this.dollStripType = "4"
				}
			},
			doll2() {
				//二次装货地关闭
				this.dollSwitch = false
				this.dollOriginArea2 = ""
				this.dollEndArea2 = ""
				this.locat2 = ''
				this.jisuan()
				if (this.stripSwitch == false) {
					this.dollStripText = "一装一卸"
					this.dollStripType = "1"
				} else {
					this.dollStripText = "一装两卸"
					this.dollStripType = "2"
				}
			},
			strip1() {
				//二次卸货地开启
				this.stripSwitch = true
				if (this.dollSwitch == false) {
					this.dollStripText = "一装两卸"
					this.dollStripType = "2"
				} else {
					this.dollStripText = "两装两卸"
					this.dollStripType = "4"
				}
			},
			strip2() {
				//二次卸货地关闭
				this.stripOriginArea2 = ""
				this.stripEndArea2 = ""
				this.locat4 = ''
				this.jisuan()
				this.stripSwitch = false
				if (this.dollSwitch == false) {
					this.dollStripText = "一装一卸"
					this.dollStripType = "1"
				} else {
					this.dollStripText = "两装一卸"
					this.dollStripType = "3"
				}
			},
			clearDriver(){
				//清除司机信息
				this.haulDriver={
					name: "",
					id: ""
				}
			},
			toDriver() {
				let shipFourth = {
					haulMoney: this.haulMoney,
					haulMoneyType: this.haulMoneyType,
					haulDriver: this.haulDriver,
					haulFrontMoney: this.haulFrontMoney,
					haulFrontMoneyType: this.haulFrontMoneyType,
					haulFrontRemark: this.haulFrontRemark,
					haulBlean: this.haulBlean,
					haulYuanBlean: this.haulYuanBlean,
					haulType:true
				}
				this.$store.commit("getShipFourth", shipFourth)
				if(this.orderId != '' && this.type != ''){
					uni.navigateTo({
						url: "/pages/goods/assignDriver/assignDriver?type=1&orderId=" + this.orderId
					})
				}else if(this.type != ''){
					uni.navigateTo({
						url: "/pages/goods/assignDriver/assignDriver?type=1"
					})
				}else{
					uni.navigateTo({
						url: "/pages/goods/assignDriver/assignDriver"
					})
				}
				
				
			},
			pay() {
				console.log("支付宝")
				// uni.requestPayment({
				// 	provider:"alipay", 
				// 	orderInfo:"",
				// })
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
		}
	}
</script>

<style scoped lang="less">
	.contsrf {
		.points {}
	}

	.km {
		height: 60rpx;
		color: #999999;
		font-size: 22rpx;
		line-height: 56rpx;
		margin-bottom: 10rpx;
	}

	.points {
		.textView {
			padding-left: 14rpx;
			color: #666666;
			font-size: 24rpx;
			line-height: 32rpx;
		}

		.boxs {
			width: 20rpx;
			height: 20rpx;
			border: 2rpx solid #999;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;

			view {
				width: 12rpx;
				height: 12rpx;
				background-color: #f8f8f8;
				border-radius: 50%;
			}
		}

		.boxs.active {
			border-color: #F96F2B;

			view {
				background-color: #F96F2B;
			}
		}
	}

	.pointss {
		.textView {
			padding-left: 14rpx;
			color: #999999;
			font-size: 28rpx;
			line-height: 38rpx;
		}

		.boxs {
			width: 30rpx;
			height: 30rpx;
			border: 2rpx solid #F96F2B;

			display: flex;
			align-items: center;
			justify-content: center;

			view {
				width: 18rpx;
				height: 18rpx;
				background-color: #f8f8f8;
			}
		}

		.boxs.active {

			border-color: #F96F2B;

			view {
				background-color: #F96F2B;

			}
		}
	}

	.btn {
		margin-bottom: 50rpx;
	}

	.page {
		.slotRight {
			color: #f8f8f8;
			font-size: 24rpx;
		}

		.suggestBottom {

			margin-top: 30rpx;

			.contentList {
				.box {
					min-height: calc(100vh - 334rpx);
					padding: 0 30rpx 60rpx;

					.top {
						padding: 0 50rpx;
						flex-wrap: wrap;
						margin-bottom: 30rpx;

						image {}

						.text {
							width: 600rpx;
							margin-top: 10rpx;

							text {
								font-size: 26rpx;
								color: #333;
								line-height: 28rpx;
							}

							text.none {
								color: #BBBBBB;
							}

							text.active {
								color: #3399FF;
								font-size: 28rpx;
								line-height: 32rpx;
							}
						}
					}

					.cont {

						//货主选择发货样式
						.area {

							.lf,
							.rt {
								height: 124rpx;
								width: 140rpx;
							}

							.lf .poa {
								width: 60rpx;
								height: 60rpx;
								text-align: center;
								line-height: 60rpx;
								color: #3399FF;
								font-size: 28rpx;
								top: 50%;
								left: 50%;
								margin-top: -30rpx;
								margin-left: -30rpx;
							}

							.ct {
								width: 410rpx;
								height: 124rpx;

								.big {
									width: 100%;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									padding-top: 20rpx;
									font-size: 32rpx;
									line-height: 42rpx;
									margin-bottom: 8rpx;
									color: #666;
								}

								.small {
									width: 100%;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;

									font-size: 24rpx;
									line-height: 32rpx;
									color: #999;
								}

								.big.active,
								.small.active {
									color: #333;
								}
							}
						}

						.area.xie {
							.lf .poa {
								color: #F96F2B;
							}
						}
					}
				}

			}

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
			color: #000;
			height: auto;
			margin: 0;
			background-color: #fff;
			.defint{
				padding: 4rpx 14rpx;
				height: auto;
				line-height: 40rpx;
				border-radius: 8rpx;
				background-color: rgb(0, 128, 255);
				color: #fff;
			}
			.onul{
				text-align: left;
			}
		}
	}
</style>
<style scoped>
	@import '../../../components/font/iconfont.css';
	
</style>
