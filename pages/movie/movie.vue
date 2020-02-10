<template>
	<view class="page">
		<view class="video_warp">
			<video  :id="trailer.id"
			class="trailer_video_v"
			:poster="trailer.poster"
			:src="trailer.trailer" controls></video>
		</view>
	</view>
</template>

<script>
	export default{
		name:"detail",
		data(){
			return{
				trailer:{}
			}
		},
		onLoad(params) {
			var trailerId = params.trailerId;
			var commen_url=this.serverUrl;
			uni.showLoading();
			
			uni.request({
				url:commen_url + "/search/trailer/" + trailerId + '?qq=1026540422',
				method:"POST",				
				success: (res) => {
					if(res.data.status==200){
						console.log(res.data);
						//this.serarchList=res.data.data.rows;
						this.trailer = res.data.data;
					}
					
				},
				complete: () => {
					uni.hideLoading();
					//uni.hideNavigationBarLoading();
				}
			})
		}
	}
</script>

<style>
	@import url("movie.css");
</style>
