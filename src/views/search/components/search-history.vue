<template>
	<div class="search-history">
		<van-cell-group>
			<van-cell title="历史记录">
                <van-icon name="delete" v-if="!isDelete" @click="isDelete = true"/>
                <div slot="default" v-else>
                    <span @click="$emit('clearHistory')">全部删除</span>
                    &nbsp;
                    <span @click="isDelete = false">完成</span>
                </div>
            </van-cell>
            <van-cell :title="history" v-for="(history, index) in historyList" :key="index" @click="historyItemClick(history, index)">
                <van-icon name="close" v-if="isDelete"/>
            </van-cell>
		</van-cell-group>
	</div>
</template>

<script>

	export default {
		name: "search_history",
        props: {
            searchHistory: {
                type: Array,
                required: true
            }
        },
        watch: {
            searchHistory: {
                handler(val) {
                    this.historyList = val
                    
                },
                immediate: true
            }
        },
        data() {
            return {
                isDelete: false,
                historyList: []
            }
        },
        methods: {
            historyItemClick(history, index) {
                if (this.isDelete) {
                    this.historyList.splice(index, 1)
                } else {
                    this.$emit('search', history)
                }
            }
        }

	};
</script>

<style>
</style>