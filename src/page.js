import React from 'react';
import callAlphaVenture from './callAlphaVentureAPI.js';

export default 
class Page extends React.Component {
    constructor(props) {
        super(props);
       callAlphaVenture('IBM', '5min')
    }
    render() {
        return (
            <h1>This is a starter page.</h1>
        )
    }
}