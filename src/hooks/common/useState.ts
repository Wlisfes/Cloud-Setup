import { reactive } from 'vue'

export function useSource<T extends object>(props?: T) {
	const instance = reactive(
		Object.assign(
			{
				page: 1,
				size: 10,
				total: 0,
				loading: true,
				refresh: false,
				dataSource: []
			},
			props
		)
	)

	return instance
}
