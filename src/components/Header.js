import React from 'react';
import { setInterval } from 'timers';
import { languages } from './../constants/ConfigLanguages';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import { convertDayToEN, convertDayToVN, dateFormat } from './../utils/utils';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: ''
        }
        this.timer();
    }

    onChooseLanguage = () => {
        this.props.onChooseLanguage();
    }

    onActive = (id, label) => {
        this.props.onActiveLanguage({
            language: id,
            label: label
        })
    }

    timer = () => {
        setInterval(() => {
            let date = new Date();
            let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            this.setState({
                time: `${hours}:${minutes}:${seconds} ${ampm}`
            })
        }, 1000);
    }

    componentWillMount() {
        this.props.onActiveLanguage({
            language: languages[0].id,
            label: languages[0].headerLabels.label
        })
    }

    render() {
        let { time } = this.state;
        let { isDisplayChooseLanguage, label, language } = this.props.configLanguage;

        let dropDownItem = languages.map((language) => {
            return (
                <li
                    key={language.id}
                    className={(language.id === this.props.configLanguage.language) ? "active" : ""}
                    onClick={() => this.onActive(language.id, language.headerLabels.label)}
                >
                    {language.headerLabels.label}
                </li>
            );
        });
        let dropDownLanguage =
            (isDisplayChooseLanguage === true) ?
                (
                    <ul>
                        {dropDownItem}
                    </ul>
                ) : '';

        // Day
        let date = new Date();
        let day = date.getDay();
        if (language === 'en') {
            day = convertDayToEN(day);
        } else if (language === 'vn') {
            day = convertDayToVN(day);
        }
        // DD/MM/YYYY
        let ddmmyyyy = dateFormat(date);

        return (
            <header>
                <div className="header-logo"><h4>Logo</h4></div>
                <div className="header-config">
                    <div className="language-change">
                        <span onClick={this.onChooseLanguage}>{label} <span className="fa fa-angle-down"></span></span>
                        {dropDownLanguage}
                    </div>
                    <div className="date-time">
                        <h4>{time}</h4>
                        <span>{day}, {ddmmyyyy}</span>
                    </div>
                    <div className="background-change">
                        <span className="fa fa-user-secret"></span>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        configLanguage: state.languages
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onChooseLanguage: () => {
            dispatch(actions.onChooseLanguage())
        },
        onActiveLanguage: (data) => {
            dispatch(actions.onActiveLanguage(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
