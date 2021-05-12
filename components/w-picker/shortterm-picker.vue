<template>
	<view class="w-picker-view">
		<picker-view class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
			<picker-view-column>
				<view class="w-picker-item" v-for="(item,index) in range.dates" :key="index">{{item.label}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="w-picker-item" v-for="(item,index) in range.hours" :key="index">{{item.label}}</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickVal:[],
				range:{},
				checkObj:{},
				newHours:[],
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
				//天
				day:""
			};
		},
		props:{
			itemHeight:{
				type:String,
				default:"44px"
			},
			value:{
				type:String,
				default:""
			},
			current:{//是否默认选中当前日期
				type:Boolean,
				default:false
			}
		},
		watch:{
			value(val){
				this.initData();
			}
		},
		created() {
			let startDate,endDate,startYear,endYear,startMonth,endMonth,startDay,endDay;
			let dates=[],hours=[],minutes=[];
			let dVal=[],pickVal=[];
			let reg=/-/g;
			let range={};
			let result="",full="",date,hour,minute,obj={};
			let defaultDate=this.getDefaultDate();
			let defaultYear=defaultDate.defaultYear;
			let defaultMonth=defaultDate.defaultMonth;
			let defaultDay=defaultDate.defaultDay;
			let defaultDays=defaultDate.defaultDays;
			let curFlag=this.current;
			let disabledAfter=this.disabledAfter;
			let dateData=[];
			dVal=this.getDval();
			dateData=this.getData(dVal);
			dates=dateData.dates;
			hours = this.hours
			minutes=dateData.minutes;
			range={dates,hours,minutes};
			date=dates[0].label;
			hour=hours[0].label;
			minute=dVal[2]?dVal[2]:minutes[0].label;
			result=full=`${date+' '+hour}`;
			obj={
				date,
				hour
			}
			let defaultNumber = this.value.split(" ")
			pickVal=[
				dates.findIndex(n => n.value == defaultNumber[0])!=-1?dates.findIndex(n => n.value == defaultNumber[0]):0,
				hours.findIndex(n => n.value == defaultNumber[1])!=-1?hours.findIndex(n => n.value == defaultNumber[1]):0,
			];
			if(pickVal[0] != 0){
				this.range.hours = ''
				this.initDataTwo("shua")
			}else{
				this.initData();
			}
		},
		methods:{
			formatNum(n){
				return (Number(n)<10?'0'+Number(n):Number(n)+'');
			},
			checkValue(value){
				let strReg=/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/,example="2019-12-12 18:05:00或者2019-12-12 18:05";
				if(!strReg.test(value)){
					console.log(new Error("请传入与mode、fields匹配的value值，例value="+example+""))
				}
				return strReg.test(value);
			},
			resetData(year,month,day){
				let curDate=this.getCurrenDate();
				let curFlag=this.current;
				let curYear=curDate.curYear;
				let curMonth=curDate.curMonth;
				let curDay=curDate.curDay;
				let curHour=curDate.curHour;
				let months=[],days=[],sections=[];
				let disabledAfter=this.disabledAfter;
				let monthsLen=disabledAfter?(year*1<curYear?12:curMonth):12;
				let totalDays=new Date(year,month,0).getDate();//计算当月有几天;
				for(let month=1;month<=monthsLen;month++){
					months.push(this.formatNum(month));
				};
				for(let day=1;day<=daysLen;day++){
					days.push(this.formatNum(day));
				}
				return{
					months,
					days,
					sections
				}
			},
			getData(dVal){
				//用来处理初始化数据
				let curFlag=this.current;
				let disabledAfter=this.disabledAfter;
				let dates=[],hours=[],minutes=[];
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
					
				};
				hours = this.hours
				return {
					dates,
					hours
				}
			},
			//返回一个数组 当前年月日,这个月有多少天
			getDefaultDate(){
				let reg=/-/g;
				let defaultDate=new Date();
				let defaultYear=defaultDate.getFullYear();
				let defaultMonth=defaultDate.getMonth()+1;
				let defaultDay=defaultDate.getDate();
				let defaultDays=new Date(defaultYear,defaultMonth,0).getDate()*1;
				return{
					defaultDate,
					defaultYear,
					defaultMonth,
					defaultDay,
					defaultDays
				}
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
			initData(){
				let startDate,endDate,startYear,endYear,startMonth,endMonth,startDay,endDay;
				let dates=[],hours=[],minutes=[];
				let dVal=[],pickVal=[];
				let defaultNumber = this.value.split(" ")
				let reg=/-/g;
				let range={};
				let result="",full="",date,hour,minute,obj={};
				let defaultDate=this.getDefaultDate();
				let defaultYear=defaultDate.defaultYear;
				let defaultMonth=defaultDate.defaultMonth;
				let defaultDay=defaultDate.defaultDay;
				let defaultDays=defaultDate.defaultDays;
				let curFlag=this.current;
				let disabledAfter=this.disabledAfter;
				let dateData=[];
				dVal=this.getDval();
				dateData=this.getData(dVal);
				dates=dateData.dates;
				// hours=dateData.hours;
				let nowHours = Number(dVal[1]+1)
				this.newHours = []
				for(let i = 0 ; i < this.hours.length ; i ++){
					if(this.hours[i].max != undefined){
						if(nowHours >= this.hours[i].min && nowHours <= this.hours[i].max){
							this.newHours.push(this.hours[i])
						}
						if(nowHours <= this.hours[i].min && nowHours <= this.hours[i].max){
							this.newHours.push(this.hours[i])
						}
					}else{
						if(nowHours <= this.hours[i].min){
							this.newHours.push(this.hours[i])
						}
					}
				}
				hours = this.newHours
				minutes=dateData.minutes;
				pickVal=[
					dates.findIndex(n => n.value == defaultNumber[0])!=-1?dates.findIndex(n => n.value == defaultNumber[0]):0,
					hours.findIndex(n => n.value == defaultNumber[1])!=-1?hours.findIndex(n => n.value == defaultNumber[1]):0,
				];
				range={dates,hours,minutes};
				date=dates[0].label;
				hour=hours[0].label;
				result=`${date+' '+hour}`;
				full=`${dVal[0]+' '+hours[0].value}`
				obj={
					date,
					hour
				}
				console.log()
				if(pickVal[0] != 0){
					this.range.hours = ''
					this.initDataTwo("shua")
				}else{
					this.$nextTick(()=>{
						this.pickVal=pickVal;
					});
				}
				this.range=range;
				this.checkObj=obj;
				
				this.$emit("change",{
					result:result,
					value:full,
					obj:obj
				})
				
				
			},
			initDataTwo(tex){
				let startDate,endDate,startYear,endYear,startMonth,endMonth,startDay,endDay;
				let dates=[],hours=[],minutes=[];
				let dVal=[],pickVal=[];
				let reg=/-/g;
				let range={};
				let result="",full="",date,hour,minute,obj={};
				let defaultDate=this.getDefaultDate();
				let defaultYear=defaultDate.defaultYear;
				let defaultMonth=defaultDate.defaultMonth;
				let defaultDay=defaultDate.defaultDay;
				let defaultDays=defaultDate.defaultDays;
				let curFlag=this.current;
				let disabledAfter=this.disabledAfter;
				let dateData=[];
				dVal=this.getDval();
				dateData=this.getData(dVal);
				dates=dateData.dates;
				hours = this.hours
				minutes=dateData.minutes;
				range={dates,hours,minutes};
				date=dates[0].label;
				hour=hours[0].label;
				minute=dVal[2]?dVal[2]:minutes[0].label;
				result=full=`${date+' '+hour}`;
				obj={
					date,
					hour
				}
				this.range=range;
				console.log(this.range)
				this.checkObj=obj;
				this.$emit("change",{
					result:result,
					value:full,
					obj:obj
				})
				if(tex == "shua"){
					let defaultNumber = this.value.split(" ")
					pickVal=[
						dates.findIndex(n => n.value == defaultNumber[0])!=-1?dates.findIndex(n => n.value == defaultNumber[0]):0,
						hours.findIndex(n => n.value == defaultNumber[1])!=-1?hours.findIndex(n => n.value == defaultNumber[1]):0,
					];
					this.$nextTick(()=>{
						this.pickVal=pickVal;
					});
				}
				
				
			},
			handlerChange(e){
				// this.initDataTwo()
				let arr=[...e.detail.value];
				if(this.day != arr[0]){
					this.range.hours = ''
					if(arr[0] == 0){
						this.initData()
					}else{
						this.initDataTwo()
					}
				}
				this.day = arr[0]
				let data=this.range;
				let date="",hour="",minute="";
				let result="",full="",obj={};
				let disabledAfter=this.disabledAfter;
				date=(arr[0]||arr[0]==0)?data.dates[arr[0]]||data.dates[data.dates.length-1]:"";
				hour=(arr[1]||arr[1]==0)?data.hours[arr[1]]||data.hours[data.hours.length-1]:data.hours[0];
				minute=(arr[2]||arr[2]==0)?data.minutes[arr[2]]||data.minutes[data.minutes.length-1]:"";
				result=`${date.label+' '+hour.label}`;
				full=`${date.value+' '+hour.value}`
				obj={
					date,
					hour
				}
				this.checkObj=obj;
				this.$emit("change",{
					result:result,
					value:full,
					obj:obj
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./w-picker.css";
</style>
