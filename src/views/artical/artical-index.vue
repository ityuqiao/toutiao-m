<template>
	<div class="article-container">
		<!-- 导航栏 -->
		<van-nav-bar
			class="page-nav-bar"
			left-arrow
			title="黑马头条"
			@click-left="$router.back()"
		></van-nav-bar>
		<!-- /导航栏 -->

		<div class="main-wrap">
			<!-- 加载中 -->
			<div class="loading-wrap" v-if="loading">
				<van-loading color="#3296fa" vertical>加载中</van-loading>
			</div>
			<!-- /加载中 -->

			<!-- 加载完成-文章详情 -->
			<div class="article-detail" v-else-if="artical.title">
				<!-- 文章标题 -->
				<h1 class="article-title">{{ artical.title }}</h1>
				<!-- /文章标题 -->

				<!-- 用户信息 -->
				<van-cell class="user-info" center :border="false">
					<van-image
						class="avatar"
						slot="icon"
						round
						fit="cover"
						:src="artical.aut_photo"
					/>
					<div slot="title" class="user-name">{{ artical.aut_name }}</div>
					<div slot="label" class="publish-date">
						{{ artical.pubdate | relativeTime }}
					</div>
					<!-- 关注按钮 -->
					<followUser
						:is_followed="artical.is_followed"
						class="follow-btn"
						:aut_id="artical.aut_id"
						@updata-followed="artical.is_followed = $event"
					></followUser>
				</van-cell>
				<!-- /用户信息 -->

				<!-- 文章内容 -->
				<div
					class="article-content markdown-body"
					v-html="artical.content"
					ref="article-content"
				></div>
				<van-divider>正文结束</van-divider>
				<!-- 文章评论 -->
				<commentList
					:source="artical.art_id"
					:myCommontList="myComment"
					@reply-click="onReplyClick"
				></commentList>
			</div>
			<!-- /加载完成-文章详情 -->

			<!-- 加载失败：404 -->
			<div class="error-wrap" v-else-if="errorStatus === 404">
				<van-icon name="failure" />
				<p class="text">该资源不存在或已删除！</p>
			</div>
			<!-- /加载失败：404 -->

			<!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
			<div class="error-wrap" v-else>
				<van-icon name="failure" />
				<p class="text">内容加载失败！</p>
				<van-button class="retry-btn" @click="loadArtival">点击重试</van-button>
			</div>
			<!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
		</div>
		<!-- 底部区域 -->
		<div class="article-bottom">
			<van-button
				class="comment-btn"
				type="default"
				round
				size="small"
				@click="isShowSend"
				>写评论</van-button
			>
			<van-icon name="comment-o" :badge="artical.comm_count" color="#777" />
			<collectArtical
				:isCollected="artical.is_collected ? artical.is_collected : false"
				:articalId="artical.art_id ? artical.art_id : 0"
				@updata-collected="artical.is_collected = $event"
			></collectArtical>
			<likeArtical
				:attitude="artical.attitude ? artical.attitude : -1"
				:articalId="artical.art_id ? artical.art_id : 0"
				@updata-liked="artical.attitude = $event"
			></likeArtical>
			<van-icon name="share" color="#777777"></van-icon>
		</div>
		<!-- 发布评论 -->
		<van-popup v-model="isSendCommentShow" position="bottom">
			<commentSend
				:target-id="artical.art_id"
				@myComment="updataCommentList"
			></commentSend>
		</van-popup>
		<!-- 评论回复 -->
		<van-popup
			v-model="isReplyShow"
			position="bottom"
			:style="{ height: '90%' }"
		>
			<commentReply
				:comment="currentReply"
				:artical_id="artical.art_id"
				@close-post="isReplyShow = false"
				v-if="isReplyShow"
			></commentReply>
		</van-popup>

		<!-- /底部区域 -->
	</div>
