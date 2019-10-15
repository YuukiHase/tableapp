import React from 'react';
import PropTypes from 'prop-types';

class Marquee extends React.Component {
    constructor(props) {
        super(props);

        this.onPause = this.onPause.bind(this);
        this.onResume = this.onResume.bind(this);
    }

    static displayName = 'Marquee';

    static propTypes = {
        text: PropTypes.string,
        hoverToStop: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        text: '',
        hoverToStop: false,
    };

    onPause() {
        this.marquee.stop()
    }

    onResume() {
        this.marquee.start()
    }

    render() {
        if(this.props.hoverToStop) {
            return(
                <marquee className={this.props.className} style={this.props.style} ref = {n => this.marquee = n} onMouseOver={this.onPause} onMouseOut={this.onResume}>{this.props.text}</marquee>
            )
        } else {
            return(
                <marquee className={this.props.className} style={this.props.style}>{this.props.text}</marquee>
            )
        }
        
    }
}

export default Marquee;
