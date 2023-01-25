<template>
	<div class="comment-post">
		<van-field
			class="post-field"
			v-model.trim="message"
			rows="2"
			autosize
			type="textarea"
			maxlength="50"
			placeholder="请输入留言"
			show-word-limit
		/>
		<van-button class="post-btn" @click="onSend" :disabled="!message.length">发布</van-button>
	</div>
</template>
  
  <script>
	import { sendComment } from "@/api/commment.js";
	export default {
		name: "CommentPost",
		components: {},
		props: {
			targetId: {
				type: [String, Number],
				required: true,
			},
			artical_id: {
				type: [Number, String],
				default: null
			}
		},
		data() {
			return {
				message: "",
			};
		},
		computed: {},
		watch: {},
		created() {},
		mounted() {},
		methods: {
			async onSend() {
				this.$toast.loading({
					message: "加载中...",
                    duration: 0,
					forbidClick: true,
				});
				try {
					const { data } = await sendComment({
						target: this.targetId,
						content: this.message,
						art_id: this.artical_id,
					});
					this.$emit("myComment", data.data);
					this.message = "";
                    this.$toast.success('发布成功')
				} catch (error) {
					this.$toast.fail("评论失败");
				}
			},
		},
	};
</script>
  
  <style scoped lang="less">
.comment-post {
	display: flex;
	align-items: center;
	padding: 32px 0 32px 32px;
	.post-field {
		background-color: #f5f7f9;
	}
	.post-btn {
		width: 150px;
		border: none;
		padding: 0;
		color: #6ba3d8;
		&::before {
			display: none;
		}
	}
}
</style>
  