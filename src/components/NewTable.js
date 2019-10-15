import React from "react";
import { connect } from 'react-redux';
import {
    Table,
    Column,
    SortDirection,
    AutoSizer,
} from "react-virtualized";
import HeaderRender from "./HeaderRender";
import CellRender from "./CellRender";
import * as actions from './../actions/index';
import _ from "lodash";
import "react-virtualized/styles.css";
import RowRenderer from "./RowRenderer";
import { languages } from './../constants/ConfigLanguages';
import worker from './../worker/sort.worker';
import WebWorker from './../worker/WebWorker';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import { styles } from './../constants/StyleNewTable';

class NewTable extends React.Component {
    constructor(props) {
        super(props);

        const sortBy = "name";
        const sortDirection = SortDirection.ASC;

        this.state = {
            sortBy,
            sortDirection,
            key: new Date().getTime()
        };

        this.renderCell = this.renderCell.bind(this);
        this.renderHeader = this.defaultHeaderRowRenderer.bind(this);
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this)
    }

    _sortList = ({ sortBy, sortDirection }) => {
        let SortDirectionDESC = SortDirection.DESC;
        let list = this.props.listNormal;
        this.worker.postMessage({ list, sortBy, sortDirection, SortDirectionDESC });
    };

    _sort = ({ sortBy, sortDirection }) => {
        this._sortList({ sortBy, sortDirection });
        this.setState({ sortBy, sortDirection, key: new Date().getTime() });
    };

    add() {
        let mockupData = {
            "stockID": "CII",
            "price3Buy": (Math.random() * 100).toFixed(0),
            "volume3Buy": (Math.random() * 1000).toFixed(0),
            "price2Buy": (Math.random() * 100).toFixed(0),
            "volume2Buy": (Math.random() * 1000).toFixed(0),
            "price1Buy": (Math.random() * 100).toFixed(0),
            "volume1Buy": (Math.random() * 1000).toFixed(0),
            "price3Sell": 21.7,
            "volume3Sell": (Math.random() * 1000).toFixed(0),
            "price2Sell": 24.9,
            "volume2Sell": (Math.random() * 1000).toFixed(0),
            "price1Sell": 23.3,
            "volume1Sell": (Math.random() * 1000).toFixed(0),
        };

        this.props.change(mockupData);
    }
    add2() {
        let mockupData = {
            "stockID": "CTD",
            "price3Buy": (Math.random() * 100).toFixed(0),
            "volume3Buy": (Math.random() * 1000).toFixed(0),
            "price2Buy": (Math.random() * 100).toFixed(0),
            "volume2Buy": (Math.random() * 1000).toFixed(0),
            "price1Buy": (Math.random() * 100).toFixed(0),
            "volume1Buy": (Math.random() * 1000).toFixed(0),
        };

        this.props.change(mockupData);
    }

    find(row, col) {
        let newList = this.props.listCombine;
        return (
            newList[newList.indexOf(
                _.find(newList, e => {
                    if (e.stockID === row) {
                        return e
                    }
                })
            )][col]
        )
    }

    renderCell({
        cellData,
        columnData,
        columnIndex,
        dataKey,
        isScrolling,
        rowData,
        rowIndex
    }) {
        return (
            <CellRender
                columnData={columnData}
                columnIndex={columnIndex}
                rowData={rowData}
                dataKey={dataKey}
                rowIndex={rowIndex}
                cellData={cellData}
            />
        )
    }

    defaultHeaderRowRenderer({
        className,
        columns,
        style,
    }) {
        return (
            <HeaderRender
                className={className}
                columns={columns}
                style={style}
            />
        )
    }

    onRowDoubleClick(rowData) {
        if (this.props.listFavorite.includes(rowData)) {
            rowData.isMasked = false;
            rowData.tag = this.props.tag;
            this.props.unMask(rowData);
        } else {
            rowData.isMasked = true;
            rowData.tag = this.props.tag;
            this.props.mask(rowData);
        }
    }

    rowRenderer(props) {
        return (
            <RowRenderer {...props} />
        )
    }

    componentDidMount() {
        let { sortBy, sortDirection } = this.state;
        // Thread for worker.
        this.worker = new WebWorker(worker);
        this.worker.addEventListener('message', event => {
            const sortedList = event.data;
            this.props.sortList(sortedList);
        });
        this._sortList({ sortBy, sortDirection });
    }

    render() {
        let labels = {};
        let lang = this.props.configLanguages.language;
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].id === lang) {
                labels = languages[i].tableLabels;
                break;
            }
        }
        const { classes } = this.props;

        return (
            <div style={{ display: "block" }}>
                <div style={{ height: 460, minWidth: 1300 }}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <Table
                                key={this.state.key}
                                width={width}
                                height={height}
                                headerHeight={60}
                                rowHeight={30}
                                sort={this._sort}
                                sortBy={this.state.sortBy}
                                sortDirection={this.state.sortDirection}
                                rowCount={this.props.listCombine.length}
                                rowGetter={({ index }) => this.props.listCombine[index]}
                                rowStyle={{ paddingRight: "0" }}
                                headerRowRenderer={this.renderHeader}
                                overscanRowCount={10}
                                rowRenderer={this.rowRenderer}
                                onRowDoubleClick={e => { this.onRowDoubleClick(e) }}
                            >
                                <Column headerClassName={classnames(classes.headerColFirst, classes.highlight)} className={classes.colFirst} label={labels.symbol} dataKey="stockID" cellRenderer={this.renderCell} width={60} style={{ marginLeft: "0", marginRight: "0" }} headerStyle={{ marginLeft: "0", marginRight: "0", height: 60, lineHeight: "60px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classnames(classes.colTh, classes.highlight, classes.reference)} label={labels.ref} dataKey="reference" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight, (lang === 'vn') ? classes.upReferenceVn : classes.upReferenceEn)} className={classnames(classes.colTh, classes.highlight, classes.floor)} label={labels.floor} dataKey="floor" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)}  className={classnames(classes.colTh, classes.highlight, classes.ceiling)} label={labels.ceil} dataKey="ceiling" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColTh, classes.borderHeaderLeft, classes.highlight)} className={classes.colTh} label={labels.totalPrice} dataKey="totalValue" cellRenderer={this.renderCell} width={78} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 60, lineHeight: "60px" }} />
                                <Column headerClassName={classnames(classes.headerColTh, classes.highlight)} className={classes.colTh} label={labels.totalVol} dataKey="totalVolume" cellRenderer={this.renderCell} width={78} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 60, lineHeight: "60px" }} />

                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classes.colTh} label={labels.p3Bid} dataKey="price3Buy" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classes.colTh} label={labels.vol3Bid} dataKey="volume3Buy" cellRenderer={this.renderCell} width={65} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight, (lang === 'vn') ? classes.upBuyVn : classes.upBuyEn)} className={classes.colTh} label={labels.p2Bid} dataKey="price2Buy" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classes.colTh} label={labels.vol2Bid} dataKey="volume2Buy" cellRenderer={this.renderCell} width={65} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classes.colTh} label={labels.p1Bid} dataKey="price1Buy" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classes.colTh} label={labels.vol1Bid} dataKey="volume1Buy" cellRenderer={this.renderCell} width={65} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />

                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.borderHeaderLeft, classes.highlight)} className={classnames(classes.colTh, classes.highlight)} label={labels.price} dataKey="matchPrice" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight, (lang === 'vn') ? classes.upMatchVn : classes.upMatchEn)} className={classnames(classes.colTh, classes.highlight)} label={labels.vol} dataKey="matchVol" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classnames(classes.colTh, classes.highlight)} label="+/-" dataKey="plussub" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />

                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.borderHeaderLeft, classes.highlight)} className={classes.colTh} label={labels.p1Asked} dataKey="price1Sell" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classes.colTh} label={labels.vol1Asked} dataKey="volume1Sell" cellRenderer={this.renderCell} width={65} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight, (lang === 'vn') ? classes.upSellVn : classes.upSellEn)} className={classes.colTh} label={labels.p2Asked} dataKey="price2Sell" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classes.colTh} label={labels.vol2Asked} dataKey="volume2Sell" cellRenderer={this.renderCell} width={65} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classes.colTh} label={labels.p3Asked} dataKey="price3Sell" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classes.colTh} label={labels.vol3Asked} dataKey="volume3Sell" cellRenderer={this.renderCell} width={65} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />

                                <Column headerClassName={classnames(classes.headerColTh, classes.borderHeaderLeft, classes.highlight)} className={classnames(classes.colTh, classes.highlight)} label={labels.high} dataKey="high" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 60, lineHeight: "60px" }} />
                                <Column headerClassName={classnames(classes.headerColTh, classes.highlight)} className={classnames(classes.colTh, classes.highlight)} label={labels.avr} dataKey="average" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 60, lineHeight: "60px" }} />
                                <Column headerClassName={classnames(classes.headerColTh, classes.highlight)} className={classnames(classes.colTh, classes.highlight)} label={labels.low} dataKey="low" cellRenderer={this.renderCell} width={50} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 60, lineHeight: "60px" }} />

                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight)} className={classes.colTh} label={labels.fbuy} dataKey="fBuyValue" cellRenderer={this.renderCell} width={60} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.highlight, (lang === 'vn') ? classes.upPtVn : classes.upPtEn)} className={classes.colTh} label={labels.fsell} dataKey="fSellValue" cellRenderer={this.renderCell} width={60} style={{ marginRight: "0" }} headerStyle={{ marginRight: "0", height: 30, lineHeight: "30px" }} />
                                <Column headerClassName={classnames(classes.headerColThSmall, classes.Bot, classes.borderHeaderRight, classes.highlight)} className={classes.colTh} label={labels.room} dataKey="ptValue" cellRenderer={this.renderCell} width={90} style={{ marginRight: 10 }} headerStyle={{ marginRight: 10, height: 30, lineHeight: "30px" }} />
                            </Table>
                        )}
                    </AutoSizer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tag: state.list.tag,
        listCombine: state.list[state.list.tag].listFavorite.concat(state.list[state.list.tag].listNormal),
        listNormal: state.list[state.list.tag].listNormal,
        listFavorite: state.list[state.list.tag].listFavorite,
        configLanguages: state.languages
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        sortList: (sortedList) => {
            dispatch(actions.sortList(sortedList))
        },
        change: (data) => {
            dispatch(actions.changeValue(data))
        },
        mask: (data) => {
            dispatch(actions.maskValue(data))
        },
        unMask: (data) => {
            dispatch(actions.unMaskValue(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(NewTable));