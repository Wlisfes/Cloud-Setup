<template>
	<Spin size="large" :spinning="loading">
		<Table
			rowKey="id"
			size="small"
			:dataSource="dataSource"
			:scroll="{ x: 1080 }"
			:pagination="{
				size: 'large',
				current: page,
				pageSize: size,
				total: total,
				onChange: (page, size) => initChnage({ page, size })
			}"
		>
			<Table.Column title="媒体封面" align="center" width="125">
				<template #default="{ record }">
					<Image
						:src="`${record?.cover}?x-oss-process=style/resize`"
						:style="{ width: '96px', height: '54px', cursor: 'pointer' }"
					></Image>
				</template>
			</Table.Column>
			<Table.Column title="媒体标题" width="18%" dataIndex="title" />
			<Table.Column title="媒体类型" align="center" width="7.5%"> </Table.Column>
			<Table.Column title="媒体描述" dataIndex="description" />
			<Table.Column title="排序号" align="center" width="7.5%" dataIndex="order" />
			<Table.Column title="媒体状态" align="center" width="7.5%"></Table.Column>
			<Table.Column title="创建时间" align="center" width="13.5%" dataIndex="createTime" />
			<Table.Column title="操作" align="center" width="10%" />
		</Table>
	</Spin>
</template>

<script lang="ts" setup>
import { defineComponent, PropType } from 'vue'
import { Table, Image, Spin, Tag, Button } from 'ant-design-vue'
import { useClientClouds } from '@/hooks/api/cloud.hooks'

const { dataSource, loading, page, size, total, initChnage } = useClientClouds(true)
</script>
