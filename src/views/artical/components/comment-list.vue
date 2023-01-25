<template>
	<van-list
		v-model="loading"
		:finished="finished"
		finished-text="暂无更多评论"
		@load="onLoad"
	>
		<commentItem
			@reply-click="$emit('reply-click', $event)"
			v-for="(item, index) in list"
			:key="index"
			:comment="item"
			@updata-comment-like="item.is_liking = $event"
			@updataLikeCount="$event ? item.like_count-- : item.like_count++"
		/>
	</van-list>
</template>

<script>
	import { getComments } from "@/api/commment.js";
	import commentItem from "./comment-item.vue";
	export default {
		name: "comment_list",
		props: {
			source: {
				type: [String, Number],
				required: true,
			},
			myCommontList: Array,
			type: {
				type: String,
				validator(value) {
					return ['a', 'c'].includes(value)
				},
				default: 'a'
			}
		},
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				offset: null,
			};
		},
		watch: {
			myCommontList: {
				handler(val) {
					if (val) {
						this.list.unshift(this.myCommontList[0]);
					}
				},
			},
		},
		components: {
			commentItem,
		},
		methods: {
			async onLoad() {
				try {
					const { data } = await getComments({
						type: this.type,
						source: this.source,
						offset: this.offset,
						limit: 10,
					});
					const { results } = data.data;
					this.list.push(...results);
					this.loading = false;
					if (results.length) {
						this.offset = data.data.last_id;
					} else {
						this.finished = true;
					}
				} catch (error) {
					this.$toast.fail("获取评论数据失败");
				}
			},
			updataLike(val) {
				if (val) {
					item.like_count--;
				} else {
					item.like_count++;
				}
			},
		},
	};
</script>

<style>
</style>