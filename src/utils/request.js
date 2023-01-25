import axios from "axios";
import store from '@/store/index.js'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const {user} = store.state
    if (user && user.token)
    config.headers.Authorization = `Bearer ${user.token}`
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

export default request