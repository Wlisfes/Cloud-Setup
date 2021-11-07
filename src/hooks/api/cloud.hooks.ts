import { toRefs } from 'vue'
import { nodeClientClouds } from '@/api/cloud.service'
// import { useInstance } from '@/hooks/common/instance'
import { useSource } from '@/hooks/common/useState'

export function useClientClouds() {
	const node = useSource()

	// const instance = useInstance(nodeClientClouds)
	// const initSource = async () => {
	// 	try {
	// 		const { code, data } = await nodeClientClouds({
	// 			page: instance.page,
	// 			size: instance.size
	// 		})
	// 		if (code === 200) {
	// 			instance.dataSource = data.list
	// 			instance.total = data.total
	// 		}
	// 		return data
	// 	} catch (e) {
	// 		return e
	// 	}
	// }
	// const initRefresh = () => {
	// 	instance.page = 1
	// 	instance.size = 10
	// 	instance.loading = true
	// 	instance.refresh = true
	// 	initSource().finally(() => {
	// 		instance.loading = false
	// 		instance.refresh = false
	// 	})
	// }
	// const initMore = () => {
	// 	instance.page++
	// 	instance.size = 10
	// 	instance.loading = true
	// 	initSource().finally(() => {
	// 		instance.loading = false
	// 	})
	// }
	// if (node?.immediate) {
	// 	initSource().finally(() => {
	// 		instance.loading = false
	// 	})
	// }
	// return { ...toRefs(instance), initSource, initRefresh, initMore }
}
