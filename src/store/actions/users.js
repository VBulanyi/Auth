import axios from '../../axios/axios'
import { FETCH_USERS_SUCCESS } from './actionTypes'

export function getUsers() {

    return async dispatch => {

        const url = '/api/v1/users/'

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })

        dispatch(fetchUsersSuccess(response.data))
    }
}

export function fetchUsersSuccess(users) {
    return {
        type: FETCH_USERS_SUCCESS,
        users
    }
}