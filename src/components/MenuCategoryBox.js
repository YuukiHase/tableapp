import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class MenuCategoryBox extends React.Component {

    createNewCategory = () => {
        if (this.refs.txtCategory.value.trim()) {
            this.props.addNewCategory(this.refs.txtCategory.value.trim());
        }
    }

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.createNewCategory();
        }
    }

    render() {
        return (
            <div className="category-box">
                <div className="category-box-container">
                    <input type="text" placeholder="Tạo danh mục mới" ref="txtCategory" onKeyDown={this.onKeyDown} />
                </div>
                <button className="button" onClick={ this.createNewCategory }>
                    <i className="fa fa-plus" />
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addNewCategory: (data) => {
            dispatch(actions.addNewCategory(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(MenuCategoryBox);