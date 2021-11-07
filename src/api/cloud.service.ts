import request from '@/utils/request'

/**音视频列表-客户端**/
export function nodeClientClouds(params: { page: number; size: number }) {
	return request({
		url: `/api/cloud/client/list-node`,
		method: 'GET',
		params
	})
}
