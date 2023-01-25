<template>
	<van-icon
		@click="onClick"
		color="#777"
		:name="attitude === 1 ? 'good-job' : 'good-job-o'"
		:class="{
			liked: attitude === 1,
		}"
	/>
</template>

<script>
	import { addLiked, deleteLiked } from "@/api/artical.js";
    import { mapState } from "vuex";
	export default {
		name: "like_artical",
		props: {
			attitude: {
				type: Number,
				require: true,
			},
            articalId: {
                type: [String, Number],
                required: true
            }
		},
        computed: {
            ...mapState(['user'])
        },
		methods: {
			async onClick() {
                if (!this.user) {
                    this.$toast('请您先登录您的账号')
                }
                try {
                    if (this.attitude === 1) {
                        await deleteLiked(this.articalId)
                        this.$toast.success('取消点赞成功')
                    } else {
                        await addLiked(this.articalId)
                        this.$toast.success('点赞成功')
                    }
                    this.$emit('updata-liked', this.attitude === 1 ? -1 : 1)
                } catch (error) {
                    this.$toast.fail(this.attitude === 1 ? '取消点赞失败' : '点赞失败')
                }
            },
		},
	};
</script>

<style scoped lang="less">
.liked {
	color: #e5645f !important;
}
</style>