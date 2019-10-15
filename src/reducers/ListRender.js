import * as types from '../constants/ActionTypes';
import { remove, find } from 'lodash';

let initialState = {
    tag: 'vn30',
    statusSearch: '',

    "vn30": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "hnx30": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "hose": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "hnx": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "upcom": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "thoa-thuan-hose": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "thoa-thuan-hnx": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "thoa-thuan-upcom": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "phai-sinh": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "chung-quyen": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "etf-hose": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "etf-hnx": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    },
    "bond": {
        listFavorite: [],
        listNormal: [],
        updatedRowData: {},
        refList: []
    }
}

let myReducer = (state = initialState, action) => {
    let data;
    let dataTag;
    let local;
    switch (action.type) {

        case types.SORT_LIST:
            return Object.assign({}, state, {
                [state.tag]: {
                    listFavorite: state[state.tag].listFavorite,
                    listNormal: action.payload,
                    updateRowData: {},
                    refList: state[state.tag].refList
                }
            })

        case types.CHANGE_VALUE:
            return Object.assign({}, state, Object.assign({}, state[state.tag], updateRowData(state[state.tag], action)))

        case types.MASK_VALUE:
            data = JSON.parse(localStorage.getItem('LISTFAVORITE'));
            local = data ? data : {};
            data = local[state.tag];
            dataTag = data ? data : [];
            local[state.tag] = dataTag.concat([action.payload.stockID]);
            localStorage.setItem('LISTFAVORITE', JSON.stringify(local));

            return Object.assign({}, state, {
                [state.tag]: {
                    listFavorite: state[state.tag].listFavorite.concat([action.payload]),
                    listNormal: state[state.tag].listNormal.filter(e => {
                        if (e.stockID === action.payload.stockID) {
                            return false;
                        } else {
                            return true;
                        }
                    }),
                    updateRowData: {},
                    refList: state[state.tag].refList.filter(e => {
                        if (e.stockID === action.payload.stockID) {
                            return false;
                        } else {
                            return true;
                        }
                    })
                }
            })

        case types.UNMASK_VALUE:
            data = JSON.parse(localStorage.getItem('LISTFAVORITE'));
            if (data) {
                remove(data[state.tag], (item) => {
                    return item === action.payload.stockID;
                });
                localStorage.setItem('LISTFAVORITE', JSON.stringify(data));
            }

            return Object.assign({}, state, {
                [state.tag]: {
                    listNormal: state[state.tag].listNormal.concat([action.payload]),
                    listFavorite: state[state.tag].listFavorite.filter(e => {
                        if (e.stockID === action.payload.stockID) {
                            return false;
                        } else {
                            return true;
                        }
                    }),
                    updateRowData: {},
                    refList: state[state.tag].refList.concat([action.payload])
                }
            })

        case types.ADD_NEW_RECORD:
            return Object.assign({}, state, {
                [state.tag]: {
                    listFavorite: state[state.tag].listFavorite,
                    listNormal: state[state.tag].listNormal.concat([action.payload]),
                    updateRowData: {},
                    refList: state[state.tag].refList
                }
            })

        case types.ON_TAG:
            return Object.assign({}, state, {
                tag: action.payload
            })

        case types.ADD_NEW_CATEGORY:
            state = Object.assign(state, newCategory(state, action));
            return state;

        case types.CHANGE_STATUS_SEARCH:
            return Object.assign({}, state, {
                statusSearch: action.payload
            })

        case types.LOAD_DATA:
            let tmpListFavorite = [];
            let tmpListNormal = action.payload;
            data = JSON.parse(localStorage.getItem('LISTFAVORITE'));
            local = data ? data : {}
            if (state.tag in local) {
                dataTag = local[state.tag];
                dataTag.forEach(element => {
                    find(tmpListNormal, (data) => {
                        if(data !== undefined) {
                            if (element === data.stockID) {
                                data.isMasked = true;
                                data.tag = state.tag;
                                tmpListFavorite = tmpListFavorite.concat([data]);
                                remove(tmpListNormal, (item) => {
                                    return item === data;
                                })
                            }
                        }
                    });
                });

                return Object.assign({}, state, {
                    [state.tag]: {
                        listFavorite: tmpListFavorite,
                        listNormal: tmpListNormal,
                        updateRowData: {},
                        refList: tmpListNormal
                    }
                })
            } else {
                return Object.assign({}, state, {
                    [state.tag]: {
                        listFavorite: tmpListFavorite,
                        listNormal: tmpListNormal,
                        updateRowData: {},
                        refList: tmpListNormal
                    }
                })
            }

        default: return state;
    }
}

export default myReducer;

const updateRowData = (state, action) => {
    let { listNormal, listFavorite, refList } = state;
    let { payload: updatedRowData } = action;
    let tempNormal = listNormal.filter(e => e.stockID === updatedRowData.stockID);
    if (tempNormal.length > 0) {
        Object.assign(tempNormal[0], updatedRowData);
    }
    let tempFavorite = listFavorite.filter(e => e.stockID === updatedRowData.stockID);
    if (tempFavorite.length > 0) {
        Object.assign(tempFavorite[0], updatedRowData);
    }
    let tmpRef = refList.filter(e => e.stockID === updatedRowData.stockID);
    if (tempFavorite.length > 0) {
        Object.assign(tmpRef[0], updatedRowData);
    }

    return {
        updatedRowData,
        listNormal,
        listFavorite
    }
}

const newCategory = (state, action) => {
    const title = "danh-muc-" + action.payload;
    return {
        [title]: {
            listFavorite: [],
            listNormal: [],
            updatedRowData: {},
            refList: state[state.tag].refList
        }
    };
}