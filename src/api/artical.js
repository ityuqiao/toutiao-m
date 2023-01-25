import request from "@/utils/request";

export const getArticals = (params) => {
    return request({
        method: 'GET',
        url: 'v1_0/articles',
        params
    })
}
export const getArticalById = (articalId) => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${articalId}`
    })
}

export const addFollowed = target => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        },   
    })
}
export const deleteFollowed = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`,
    })
}

export const addCollect = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data: {
            target
        }
    })
}

export const deleteCollect = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`,
    })
}

export const addLiked = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/likings',
        data: {
            target
        }
    })
}

export const deleteLiked = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`,
    })
}