<template>
    <div class="artical-item">
        <van-cell :to="{
            name: 'artical',
            params: {
                articalId: artical.art_id
            }
        }">
            <div slot="title" class="title van-multi-ellipsis--l2">{{ artical.title }}</div>
            <div slot="label" class="label">
                <div class="imgs" v-if="artical.cover.type === 3">
                    <van-image :src="img" v-for="(img, index) in artical.cover.images" :key="index" fit="cover"
                        class="Img" />
                </div>
                <div class="spans">
                    <span>{{ artical.aut_name }}</span>
                    <span>{{ artical.comm_count }}评论</span>
                    <span>{{ artical.pubdate | relativeTime }}</span>
                </div>

            </div>
            <van-image :src="artical.cover.images[0]" slot="default" v-if="artical.cover.type === 1" fit="cover"
                class="right-img" />
        </van-cell>
    </div>
</template>

<script>

import '@/utils/dayjs'
export default {
    name: 'artical_item',
    props: {
        artical: {
            type: Object,
            required: true
        }
    }
}

</script>

<style scoped lang="less">
.artical-item {
    margin-bottom: 4px;
    .title {
        font-size: 32px;
        color: #3a3a3a;
        margin-bottom: 5px;
    }

    .van-cell__value {
        flex: unset;
    }

    .right-img {
        width: 232px;
        height: 146px;
    }

    .imgs {
        display: flex;

        .Img {
            flex: 1;
            height: 146px;
            &:not(:last-child) {
                margin-right: 4px;
            }
        }
    }

    .label {
        .spans {
            padding: 20px 0 20px;
            span {
                font-size: 23px;
                color: #999;
                margin-right: 25px;
            }   
        }

    }
}
</style>