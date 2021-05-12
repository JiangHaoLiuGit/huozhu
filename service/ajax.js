import config from './config.js'
import state from '../store/index.js'

const request = (url, options) => {
	 let token = {
			//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQxNzY1ODEsInVzZXJfbmFtZSI6IjE3NjMxNzEzMzEyIiwiYXV0aG9yaXRpZXMiOlsiQ0FSR08iXSwianRpIjoiNzkyMDA2MzUtODJjMi00YzMwLWFiNzktNjc1MmY1N2M4Mzg1IiwiY2xpZW50X2lkIjoiZ3ciLCJzY29wZSI6WyJhbGwiXX0.MaBJq6IJyMlCUlWAi9pvM_B7zJbLA-tij7j4eq2lXB0"
			// access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTUwNTk0NjIsInVzZXJfbmFtZSI6IjE3NjMxNzEzMzEyIiwiYXV0aG9yaXRpZXMiOlsiQ0FSR08iXSwianRpIjoiM2ZmZGE1MDYtMzViYS00Y2Q3LWIxZjctZjkzYzg2Zjk3MjgwIiwiY2xpZW50X2lkIjoiZ3ciLCJzY29wZSI6WyJhbGwiXX0.uMEsSy-uwLvoXlrAcQJverQoQzeMOdz7cDvjFM52Vjg",
			access_token:state.state.access_token,
			refresh_token:state.state.refresh_token
	 }
   let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
   }
   if(token.access_token != ""){
	   headers = {
	      'Content-Type': 'application/x-www-form-urlencoded',
	   	  'Authorization':'Bearer ' + token.access_token
	   }
   }
   //以下接口不需要传token
   if(url == config.login_url || url == config.reg_url || url == config.check_url || url == config.code_url || url == config.version_url ||  url == config.refresh_url){
		headers = {
		 'Content-Type': 'application/x-www-form-urlencoded'
		}
   }
   return new Promise((resolve, reject) => {
	   
		uni.onNetworkStatusChange(function(res) {
			if(!res.isConnected){
				uni.navigateTo({
					url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
				})
			}
		});
       uni.request({
           url: url,
           method: options.method,
           data: options.data,
           header: headers,
           success(request) {
			   resolve(request.data)
           },
		   complete: (code) => {
			   if(code.statusCode == 401){
				   if(url == config.login_url || url == config.version_url){
					   // uni.showToast({ title: "登录密码错误", icon: "none",duration: 2000 ,mask:true});
				   }else{
					   // 账号信息过期 ，正在跳往登录页
					   uni.showToast({ title: "账号信息过期 ，正在跳往登录页", icon: "none",duration: 2000 ,mask:true});
					   setTimeout(function(){
							uni.reLaunch({
							   url: "/pages/login/login",
							});
					   },2000)
				   }
				  
			   } else if(code.statusCode == '403') {
					console.log('没权限');
					uni.navigateTo({
						url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
					})
				} else if(code.statusCode == '404') {
					if(url == config.minShipping_url){
						
					}else{
						console.log('请求地址不存在');
						uni.navigateTo({
							url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
						})
					}
					
					
				} else if(code.statusCode == '502') {
					console.log('网关错误');
					uni.navigateTo({
						url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
					})
				} else if(code.statusCode == '500') {
					console.log('服务器错误');
					uni.navigateTo({
						url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
					})
				} else if(code.statusCode > '500') {
					console.log(code);
					uni.navigateTo({
						url: "/pages/networkAnomaly/networkAnomaly?url=" + url + "&method=" + options.method + "&data=" + JSON.stringify(options.data) + "&header=" + JSON.stringify(headers)
					})
				}
		   },
           fail(error) {
               //失败结果
               console.log(error)
               //401 如果不成功跳登录页
               reject(error)
           }
       })
   })
}


const get = (url, options = {}) => {
   return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
   return request(url, { method: 'POST', data: options })
}

const put = (url, options) => {
   return request(url, { method: 'PUT', data: options })
}

const dele = (url, options) => {
   return request(url, { method: 'DELETE', data: options })
}

module.exports = {
   get,
   post,
   put,
   dele
}