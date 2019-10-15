import React, { Component } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import FooterChart from './FooterChart';
import Chart2 from './Chart2';

class TopContent extends Component {

mappingRow = () =>this.props.row.map((value,key) =>(
    <div className={value} key={key}>     
        <div className="content-chart">
            <div className="classic-theme-chart">
            <Chart2 index = 
            {this.props.data[key]} seri={this.props.seri}/>
                <FooterChart price={this.props.data[key]}/>  
                             
            </div>
        </div>
    </div>
    
))


    render() {
        
        return (
            <div className="row chart-wrapper">
            <div className="option col-1">
                <MenuList style={{boxSizing: 'content-box'}}>
            <MenuItem onClick={this.props.action} style={{minHeight:16,height:39}} >Chỉ số chính</MenuItem>
            <MenuItem style={{minHeight:16,height:39}} onClick={this.props.action2}>Chỉ số HSX</MenuItem>
            <MenuItem style={{minHeight:16,height:39}} >Chỉ số HSX2</MenuItem>
            <MenuItem style={{minHeight:16,height:39}} >Chỉ số HSX3</MenuItem>
          </MenuList>
            </div>
            
{this.mappingRow()}

</div>
        
        );
    }
}

export default TopContent;