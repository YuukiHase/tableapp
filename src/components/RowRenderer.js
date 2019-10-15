import React from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import { connect } from 'react-redux';

class RowRenderer extends React.Component {
    render() {
        const { className, columns, index, onRowClick, onRowDoubleClick, onRowMouseOver, onRowMouseOut, rowData, style, classes } = this.props
        return (
            <div
                key={index}
                className={classnames(className, rowData.tag === this.props.tag && rowData.isMasked && classes.rowMasked, (index % 2 !== 0) ? classes.rowEven : classes.rowOdd)}
                onClick={onRowClick}
                onDoubleClick={() => {
                    onRowDoubleClick(rowData)
                }}
                onMouseOver={onRowMouseOver}
                onMouseOut={onRowMouseOut}
                style={style}
            >
                {columns}
            </div>
        )
    }
}

const styles = {
    rowOdd: {
        backgroundColor: "#05040e",
        '&:hover': {
            backgroundColor: "#414141"
        }
    },
    rowEven: {
        backgroundColor: "#242424",
        '&:hover': {
            backgroundColor: "#414141"
        }
    },
    rowMasked: {
        backgroundColor: "#1c1a2b",
        borderBottom: "1px solid #404040",
        '&:hover': {
            backgroundColor: "#414141"
        }
    }
}

const mapStateToProps = (state) => {
    return {
        tag: state.list.tag
    }
};

export default connect(mapStateToProps)(injectSheet(styles)(RowRenderer));
