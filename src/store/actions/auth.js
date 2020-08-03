import axios from '../../axios/axios'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'


export function auth(username, password) {

    return async dispatch => {

        const authData = {
            username,
            password
        }
        const url = '/api-token-auth/'

        const expiresIn = 3600000

        const response = await axios.post(url, authData)

        const data = response.data

        const expirationDate = new Date(new Date().getTime() + expiresIn)

        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.token))
        dispatch(autoLogout(expiresIn))
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time)

    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime())))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}