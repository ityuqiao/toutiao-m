import request from "@/utils/request.js";

export const getSearchSuggestions = (q) => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })
}

export const getArticals = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params
    })
}