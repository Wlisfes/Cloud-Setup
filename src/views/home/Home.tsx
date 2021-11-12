import { defineComponent } from 'vue'
import { Table, Image, Spin, Tag } from 'ant-design-vue'
import { useClientClouds } from '@/hooks/api/cloud.hooks'

export default defineComponent({
	name: 'Home',
	setup() {
		const { dataSource, loading, page, size, total, initChnage } = useClientClouds(true)

		return () => {
			return (
				<Spin size="large" spinning={loading.value}>
					<Table
						rowKey="id"
						size="small"
						dataSource={dataSource.value}
						scroll={{ x: 1080 }}
						pagination={{
							current: page.value,
							pageSize: size.value,
							total: total.value,
							onChange: (page, size) => initChnage({ page, size })
						}}
					>
						<Table.Column
							title="媒体封面"
							align="center"
							width={125}
							customRender={props => (
								<Image
									src={`${props.record.cover}?x-oss-process=style/resize`}
									style={{ width: '96px', height: '54px', cursor: 'pointer' }}
								></Image>
							)}
						/>
						<Table.Column title="媒体标题" width="18%" dataIndex="title" />
						<Table.Column
							title="媒体类型"
							align="center"
							width="7.5%"
							customRender={props => {
								return props.record.type === 1 ? (
									<Tag color="red" style={{ margin: 0 }}>
										单集媒体
									</Tag>
								) : (
									<Tag color="cyan" style={{ margin: 0 }}>
										多集媒体
									</Tag>
								)
							}}
						/>
						<Table.Column title="媒体描述" dataIndex="description" />
						<Table.Column title="排序号" align="center" width="7.5%" dataIndex="order" />
						<Table.Column
							title="媒体状态"
							align="center"
							width="7.5%"
							customRender={props => {
								return props.record.type === 1 ? (
									<Tag style={{ margin: 0 }} color="green">
										启用
									</Tag>
								) : (
									<Tag style={{ margin: 0 }} color="pink">
										禁用
									</Tag>
								)
							}}
						/>
						<Table.Column title="创建时间" align="center" width="13.5%" dataIndex="createTime" />
						<Table.Column title="操作" align="center" width="10%" />
					</Table>
				</Spin>
			)
		}
	}
})
