import actionTypes from '../Utils/Utils';

export const initialState = {
    user: null,
    theme: false,
    isDrawerOpen: false,
    isSideBarOpen: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
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
        case actionTypes.OPEN_SIDEBAR:
            return {
                ...state,
                isSideBarOpen: action.isSideBarOpen,
            }
        default:
            return state;
    }
}

export default reducer;