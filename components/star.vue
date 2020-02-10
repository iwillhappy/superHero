<template name="star">
	<view class="poster_sort">
		<image v-for="(yellow,index) in yellowScore" :key="index"
		src="../../static/icos/star-yellow.png" class="start-icon"></image>
		 
		<image v-for="gray in greyScore" 
		src="../../static/icos/star-gray.png" class="start-icon"></image>
		<view class="score" v-if="showScore==1">{{score}}</view>
	</view>
</template>

<script>
	export default{
		name:"star",
		data(){
			return{
				yellowScore:0,
				greyScore:5
			}
		},
		onLoad(){
			
		},
		props:{
			score:0,         //从父组件传入的分数
			showScore:0      //从父组件传入，是否显示分数 0不显示1是显示
		},
		created(){
			var yellowCont=0;
			if(this.score !=null && this.score !=undefined && this.score!=''){
				yellowCont=this.score;
			}
			var yell_n=parseInt(yellowCont/2);
			var grey_n=5-yell_n;
			
			this.yellowScore=yell_n;
			this.greyScore=grey_n;
			
		},
		methods:{
			
		},
	}
</script>
<style>
	.poster_sort{
		width: 200rpx;
		display: flex;
		flex-direction: row;
	}
	.start-icon{
		width: 20rpx;
		height: 20rpx;
		margin-right: 5rpx;
		margin-top: 8rpx;
	}
	.score{
		font-size: 14px;
		color: grey;
	}
</style>
