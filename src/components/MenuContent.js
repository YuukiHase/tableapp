import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NewTable from './NewTable';
import Deal from './Deal';
import NotFound from './NotFound';
import { connect } from 'react-redux';

class MenuContent extends Component {
    render() {
        const { paths } = this.props;
        const element = paths.map((path, index) => {
            const { id, subMenus } = path;

            if (subMenus.length > 0) {
                return subMenus.map((subMenu, index) => {
                    if (id === "thoa-thuan") {
                        return (
                            <Route path={"/bang-gia/" + id + "-" + subMenu.id} component={Deal} />
                        )
                    } else {
                        return (
                            <Route path={"/bang-gia/" + id + "-" + subMenu.id} component={NewTable} />
                        )
                    }
                })
            } else {
                return <Route key={id} path={"/bang-gia/" + id} component={NewTable} />
            }
        })

        return (
            <Switch>
                <Redirect from="/" exact to="/bang-gia/vn30" />
                {element}
                <Route component={NotFound} />
            </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        paths: state.manageMenu.menus.concat([state.manageMenu.categories])
    }
}

export default connect(mapStateToProps)(MenuContent);