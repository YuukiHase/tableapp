import React from 'react';

class HeaderRender extends React.Component {
    render() {
        let columns = this.props.columns;
        let style = this.props.style;
        let className = this.props.className;
        return (
            <div>
                <div className={`${className} header-row`} style={style}>
                    {columns}
                </div>
            </div>
        )
    }
}

export default HeaderRender;
