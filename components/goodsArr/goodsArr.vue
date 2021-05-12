<template>
	<view>
		<view class="contsbt">
			<view class="contsbtCont" :class="item.check == true?'active':''" v-for="(item,index) in goodsList" :key="index" @click="clickGoods(index)">
				<text>{{item.name}}</text>
				<image src="../../static/pic39.png" style="width: 28rpx;" mode="widthFix"></image>
			</view>
		</view>
		<view class="contsbtCont mi" v-show="goodsYiType">
			<input type="number" maxlength="5" placeholder="米" @input="miInput" v-model="mi">
		</view>
	</view>
</template>

<script>
import config from '@/components/config.js'
export default {
	props:{
		goodsList:{type:Array,default:()=> []},
		ListDefault:{type:Array,default:()=> []},
		goodsSum:{type:Number,default:()=> 1},
		goodsDan:{type:Boolean,default:()=> false},
		goodsDing:{type:Boolean,default:()=> false},
		goodsDingTypes:{type:Boolean,default:()=> false},
		goodsDingHidden:{type:Boolean,default:()=> false},
	},
	data() {
		return {
			//储存页面的数据
			goodsArr:[],
			goodsText:"",
			goodsTextId:[],
			//自定义米
			mi:"",
			//自定义米的属性
			goodsYiType:this.goodsDingTypes
		}
	},
	mounted() {
			if(this.goodsDingHidden){
				//补丁,当上一页返回第三页有自定义车长选项时执行,唉.填坑
				this.goodsYiType = true
			}
			if(this.goodsArr.length == 0 && this.ListDefault.length == 0){
				for(let j = 0 ; j < this.goodsList.length ; j ++){
					if(this.goodsList[j].check == true){
						this.goodsList[j].index = j
						this.goodsArr.push(this.goodsList[j])
					}
				}
			}
			
			console.log(this.goodsList)
			if(this.goodsYiType){
				//特殊赋值:自定义车长
				let index = this.goodsList.length - 1
				let obj = {
					name:this.goodsList[index].name,
					id:this.goodsList[index].id,
					index:index
				}
				for(let i = 0 ; i < this.goodsArr.length ; i ++){
					let arr = this.goodsArr[i]
					this.goodsList[arr.index].check = false
				}
				this.goodsArr = []
				this.goodsArr.push(obj)
				this.goodsList[index].check = true
				this.goodsYiType = true
				
				var sum = this.ListDefault[0]
				this.mi = sum.split("米")
				this.mi = this.mi[0]
				this.ListDefault = ["999"]
			}else{
				//默认赋值
				for(let i = 0 ; i < this.ListDefault.length ; i ++){
					for(let j = 0 ; j < this.goodsList.length ; j ++){
						if(this.ListDefault[i] == this.goodsList[j].id){
							this.goodsList[j].check = true
							this.goodsList[j].index = j
							this.goodsArr.push(this.goodsList[j])
						}
					}
				}
				
			}
		
		
	},
	created(){
		
	},
	computed: {
		
	},
	methods: {
		miInput(){
			this.goodsText = ""
			for(let i = 0 ; i < this.goodsArr.length ; i ++){
				this.goodsText = this.goodsText + this.goodsArr[i].name + " " + this.mi + "米"
			}
			this.$emit("goodsText",this.goodsText)
		},
		clickGoods(index){
			console.log(this.goodsList)
			if(this.goodsList[index].check == false){
				//增加
				console.log("增加")
				console.log(this.goodsArr)
				if(index == 0 && this.goodsDan){
					this.goodsArr = []
					for(let i = 0 ; i < this.goodsList.length ; i ++){
						this.goodsList[i].check = false
					}
				}
				if(this.goodsDan && index != 0 && this.goodsList[0].check){
					this.goodsArr = []
					this.goodsList[0].check = false
				}
				
				if(this.goodsArr.length > this.goodsSum){
					let arr = this.goodsArr[0]
					this.goodsArr.splice(0,1)
					this.goodsList[arr.index].check = false
				}else{
					this.goodsList[index].check = true
					let obj = {
						name:this.goodsList[index].name,
						id:this.goodsList[index].id,
						index:index
					}
					this.goodsArr.push(obj)
				}
				if(this.goodsArr.length > this.goodsSum){
					let arr = this.goodsArr[0]
					this.goodsArr.splice(0,1)
					this.goodsList[arr.index].check = false
					
				}
				let obj = {
					name:this.goodsList[index].name,
					id:this.goodsList[index].id,
					index:index
				}
				//判断是否为自定义
				if(this.goodsDing && obj.id == 999){
					for(let i = 0 ; i < this.goodsArr.length ; i ++){
						let arr = this.goodsArr[i]
						this.goodsList[arr.index].check = false
					}
					this.goodsArr = []
					this.goodsArr.push(obj)
					this.goodsList[index].check = true
					this.goodsYiType = true
				}
				//
				if(this.goodsArr.length == 2 && this.goodsArr[0].id == "999"){
					this.goodsList[this.goodsList.length - 1].check = false
					this.goodsArr = []
					this.goodsArr.push(obj)
					this.goodsList[index].check = true
					this.goodsYiType = false
				}
			}else{
				//删除
				this.goodsList[index].check = false
				let name = this.goodsList[index].name
				
				for(let i = 0 ; i < this.goodsArr.length ; i ++){
					if(this.goodsArr[i].name == name){
						this.goodsArr.splice(i, i+1)
					}
				}
			}
			this.goodsText = ""
			for(let i = 0 ; i < this.goodsArr.length ; i ++){
				this.goodsText = this.goodsText + this.goodsArr[i].name + " "
			}
			this.$emit("goodsText",this.goodsText)
			this.goodsTextId = []
			for(let i = 0 ; i < this.goodsArr.length ; i ++){
				this.goodsTextId.push(this.goodsArr[i].id)
			}
			this.$emit("goodsTextId",this.goodsTextId)
		},
	}
}
</script>

<style>
	.contsbt{
		display: flex;
		justify-content:start;
		flex-wrap: wrap;
		margin-top: 0!important;
		padding-right: 0!important;
	}
	.contsbt .contsbtCont{
		margin-bottom: 20rpx;
		width: 136rpx;
		height: 54rpx;
		margin-right: 34rpx;
		background-color: #EEEEEE;
		border: 2rpx solid #ddd;
		text-align: center;
		line-height: 50rpx;
		color: #666;
		font-size: 24rpx;
		position: relative;
		border-radius:8rpx;
	}
	.contsbt .contsbtCont.mi{
		width: 100%;
	}
	.contsbt .contsbtCont.mi input{
		text-align: left;
		padding-left: 20rpx;
		height: 100%;
	}
	.contsbt .contsbtCont:nth-of-type(4n){
		margin-right: 0;
	}
	.contsbt .contsbtCont image{
		position: absolute!important;
		bottom: -10rpx;
		right: -10rpx;
		z-index: 2;
		opacity: 0;
		background: #fff;
		border-radius: 14rpx;
	}
	.contsbt .contsbtCont.active{
		background: rgba(21, 128, 252, 0.2);
		color: #3399FF;
		border-color: #3399FF;
	}
	.contsbt .contsbtCont.active image{
		opacity: 1;
	}
</style>
