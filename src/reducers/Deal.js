import * as types from '../constants/ActionTypes';

let initialState = {
    bid: [
        {
            symbol: 'HNG',
            price: 19.6,
            volume: 4000000,
            time: '14:33:56'
        },
        {
            symbol: 'CII11709',
            price: 101.58,
            volume: 50000,
            time: '09:12:26'
        },
        {
            symbol: 'VHM11801',
            price: 106.32,
            volume: 500,
            time: '09:05:07'
        }
    ],
    matched: [
        {
            symbol: 'HAH',
            price: 12,
            volume: 40000.0123,
            value: 480000,
            accumulatedValue: 480000,
            time: '14:40:12'
        },
        {
            symbol: 'VIC11901',
            price: 104.57,
            volume: 20230,
            value: 2119902,
            accumulatedValue: 5410640,
            time: '14:40:12'
        },
        {
            symbol: 'HAH',
            price: 12,
            volume: 40000,
            value: 480000,
            accumulatedValue: 480000,
            time: '14:40:12'
        }
    ],
    asked: [
        {
            symbol: 'TPB',
            price: 23.3,
            volume: 4000000,
            time: '13:29:50'
        },
        {
            symbol: 'EIB',
            price: 18.3,
            volume: 100000,
            time: '13:00:57'
        },
        {
            symbol: 'EIB',
            price: 18.6,
            volume: 257000,
            time: '10:21:27'
        }
    ],
}

let myReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.LOAD_DEAL_DATA:
            return Object.assign({}, state, action.payload);

        default: return state;
    }
}

export default myReducer;