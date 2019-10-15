import React, { Component } from 'react';

class FooterChart extends Component {
    render() {
        return (
            <div className="footer-chart-index">
                <div style={{display: 'flex', flexWrap: 'wrap', lineHeight: '14px'}}>
                    <div style={{flex:"1 1 65px"}}>&nbsp;&nbsp;&nbsp;</div>
                    <div className="index-down" style={{flex: '1 1 auto'}}>
                        <i className="fa fa-arrow-down" ></i>&nbsp;{this.props.price.price}&nbsp; (-4.87&nbsp;&nbsp;-0.5%)
                        </div>
                    </div>
                    
                    <div className="vol-text-chart">
                    <div style={{flex: '1 1 auto'}}> 90,034,275 CP&nbsp;</div>
                    <div style={{flex: '1 1 auto'}}> 1,825,432 Tỷ&nbsp;</div>
                    
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', lineHeight: '14px'}}>
                        <div className="footer-up" style={{flex: '1 1 auto'}}>
                            <i className="fa fa-arrow-up" style={{verticalAlign: 'middle'}}>
                                &nbsp;</i>
                                <span>108 </span>
                                <span style={{color: 'rgb(253, 2, 253)'}}>(10)</span>
                                </div>
                                <div style={{flex: '1 1 auto', color: 'rgb(253, 255, 18)'}}>
                                    <font className="footer-nochange">
                                        <i className="fa fa-window-minimize" style={{verticalAlign: 'middle'}} />
                                </font>&nbsp;<span className="footer-nochange">52</span>
                                </div>
                                <div className="footer-down" style={{flex: '1 1 auto'}}>
                                    <i className="fa fa-arrow-down" style={{verticalAlign: 'middle'}}>
                                        &nbsp;</i>
                                        <span style={{color: 'rgb(255, 0, 23)'}}>172</span> 
                                        <span style={{color: 'rgb(82, 211, 249)'}}>(3)</span>
                                        </div>
                                        <div className="exchange-status">Liên tục</div>
                                </div>

                </div>
        );
    }
}

export default FooterChart;