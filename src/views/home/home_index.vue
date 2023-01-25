<template>
	<!-- 搜索框 -->
	<div class="home-container">
		<van-nav-bar class="page-nav-bar" fixed>
			<template #title>
				<van-button type="default" round icon="search" class="search-btn"
				to="/search"
					>搜索</van-button
				>
			</template>
		</van-nav-bar>
		<!-- tab栏 -->
		<van-tabs v-model="active" animated swipeable class="tabs">
			<van-tab
				:title="channel.name"
				v-for="channel in channels"
				:key="channel.id"
			>
				<!-- 文章内容 -->
				<articalList :channel="channel" :active="active"></articalList>
			</van-tab>

			<template #nav-right>
				<button class="ham-btn" @click="isEditorShow = true">
					<i class="iconfont icon-gengduo"></i>
				</button>
			</template>
		</van-tabs>

		<!-- 编辑频道列表 -->
		<van-popup
			v-model="isEditorShow"
			closeable
			close-icon-position="top-left"
			round
			position="bottom"
			:style="{ height: '100%' }"
		>
			<channelEditor
				:myChannel="channels"
				:active="active"
				@ClickChannel="clickChannel"
			></channelEditor>
		</van-popup>
	</div>
</template>

<script>
	import Vue from "vue";
	import { mapState } from "vuex";
	import { Tab, Tabs, Popup } from "vant";
	import { userChannels } from "@/api/user.js";
	import articalList from "./components/articl-list.vue";
	import channelEditor from "./components/channel-editor.vue";
	import { getItem } from "@/utils/localStorage";

	Vue.use(Tab);
	Vue.use(Tabs);
	Vue.use(Popup);

	export default {
		name: "home_vue",
		components: {
			articalList,
			channelEditor,
		},
		data() {
			return {
				channels: [],
				active: 0,
				isEditorShow: false,
			};
		},
		computed: {
			...mapState(["user"]),
		},
		created() {
			this.loadChannal();
		},
		methods: {
			async loadChannal() {
				let channels = [];
				try {
					// const { data } = await userChannels();
					// this.channels = data.data.channels;
					// console.log(this.channels);
					if (this.user) {
						const { data } = await userChannels();
						channels = data.data.channels;
					} else {
						let localStorage = getItem("USER_CHANNELS");
						if (localStorage) {
							channels = localStorage;
						} else {
							const { data } = await userChannels();
							channels = data.data.channels;
						}
					}
					this.channels = channels;
				} catch (error) {
					console.log("获取用户列表失败");
				}
			},
			clickChannel(index, isClose) {
				this.active = index;
				if (isClose) {
					this.isEditorShow = false;
				}
				// console.log(11);
			},
		},
	};
</script>

<style scoped lang="less">
.van-nav-bar .van-icon {
	color: #fff;
	font-size: 40px;
}

.home-container {
	padding-top: 173px;

	.page-nav-bar {
		// max-width: none;
		/deep/ .van-nav-bar__title {
			max-width: unset;
		}

		.search-btn {
			width: 555px;
			height: 64px;
			background-color: #5babfb;
			border: none;
			color: #fff;
			font-size: 28px;
			// max-width: 100%;
		}
	}

	/deep/.van-tabs--line .van-tabs__wrap {
		height: 80px;
		position: fixed;
		top: 90px;
		z-index: 1;
		right: 0;
		left: 0;
	}

	/deep/ .tabs {
		.van-tabs__nav--line.van-tabs__nav--complete {
			padding-right: 64px;
		}

		.van-tab {
			border-right: 1px solid #edeff3;
			color: #777;
			font-size: 30px;
		}

		.van-tab--active {
			color: #333;
		}

		.van-tab:nth-last-child(2) {
			border-right: none;
		}

		.van-tabs__line {
			width: 31px;
			height: 6px;
			background-color: #3296fa;
		}

		.ham-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			right: -1px;
			height: 80px;
			width: 66px;
			border: none;
			border-left: 2px solid;
			border-image: linear-gradient(#f8f8f8, #c7c7c7, #f8f8f8) 1 10 1;
			background-color: #fff;
			opacity: 0.9;

			.iconfont {
				font-size: 33px;
				color: #333;
			}
		}
	}
}
</style>