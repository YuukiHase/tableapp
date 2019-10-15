import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from "react-autocomplete";
import * as actions from '../actions/index';

class MenuSearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    onChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    onSelect = (value, item) => {
        this.setState({
            value: ''
        });
        if (this.props.statusSearch === 'mark') {
            if (!this.props.listFavorite.includes(item) && this.props.listNormal.includes(item)) {
                item.isMasked = true;
                item.tag = this.props.tag;
                this.props.mask(item);
            }
        } else if (this.props.statusSearch === 'add' && !this.props.listCombine.includes(item)) {
            this.props.addNewRecord(item)
        }
    }

    render() {
        let value = this.state.value;
        let { placeholder } = this.props;
        return (
            <div className="search-box">
                <Autocomplete

                    items={this.props.listRef}
                    getItemValue={(item) => item.stockID}
                    shouldItemRender={(item, value) => item.stockID.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    renderItem={(item, isHighlighted, ) =>
                        <div key={item.stockID} className="list-suggestion" >
                            {item.stockID}
                        </div>

                    }
                    value={value}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    inputProps={{
                        placeholder: placeholder
                    }}

                    menuStyle={{
                        zIndex: 99,
                        position: "absolute",
                        top: "none",
                        left: "none",
                        minWidth: 200,
                        borderRadius: 5,
                        backgroundColor: "#201D31",
                        height: 197,
                        overflowY: "scroll",
                        marginTop: 8
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listCombine: state.list[state.list.tag].listFavorite.concat(state.list[state.list.tag].listNormal),
        listFavorite: state.list[state.list.tag].listFavorite,
        listNormal: state.list[state.list.tag].listNormal,
        listRef: state.list[state.list.tag].refList,
        tag: state.list.tag,
        statusSearch: state.list.statusSearch
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        mask: (data) => {
            dispatch(actions.maskValue(data))
        },
        addNewRecord: (data) => {
            dispatch(actions.addNewRecord(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuSearchBox);