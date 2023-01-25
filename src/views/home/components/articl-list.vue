<template>
    <div class="artical-list">
        <van-pull-refresh v-model="isLoading" @refresh="onLoadRefresh" :success-text="successText">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error"
                error-text="请求失败，点击重新加载">
                <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.title" /> -->
                <articalItem v-for="(item, index) in list" :key="index" :artical="item"></articalItem>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import Vue from 'vue';
import { List, PullRefresh } from 'vant';
import { getArticals } from '@/api/artical'
import articalItem from '@/components/artical-item/artical-item.vue';

Vue.use(List)
Vue.use(PullRefresh)

export default {
    props: {
        channel: {
            type: Object,
            required: true
        }
    },
    components: {
        articalItem
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            artTimestamp: null,
            error: false,
            isLoading: false,
            successText: ''
        }
    },
    methods: {

        async onLoad() {
            try {
                const { data } = await getArticals({
                    channel_id: this.channel.id,
                    timestamp: this.artTimestamp || new Date().getTime(),
                })
                this.list.push(...data.data.results)
                // console.log(data.data)   
                this.loading = false
                if (Math.random() > 0.8) {
                    JSON.parse('ijoiwdu')
                }
                if (data.data.results.length) {
                    this.artTimestamp = Number(data.data.pre_timestamp)
                    // console.log(Number(data.data.pre_timestamp));
                } else {
                    this.finished = true
                }
            } catch (error) {
                // console.log('获取文章列表失败')
                this.error = true
            }
        },
        // onLoad() {
        //     // 异步更新数据
        //     // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        //     setTimeout(() => {
        //         for (let i = 0; i < 10; i++) {
        //             this.list.push(this.list.length + 1);
        //         }

        //         // 加载状态结束
        //         this.loading = false;

        //         // 数据全部加载完成
        //         if (this.list.length >= 40) {
        //             this.finished = true;
        //         }
        //     }, 1000);
        // },
        async onLoadRefresh() {
            try {
                const { data } = await getArticals({
                    channel_id: this.channel.id,
                    timestamp: new Date().getTime(),
                })
                if (Math.random() > 0.8) {
                    JSON.parse('ijoiwdu')
                }
                this.list.unshift(...data.data.results)
                this.isLoading = false
                this.successText = '刷新成功'
                this.$toast('刷新成功')
            } catch (error) {
                // console.log('请求失败');
                this.isLoading = false
                this.successText = '刷新失败'
            }
        }
    },

}
</script>

<style scoped lang="less">
.artical-list {
    padding-bottom: 100px;
    height: 79vh;
    overflow-y: auto;
}
</style>