import { toRefs, reactive } from 'vue'
import type { UnwrapNestedRefs } from '@vue/reactivity/dist/reactivity'
import type { NResponse } from '@/utils/request'

/**列表实例类型**/
export interface InitSource<DATA> {
	page: number
	size: number
	total: number
	loading: boolean
	refresh: boolean
	dataSource: Array<DATA>
}

export interface UseSourceProps<DATA, Props> {
	/**扩展字段类型**/
	props?: Props

	/**是否立即执行**/
	immediate?: boolean

	/**接口函数**/
	init: (instance: UnwrapNestedRefs<InitSource<DATA> & Props>) => Promise<
		NResponse<{
			page: number
			size: number
			total: number
			list: Array<DATA>
		}>
	>

	/**接口执行失败函数**/
	fail?: (e: unknown) => void

	/**接口执行成功函数**/
	success?: () => void
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

/**
 * 创建列表接口实例
 * @param UseSourceProps 必填参数
 * @param Props 扩展字段类型
 * @param DATA dataSource列表类型
 * @returns useSource实例
 */
export function useSource<DATA, Props>(node: UseSourceProps<DATA, Props>) {
	const instance = initSource<DATA, Props>(node.props)

	/**初始化**/
	const initNode = async (concat?: boolean) => {
		try {
			instance.loading = true
			const { code, data } = await node.init(instance)
			if (code === 200) {
				if (concat) {
					instance.dataSource = instance.dataSource.concat((data.list || []) as UnwrapNestedRefs<DATA[]>)
				} else {
					instance.dataSource = (data.list || []) as UnwrapNestedRefs<DATA[]>
				}
				instance.total = data.total || 0
				instance.loading = false
			}
			return data
		} catch (e) {
			instance.loading = false
			node.fail?.(e)
			return e
		}
	}

	/**刷新**/
	const initRefresh = async () => {
		instance.page = 1
		instance.size = 10
		instance.refresh = true
		return await initNode().finally(() => {
			instance.refresh = false
		})
	}

	/**分页加载**/
	const initChnage = async (props: { page: number; size: number }) => {
		instance.page = props.page
		instance.size = props.size
		return await initNode()
	}

	/**加载更多**/
	const initMore = async () => {
		instance.page++
		instance.size = 10
		return await initNode(true)
	}

	/**是否立即执行**/
	node.immediate && initNode()

	return { ...toRefs(instance), initNode, initRefresh, initChnage, initMore }
}
