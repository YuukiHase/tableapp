import React, { Component } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'


class Chart2 extends Component {
     
    render() {
        var a = this.props.index;
        var seri = this.props.seri;
        var s2 = this.props.index.s2;
        const options = {
            
            chart: {
                type: 'spline',
                backgroundColor: '#151b1e',
                height:110,
                events:{
                    load: function () {
                        var series = this.series[0];
                        series.addPoint([Date.UTC(1970, 10,  2, 9 ,4),a],true,true)
                    }
                }  
            },
            rangeSelector: {
                enabled: false
            },
            
            navigator:{
        enabled:false
            },
            scrollbar:{
        enabled:false
            },
            credits:{
                enabled:false
            },
            xAxis: {
                
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b',
                    hour: '%Hh'
                },
                title: {
                    text: ''
                },
                tickAmount: 10,
                tickInterval: 1000 * 60 * 60,
                tickPixelInterval: 20,
                labels:{
                    style:{fontSize:9,
                        
                        }
                    
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                min: 0,
                labels:{
                    enabled:false
                },
                minorGridLineColor: '#F0F0F0',
                minorGridLineWidth: 0,
                minorTickInterval: 'auto',
                gridLineWidth: 0,
                plotLines: [{
                    value: 3.86,
                    width: 1,
                    color: '#F0F0F0',
                    dashStyle: 'dash',
                    label: {
                        text: '3.86',
                        align: 'right',
                        y: 12,
                        x: 0,
                        style: {
                            color:"#F0F0F0"
                        }
                    }
                }]
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: ' {point.y:.2f} m'
            },
        
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            },
        
            colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
            series: [{
                name: "Winter 2014-2015",
                data: s2,
                zones: [{
                    value: 0,
                    color: '#f7a35c'
                }, {
                    value: 3.86,
                    color: '#FF0017'
                }, {
                    color: '#0BDF39'
                }]
            }, {
                name: "Winter 2015-2016",
                data: seri
            }, ],
        
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            
        
        }
        options.xAxis.type='datetime';   
        
        return (
            <div style={{height:110,width:255}}>
  <HighchartsReact
    highcharts={Highcharts}
    constructorType={'stockChart'}
    options={options}
    
  />
  
</div>
        )
        
    }
}


export default Chart2;
