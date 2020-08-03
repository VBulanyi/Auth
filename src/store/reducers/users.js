import { FETCH_USERS_START, FETCH_USERS_SUCCESS } from '../actions/actionTypes'

const initialState = {
    users: [],
    loading: true
}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS_START:
            return {
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                users: action.users,
                loading: false
            }
        default:
            return state
    }
}