<template>
    <div class="login-container">
        <van-nav-bar class="page-nav-bar" title="登录" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-form @submit="onSubmit">
            <van-field v-model="user.mobile" name="mobile" ref="Mobile" placeholder="请输入手机号" type="number"
                :rules="user_pattern.mobile">
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>
            <van-field v-model="user.code" name="验证码" placeholder="请输入验证码" type="number" :rules="user_pattern.code">
                <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
                <template #button>
                    <van-count-down @finish="isCountDownShow = false" :time="time" format="ss秒后可重新发送"
                        v-if="isCountDownShow" />
                    <van-button v-else class="send-btn" round size="small" type="primary" @click="sendCode"
                        native-type="button">发送验证码</van-button>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button class="btn-login" block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Form, Field, Button, Toast, CountDown } from 'vant'
import { login, sendSms } from '@/api/user'

Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Toast)
Vue.use(CountDown)

export default {
    name: 'LoginPage',
    components: {},
    props: {},
    data() {
        return {
            time: 5000,
            isCountDownShow: false,
            user: {
                mobile: '',
                code: ''
            },
            user_pattern: {
                mobile: [{
                    required: true,
                    message: () => {
                        return this.mobileToast1()
                    }
                },
                {
                    pattern: /^1[3456789]\d{9}$/,
                    message: () => {
                        return this.mobileToast2()
                    }
                }],
                code: [{
                    required: true,
                    message: () => {
                        return this.codeToast1()
                    }
                },
                {
                    pattern: /^\d{6}$/,
                    message: () => {
                        return this.codeToast2()
                    }

                }]
            }
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        async onSubmit(values) {
            const user = this.user

            const toast1 = this.$toast.loading({
                message: '登录中...',
                forbidClick: true,
                duration: 0
            })

            try {
                const res = await login(user)
                this.$toast.success('登录成功')
                this.$store.commit('getToken', res.data.data)
                this.$router.back()
                // console.log(res)
                // console.log(this.$store.state.user);
            } catch (error) {
                if (error.request.status === 400) {
                    Toast.fail('手机号或验证码错误')
                    console.log(error);
                } else {
                    Toast.fail('登录失败，请稍后重试')
                    console.log(error);
                }
            }
        },
        mobileToast1() {
            this.$toast('请输入手机号')
        },
        mobileToast2() {
            this.$toast('手机号格式错误')
        },
        codeToast1() {
            this.$toast('请输入验证码')
        },
        codeToast2() {
            this.$toast('验证码格式错误')
        },
        async sendCode() {
            if (!/^1[3456789]\d{9}$/.test(this.user.mobile)) {
                return this.mobileToast2()
            }
            this.isCountDownShow = true

            try {
                await sendSms(this.user.mobile)
                this.$toast('发送成功')
            } catch (error) {
                if (error.response.status === 429) {
                    this.isCountDownShow = false
                    this.$toast('发送太频繁，请稍后重试')
                } else {
                    this.$toast('发送失败，请稍后重试')
                }
            }
        },
    }
}
</script>

<style scoped lang="less">
.login-container {
    .iconfont {
        font-size: 37px;
    }

    .send-btn {
        width: 152px;
        height: 46px;
        background-color: #ededed;
        border: none;
        color: #666;
        font-size: 22px;
    }

    .btn-login {
        background-color: #6db4fb;
        border: none;
        border-radius: 10px;
        margin-top: 50px;
    }
}
</style>
