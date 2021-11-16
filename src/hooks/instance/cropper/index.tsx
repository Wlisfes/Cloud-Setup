import { defineComponent, reactive } from 'vue'
import { Modal, Spin, Button, Upload } from 'ant-design-vue'
import { useComponent } from '@/hooks/utils/useComponent'

const NodeCropperComponent = defineComponent({
	name: 'NodeCropperComponent',
	setup(props) {
		const state = reactive({
			visible: true,
			loading: false
		})

		return () => {
			return <Modal title="图片上传" v-model={state.visible} width={880} destroyOnClose></Modal>
		}
	}
})

export function init() {
	return useComponent(NodeCropperComponent)
}
