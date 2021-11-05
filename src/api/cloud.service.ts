import { reactive, toRefs } from 'vue'
import request from '@/utils/request'

/**音视频列表-客户端**/
export function nodeClientClouds(params: { page: number; size: number }) {
	return request({
		url: `/api/cloud/client/list-node`,
		method: 'GET',
		params
	})
}

export function useClientClouds(node?: { page?: number; size?: number; immediate?: boolean }) {
	const state = reactive({
		page: node?.page || 1,
		size: node?.size || 10,
		total: 0,
		loading: true,
		refresh: false,
		dataSource: []
	})

	const initSource = async () => {
		try {
			const { code, data } = await nodeClientClouds({ page: state.page, size: state.size })
			if (code === 200) {
				state.dataSource = data.list
				state.total = data.total
			}
			return data
		} catch (e) {
			return e
		}
	}

	const initRefresh = () => {
		state.page = 1
		state.size = 10
		state.loading = true
		state.refresh = true
		initSource().finally(() => {
			state.loading = false
			state.refresh = false
		})
	}

	const initMore = () => {
		state.page++
		state.size = 10
		state.loading = true
		initSource().finally(() => {
			state.loading = false
		})
	}

	node?.immediate && initSource().finally(() => {
        state.loading = false
    })

	return { ...toRefs(state), initSource, initRefresh, initMore }
}
