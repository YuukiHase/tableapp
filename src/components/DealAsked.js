import React from "react";
import { numberWithCommas } from './../utils/utils';

class DealAsked extends React.Component {

    render() {
        let { asked } = this.props;
        let element = asked.map((a, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{a.symbol}</td>
                    <td>{a.price}</td>
                    <td>{numberWithCommas(a.volume)}</td>
                    <td>{a.time}</td>
                </tr>
            );
        });
        return (
            <table className="table-deal deal-buy pl-10">
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

export default DealAsked;