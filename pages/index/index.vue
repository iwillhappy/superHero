<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="cusr">
			
			<swiper-item v-for="itemcusr in cusr" :key="itemcusr.id">
				<navigator open-type="navigate" :url="'../movie/movie?trailerId=' + itemcusr.movieId">
					<image :src="itemcusr.image" class="cusr" :id="itemcusr.id"></image>
				</navigator>
			</swiper-item>
			
		</swiper>
		<!-- 热门超英 -->
		<view class="page_block">
			<view class="hot_title_warpper">
				<image src="../../static/icos/hot.png" class="hot_icon"></image>
				<view class="hto_text">热门超英</view>
			</view>			
			<scroll-view scroll-x="true" class="page_block poster_wapper">
				<view class="single_poster" v-for="superhero in superheroList" :key="superhero.id">
					<view class="hot" :id="superhero.id">
						<navigator open-type="navigate" :url="'../movie/movie?trailerId=' + superhero.id">
							<image class="poster_img" :src="superhero.cover"></image>
						</navigator>
						<view class="poster_name">{{superhero.name}}</view>
						<star :score="superhero.score" showScore="1"></star>
					</view>
				</view>				
			</scroll-view>
		</view>
		<!-- 热门预告 -->
		<view class="page_block">
			<view class="hot_title_warpper">
				<image src="../../static/icos/108x108.png" class="hot_icon"></image>
				<view class="hto_text">热门预告</view>
			</view>	
		</view>
		<view class="page_block trailer_video_warp">
			<video v-for="trailer in trailerList" :key="trailer.id" :id="trailer.id"
			class="trailer_video"
			:poster="trailer.poster"
			:src="trailer.trailer" controls></video>
		</view>
		
		<!-- 猜你喜欢 -->
		<view class="page_block">
			<view class="hot_title_warpper">
				<image src="../../static/icos/guess-u-like.png" class="hot_icon"></image>
				<view class="hto_text">猜你喜欢</view>
			</view>	
		</view> 
		<view class="like_warp page_block" v-for="(like,gindex) in likeList" :key="gindex">
			<view class="like_signle">
				<navigator open-type="navigate" :url="'../movie/movie?trailerId=' + like.id">
					<image class="like_img" :src="like.cover"></image>
				</navigator>
				<view class="like_move_info">
					<view class="move_title">{{like.name}}</view>
					<star :score="like.score" showScore="0"></star>
					<view class="move_scrp">{{like.basicInfo}}</view>
					<view class="move_scrp">{{like.releaseDate}}</view>
				</view>
				<view class="dianzan_wap" @click="addZan" :data-gindex="gindex">
					<image class="dianzan_icon" src="../../static/icos/praise.png"></image>
					<view class="dianzan_text">点赞</view>
					<view class="dianzan_text opct" :animation="animationDataArry[gindex]" >+1</view>
				</view>
			</view>
		</view>
	</view>	
</template>

<script>
	//import common from'../../common/common.js';
	//注册组件
	import star from'../../components/star.vue';
	export default {
		data() {
			return {
				cusr: [],
				superheroList:[],
				trailerList:[],
				likeList:[],
				animationData:{},
				animationDataArry:[
					{},{},{},{},{},{}
				]
			}
		},
		onUnload(){
			//页面卸载时，卸载动画
			this.animationData={};
		},
		onLoad() {
			//页面加载时创建动画对象
			// #ifdef APP-PLUS || MP-WEIXIN
				this.animation=uni.createAnimation();
			// #endif
			
			//
			var commen_url=this.serverUrl;//挂在到main.js中的Vue,作为全局变量在每个页面中都可以使用
			//获取banner
			uni.request({
				url: commen_url+ '/index/carousel/list?qq=1026540422',
				method:"POST",				
				success: (res) => {
					if(res.data.status==200){
						console.log(res.data);
						this.cusr=res.data.data;
					}
					
				}
			});
			//获取热门超英
			uni.request({
				url: commen_url+ '/index/movie/hot?qq=1026540422&type=superhero',
				method:"POST",				
				success: (res) => {
					if(res.data.status==200){
						console.log(res.data);
						this.superheroList=res.data.data;
					}
					
				}
			});
			//获取热门预告
			uni.request({
				url: commen_url+ '/index/movie/hot?qq=1026540422&type=trailer',
				method:"POST",				
				success: (res) => {
					if(res.data.status==200){
						console.log(res.data);
						this.trailerList=res.data.data;
					}
					
				}
			});
			this.refresh()
		},
		methods: {
			refresh(){
				uni.showLoading({//loading动画
					title: '',
					mask: true //loading后面的遮罩层防止穿透，用户点击操作页面
				});
				uni.showNavigationBarLoading();//原生导航刷新loading
				var commen_url=this.serverUrl;//挂在到main.js中的Vue,作为全局变量在每个页面中都可以使用
				//获取猜你喜欢
				uni.request({
					url: commen_url+ '/index/guessULike?qq=1026540422',
					method:"POST",				
					success: (res) => {
						if(res.data.status==200){
							console.log(res.data);
							this.likeList=res.data.data;
						}
						
					},
					complete: () => {
						uni.hideLoading();
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh()//抓取数据后停止下拉刷新
					}
				});
			},
			//点赞
			addZan(e){
				//H5不支持动画
				// #ifdef APP-PLUS || MP-WEIXIN 
				
				
				//获得当前点击的下标
				var gindex=e.currentTarget.dataset.gindex;
				// 构建动画数据，并且通过step来表示这组动画的完成
				this.animation.translateY(-60).opacity(1).step({
					duration: 400
				})
				// 导出动画数据到view组件，实现组件的动画效果
				//this.animationData = this.animation.export();
				this.animationData=this.animation;
				this.animationDataArry[gindex]=this.animationData.export();
				//还原动画
				setTimeout(function() {
					this.animation.translateY(0).opacity(0).step({
						duration: 0
					})
					//this.animationData=this.animation.export();
					this.animationData=this.animation;
					this.animationDataArry[gindex]=this.animationData.export();
				}.bind(this), 500);
				// #endif
			}
		},
		onPullDownRefresh(){
			this.refresh()
		},
		components:{
			star
		}
	}
</script>

<style>
	@import url("index.css");
</style>
