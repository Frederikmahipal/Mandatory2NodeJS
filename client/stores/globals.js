import {readable, writable} from 'svelte/store'
export const token = writable(localStorage.getItem('token'))
export const clearToken = () => {
    localStorage.clear()
    token.set(localStorage.getItem("token"))
}
export const BASE_URL = readable('http://localhost:8080')