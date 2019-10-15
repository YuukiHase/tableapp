import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class MenuLinkNormal extends React.Component {

    render() {
        let { menu, configLanguage } = this.props;
        let lang = configLanguage.language;

        return (
            <Route
                path={"/bang-gia/" + menu.id}
                exact={true}
                children={({ match }) => {
                    let active = '';

                    if (match) {
                        active = 'btn-exchange-active';

                        // Change Status Search
                        this.props.changeStatusSearch('mark');

                        // Change tag
                        this.props.onTag(menu.id);

                        // Load Data
                        let url = "/bang-gia/" + menu.id;
                        fetch(url, {
                            method: "GET"
                        })
                            .then(e => e.json())
                            .then(res => {
                                this.props.loadData(res[menu.id]);
                            });
                    }

                    return (
                        <li className={`menu-item-li ${active}`}>
                            <Link to={"/bang-gia/" + menu.id} className="btn-exchange" >
                                {(lang === 'vn') ? menu.labelVN : menu.labelEN}
                            </Link>
                        </li>
                    )
                }}
            />
        )

    }
}

const mapStateToProps = (state) => {
    return {
        configLanguage: state.languages
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onTag: (tag) => {
            dispatch(actions.onTag(tag))
        },
        changeStatusSearch: (status) => {
            dispatch(actions.changeStatusSearch(status))
        },
        loadData: (id) => {
            dispatch(actions.loadData(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuLinkNormal);