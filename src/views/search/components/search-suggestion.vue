<template>
	<div class="search-suggestion">
		<van-cell-group>
			<van-cell icon="search" v-for="(text, index) in suggestionsList" :key="index" @click="sendText(text)">
                <div slot="title" v-html="heightlight(text)"></div>
            </van-cell>
		</van-cell-group>
	</div>
</template>
  
  <script>
  import { getSearchSuggestions } from '@/api/search.js'
  import { debounce } from 'lodash'
	export default {
		name: "search_suggestion",
        data() {
            return {
                suggestionsList: []
            }
        },
        props: {
            searchText: {
                required: true,
                type: String
            }
        },
        watch: {
            searchText: {
                // handler(value) {
                //     this.loadSuggestions(value)
                // },
                handler: debounce(function(value) {
                    this.loadSuggestions(value)
                }, 400),
                immediate: true
            }
        },
        methods: {
           async loadSuggestions(value) {
            try {
                const { data } = await getSearchSuggestions(value)
                this.suggestionsList = data.data.options
            } catch (error) {
                this.$toast('获取数据失败')
            }
            },
            heightlight(text) {
                const reg = new RegExp(this.searchText, 'gi')
                let htmlStr = `<span style="color: red;">${this.searchText}</span>`
                try {
                return text.replace(reg, htmlStr)
                } catch (error) {
                    return text
                }
            },
            sendText(text) {
                this.$emit('searchSuggestion', text)
            }
        }
	};
</script>
  
  <style>
</style>