import { reactive } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity/dist/reactivity'

/**列表类型**/
export interface InitSource<DATA> {
	page: number
	size: number
	total: number
	loading: boolean
	refresh: boolean
	dataSource: Array<DATA>
}

/**
 * 创建列表实例
 * @param Props 扩展字段类型
 * @param DATA dataSource列表类型
 * @returns InitSource<DATA> & Props 集合
 */
export function initSource<DATA, Props>(props?: Props): UnwrapNestedRefs<InitSource<DATA> & Props> {
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