</template>
  
  <script>
	import Vue from "vue";
	import { mapState } from "vuex";
	import { Loading, Divider, ImagePreview } from "vant";
	import { getArticalById } from "@/api/artical";
	import followUser from "@/components/follow-user/follow-user.vue";
	import collectArtical from "@/components/collect-artical/collect-artical.vue";
	import likeArtical from "@/components/like-artical/like-artical.vue";
	import commentList from "./components/comment-list.vue";
	import commentSend from "./components/comment-send.vue";
	import commentReply from "./components/comment-reply.vue";
	// 全局注册
	Vue.use(ImagePreview);
	Vue.use(Loading);
	Vue.use(Divider);

	export default {
		name: "artical_vue",
		created() {
			console.log();
		},
		components: {
			followUser,
			collectArtical,
			likeArtical,
			commentList,
			commentSend,
			commentReply,
		},
		props: {
			articalId: {
				type: [Number, String],
				required: true,
			},
		},
		data() {
			return {
				artical: {},
				loading: true,
				errorStatus: 0,
				isSendCommentShow: false,
				myComment: [],
				isReplyShow: false,
				currentReply: {},
			};
		},
		computed: {
			...mapState(["user"]),
		},
		created() {
			this.loadArtival();
		},
		mounted() {},
		methods: {
			onReplyClick(comment) {
				console.log(comment);
				this.currentReply = comment;
				this.isReplyShow = true;
			},
			updataCommentList(data) {
				this.myComment.unshift(data.new_obj);
				this.artical.comm_count++;
				this.isSendCommentShow = false;
			},
			isShowSend() {
				if (!this.user) {
					return this.$toast("请先登录您的账号");
				}
				this.isSendCommentShow = true;
			},
			async loadArtival() {
				this.loading = true;
				try {
					const { data } = await getArticalById(this.articalId);
					this.loading = false;
					this.artical = data.data;
					setTimeout(() => {
						this.ImagePreview();
					}, 0);
				} catch (error) {
					if (error.response.status === 404) {
						this.errorStatus = 404;
					}
					this.loading = false;
				}
			},
			ImagePreview() {
				const articalContent = this.$refs["article-content"];
				const imgs = articalContent.querySelectorAll("img");
				let images = [];
				imgs.forEach((img, index) => {
					images.push(img.src);
					img.addEventListener("click", function () {
						ImagePreview({
							images,
							startPosition: index,
						});
					});
				});
			},
		},
	};
</script>
  
  <style scoped lang="less">
@import url(./github-markdown.css);
.article-container {
	/deep/ .van-nav-bar .van-icon {
		color: #fff;
	}
	.main-wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 92px;
		bottom: 88px;
		overflow-y: scroll;
		background-color: #fff;
	}
	.article-detail {
		.article-title {
			font-size: 40px;
			padding: 50px 32px;
			margin: 0;
			color: #3a3a3a;
		}

		.user-info {
			padding: 0 32px;
			.avatar {
				width: 70px;
				height: 70px;
				margin-right: 17px;
			}
			.van-cell__label {
				margin-top: 0;
			}
			.user-name {
				font-size: 24px;
				color: #3a3a3a;
			}
			.publish-date {
				font-size: 23px;
				color: #b7b7b7;
			}
			.follow-btn {
				width: 170px;
				height: 58px;
			}
		}

		.article-content {
			padding: 55px 32px;
			/deep/ p {
				text-align: justify;
			}
		}
	}

	.loading-wrap {
		padding: 200px 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}

	.error-wrap {
		padding: 200px 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		.van-icon {
			font-size: 122px;
			color: #b4b4b4;
		}
		.text {
			font-size: 30px;
			color: #666666;
			margin: 33px 0 46px;
		}
		.retry-btn {
			width: 280px;
			height: 70px;
			line-height: 70px;
			border: 1px solid #c3c3c3;
			font-size: 30px;
			color: #666666;
		}
	}

	.article-bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		height: 88px;
		border-top: 1px solid #d8d8d8;
		background-color: #fff;
		.comment-btn {
			width: 282px;
			height: 46px;
			border: 2px solid #eeeeee;
			font-size: 30px;
			line-height: 46px;
			color: #a7a7a7;
		}
		.van-icon {
			font-size: 40px;
			.van-info {
				font-size: 16px;
				background-color: #e22829;
			}
		}
	}
}
</style>
  