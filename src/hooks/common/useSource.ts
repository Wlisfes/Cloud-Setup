import { toRefs, reactive } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity/dist/reactivity'

export type InitSource<T> = {
	page: number
	size: number
	total: number
	loading: boolean
	refresh: boolean
	dataSource: Array<T>
}

export function initSource<T extends object, R = any>(props?: T): UnwrapNestedRefs<InitSource<R> & T> {
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

export function useSource<T extends object>(node: any, props?: T) {
	const instance = initSource(props)

	const initNode = () => {}

	return { ...toRefs(instance), initNode }
}
