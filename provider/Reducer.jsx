import actionTypes from '../Utils/Utils';

export const initialState = {
    user: null,
    theme: false,
    isDrawerOpen: false,
    isAdmin: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case actionTypes.SET_ADMIN:
            return {
                ...state,
                admin: action.admin,
            }
        case actionTypes.SET_THEME:
            return {
                ...state,
                theme: action.theme,
            }
        case actionTypes.OPEN_DRAWER:
            return {
                ...state,
                isDrawerOpen: action.isDrawerOpen,
            }
        default:
            return state;

    }
}

export default reducer;