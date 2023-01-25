<template>
	<div class="reply-container">
		<!-- 标题 -->
		<van-nav-bar :title="comment.reply_count ? `${reply_count}条回复` : '暂无回复'">
			<van-icon slot="left" name="cross" @click="$emit('close-post')" />
		</van-nav-bar>
		<div class="scroll-container">
			<!-- 要回复的人 -->
			<commentItem :comment="comment" @reply-click="isShow = true"></commentItem>
			<van-cell-group>
				<van-cell title="全部回复" />
			</van-cell-group>
			<!-- 全部回复 -->
			<commentList :source="comment.com_id" type="c" :myCommontList="myCommentList"></commentList>
		</div>
		<!-- 底部发布按钮 -->
		<div class="post-container">
			<van-button round size="small" class="btn-post" @click="isShow = true"
				>发布评论</van-button
			>
		</div>

		<!-- 发布评论弹出层 -->
		<van-popup v-model="isShow" position="bottom">
			<commentSend :targetId="comment.com_id" :artical_id="artical_id" @myComment="myComment"></commentSend>
		</van-popup>
	</div>
</template>

<script>
	import Vue from "vue";
	import { Button } from "vant";

	import commentItem from "./comment-item.vue";
	import commentList from "./comment-list.vue";
	import commentSend from "./comment-send.vue";
	Vue.use(Button);

	export default {
		name: "comment_reply",
		data() {
			return {
				isShow: false,
				myCommentList: [],
				reply_count: 0
			};
		},
		created() {
			this.reply_count = this.comment.reply_count
		},
		props: {
			comment: {
				type: Object,
				required: true,
			},
            artical_id: [Number, String]
		},
		components: {
			commentItem,
			commentList,
			commentSend,
		},
		methods: {
			myComment(commont) {
				this.isShow = false
				this.reply_count++
				this.myCommentList.unshift(commont.new_obj)
			}
		}
	};
</script>

<style scoped lang="less">
.reply-container {
	/deep/ .van-icon-cross {
		color: blue !important;
	}
	.scroll-container {
		position: fixed;
		top: 236px;
		right: 0;
		left: 0;
		bottom: 88px;
		overflow-y: auto;
	}
	.post-container {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		bottom: 0;
		left: 0;
		right: 0;
		height: 88px;
		background-color: #fff;
		border-top: 1px solid #ccc;
		.btn-post {
			width: 60%;
		}
	}
}
</style>