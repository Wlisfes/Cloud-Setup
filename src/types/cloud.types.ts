import { NodeDate } from '@/types'

export type NodeCloud = NodeDate & {
	id: number
	type: number
	title: string
	key: string | null
	name: string | null
	path: string | null
	cover: string
	status: number
	order: number
	size: number
	browse: number
	description: string | null
	parent: NodeCloud | null
	children: NodeCloud[]
	source: any[]
	user: any
}

export type CloudParameter = NodeCloud & {
	total: number
	page: number
	size: number
	message: string
}

/**
 * 创建音视频
 */
export type NodeCreateCloudParameter = Pick<CloudParameter, 'type' | 'title' | 'cover' | 'status'> &
	Partial<Pick<CloudParameter, 'key' | 'name' | 'path' | 'order' | 'description' | 'size'>> & {
		parent?: number | undefined | null
		source?: number[]
	}
export type NodeCreateCloudResponse = Pick<CloudParameter, 'message'>

/**
 * 修改音视频媒体
 */
export type NodeUpdateCloudParameter = Pick<CloudParameter, 'id' | 'type' | 'title' | 'cover' | 'status'> &
	Partial<Pick<CloudParameter, 'key' | 'name' | 'path' | 'order' | 'description' | 'size'>> & {
		parent?: number | undefined | null
		source?: number[]
	}
export type NodeUpdateCloudResponse = Pick<CloudParameter, 'message'>

/**
 * 切换音视频媒体状态
 */
export type NodeCloudCutoverParameter = Pick<CloudParameter, 'id'>
export type NodeCloudCutoverResponse = Pick<CloudParameter, 'message'>

/**
 * 音视频信息
 */
export type NodeCloudParameter = Pick<CloudParameter, 'id'>
export type NodeCloudResponse = NodeCloud

/**
 * 音视频列表
 */
export type NodeCloudsParameter = Pick<CloudParameter, 'page' | 'size'> &
	Partial<Pick<CloudParameter, 'status' | 'type' | 'title'>>
export type NodeCloudsResponse = Pick<CloudParameter, 'page' | 'size' | 'total'> & {
	list: NodeCloud[]
}

/**
 * 音视频列表-客户端
 */
export type NodeClientCloudsParameter = Pick<CloudParameter, 'page' | 'size'> &
	Partial<Pick<CloudParameter, 'type' | 'title'>>
export type NodeClientCloudsResponse = Pick<CloudParameter, 'page' | 'size' | 'total'> & {
	list: NodeCloud[]
}

/**
 * 多集媒体目录列表
 */
export type NodeMultipleCloudsParameter = Pick<CloudParameter, 'page' | 'size'>
export type NodeMultipleCloudsResponse = Pick<CloudParameter, 'page' | 'size' | 'total'> & {
	list: NodeCloud[]
}

/**
 * 每日推荐
 */
export type NodeRcmdCloudResponse = Pick<CloudParameter, 'page' | 'size' | 'total'> & {
	list: NodeCloud[]
}

/**
 * 删除音视频媒体
 */
export type NodeDeleteCloudParameter = Pick<CloudParameter, 'id'>
export type NodeDeleteCloudResponse = Pick<CloudParameter, 'message'>
