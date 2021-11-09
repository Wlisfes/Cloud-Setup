import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { getCookie, setCookie } from '@/utils/cookie'

export const LOCALE_KEY = 'cloud-locale-key'
export const messages = {
	zh: {
		...zhCN,
		name: '妖雨纯',
		switch: '切换'
	},
	en: {
		...enUS,
		name: 'Yao Yuchun',
		switch: 'Switch'
	}
}

const i18n = createI18n({ locale: getCookie(LOCALE_KEY) || 'zh', messages })

export function useLocale() {
	const locale = computed(() => i18n.global.locale)
	const Locale = computed(() => {
		switch (i18n.global.locale) {
			case 'zh':
				return messages.zh
			case 'en':
				return messages.en
			default:
				return messages.zh
		}
	})

	const setLocale = async (command: string) => {
		i18n.global.locale = command
		setCookie(LOCALE_KEY, command)
		return command
	}

	return { locale, Locale, setLocale }
}

export default i18n
