<template>
	<van-icon
		@click="onclick"
		color="#777"
		:name="isCollected ? 'star' : 'star-o'"
		:class="{
			actived: isCollected,
		}"
	/>
</template>

<script>
	import { addCollect, deleteCollect } from "@/api/artical.js";
	import { mapState } from "vuex";
	export default {
		name: "collect_artical",
		props: {
			isCollected: {
				type: Boolean,
				required: true,
			},
            articalId: {
                type: [String, Number],
                required: true
            }
		},
		computed: {
			...mapState(["user"]),
		},
        methods: {
            async onclick() {
                if (!this.user) {
                    return this.$toast('请您先登录您的账号')
                }
                try {
                    if(this.isCollected) {
                        await deleteCollect(this.articalId)
                        this.$toast.success('取消收藏成功')
                    } else {
                        await addCollect(this.articalId)
                        this.$toast.success('收藏成功')
                    }
                    this.$emit('updata-collected', !this.isCollected)
                } catch (error) {
                    this.$toast.fail(this.isCollected? '取消收藏失败' : '收藏失败')
                }
            }
        }
	};
</script>

<style scoped lang="less">
.actived {
	color: orange !important;
}
</style>