<template>
	<view class="">
		<block  v-for="(item,index) in userInfos" :key="index">
			<view class="mesg">
				<text>{{item.userName}}</text>
				<text>{{item.age}}</text>
			</view>
		</block>
	</view>
</template>
 
<script>
	export default{
		// props:["reciveUserInfo"],
		data() {
			return {
				userInfos: [{
						"userName": "kaliwo",
						"age": "19"
					},
					{
						"userName": "lihuahua",
						"age": "40"
					}
				],
			}
		}
		
	}
</script>
<style>
	.mesg{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>