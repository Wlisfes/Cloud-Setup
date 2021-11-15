import request from '@/utils/request'
import * as types from '@/types'

/**音视频列表-客户端**/
export function nodeClientClouds(params: types.NodeClientCloudsParameter) {
	return request<types.NodeClientCloudsResponse>({
		url: `/api/cloud/client/list-node`,
		method: 'GET',
		params
	})
}
