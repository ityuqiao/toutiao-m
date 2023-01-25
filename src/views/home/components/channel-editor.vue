<template>
	<div class="channel-editor">
		<!-- 我的频道 -->
		<van-cell title="我的频道" :border="false" class="channel">
			<van-button
				type="danger"
				size="mini"
				round
				plain
				class="editor-btn"
				@click="isEdit = !isEdit"
				>{{ isEdit ? "完成" : "编辑" }}</van-button
			>
		</van-cell>
		<van-grid :gutter="10" class="my-channel">
			<van-grid-item
				v-for="(channel, index) in myChannelList"
				:key="channel.id"
				class="grid-item"
				@click="channelClick(channel, index)"
			>
				<van-icon
					name="clear"
					slot="icon"
					class="clearIcon"
					v-show="isEdit && !notEditChannel.includes(channel.id)"
				></van-icon>
				<span slot="text" class="text" :class="{ active: index === active }">{{
					channel.name
				}}</span>
			</van-grid-item>
		</van-grid>
		<!-- 推荐频道 -->
		<van-cell title="推荐频道" :border="false" class="channel" />
		<van-grid :gutter="10">
			<van-grid-item
				icon="plus"
				v-for="channel in reChannels"
				:key="channel.id"
				:text="channel.name"
				class="grid-item"
				@click="addChannel(channel)"
			/>
		</van-grid>
	</div>
</template>

<script>
	import Vue from "vue";
	import { Icon } from "vant";
	import { mapState } from "vuex";
	import { getAllChannels, addUserChannels, deleteUserChannels } from "@/api/channel";
	import { setItem } from "@/utils/localStorage";
	Vue.use(Icon);
	export default {
		name: "channel_edito",
		data() {
			return {
				channelList: [],
				myChannelList: [],
				isEdit: false,
				notEditChannel: [0],
			};
		},
		props: {
			myChannel: {
				type: Array,
				required: true,
			},
			active: {
				type: Number,
				required: true,
			},
		},
		created() {
			this.loadAllChannels();
		},
		beforeUpdate() {
			this.myChannelList = this.myChannel;
		},
		computed: {
			...mapState(["user"]),
			reChannels() {
				const channels = [];
				this.channelList.forEach((channel) => {
					const res = this.myChannel.find((myChannel) => {
						return myChannel.id === channel.id;
					});
					if (!res) {
						channels.push(channel);
					}
				});
				return channels;
			},
		},
		methods: {
			async loadAllChannels() {
				try {
					const { data } = await getAllChannels();
					// console.log(data)
					this.channelList = data.data.channels;
				} catch (error) {
					this.$toast("获取所有列表失败");
				}
			},
			async addChannel(channel) {
				this.myChannelList.push(channel);
				if (this.user) {
					try {
						await addUserChannels({
							id: channel.id,
							seq: this.myChannelList.length,
						});
					} catch (error) {
						this.$toast("添加失败，请稍后重试");
					}
				} else {
					setItem("USER_CHANNELS", this.myChannelList);
				}
			},
			channelClick(channel, index) {
				if (this.isEdit) {
					if (!this.notEditChannel.includes(channel.id)) {
						if (this.active >= index) {
							this.$emit("ClickChannel", this.active - 1, false);
						}
						this.myChannelList.splice(index, 1);
						this.delChannel(channel);
					}
				} else {
					this.$emit("ClickChannel", index, true);
				}
			},
			async delChannel(channel) {
				if (this.user) {
					try {
						await deleteUserChannels(channel.id)
						console.log(11)
					} catch (error) {
						this.$toast('删除失败，请稍后重试')
					}
				} else {
					setItem('USER_CHANNELS', this.myChannelList)
				}
			},
		},
	};
</script>

<style scoped lang="less">
.channel-editor {
	padding-top: 83px;
	/deep/ .van-grid-item__icon-wrapper {
		position: unset;
	}

	.text {
		white-space: nowrap;
		color: #222;
		font-size: 28px;
	}

	.active {
		color: red;
	}

	.channel {
		.editor-btn {
			width: 103px;
			height: 48px;
		}
	}

	/deep/.grid-item {
		width: 160px;
		height: 86px;

		.van-grid-item__text {
			white-space: nowrap;
			color: #222;
			font-size: 28px;
		}

		.van-grid-item__content {
			background-color: #f4f5f6;
			border-radius: 10px;
		}

		[class*="van-hairline"]::after {
			border: none;
		}

		.van-grid-item__content {
			flex-direction: row;
		}

		.van-grid-item__icon {
			font-size: 24px;
			margin-right: 5px;
		}

		.van-grid-item__icon + .van-grid-item__text {
			margin-top: 0;
		}
	}

	/deep/ .my-channel {
		.van-icon {
			font-size: 30px;
			position: absolute;
			top: -7px;
			right: -10px;
			color: #ccc;
		}
	}
}
</style>