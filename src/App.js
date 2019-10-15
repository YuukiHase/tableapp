import React from 'react';
import './App.css';
import Top from "./components/Top"
import Header from './components/Header';
import Navigator from './components/Navigator';

class App extends React.Component {

    render() {
        return (
            <div>
                <Header />

                <Top />

                <Navigator />
            </div>
        );
    }
}

export default App;
