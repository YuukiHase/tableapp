import React from 'react';
import MenuLinkDropdown from './MenuLinkDropdown';
import MenuLinkNormal from './MenuLinkNormal';

class MenuLink extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subTitle: ''
        };
    }

    changeSubTitle = (e) => {
        let name = e.target.name;
        this.setState({
            subTitle: name
        });
    }

    render() {
        let { menu } = this.props;
        let { subMenus } = menu;

        if (subMenus.length > 0) {
            return (
                <MenuLinkDropdown {...this.props} />
            )
        } else {
            return (
                <MenuLinkNormal {...this.props} />
            )
        }
    }
}

export default MenuLink;