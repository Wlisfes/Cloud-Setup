import Cookies from 'js-cookie'

/**取出**/
export function getCookie(key: string) {
	const data = Cookies.get(key)
	return data ? JSON.parse(data) : null
}

/**存入**/
export function setCookie(key: string, data: any, expires = 0) {
	if (!expires) {
		return Cookies.set(key, JSON.stringify(data))
	}
	return Cookies.set(key, JSON.stringify(data), {
		expires: new Date(new Date().getTime() + expires)
	})
}

/**删除**/
export function delCookie(key: string) {
	return Cookies.remove(key)
}
