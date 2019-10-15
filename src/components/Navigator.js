import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './Menu';
import MenuContent from './MenuContent';

class Navigator extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/* Menu */}
                    <Menu />

                    {/* Content */}
                    <MenuContent />
                </div>
            </Router>
        );
    }
}

export default Navigator;