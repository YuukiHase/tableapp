import * as types from './../constants/ActionTypes';

export const list = () => {
    return {
        type: types.LIST_RENDER_CELL,
    }
}

export const sortList = (sortedList) => {
    return {
        type: types.SORT_LIST,
        payload: sortedList
    }
}

export const changeValue = (data) => {
    return {
        type: types.CHANGE_VALUE,
        payload: data
    }
}

export const maskValue = (data) => {
    return {
        type: types.MASK_VALUE,
        payload: data
    }
}

export const unMaskValue = (data) => {
    return {
        type: types.UNMASK_VALUE,
        payload: data
    }
}

export const addNewCategory = (data) => {
    return {
        type: types.ADD_NEW_CATEGORY,
        payload: data
    }
}

export const addNewRecord = (data) => {
    return {
        type: types.ADD_NEW_RECORD,
        payload: data
    }
}

export const onTag = (data) => {
    return {
        type: types.ON_TAG,
        payload: data
    }
}

export const loadData = (data) => {
    return {
        type: types.LOAD_DATA,
        payload: data
    }
}

export const changeStatusSearch = (data) => {
    return {
        type: types.CHANGE_STATUS_SEARCH,
        payload: data
    }
}

export const loadDealData = (data) => {
    return {
        type: types.LOAD_DEAL_DATA,
        payload: data
    }
}

export const onChooseLanguage = () => {
    return {
        type: types.ON_CHOOSE_LANGUAGE
    }
}

export const onActiveLanguage = (data) => {
    return {
        type: types.ON_ACTIVE_LANGUAGE,
        payload: data
    }
}