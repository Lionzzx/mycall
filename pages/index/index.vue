<template>
	<view class="content">
		<cardSwiper></cardSwiper>
		<zyflow ref="zf" :flowlist="datalist" @flowtap="touchcard" @flowend="flowend"></zyflow>
		<tab-bar class="fixs" ref="commentTabbat" :actives="0"></tab-bar>
	</view>
</template>

<script>
import cardSwiper from '@/components/helang-cardSwiper/helang-cardSwiper.vue';
import zyflow from '@/components/zyflow/zyflow.vue';
import tabBar from '@/components/tabbar.vue';
import { getCallList } from '@/api/call.js';
import timeHelp from '@/utils/time.js';
export default {
	components: {
		cardSwiper,
		zyflow,
		tabBar
	},
	data() {
		return { datalist: [] };
	},
	onLoad() {
		//模拟首次十条数据

		this.getData();
	},
	methods: {
		async getData() {
			const resp = await getCallList();
			const resps = resp.data.map(v => {
				v.src = v.picArrar[0];
				v.id = v._id;
				v.orig = Math.floor(Math.random() * 1000);
				v.money = Math.floor(Math.random() * 1000);
				v.text = timeHelp.formatTime(v.createTime);
				return v;
			});
			this.datalist = resps;
			// this.datalist = resps;
			for (let i = 0; i < 10; i++) {
				let obj = {
					id: i,
					src: '../../static/' + Math.floor(Math.random() * 4 + 1) + '.jpg',
					title: '江南可采莲,莲叶何田田.鱼戏莲叶间.鱼戏莲叶东,鱼戏莲叶西,鱼戏莲叶南,鱼戏莲叶北',
					orig: Math.floor(Math.random() * 1000),
					money: Math.floor(Math.random() * 1000),
					showText: true,
					text: '限时促销小助手为您推荐'
				};
				this.datalist.push(obj);
			}

			setTimeout(() => {
				this.$refs.zf.showcontent();
			}, 0);
			// this.datalist = [];
		},
		touchcard(e) {
			console.log('点击项的id为' + e);
		},
		flowend() {
			console.log('加载完毕');
		}
	}
};
</script>

<style lang="scss">
.content {
	width: 100vw;
	height: 100vh;
	background-color: #ffffff;
}
</style>
