import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		access_token:"",
		refresh_token:"",
		type:1,//1是货主,2是司机
		confidence:60,//识别的最低值
		phone:"",//用户手机号
		username:"",//司机名字,
		locat:"",//地图选取的对象
		shipFirst:{},//发货第一步,
		shipSecond:{},//发货第二步,
		shipThird:{},//发货第三步,
		shipFourth:{},//发货第四步,
		goodsLists:{},//货物类型
		goodsPackLists:{},//货物类型
		serviceType:{},//服务类型
		phoneNumber:"0571-82814588",//客服电话
		ids:"",//待确认id
		editObj:{},//修改需要穿的值
		//时间
		hours:[
			{
				label:"凌晨 00:00-06:00",
				value:"00:00-06:00",
				max:6,
				min:0
			},
			{
				label:"凌晨 01:00",
				value:"01:00",
				max:undefined,
				min:1
			},
			{
				label:"凌晨 02:00",
				value:"02:00",
				max:undefined,
				min:2
			},
			{
				label:"凌晨 03:00",
				value:"03:00",
				min:2,
				max:undefined
			},
			{
				label:"凌晨 04:00",
				value:"04:00",
				min:4,
				max:undefined
			},
			{
				label:"凌晨 05:00",
				value:"05:00",
				min:5,
				max:undefined
			},
			{
				label:"凌晨 06:00",
				value:"06:00",
				min:6,
				max:undefined
			},
			{
				label:"上午 06:00-12:00",
				value:"06:00-12:00",
				min:6,
				max:12
			},
			{
				label:"上午 07:00",
				value:"07:00",
				min:7,
				max:undefined
			},
			{
				label:"上午 08:00",
				value:"08:00",
				min:8,
				max:undefined
			},
			{
				label:"上午 09:00",
				value:"09:00",
				min:9,
				max:undefined
			},
			{
				label:"上午 10:00",
				value:"10:00",
				min:10,
				max:undefined
			},
			{
				label:"上午 11:00",
				value:"11:00",
				min:11,
				max:undefined
			},
			{
				label:"上午 12:00",
				value:"12:00",
				min:12,
				max:undefined
			},
			{
				label:"下午 12:00-18:00",
				value:"12:00-18:00",
				min:12,
				max:18
			},
			{
				label:"下午 13:00",
				value:"13:00",
				min:13,
				max:undefined
			},
			{
				label:"下午 14:00",
				value:"14:00",
				min:14,
				max:undefined
			},
			{
				label:"下午 15:00",
				value:"15:00",
				min:15,
				max:undefined
			},
			{
				label:"下午 16:00",
				value:"16:00",
				min:16,
				max:undefined
			},
			{
				label:"下午 17:00",
				value:"17:00",
				min:17,
				max:undefined
			},
			{
				label:"下午 18:00",
				value:"18:00",
				min:18,
				max:undefined
			},
			{
				label:"晚上 18:00-24:00",
				value:"18:00-24:00",
				min:18,
				max:undefined
			},
			{
				label:"晚上 19:00",
				value:"19:00",
				min:19,
				max:undefined
			},
			{
				label:"晚上 20:00",
				value:"20:00",
				min:20,
				max:undefined
			},
			{
				label:"晚上 21:00",
				value:"21:00",
				min:21,
				max:undefined
			},
			{
				label:"晚上 22:00",
				value:"22:00",
				min:22,
				max:undefined
			},
			{
				label:"晚上 23:00",
				value:"23:00",
				min:23,
				max:undefined
			},
			{
				label:"全天都可以",
				value:"00:00-23:59",
				min:0,
				max:24
			}
		],
		//唯一码
		userNo:"",
	},
    mutations: {//唯一允许更改state
		getUserNo(state,info){
			state.userNo = info
		},
		getAccessToken(state,info){
			state.access_token = info
		},
		getRefreshToken(state,info){
			state.refresh_token = info
		},
		getType(state,info){
			state.type = info
		},
		getPhone(state,info){
			state.phone = info
		},
		getUsername(state,info){
			state.username = info
		},
		getLocat(state,info){
			state.locat = info
		},
		getShipFirst(state,info){
			state.shipFirst = info
		},
		getShipSecond(state,info){
			state.shipSecond = info
		},
		getShipThird(state,info){
			state.shipThird = info
		},
		getShipFourth(state,info){
			state.shipFourth = info
		},
		getGoodsLists(state,info){
			state.goodsLists = info
		},
		getGoodsPackLists(state,info){
			state.goodsPackLists = info
		},
		getServiceType(state,info){
			state.serviceType = info
		},
		getServiceIds(state,info){
			state.ids = info
		},
		getEditObj(state,info){
			state.editObj = info
		}
	},
    actions: {}
})
export default store