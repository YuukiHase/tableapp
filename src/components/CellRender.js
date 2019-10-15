import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import classNames from 'classnames';

let styles = {
    up: {
        color: '#0f0',
    },
    down: {
        color: '#FF0017',
    },
    ref: {
        color: '#FDFF12',
    },
    ceil: {
        color: '#52d3f9',
    },
    floor: {
        color: '#fd02fd',
    },

    myCellRef: {
        color: '#FDFF12',
        animation: 'change_bg_ref 3s',
    },
    '@keyframes change_bg_ref': {
        from: {
            color: 'white',
            backgroundColor: '#FDFF12'
        },
        to: {
            color: '#FDFF12',
            backgroundColor: 'transparent'
        }
    },
    myCellCeil: {
        color: '#fd02fd',
        animation: 'change_bg_ceil 3s',
    },
    '@keyframes change_bg_ceil': {
        from: {
            color: 'white',
            backgroundColor: '#fd02fd'
        },
        to: {
            color: '#fd02fd',
            backgroundColor: 'transparent'
        }
    },
    myCellFloor: {
        color: '#52d3f9',
        animation: 'change_bg_floor 3s',
    },
    '@keyframes change_bg_floor': {
        from: {
            color: 'white',
            backgroundColor: '#52d3f9'
        },
        to: {
            color: '#52d3f9',
            backgroundColor: 'transparent'
        }
    },
    myCellUp: {
        color: '#0f0',
        animation: 'change_bg_up 3s',
        animationFillMode: "forwards"
    },
    '@keyframes change_bg_up': {
        from: {
            color: 'white',
            backgroundColor: '#0f0'
        },
        to: {
            color: '#0f0',
            backgroundColor: 'transparent',
        }
    },
    myCellDown: {
        color: '#FF0017',
        animation: 'change_bg_down 3s',
    },
    '@keyframes change_bg_down': {
        from: {
            color: 'white',
            backgroundColor: '#FF0017'
        },
        to: {
            color: '#FF0017',
            backgroundColor: 'transparent'
        }
    }
};


class CellRender extends React.Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     if(nextProps.updatedRowData.stockID === this.props.rowData.stockID) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    constructor(props) {
        super(props)

        this.state = {
            value: this.props.rowData[this.props.dataKey],
            stockID: this.props.rowData.stockID,
            update: false,
            status: this.determineStatus(this.props),
            key: new Date().getTime()
        }
    }

    determineStatus = (props) => {
        const { dataKey, rowData } = props;
        const refPrice = rowData.reference;
        const ceilPrice = rowData.ceiling;
        const floorPrice = rowData.floor;
        let key = '';

        if (dataKey === 'price1Buy' || dataKey === 'volume1Buy') {
            key = 'price1Buy';
        }
        else if (dataKey === 'price2Buy' || dataKey === 'volume2Buy') {
            key = 'price2Buy';
        }
        else if (dataKey === 'price3Buy' || dataKey === 'volume3Buy') {
            key = 'price3Buy';
        }
        else if (dataKey === 'price3Sell' || dataKey === 'volume3Sell') {
            key = 'price3Sell';
        }
        else if (dataKey === 'price2Sell' || dataKey === 'volume2Sell') {
            key = 'price2Sell';
        }
        else if (dataKey === 'price1Sell' || dataKey === 'volume1Sell') {
            key = 'price1Sell';
        }
        else if (dataKey === 'matchPrice' || dataKey === 'matchVol' || dataKey === 'plussub') {
            key = 'matchPrice';
        }
        else if (dataKey === 'high' || dataKey === 'average' || dataKey === 'low') {
            key = dataKey;
        }

        if (rowData[key] === refPrice) {
            return "REF"
        } else if (rowData[key] === ceilPrice) {
            return "CEIL"
        } else if (rowData[key] === floorPrice) {
            return "FLOOR"
        } else if (rowData[key] > refPrice) {
            return "UP"
        } else if (rowData[key] < refPrice) {
            return "DOWN"
        } else {
            return "NORMAL"
        }
    }

    determineColor = (status, classes) => {
        if (status === "REF") {
            return classes.ref;
        }
        else if (status === "CEIL") {
            return classes.ceil;
        }
        else if (status === "FLOOR") {
            return classes.floor;
        }
        else if (status === "UP") {
            return classes.up;
        }
        else if (status === "DOWN") {
            return classes.down;
        }
        else if (status === "NORMAL") {
            return '';
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.stockID !== nextProps.rowData.stockID) { // Sort
            this.setState({
                value: nextProps.rowData[nextProps.dataKey],
                stockID: nextProps.rowData.stockID,
                update: false
            })
        } else if (this.state.value !== nextProps.rowData[nextProps.dataKey]) { // Add Value
            this.setState({
                value: nextProps.rowData[nextProps.dataKey],
                stockID: nextProps.rowData.stockID,
                update: true,
                status: this.determineStatus(nextProps),
                key: new Date().getTime()
            })
        }
    }

    render() {
        const { classes } = this.props;
        const { update, status, value, key } = this.state;

        return <div
        style={{ paddingRight: 6, paddingLeft: 5 }}
            key={key}
            className={classNames(this.determineColor(status, classes),
                update === true && (
                    status === "UP" ? classes.myCellUp :
                        status === "DOWN" ? classes.myCellDown :
                            status === "REF" ? classes.myCellRef :
                                status === "CEIL" ? classes.myCellCeil :
                                    status === "FLOOR" ? classes.myCellFloor : ''))}>
            {value}
        </div>;
    }
}

export default connect(state => ({
    updatedRowData: state.list.updatedRowData
}))(injectSheet(styles)(CellRender));
