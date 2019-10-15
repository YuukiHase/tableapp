import React from "react";
import { numberWithCommas } from './../utils/utils';

class DeadMatched extends React.Component {

    render() {
        let { matched } = this.props;
        let element = matched.map((m, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{m.symbol}</td>
                    <td>{m.price}</td>
                    <td>{numberWithCommas(m.volume)}</td>
                    <td>{numberWithCommas(m.value)}</td>
                    <td>{numberWithCommas(m.accumulatedValue)}</td>
                    <td>{m.time}</td>
                </tr>
            );
        });
        return (
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
                <tbody>
                    {element}
                </tbody>
            </table>
        );
    }
}

export default DeadMatched;