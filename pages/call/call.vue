<template>
	<view class="call">
		<view class="textarea-wrap">
			<text class="textarea-title">打卡描述</text>
			<textarea class="textarea-text" v-model="question" placeholder="请记录点什么。"></textarea>
		</view>
		<view class="line"></view>
		<view class="addpic-box">
			<text class="addpic-title">打卡图片</text>
			<view class="addpic-content">
				<view v-for="(item, index) in picArrar" :key="index" class="addpic-unit">
					<image @click="showPic(index)" class="addpic-unit-image" :src="item"></image>
					<image class="addpic-unit-close" src="/static/images/AskHome/close.png" @click="delPic(index)"></image>
				</view>
				<block v-if="picArrar.length < 5">
					<view @click="choosePic" class="addpic-btn"><image class="addpic-btn-pic" src="/static/plus.png"></image></view>

					<view class="addpic-text-wrap" v-if="picArrar.length === 0">
						<text class="addpic-text-1">暂时支持上传图片</text>
						<text class="addpic-text-2">上传记录在首页查看</text>
					</view>
				</block>
			</view>
		</view>
		<view @click="handleSumbit" class="footer-button">
			<view :class="canSubmit ? 'btc1' : 'btc2'" class="submit-box"><text class="submit-btn">打卡</text></view>
		</view>
		<!-- <tab-bar :actives="1"></tab-bar> -->
	</view>
</template>

<script>
import tabBar from '@/components/tabbar.vue';
import { call } from '@/api/call.js';
export default {
	components: { tabBar },
	data() {
		return { question: '', ageValue: 20, sexType: 1, picArrar: [], imgKeyIds: '' };
	},
	computed: {
		canSubmit() {
			return !!this.picArrar.length && this.question.replace(/[^\u4e00-\u9fa5]/g, '').length >= 4;
		}
	},
	methods: {
		sublimeHandle() {},
		changeSex() {},
		delPic(index) {
			this.picArrar.splice(index, 1);
		},
		showPic(index) {
			uni.previewImage({
				urls: this.picArrar,
				current: index
			});
		},

		choosePic() {
			uni.chooseImage({
				count: 5 - this.picArrar.length,
				sizeType: 'compressed',
				success: async ({ tempFilePaths }) => {
					tempFilePaths.forEach(async v => {
						const result = await uniCloud.uploadFile({
							filePath: v
						});
						console.log('上传结果', result);
						this.picArrar.push(result.fileID);
					});
				},
				fail(e) {
					console.log(e);
				}
			});
		},
		submitCheck() {
			let { question, ageValue } = this;
			let ageRex = /^\d{1,3}$/g;

			if (!question || question.replace(/[^\u4e00-\u9fa5]/g, '').length < 4) {
				this.$msg('记录至少4个中文');
				return true;
			}
			return false;
		},
		saveData() {
			const askData = {
				question: this.question,
				picArrar: this.picArrar
			};
			uni.setStorageSync('askData', askData);
		},
		async handleSumbit() {
			if (this.submitCheck()) {
				return;
			}
			this.$msg('打卡中', 'loading', 5000);

			try {
				
				const resp = await call({ title: this.question, picArrar: this.picArrar });
				this.$msg('打卡成功');
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/index'
					});
				}, 1000);
			} catch (e) {
				this.$msg(e.info);
			} finally {
			}
		}
	}
};
</script>

<style lang="scss">
.call {
	background: #ffffff;
	height: 100vh;
	flex-direction: column;
	padding-bottom: 200upx;
}
view {
	display: flex;
}
.btc2 {
	background: rgba(175, 212, 251, 1);
}
.btc1 {
	background: #3291f9;
}
.line {
	width: 670upx;
	height: 1upx;
	background: rgba(245, 245, 245, 1);
	margin: 0 auto;
}
.footer-button {
	height: 130upx;
	padding-top: 20upx;
	background-color: #f7f9fc;
	position: fixed;
	bottom: 0;
	width: 750upx;
}
.container {
	box-sizing: border-box;
	position: relative;
	height: 100vh;
	flex-direction: column;
	padding-bottom: 110upx;
	border-top-color: #f5f5f5;
	border-top-width: 1upx;
	background-color: #ffffff;
}
.textarea-wrap {
	flex-direction: column;
	margin: 0 40upx;
	padding: 40upx 0;
	// height: 500upx;
	background-color: #ffffff;
	border-bottom-color: #f5f5f5;
	border-bottom-width: 1upx;
}
.textarea-title {
	margin-bottom: 20upx;
	line-height: 50upx;
	font-size: 36upx;
	color: #323437;
}
.textarea-text {
	width: 100%;
	height: 350upx;
	font-size: 28upx;
	line-height: 50upx;
	placeholder-color: #b2b2b2;
}

.addpic-box {
	flex-direction: column;
	margin: 0 40upx;
	padding: 40upx 0;
	border-bottom-color: #f5f5f5;
	border-bottom-width: 1upx;
}
.addpic-title {
	font-size: 36upx;
	line-height: 50upx;
}
.addpic-content {
	background-color: #ffffff;
	align-items: center;
}
.addpic-unit {
	margin-top: 30upx;
	position: relative;
	margin-right: 5upx;
	width: 120upx;
	height: 120upx;
	border-radius: 6upx;
}
.addpic-unit-image {
	// margin-top: 10upx;
	width: 120upx;
	height: 120upx;
	border: 1upx solid #dde4f1;
	border-radius: 6upx;
}
.addpic-unit-close {
	// margin-left: 100upx;
	position: absolute;
	top: -10upx;
	right: 0upx;
	width: 30upx;
	height: 30upx;
}
.addpic-btn {
	align-items: center;
	margin-top: 30upx;
	width: 120upx;
	height: 120upx;
	justify-content: center;
	border: 1upx solid #dde4f1;
	// background-color: #f7f9fc;
	border-radius: 6upx;
}
.addpic-btn-pic {
	width: 40upx;
	height: 40upx;
}
.addpic-text-wrap {
	flex-direction: column;
	align-content: center;
	justify-content: center;
	margin-left: 32upx;
	width: 450upx;
	height: 140upx;
}
.addpic-text-1 {
	line-height: 50upx;
	color: #323437;
	font-size: 28upx;
}
.addpic-text-2 {
	line-height: 50upx;
	color: #a9b5c2;
	font-size: 26upx;
}

.msg-box {
	flex-direction: column;
	background-color: #ffffff;
}
.msg-sex,
.msg-age {
	font-size: 28upx;
	display: flex;
	align-items: center;
	padding: 26upx 0 26upx 35upx;
}
.msg-age-input {
	padding-left: 47upx;
	width: 300upx;
	font-size: 28upx;
}
.msg-sex {
	justify-content: flex-start;
}
.sex-box {
	margin-left: 50upx;
}
.sex-pic {
	margin-left: 47upx;
	width: 48upx;
	height: 49upx;
	resize-mode: contain;
}
.sex-text {
	margin-left: 20upx;
}
.choose-input {
	margin-top: 4upx;
	width: 32upx;
	height: 32upx;
}
.choose-input-cur {
	background-color: #3291f9;
}
.age-input-age {
	margin-left: 47upx;
	width: 70upx;
}
.age-input-type {
	width: 70upx;
}

.submit-box {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 750upx;
	height: 110upx;
}
.submit-btn {
	font-size: 36upx;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
}

.modal-custom {
	flex-direction: column;
}
.modal-custom text {
	line-height: 40upx;
	text-align: center;
	font-size: 26upx;
}
view {
	display: flex;
}
</style>
