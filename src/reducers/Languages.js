import * as types from '../constants/ActionTypes';

let initialState = {
    isDisplayChooseLanguage: false,
    language: '',
    label: '',
}

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ON_CHOOSE_LANGUAGE:
            return Object.assign({}, state, {
                isDisplayChooseLanguage: !state.isDisplayChooseLanguage
            });

        case types.ON_ACTIVE_LANGUAGE:
            return Object.assign({}, state, {
                language: action.payload.language,
                label: action.payload.label
            });

        default: return state;
    }
}

export default myReducer;