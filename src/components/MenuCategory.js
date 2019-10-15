import React from 'react';
import { Route, Link } from 'react-router-dom';
import MenuCategoryBox from './MenuCategoryBox';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { languages } from './../constants/ConfigLanguages';

class MenuCategory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subTitle: ''
        };
    }

    onClick = (event) => {
        // Change Subtitle
        let name = event.target.name;
        this.setState({
            subTitle: name
        });

        // Change Status Search
        this.props.changeStatusSearch('add');
    }

    render() {
        const { subMenus } = this.props;
        let categoryLabel = '';
        let lang = this.props.configLanguage.language;
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].id === lang) {
                categoryLabel = languages[i].menuLabels.category;
                break;
            }
        }

        if (subMenus.length > 0) {
            const to = subMenus.map((subMenu, index) => {
                return (
                    "/bang-gia/danh-muc-" + subMenu.id
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

                                // Change tag
                                this.props.onTag("danh-muc-" + subMenu.id);
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
                                        ${categoryLabel} ${(this.state.subTitle && active) ?
                                        " (" + this.state.subTitle + ")" :
                                        ""}
                                    `
                                }&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                            <ul>
                                {element}
                                <MenuCategoryBox />
                            </ul>
                        </li>
                    )
                }}
                />
            )
        }
        else {
            return (
                <Route path="/bang-gia/danhmuc" exact={true} children={({ match }) => {
                    let active = match ? "btn-exchange-active" : "";
                    return (
                        <li className={`menu-item-li ${active}`} id="dit">
                            <span className="non-link">{categoryLabel}&nbsp;&nbsp;&nbsp;
                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                            <ul>
                                <MenuCategoryBox addNewCategory={this.addNewCategory} />
                            </ul>
                        </li>
                    )
                }}
                />
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        subMenus: state.manageMenu.categories.subMenus,
        configLanguage: state.languages
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onTag: (tag) => {
            dispatch(actions.onTag(tag))
        },
        changeStatusSearch: (status) => {
            dispatch(actions.changeStatusSearch(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategory);