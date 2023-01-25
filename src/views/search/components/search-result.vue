<template>
	<div class="search-result">
		<van-list
			:error.sync="error"
			error-text="请求失败，点击重新加载"
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<van-cell
				v-for="(artical, index) in list"
				:key="index"
				:title="artical.title"
			/>
		</van-list>
	</div>
</template>
  
  <script>
	import { getArticals } from "@/api/search";
	export default {
		name: "search_result",
		props: {
			suggestionText: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				Page: 1,
				error: false,
			};
		},
		// watch: {
		// 	suggestionText: {
		// 		handler(val) {
		// 			console.log(val);
		// 			this.list = []
		// 		},
		// 		immediate: true
		// 	}
		// },
		methods: {
			async onLoad() {
				try {
					if (this.suggestionText.trim() === "") {
						this.error = true;
						this.loading = false;
						return this.$toast("请输入要搜索的关键词");
					}
					const { data } = await getArticals({
						page: this.Page,
						per_page: 20,
						q: this.suggestionText,
					});
					const { results } = data.data;
					this.list.push(...results);
					this.loading = false;
					if (results.length) {
						this.page++;
					} else {
						this.finished = true;
					}
				} catch (error) {
					// this.$toast("获取数据失败，请稍后重试");
					this.error = true;
					this.loading = false;
				}
			},
		},
	};
</script>
  
  <style scoped lang="less">
.search-result {
	padding-top: 108px;
}
</style>