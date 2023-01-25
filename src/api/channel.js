import request from "@/utils/request.js";

export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}

export const addUserChannels = (channel) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}

export const deleteUserChannels = (channelId) => {
    request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelId}`
    })
}
