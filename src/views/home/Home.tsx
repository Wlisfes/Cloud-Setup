import { defineComponent, ref } from 'vue'
import { Table, Image, Spin, Tag } from 'ant-design-vue'
import { useClientClouds } from '@/hooks/api/cloud.hooks'

export default defineComponent({
	name: 'Home',
	setup() {
		const columns = ref([
			{ title: '媒体封面', align: 'center', width: 125, slots: { customRender: 'cover' } },
			{ title: '媒体标题', width: '18%', dataIndex: 'title' },
			{ title: '媒体类型', align: 'center', width: '7.5%', slots: { customRender: 'type' } },
			{ title: '媒体描述', dataIndex: 'description' },
			{ title: '排序号', dataIndex: 'order', align: 'center', width: '7.5%' },
			{ title: '媒体状态', align: 'center', width: '7.5%', slots: { customRender: 'status' } },
			{ title: '创建时间', dataIndex: 'createTime', align: 'center', width: '13.5%' },
			{ title: '操作', align: 'center', width: '10%', slots: { customRender: 'action' } }
		])
		const { dataSource, loading, page, size, total, initChnage } = useClientClouds()

		return () => {
			return (
				<Spin size="large" spinning={loading.value}>
					<Table
						rowKey="id"
						columns={columns.value}
						dataSource={dataSource.value}
						scroll={{ x: 1080 }}
						pagination={{
							current: page.value,
							pageSize: size.value,
							total: total.value,
							onChange: (page, size) => initChnage({ page, size })
						}}
						v-slots={{
							cover: (props: any) => {
								return (
									<Image
										src={`${props.record.cover}?x-oss-process=style/resize`}
										style={{ width: '96px', height: '54px', cursor: 'pointer' }}
									></Image>
								)
							},
							type: (props: any) => {
								return props.record.type === 1 ? (
									<Tag color="red">单集媒体</Tag>
								) : (
									<Tag color="cyan">多集媒体</Tag>
								)
							},
							status: (props: any) => {
								return props.record.type === 1 ? (
									<Tag style={{ margin: 0 }} color="green">
										启用
									</Tag>
								) : (
									<Tag style={{ margin: 0 }} color="pink">
										禁用
									</Tag>
								)
							}
						}}
					></Table>
				</Spin>
			)
		}
	}
})
