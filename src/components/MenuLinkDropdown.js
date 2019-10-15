import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class MenuLinkDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subTitle: '',
            data: []
        };
    }

    onClick = (event) => {
        // Change Subtitle
        let name = event.target.name;
        this.setState({
            subTitle: name
        });
    }

    render() {
        let { menu, configLanguage } = this.props;
        let { subMenus } = menu;
        let lang = configLanguage.language;

        const to = subMenus.map((subMenu, index) => {
            return (
                "/bang-gia/" + menu.id + "-" + subMenu.id
            )
        });

        const element = subMenus.map((subMenu, index) => {
            return (
                <Route
                    key={subMenu.id}
                    path={to[index]}
                    exact={true}
                    children={({ match }) => {
                        let active = '';

                        if (match) {
                            active = 'btn-dropdown-active';

                            // Change Status Search
                            this.props.changeStatusSearch('mark');

                            // Change tag
                            this.props.onTag(menu.id + "-" + subMenu.id);

                            // Load Data
                            let url = "/bang-gia/" + menu.id + "-" + subMenu.id;
                            fetch(url, {
                                method: "GET"
                            })
                                .then(e => e.json())
                                .then(res => {
                                    if (menu.id === 'thoa-thuan') {

                                    } else {
                                        this.props.loadData(res[menu.id + "-" + subMenu.id]);
                                    }
                                });
                        }

                        return (
                            <li className={active}>
                                <Link to={to[index]} name={subMenu.label} onClick={this.onClick}>
                                    {subMenu.label}
                                </Link>
                            </li>
                        )
                    }}
                />
            )
        });

        return (
            <Route path={to} exact={true} children={({ match }) => {
                let active = match ? "btn-exchange-active" : "";

                return (
                    <li className={`menu-item-li ${active}`} id="dit">
                        <span className="non-link">
                            {
                                `
                                    ${(lang === 'vn') ? menu.labelVN : menu.labelEN} ${(this.state.subTitle && active) ?
                                    " (" + this.state.subTitle + ")" :
                                    ""}
                                `
                            }&nbsp;&nbsp;&nbsp;
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                        <ul>
                            {element}
                        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuLinkDropdown);