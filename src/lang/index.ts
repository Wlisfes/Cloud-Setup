import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import zhCnLocale from 'element-plus/es/locale/lang/zh-cn'
import EnLocale from 'element-plus/es/locale/lang/en'
import { getCookie, setCookie } from '@/utils/cookie'

export const LOCALE_KEY = 'cloud-locale-key'
export const messages = {
	zh: {
		...zhCnLocale, //element语言包
		name: '妖雨纯', //其他需要的配置
		switch: '切换'
	},
	en: {
		...EnLocale,
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
