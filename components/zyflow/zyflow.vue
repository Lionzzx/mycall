<template>
	<view class="zy_content">
		<view id="zy_column_view" v-for="(item, index) in contentlist" :key="index" class="zy_list">
			<view v-for="(citem, cindex) in item.list" :key="cindex" class="zy_card">
				<image @load="showcontent" @error="showcontent" @tap="touch_card(citem)" :data-id="citem.id" :src="citem.src" :key="cindex" mode="widthFix"></image>
				<view @tap="touch_card" :data-id="citem.id" class="zy_bottom_view">
					<text class="zy_title">{{ citem.title }}</text>
					<!-- <text class="zy_money">¥ {{ citem.money }}</text> -->
					<!-- <text class="zy_old_money">¥{{ citem.orig }}</text> -->
					<view class="zy_type_view">{{ citem.text }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		flowlist: {
			type: Array
		}
	},
	data() {
		return {
			//渲染内容列表 (左右两列)
			contentlist: [
				{
					list: []
				},
				{
					list: []
				}
			]
		};
	},
	methods: {
		//渲染列表
		showcontent() {
			const index = this.contentlist.reduce(function(total, current) {
				return total + current.list.length;
			}, 0);
			if (index > this.flowlist.length - 1) {
				this.$emit('flowend');
				return;
			}
			const query = uni.createSelectorQuery().in(this);
			let flag = 0;
			query
				.selectAll('#zy_column_view')
				.boundingClientRect(data => {
					flag = data[0].bottom - data[1].bottom < 0 ? 0 : 1;
					this.contentlist[flag].list.push(this.flowlist[index]);
				})
				.exec();
		},
		//卡片点击事件
		touch_card(citem) {
			uni.previewImage({
				loop: true,
				indicator: true,
				current: this.flowlist.findIndex(v => v.id == citem.id),
				urls: this.flowlist.map(v => v.src)
			});
			this.$emit('flowtap', citem._id);
		},
		//初始化
		zyinit() {
			this.contentlist = [{ list: [] }, { list: [] }];
			setTimeout(() => {
				this.showcontent();
			}, 0);
		}
	},
	mounted() {
		// if (this.flowlist.length) {
		// 	setTimeout(() => {
		// 		this.zyinit();
		// 	}, 200);
		// }
	}
};
</script>

<style>
.zy_content {
	/* 	width: 100%;
		height: 100%; */
	background-color: #f6f6f6;
	position: relative;
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-evenly;
	align-items: flex-start;
	box-sizing: border-box;
	padding-bottom: 200upx;
}
.zy_list {
	width: 45%;
	display: flex;
	flex-direction: column;
}
.zy_card {
	width: 100%;
	background-color: #fefefe;
	border-radius: 10rpx;
	overflow: hidden;
	box-shadow: 1px 1px 5px gray;
	margin-top: 20rpx;
}
.zy_card image {
	width: 100%;
	margin-bottom: 5rpx;
}
/* 底部卡片内容 */
.zy_bottom_view {
	width: 100%;
	/* min-height: 100rpx; */
	background-color: #fff;
	margin-bottom: 15rpx;
}
.zy_title {
	display: inline-block;
	width: 90%;
	max-height: 70rpx;
	margin-left: 5%;
	margin-top: 10rpx;
	font-size: 26rpx;
	font-weight: bold;
	color: #252525;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.zy_money {
	display: block;
	width: 90%;
	margin-left: 5%;
	margin-top: 5rpx;
	color: #f35d3c;
	font-size: 32rpx;
	font-weight: bold;
}
.zy_old_money {
	display: block;
	width: 90%;
	margin-left: 5%;
	color: #acacac;
	font-size: 20rpx;
	text-decoration: line-through;
	margin-top: 5rpx;
}
.zy_type_view {
	display: inline-block;
	background-color: #fff3f3;
	margin-bottom: 10rpx;
	color: #e36161;
	font-size: 18rpx;
	padding: 2rpx 5px;
	border-radius: 0 5rpx;
	margin-left: 5%;
}
</style>
