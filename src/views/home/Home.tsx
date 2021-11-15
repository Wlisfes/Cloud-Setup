import { defineComponent, PropType } from 'vue'
import { Table, Image, Spin, Tag } from 'ant-design-vue'
import { useClientClouds } from '@/hooks/api/cloud.hooks'
import { NodeCloud } from '@/types'

const CloudProps = {
	node: { type: Object as PropType<NodeCloud | null>, default: null }
}

const CreateElement = (text: string, color: string) => (
	<Tag color={color} style={{ margin: 0 }}>
		{text}
	</Tag>
)

const NodeCover = defineComponent({
	name: 'NodeCover',
	props: CloudProps,
	setup(props) {
		return () => (
			<Image
				src={`${props.node?.cover}?x-oss-process=style/resize`}
				style={{ width: '96px', height: '54px', cursor: 'pointer' }}
			></Image>
		)
	}
})

const NodeType = defineComponent({
	name: 'NodeType',
	props: CloudProps,
	setup(props) {
		return () => {
			return props.node?.type === 1 ? CreateElement('单集媒体', 'red') : CreateElement('多集媒体', 'cyan')
		}
	}
})

const NodeStatus = defineComponent({
	name: 'NodeStatus',
	props: CloudProps,
	setup(props) {
		return () => {
			return props.node?.type === 1 ? CreateElement('启用', 'green') : CreateElement('禁用', 'pink')
		}
	}
})

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
							size: 'large',
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
							customRender={props => <NodeCover node={props.record} />}
						/>
						<Table.Column title="媒体标题" width="18%" dataIndex="title" />
						<Table.Column
							title="媒体类型"
							align="center"
							width="7.5%"
							customRender={props => <NodeType node={props.record} />}
						/>
						<Table.Column title="媒体描述" dataIndex="description" />
						<Table.Column title="排序号" align="center" width="7.5%" dataIndex="order" />
						<Table.Column
							title="媒体状态"
							align="center"
							width="7.5%"
							customRender={props => <NodeStatus node={props.record} />}
						/>
						<Table.Column title="创建时间" align="center" width="13.5%" dataIndex="createTime" />
						<Table.Column title="操作" align="center" width="10%" />
					</Table>
				</Spin>
			)
		}
	}
})
