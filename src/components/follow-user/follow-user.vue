<template>
	<van-button
		:loading="loadingbool"
		class="follow-btn"
		type="info"
		color="#3296fa"
		round
		size="small"
		icon="plus"
		v-if="!is_followed"
		@click="followed"
		>关注</van-button
	>
	<van-button class="follow-btn" round size="small" v-else @click="followed"
		>已关注</van-button
	>
</template>

<script>
	import { addFollowed, deleteFollowed } from "@/api/artical.js";
	import { mapState } from "vuex";

	export default {
		name: "follow-user",
		props: {
			is_followed: {
				type: Boolean,
				required: true,
			},
			aut_id: {
				type: [String, Number, Object],
				required: true,
			},
		},
		computed: {
			...mapState(["user"]),
		},
		data() {
			return {
				loadingbool: false,
			};
		},
		methods: {
			async followed() {
				if (!this.user) {
					return this.$toast("请您先登录您的账号");
				}
				this.loadingbool = true;
				try {
					if (this.is_followed) {
						await deleteFollowed(this.aut_id);
					} else {
						await addFollowed(this.aut_id);
					}
					this.$emit("updata-followed", !this.is_followed);
				} catch (error) {
					let msg = "关注失败，请稍后重试";
					if (error.response.status === 400) {
						msg = "自己不能关注自己";
					}
					this.$toast(msg);
				}
				this.loadingbool = false;
			},
		},
	};
</script>

<style>
</style>