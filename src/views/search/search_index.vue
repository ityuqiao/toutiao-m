<template>
	<div class="search-comtainer">
		<!-- 搜索框 -->
		<form action="/">
			<van-search
				v-model="searchText"
				show-action
				placeholder="请输入搜索关键词"
				@search="onSearch"
				@cancel="onCancel"
				@focus="isSugestionShow = true"
				background="#3296fa"
				autofocus
			/>
		</form>
		<!-- 搜索结果 -->
		<searchResult
			v-if="isResultShow"
			:suggestionText="sugestionText"
		></searchResult>
		<!-- 联想建议 -->
		<searchSuggestion
			v-if="searchText && isSugestionShow"
			:searchText="searchText"
			@searchSuggestion="onSearch"
		></searchSuggestion>
		<!-- 历史记录 -->
		<searchHistory
			v-show="!searchText && isSugestionShow"
			:searchHistory="searchHistory"
			@clearHistory="searchHistory = []"
			@search="onSearch"
		></searchHistory>
	</div>
</template>
<script>
	import searchHistory from "./components/search-history.vue";
	import searchSuggestion from "./components/search-suggestion.vue";
	import { setItem, getItem } from "@/utils/localStorage";
	import searchResult from "./components/search-result.vue";

	import Vue from "vue";
	import { Search } from "vant";
	// @blur="isSugestionShow = false"
	Vue.use(Search);
	export default {
		name: "search_vue",
		data() {
			return {
				searchText: "",
				isResultShow: false,
				isSugestionShow: false,
				sugestionText: "",
				searchHistory: getItem('SEARCH_HISTORY') || [],
			};
		},
		computed: {},
		watch: {
			searchHistory: {
				handler(val) {
					setItem("SEARCH_HISTORY", val);
					// console.log(22);
				}
			},
		},
		components: {
			searchHistory,
			searchSuggestion,
			searchResult,
		},
		methods: {
			onSearch(val) {
				this.isResultShow = false;
				this.$nextTick().then(() => {
					this.isResultShow = true;
				});
				// 将搜索记录存入数组中
				if (val) {
					const index = this.searchHistory.indexOf(val);
					if (index !== -1) {
						this.searchHistory.splice(index, 1);
					}
					this.searchHistory.unshift(val);
				}

				this.searchText = val;
				this.sugestionText = val;
				this.isSugestionShow = false;
			},
			onCancel() {
				this.$router.back();
			},
		},
	};
</script>

<style scoped lang="less">
.search-comtainer {
	position: relative;
	.van-search__action {
		color: #fff;
	}
	.van-search {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 3;
	}
	.search-history,
	.search-suggestion {
		position: fixed;
		top: 108px;
		z-index: 1;
		width: 100%;
	}
}
</style>