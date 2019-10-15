import React from "react";
import { numberWithCommas } from './../utils/utils';

class DealBid extends React.Component {

    render() {
        let { bid } = this.props;
        let element = bid.map((b, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{b.symbol}</td>
                    <td>{b.price}</td>
                    <td>{numberWithCommas(b.volume)}</td>
                    <td>{b.time}</td>
                </tr>
            );
        });
        return (
            <table className="table-deal deal-buy pl-10 pr-10">
                <colgroup>
                    <col width="15%"></col>
                    <col width="15%"></col>
                    <col width="15%"></col>
                    <col width="15%"></col>
                    <col width="20%"></col>
                </colgroup>
                <tbody >
                    {element}
                </tbody>
            </table>
        );
    }
}

export default DealBid;