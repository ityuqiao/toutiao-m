<template>
	<van-cell class="comment-item">
		<van-image
			slot="icon"
			class="avatar"
			round
			fit="cover"
			:src="comment.aut_photo"
		/>
		<div slot="title" class="title-wrap">
			<div class="user-name">{{ comment.aut_name }}</div>
			<van-button
            @click="onClickLike"
                :class="{liked: comment.is_liking}"
				class="like-btn"
				
				:icon="comment.is_liking ? 'good-job' : 'good-job-o'"
				>{{ comment.like_count || "赞" }}</van-button
			>
		</div>

		<div slot="label">
			<p class="comment-content">{{ comment.content }}</p>
			<div class="bottom-info">
				<span class="comment-pubdate">{{
					comment.pubdate | relativeTime
				}}</span>
				<van-button class="reply-btn" round @click="$emit('reply-click', comment)"
					>回复 {{ comment.relativeTime }}</van-button
				>
			</div>
		</div>
	</van-cell>
</template>
  
  <script>
  import { addCommentLike, deleteCommentLike } from '@/api/commment.js'
  import { mapState } from 'vuex';
	export default {
		name: "CommentItem",
		components: {},
		props: {
			comment: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
                // isLoading: false
            };
		},
		computed: {
            ...mapState(['user'])
        },
		watch: {},
		created() {},
		mounted() {},
		methods: {
            async onClickLike() {
                if (!this.user) {
                    return this.$toast('登录账号才能点赞哦')
                }
                try {
                    if (this.comment.is_liking) {
                        await deleteCommentLike(this.comment.com_id)
                    } else {
                        await addCommentLike(this.comment.com_id)
                    }
                    this.$toast.success(this.comment.is_liking ? '取消点赞成功' : '点赞成功')
                    this.$emit('updata-comment-like', !this.comment.is_liking)
                    this.$emit('updataLikeCount', !this.comment.is_liking)
                } catch (error) {
                    this.$toast.fail(this.comment.is_liking ? '取消点赞失败' : '点赞失败')
                }
            }
        },
	};
</script>
  
  <style scoped lang="less">
.comment-item {
	.avatar {
		width: 72px;
		height: 72px;
		margin-right: 25px;
	}
	.title-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.user-name {
			color: #406599;
			font-size: 26px;
		}
	}
	.comment-content {
		font-size: 32px;
		color: #222222;
		word-break: break-all;
		text-align: justify;
	}
	.comment-pubdate {
		font-size: 19px;
		color: #222;
		margin-right: 25px;
	}
	.bottom-info {
		display: flex;
		align-items: center;
	}
	.reply-btn {
		width: 135px;
		height: 48px;
		line-height: 48px;
		font-size: 21px;
		color: #222;
	}
	.like-btn {
		height: 30px;
		padding: 0;
		border: none;
		font-size: 19px;
		line-height: 30px;
		margin-right: 7px;
		.van-icon {
			font-size: 30px;
		}
        &.liked{
            color: orangered;
        }
	}
}
</style>
  