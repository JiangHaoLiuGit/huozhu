<template>
    <view class="page">
		<u-navbar title="查看路线" title-color="#F8F8F8" back-icon-color="#333" :background="{ background: '#fff' }" >
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

    export default {
        data() {
            return {
				latitude: 39.90909,
				longitude: 116.434307,
				markers: [],
				polyline: [],
				scale: 12
			}
        },
        methods: {
        },
		onLoad() {
            // 这里填自己的高德地图应用中key 选择服务平台的时候请选择web服务
            route.setKey(config.WEBAK);
			const origin ={
			    latitude: 25.09591,
			    longitude: 104.872858,
				//起点的icon
			    // iconPath: '../../static/1.png',
				title: '起点',
				clickable:true
			};
			const destination = {
			    latitude: 25.106936,
			    longitude: 104.916211,
				//终点的icon
			    title: '终点',
				clickable:true
			};

			route.drawRoute(this,origin,destination);
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
