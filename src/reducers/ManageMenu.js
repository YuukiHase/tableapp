import * as types from '../constants/ActionTypes';
import { menus } from './../constants/ConfigMenu'

let categories = {
    id: 'danh-muc',
    subMenus: []
}

let initialState = {
    menus,
    categories: categories
}

let myReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.ADD_NEW_CATEGORY:
            let tmp = categories;
            tmp.subMenus = tmp.subMenus.concat([{
                id: action.payload,
                label: action.payload
            }]);

            return Object.assign({}, state, {
                categories: tmp
            })

        default: return state;
    }
}

export default myReducer;