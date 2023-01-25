import request from '../utils/request'
// import store from '@/store/index.js'

export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
export const sendSms = data => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${data}`
    })
}

export const userLogin = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // } 
    })
}

export const userChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}

export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile'
    })
}

export const updataUserProfile = (data) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}

export const updataUserPhoto = (data) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
    })
}