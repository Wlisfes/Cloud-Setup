import { createApp } from 'vue'
import Element from 'element-plus'
import 'element-plus/dist/index.css'

import App from '@/App'
import router from '@/router'
import store from '@/store'
import i18n from '@/lang'

async function bootstrap() {
	const app = createApp(App)

	//Register Element
	app.use(Element, { size: 'small', zIndex: 3000 })

	//Register i18n
	app.use(i18n)

	//Mount store
	app.use(store)

	//Mount router
	app.use(router)

	app.mount('#app')
}

bootstrap()
