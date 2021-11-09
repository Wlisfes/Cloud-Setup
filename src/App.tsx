import { defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { RouterView } from 'vue-router'
import { useLocale } from '@/lang'

export default defineComponent({
	name: 'App',
	setup() {
		const { Locale } = useLocale()

		return () => {
			return (
				<ConfigProvider locale={Locale.value}>
					<RouterView></RouterView>
				</ConfigProvider>
			)
		}
	}
})
