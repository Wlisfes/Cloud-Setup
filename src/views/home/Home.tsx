import { defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/lang'

export default defineComponent({
	name: 'Home',
	setup() {
		const node = reactive({
			name: '',
			picker: ''
		})
		const { t } = useI18n()
		const { setLocale, locale } = useLocale()

		return () => {
			return (
				<div>
					{locale.value}
					<el-button type="primary">{t('name')}</el-button>
					<el-dropdown
						onCommand={setLocale}
						v-slots={{
							dropdown: () => (
								<el-dropdown-menu>
									<el-dropdown-item command="zh">zh</el-dropdown-item>
									<el-dropdown-item command="en">en</el-dropdown-item>
								</el-dropdown-menu>
							)
						}}
					>
						<el-button type="primary">{t('switch')}</el-button>
					</el-dropdown>
					<div>{node.name}</div>
					<el-color-picker v-model={node.picker} />
					<el-input v-model={[node.name, ['value']]} placeholder="Please input" />
				</div>
			)
		}
	}
})
