import { createApp, Component } from 'vue'

export function useComponent(RootComponent: Component) {
	const app = createApp(RootComponent)
	const root = document.createElement('div')

	document.body.appendChild(root)

	return {
		instance: app.mount(root),
		unmount() {
			app.unmount()
			document.body.removeChild(root)
		}
	}
}
