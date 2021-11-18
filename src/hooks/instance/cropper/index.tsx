import { defineComponent, reactive, ref, onMounted, nextTick } from 'vue'
import { Modal, Spin, Button, Upload } from 'ant-design-vue'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { useComponent } from '@/hooks/utils/useComponent'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import style from './cropper.module.less'

interface NodeCropperInit {
	action: 'close' | 'submit' | 'change'
	done: () => void
	use: (loading: boolean) => void
}

interface NodeCropperProps {
	cover?: string
	ratio?: number
}

export function init(props?: NodeCropperProps): Promise<NodeCropperInit> {
	return new Promise(resolve => {
		const { unmount } = useComponent(
			defineComponent({
				setup() {
					const visible = ref<boolean>(true)
					const loading = ref<boolean>(false)
					const cover = ref<string | undefined>(props?.cover)
					const name = ref<string>()
					const file = ref<File | null>(null)
					const cropper = ref<Cropper | null>(null)

					const done = () => {
						visible.value = false
						setTimeout(() => unmount(), 300)
					}
					const use = (data: boolean) => (loading.value = data)

					const onChange = () => {
						resolve({ action: 'change', done, use })
					}

					const onClose = () => {
						resolve({ action: 'close', done, use })
					}

					const onSubmit = () => {
						cropper.value?.getCroppedCanvas().toBlob(async blob => {
							console.log(blob)
							resolve({ action: 'submit', done, use })
						})
					}

					const beforeUpload = (fe: File) => {
						cover.value = URL.createObjectURL(fe)
						loading.value = true
						name.value = fe.name
						file.value = fe
						nextTick(() => {
							if (!cropper.value) {
								nextTick(() => {
									cropper.value = new Cropper(document.getElementById('image') as HTMLImageElement, {
										aspectRatio: props?.ratio || 1,
										initialAspectRatio: 1,
										viewMode: 1,
										dragMode: 'move',
										ready: () => {
											loading.value = false
										}
									})
								})
							} else {
								cropper.value.replace(cover.value as string)
								loading.value = false
							}
						})
						return false
					}

					onMounted(() => {
						if (props?.cover) {
							loading.value = true
							name.value = props.cover.split('.').pop()?.toLowerCase() || ''
							nextTick(() => {
								cropper.value = new Cropper(document.getElementById('image') as HTMLImageElement, {
									aspectRatio: props?.ratio || 1,
									initialAspectRatio: 1,
									viewMode: 1,
									dragMode: 'move',
									ready: () => {
										loading.value = false
									}
								})
							})
						}
					})

					return () => (
						<Modal
							title="图片上传"
							v-model={[visible.value, 'visible']}
							width={880}
							destroyOnClose
							onCancel={onClose}
							v-slots={{
								footer: () => (
									<div style={{ display: 'flex', justifyContent: 'center' }}>
										<Button onClick={onClose}>取消</Button>
										<Button
											style={{
												width: '40px',
												color: '#ffffff',
												backgroundColor: '#ff5500',
												borderColor: '#ff5500'
											}}
											onClick={onChange}
											v-slots={{ icon: () => <DownloadOutlined /> }}
										></Button>
										<Upload
											accept="image/jpeg,image/png,image/jpg"
											beforeUpload={beforeUpload}
											showUploadList={false}
										>
											<Button
												disabled={loading.value}
												style={{
													width: '40px',
													margin: '0 8px',
													backgroundColor: '#07c160',
													borderColor: '#07c160'
												}}
												v-slots={{ icon: () => <UploadOutlined style={{ color: '#fff' }} /> }}
											></Button>
										</Upload>
										<Button
											type="primary"
											disabled={!cover.value}
											loading={loading.value}
											onClick={onSubmit}
										>
											确定
										</Button>
									</div>
								)
							}}
						>
							<Spin size="large" spinning={loading.value}>
								<div class={style['node-cropper']}>
									<div class={style['node-cropper-ratio']}>
										<div class={style['node-cropper-ratio-absolute']}>
											{cover.value ? (
												<div class={`${style['node-cropper-conter']} cropper-bg`}>
													<img id="image" class={style['root-cover']} src={cover.value} />
												</div>
											) : (
												<div class={`${style['node-cropper-conter']} cropper-bg`}></div>
											)}
										</div>
									</div>
								</div>
							</Spin>
						</Modal>
					)
				}
			})
		)
	})
}
