import React from 'react';
import MenuSearchBox from './MenuSearchBox';
import Menulink from './MenuLink';
import MenuCategory from './MenuCategory';
import { connect } from 'react-redux';
import { languages } from './../constants/ConfigLanguages';

class Menu extends React.Component {

    render() {
        let { menus } = this.props;

        const element = menus.map((menu, index) => {
            return (
                <Menulink key={menu.id} menu={menu} />
            )
        });
        let placeholderMenuSeachBox = '';
        let lang = this.props.configLanguages.language;
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].id === lang) {
                placeholderMenuSeachBox = languages[i].menuLabels.placeholderMenuSeachBox;
                break;
            }
        }

        return (
            <nav className="clrfx">
                {/* Search Box */}
                <MenuSearchBox placeholder={placeholderMenuSeachBox} />

                {/* Menu List */}
                <ul className="list-menu">
                    <MenuCategory />
                    {element}
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menus: state.manageMenu.menus,
        configLanguages: state.languages
    }
}

export default connect(mapStateToProps)(Menu);