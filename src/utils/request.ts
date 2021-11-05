import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const service: AxiosInstance = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 60000
})

/**请求拦截**/
service.interceptors.request.use((config: AxiosRequestConfig) => {
	return config
}, useError)

/**响应拦截**/
service.interceptors.response.use((response: AxiosResponse) => {
	return response.data
}, useError)

/**错误拦截处理**/
function useError(error: AxiosError) {
	if (error?.response) {
		const { data, status } = error.response

		return Promise.reject(data)
	} else {
		return Promise.reject(error)
	}
}
export default service
