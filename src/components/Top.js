import React, { Component } from 'react';
import TopContent from './TopContent';
import DataPrice from './Data.json';
import Data2 from './DataForS2.json';
import 'font-awesome/css/font-awesome.min.css';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPrice: DataPrice,
            name: ["chart1 col-2", "chart2 col-2", "chart3 col-2", "chart4 col-2", "chart6 col-2", "chart7 col-2"],
            tableStatus: 1,
            data: [],
            data3: [],
            data2: Data2
        };
    }

    handler = () => {
        this.setState({
            tableStatus: 2
        });
    }

    handler2 = () => {
        this.setState({
            tableStatus: 1
        });
    }

    getJSONP(url, success) {

        var ud = '_' + +new Date(),
            script = document.createElement('script'),
            head = document.getElementsByTagName('head')[0]
                || document.documentElement;

        window[ud] = function (data) {
            head.removeChild(script);
            success && success(data);
        };

        script.src = url.replace('callback=?', 'callback=' + ud);
        head.appendChild(script);

    }
    render() {

        var data = this.state.data
        this.state.dataPrice.forEach((item) => {
            data.push(item);
        });
        var row = []
        this.state.name.forEach((item) => {
            row.push(item);
        });

        var seri = []
        this.state.data2.forEach((item) => {
            seri.push(item);
        })
        var data2 = []
        var data3 = this.state.data3
        var i;
        for (i = 0; i < data.length; i++) {
            if (data[i].name === 'VN30' || data[i].name === 'VNIndex' || data[i].name === "HNX30" || data[i].name === "HNXIndex" || data[i].name === "UPCOM")
                data2.push(data[i]);
        }
        for (i = 0; i < data.length; i++) {
            if (data[i].name === 'VNXALL' || data[i].name === 'VN-100' || data[i].name === "VN-Stability" || data[i].name === "VN-Consumer Disc" || data[i].name === "VN-ALL")
                data3.push(data[i]);
        }



        return (
            <div>
                <div className="fixed-top">
                    <TopContent data={(this.state.tableStatus === 1) ? data : data3} row={row} action={this.handler} action2={this.handler2} seri={seri} />
                </div>
            </div>
        );
    }
}

export default Top;