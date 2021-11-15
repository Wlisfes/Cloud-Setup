import { nodeClientClouds } from '@/api/cloud.service'
import { useSource } from '@/hooks/common/useSource'
import { NodeCloud } from '@/types'

/**音视频列表-客户端**/
export function useClientClouds(immediate?: boolean) {
	return useSource<NodeCloud, { title: string }>({
		props: { title: '' },
		immediate,
		init: ({ page, size, title }) => {
			return nodeClientClouds({ page, size, title })
		}
	})
}
