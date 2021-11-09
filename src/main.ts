import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import App from '@/App'
import router from '@/router'
import store from '@/store'
import i18n from '@/lang'

async function bootstrap() {
	const app = createApp(App)

	//Register Antd
	app.use(Antd)

	//Register i18n
	app.use(i18n)

	//Mount store
	app.use(store)

	//Mount router
	app.use(router)

	app.mount('#app')
}

bootstrap()
