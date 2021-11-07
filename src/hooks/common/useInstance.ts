import { toRefs } from 'vue'
import { useSource } from '@/hooks/common/useState'

export function useInstance<T extends object>(nodeFn: Function, props?: T) {
	const instance = useSource(props)

	const initSource = async () => {
		try {
			const { code, data } = await nodeFn({
				page: instance.page,
				size: instance.size
			})
			if (code === 200) {
				instance.dataSource = data.list
				instance.total = data.total
			}
			return data
		} catch (e) {
			return e
		}
	}

	return { ...toRefs(instance) }
}
