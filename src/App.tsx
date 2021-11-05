import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useLocale } from '@/lang'

export default defineComponent({
	name: 'App',
	setup() {
		const { Locale } = useLocale()

		return () => {
			return (
				<el-config-provider locale={Locale.value}>
					<RouterView></RouterView>
				</el-config-provider>
			)
		}
	}
})
