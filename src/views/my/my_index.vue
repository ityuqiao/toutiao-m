<template>
  <div class="my-container">
    <div class="head-login" v-if="user">
      <div class="user-editor">
        <div class="left">
          <van-image class="imgHead" fit="cover" :src="userInfo.photo" round />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" round class="btn-editor" to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="user-stats">
        <div class="toutiao">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="guanzhu">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="fensi">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="huozan">
          <span>{{ userInfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <div class="head not-login" @click="$router.push('login')" v-else>
      <div class="mobile-btn">
        <img src="~@/assets/mobile.png">
        <span>登录/注册</span>
      </div>
    </div>

    <van-grid :column-num="2" clickable>
      <van-grid-item text="收藏">
        <i slot="icon" class="iconfont icon-shoucang"></i>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class="iconfont icon-lishi"></i>
      </van-grid-item>
    </van-grid>

    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小爱同学" is-link class="ai" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="退出登录" class="logOut" clickable v-if="user" @click="onLogOut" />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { userLogin } from '@/api/user.js'
import Vue from 'vue';
import { Image as VanImage, Button, Grid, GridItem, Cell, CellGroup, Dialog, Toast } from 'vant';

Vue.use(VanImage);
Vue.use(Button);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(Toast);

export default {
  name: 'my_vue',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.userLoadInfo()
  },
  methods: {
    async userLoadInfo() {
      try {
        const { data } = await userLogin()
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取用户信息失败')
      }
    },
    onLogOut() {
      Dialog.confirm({
        title: '确认退出吗？',
      })
        .then(() => {
          // on confirm
          this.$store.commit('getToken', null)
        })
        .catch(() => {

        });
    }
  }
}
</script>

<style scoped lang="less">
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 361px;
  background: url("~@/assets/banner.png");

  .mobile-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
      width: 132px;
      margin-bottom: 15px;
    }

    span {
      font-size: 28px;
      color: #fff;
    }
  }
}

.head-login {
  height: 361px;
  background: url("~@/assets/banner.png");

  .user-editor {
    height: 231px;
    padding: 70px 32px;
    display: flex;
    justify-content: space-between;
    align-content: center;

    .left {
      span {
        color: #fff;
        font-size: 30px;

      }

      .imgHead {
        border: 2px solid #fff;
        width: 132px;
        height: 132px;
        vertical-align: middle;
        margin-right: 15px;
      }
    }

    .right {
      .btn-editor {
        height: 33px;
        width: 125px;
        padding: 0;
        font-size: 20px;
        color: #666;
      }
    }
  }

  .user-stats {
    height: 130px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      span:first-child {
        font-size: 36px;
      }

      span:last-child {
        font-size: 23px;
      }
    }

  }
}

.icon-shoucang {
  font-size: 45px;
  color: #eb5253;
}

.icon-lishi {
  font-size: 45px;
  color: #ff9d1d;
}

.logOut {
  height: 104px;
  text-align: center;
  margin-top: 9px;

  .van-cell__title {
    line-height: 70px;
    color: #d86262;
  }
}
</style>