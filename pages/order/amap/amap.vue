<template>
    <view class="page">
		<u-navbar title="查看路线" title-color="#333" back-icon-color="#333" :background="{ background: '#fff' }" >
			<!-- <view slot="right" class="slotRight u-padding-right-40" @click="to1">快速重发</view> -->
		</u-navbar>
        <view class="uni-common-mt">
            <view>
				
                <map :latitude="latitude" :longitude="longitude" :markers="markers" :polyline="polyline" :scale="scale">
                </map>
            </view>
        </view>
    </view>
</template>

<script>
	import config from '@/components/config.js'
	import route from '@/components/plugins/draw-map/draw-map.js';
	import ajax from '../../../service/ajax.js'
	import configs from '../../../service/config.js'
    export default {
        data() {
            return {
				latitude: "",
				longitude: "",
				markers: [],
				polyline: [],
				scale: "",
				arr:[],
				polyline:[],
				long:""
			}
        },
        methods: {
        },
		onLoad(option) {
			
			// location.png
			if(option.arr){
				this.arr = JSON.parse(option.arr)
				console.log(this.arr)
			}
			// this.markers = [{
			// 	latitude: "30.212613",
			// 	longitude: "120.272036",
			// 	iconPath: '../../../static/location.png',
			// 	// #ifdef APP-PLUS
			// 	iconPath: '../../../static/app-plus/location@3x.png',
			// 	// #endif
			// 	// #ifndef APP-PLUS
			// 	iconPath: '../../../static/location.png',
			// 	// #endif
			// }]
			if(option.id){
				console.log(option.id)
				console.log(configs.shippingOrder_url)
				ajax.get(configs.shippingOrder_url + "/" + option.id + "/gps-push", {
				}).then(res => {
					console.log("gps查看轨迹")
					console.log(res)
					if (res.code == 0) {
						
						let list = res.data
						if(list.length > 0){
							list = list[list.length - 1]
							let lnt = list.lnt
							let lat = list.lat
							console.log(list)
							this.markers = [{
								latitude: "30.212613",
								longitude: "120.272036",
								iconPath: '../../../static/pic54.png',
								// #ifdef APP-PLUS
								iconPath: '../../../static/app-plus/pic54.png',
								// #endif
								// #ifndef APP-PLUS
								iconPath: '../../../static/pic54.png',
								// #endif
							}]
						}
						
						if(option.long){
							this.long = option.long
						}
						// 这里填自己的高德地图应用中key 选择服务平台的时候请选择web服务
						route.setKey(config.WEBAK);
						var origin1 ={
						    latitude: Number(this.arr[0].lat),
						    longitude: Number(this.arr[0].lnt),
							iconPath: '../../../static/location.png',
							//起点的icon
						    // iconPath: '../../static/1.png',
							// title: '起点',
							// clickable:true
						};
						var destination1 = {
						    latitude: Number(this.arr[1].lat),
						    longitude: Number(this.arr[1].lnt),
							iconPath: '../../../static/location.png',
						 //    title: '终点',
							// clickable:true
						};
						
						this.latitude = (Number(this.arr[1].lat) + Number(this.arr[0].lat)) / 2
						this.longitude = (Number(this.arr[1].lnt) + Number(this.arr[0].lnt)) / 2
						route.drawRoute(this,origin1,destination1);
						if(this.arr.length == 3){
							var destination2 = {
							    latitude: Number(this.arr[2].lat),
							    longitude: Number(this.arr[2].lnt),
								iconPath: '../../../static/location.png',
								// title: '终点',
								// clickable:true
							};
							route.drawRoute(this,destination1,destination2);
							this.latitude = (Number(this.arr[1].lat) + Number(this.arr[0].lat) + Number(this.arr[2].lat)) / 3
							this.longitude = (Number(this.arr[1].lnt) + Number(this.arr[0].lnt) + Number(this.arr[2].lnt)) / 3
						}
						if(this.arr.length == 4){
							var destination2 = {
							    latitude: Number(this.arr[2].lat),
							    longitude: Number(this.arr[2].lnt),
								iconPath: '../../../static/location.png',
								// title: '终点',
								// clickable:true
							};
							route.drawRoute(this,destination1,destination2);
							var destination3 = {
							    latitude: Number(this.arr[3].lat),
							    longitude: Number(this.arr[3].lnt),
								iconPath: '../../../static/location.png',
								// title: '终点',
								// clickable:true
							};
							this.latitude = (Number(this.arr[1].lat) + Number(this.arr[0].lat) + Number(this.arr[2].lat) + Number(this.arr[3].lat)) / 4
							this.longitude = (Number(this.arr[1].lnt) + Number(this.arr[0].lnt) + Number(this.arr[2].lnt) + Number(this.arr[3].lnt)) / 4
							route.drawRoute(this,destination2,destination3);
						}
					}
				}).catch(err => {
					//ajax.js反馈的reject结果
					console.log(err)
				})
			}else{
				if(option.long){
					this.long = option.long
				}
				// 这里填自己的高德地图应用中key 选择服务平台的时候请选择web服务
				route.setKey(config.WEBAK);
				var origin1 ={
				    latitude: Number(this.arr[0].lat),
				    longitude: Number(this.arr[0].lnt),
					iconPath: '../../../static/location.png',
					//起点的icon
				    // iconPath: '../../static/1.png',
					// title: '起点',
					// clickable:true
				};
				var destination1 = {
				    latitude: Number(this.arr[1].lat),
				    longitude: Number(this.arr[1].lnt),
					iconPath: '../../../static/location.png',
				 //    title: '终点',
					// clickable:true
				};
				
				this.latitude = (Number(this.arr[1].lat) + Number(this.arr[0].lat)) / 2
				this.longitude = (Number(this.arr[1].lnt) + Number(this.arr[0].lnt)) / 2
				route.drawRoute(this,origin1,destination1);
				if(this.arr.length == 3){
					var destination2 = {
					    latitude: Number(this.arr[2].lat),
					    longitude: Number(this.arr[2].lnt),
						iconPath: '../../../static/location.png',
						// title: '终点',
						// clickable:true
					};
					route.drawRoute(this,destination1,destination2);
					this.latitude = (Number(this.arr[1].lat) + Number(this.arr[0].lat) + Number(this.arr[2].lat)) / 3
					this.longitude = (Number(this.arr[1].lnt) + Number(this.arr[0].lnt) + Number(this.arr[2].lnt)) / 3
				}
				if(this.arr.length == 4){
					var destination2 = {
					    latitude: Number(this.arr[2].lat),
					    longitude: Number(this.arr[2].lnt),
						iconPath: '../../../static/location.png',
						// title: '终点',
						// clickable:true
					};
					route.drawRoute(this,destination1,destination2);
					var destination3 = {
					    latitude: Number(this.arr[3].lat),
					    longitude: Number(this.arr[3].lnt),
						iconPath: '../../../static/location.png',
						// title: '终点',
						// clickable:true
					};
					this.latitude = (Number(this.arr[1].lat) + Number(this.arr[0].lat) + Number(this.arr[2].lat) + Number(this.arr[3].lat)) / 4
					this.longitude = (Number(this.arr[1].lnt) + Number(this.arr[0].lnt) + Number(this.arr[2].lnt) + Number(this.arr[3].lnt)) / 4
					route.drawRoute(this,destination2,destination3);
				}
			}
			
		},
		onShow(){
			if(this.long){
				if(this.long < 300){
					this.scale = 10
				}else if(this.long >= 500){
					this.scale = 5
				}else if(this.long > 1000){
					this.scale = 5
				}
			}
			
		}
    }
</script>
<style>
	.page{
		height: 100vh;
		overflow:hidden;
	}
    map {
        width: 100%;
        height: 100vh;
    }
    .cover{
		display: flex;
		text-align: center;
        background: #999;
    }
</style>
