import { defineComponent } from 'vue'
import { useClientClouds } from '@/hooks/api/cloud.hooks'

export default defineComponent({
	name: 'Home',
	setup() {
		const { dataSource, loading } = useClientClouds()

		return () => {
			return (
				<el-table v-loading={loading.value} data={dataSource.value} stripe>
					<el-table-column
						prop="cover"
						label="封面"
						v-slots={{
							default: (scope: any) => (
								<el-image
									src={scope.row.cover}
									style={{ width: '96px', height: '54px', display: 'block' }}
								></el-image>
							)
						}}
					></el-table-column>
				</el-table>
			)
		}
	}
})
