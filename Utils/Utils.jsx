
/* The possible state action types available to us, edit this object to add or remove a state action type */
const actionTypes = {
    SET_USER : "SET_USER", // set the user
    SET_THEME : "SET_THEME", // set the theme (dark===true, light===false)
    OPEN_DRAWER: "OPEN_DRAWER", // open the side bar (opened===true, closed===false)
    SET_ADMIN: "SET_ADMIN", // open the side bar (opened===true, closed===false)
}

export default actionTypes;