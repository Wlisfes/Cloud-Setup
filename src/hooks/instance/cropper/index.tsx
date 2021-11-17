import { defineComponent, reactive, ref } from 'vue'
import { Modal, Spin, Button, Upload } from 'ant-design-vue'
import { useComponent } from '@/hooks/utils/useComponent'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

const NodeCropper = defineComponent({
	name: 'NodeCropper',
	emits: ['close', 'submit'],
	props: {
		visible: { type: Boolean },
		loading: { type: Boolean }
	},
	setup(props, { emit }) {
		return () => {
			return (
				<Modal
					title="图片上传"
					v-model={[props.visible, 'visible']}
					width={880}
					destroyOnClose
					v-slots={{
						footer: () => (
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Button onClick={() => emit('close')}>取消</Button>
								<Button type="primary" loading={props.loading} onClick={() => emit('submit')}>
									确定
								</Button>
							</div>
						)
					}}
				>
					<Spin size="large" spinning={props.loading}></Spin>
				</Modal>
			)
		}
	}
})

interface NodeCropperInit {
	action: 'close' | 'submit'
	done: () => void
	use: (loading: boolean) => void
}

interface NodeCropperProps {
	success?: () => void
	fail?: () => void
}

export function init(props?: NodeCropperProps): Promise<NodeCropperInit> {
	return new Promise(resolve => {
		const { unmount } = useComponent(
			defineComponent({
				setup() {
					const state = reactive({
						visible: true,
						loading: false
					})
					const done = () => {
						state.visible = false
						setTimeout(() => unmount(), 300)
					}
					const use = (loading: boolean) => (state.loading = loading)

					const onClose = async () => {
						await props?.fail?.()
						resolve({ action: 'close', done, use })
					}
					const onSubmit = async () => {
						await props?.success?.()
						resolve({ action: 'submit', done, use })
					}

					return () => <NodeCropper {...state} onClose={onClose} onSubmit={onSubmit}></NodeCropper>
				}
			})
		)
	})
}
