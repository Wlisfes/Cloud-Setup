import { defineComponent } from 'vue'
import { useClientClouds } from '@/api/cloud.service'

export default defineComponent({
	name: 'Home',
	setup() {
		const cloud = useClientClouds({ immediate: true })

		return () => {
			return (
				<el-table loading={cloud.loading.value} data={cloud.dataSource.value} stripe>
					<el-table-column
						prop="cover"
						label="封面"
						v-slots={{
							default: (scope: any) => {
								return (
									<el-image
										src={scope.row.cover}
										style={{ width: '96px', height: '54px', display: 'block' }}
									></el-image>
								)
							}
						}}
					></el-table-column>
				</el-table>
			)
		}
	}
})
