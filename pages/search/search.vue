<template>
	<view class="page">
		<view class="search_wapper">
			<view class="search_icon_waper">
				<image src="../../static/icos/search.png" class="search_icon"></image>
			</view>
			<input type="text" value="" maxlength="10" class="search_input"  placeholder="搜索预告" confirm-type="search" @confirm="getList" />
		</view>
		<view class="poster_list page_block">
			<view class="poster_warp" v-for="(sl,i) in serarchList" :key="i">
				<image :src="sl.cover"   class="poster" @click="getDetail" :data-postid="sl.id"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serarchList:[],
				keywords:"",
				page:1,
				pageTotal:1
			}
		},
		onLoad() {
				uni.showLoading({//loading动画
					title: '',
					mask: true //loading后面的遮罩层防止穿透，用户点击操作页面
				});
				uni.showNavigationBarLoading();//原生导航刷新loading
				var commen_url=this.serverUrl;//挂在到main.js中的Vue,作为全局变量在每个页面中都可以使用
				//获取猜你喜欢
				uni.request({
					url: commen_url+ '/search/list?keywords=&qq=1026540422&page=&pageSize=',
					method:"POST",				
					success: (res) => {
						if(res.data.status==200){
							console.log(res.data);
							this.serarchList=res.data.data.rows;
						}
						
					},
					complete: () => {
						uni.hideLoading();
						uni.hideNavigationBarLoading();
					}
				});
		},
		onReachBottom() {
				//上拉加载分页
			var me = this;
			var keywords = me.keywords;
			var page = me.page+1;
			var total = me.pageTotal;
			if(page>total){
				return;
			}else{
				me.getDefaultList(keywords,page,15)
			}
		},
		methods: {
			getDetail(e){
				//var me = this;
				var postid = e.currentTarget.dataset.postid;
				// uni.navigateTo({
				// 	url:"../detail/detail?postid="+postid
				// })
				uni.navigateTo({
					url:"../movie/movie?trailerId="+postid
				})
			},
			getDefaultList(keywords,page,pageSize){
				var me = this;
				uni.showLoading({//loading动画
					title: '',
					mask: true //loading后面的遮罩层防止穿透，用户点击操作页面
				});
				uni.showNavigationBarLoading();//原生导航刷新loading
				var commen_url=this.serverUrl;//挂在到main.js中的Vue,作为全局变量在每个页面中都可以使用
				//获取猜你喜欢
				uni.request({
					url: commen_url+ '/search/list?keywords='+ keywords +'&qq=1026540422&page='+ page +'&pageSize='+ pageSize,
					method:"POST",				
					success: (res) => {
						if(res.data.status==200){
							console.log(res.data);
							var defaultList = res.data.data.rows;
							me.serarchList = me.serarchList.concat(defaultList);
							me.page = res.data.data.page;
							me.pageTotal = res.data.data.total;
							
						}
						
					},
					complete: () => {
						uni.hideLoading();
						uni.hideNavigationBarLoading();
					}
				});
			},
			getList(e){
				var me = this;
				var _value = e.detail.value;//获取input框的值
				me.keywords = _value;
				me.serarchList = [];
			    me.getDefaultList(_value,1,15)
			}
		}
	}
</script>

<style>
	@import url("search.css");
</style>
