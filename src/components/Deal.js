import React from "react";
import { connect } from 'react-redux';
import DealBid from './DealBid';
import DealMatched from './DealMatched';
import DeadAsked from './DealAsked';

class Deal extends React.Component {

    render() {
        let { bid, matched, asked } = this.props.deal;
        return (
            <div style={{ height: 460 }}>
                <div className="header-deal-table">
                    <center>
                        Tổng khối lượng giao dịch thoả thuận:
                            <span id="volume-deal"> 6,993,870</span>
                        CP - Tổng giá trị giao dịch thoả thuận:
                            <span id="value-deal"> 86,369,058,000</span>
                        VND
                    </center>
                </div>

                {/* Header table */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 container-header-table">

                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        {/* Deal Bid */}
                        <table className="table-deal deal-buy pl-10 pr-10">
                            <colgroup>
                                <col width="15%"></col>
                                <col width="15%"></col>
                                <col width="15%"></col>
                                <col width="15%"></col>
                                <col width="20%"></col>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th colSpan="5">Chào mua</th>
                                </tr>
                                <tr>
                                    <th>STT</th>
                                    <th>CK</th>
                                    <th>Giá</th>
                                    <th>KL</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                        </table>

                    </div>


                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        {/* Deal Matched */}
                        <table className="table-deal match">
                            <colgroup>
                                <col width="10%"></col>
                                <col width="10%"></col>
                                <col width="10%"></col>
                                <col width="15%"></col>
                                <col width="15%"></col>
                                <col width="15%"></col>
                                <col width="15%"></col>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th colSpan="7">Khớp lệnh</th>
                                </tr>
                                <tr>
                                    <th>STT</th>
                                    <th>CK</th>
                                    <th>Giá</th>
                                    <th>KL</th>
                                    <th>Giá trị</th>
                                    <th>Giá trị tích lũy</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                        </table>

                    </div>


                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        {/* Deal Asked */}
                        <table className="table-deal deal-sell pl-10">
                            <colgroup>
                                <col width="15%"></col>
                                <col width="15%"></col>
                                <col width="15%"></col>
                                <col width="15%"></col>
                                <col width="20%"></col>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th colSpan="5">Chào bán</th>
                                </tr>
                                <tr>
                                    <th>STT</th>
                                    <th>CK</th>
                                    <th>Giá</th>
                                    <th>KL</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                        </table>

                    </div>

                </div>

                {/* Data table */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 container-body-table">

                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        {/* Deal Bid */}
                        <DealBid bid={bid} />

                    </div>


                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        {/* Deal Matched */}
                        <DealMatched matched={matched} />

                    </div>


                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        {/* Deal Asked */}
                        <DeadAsked asked={asked} />

                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deal: state.deal
    }
}

export default connect(mapStateToProps, null)(Deal);