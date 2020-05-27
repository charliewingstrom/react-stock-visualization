import React from 'react';
import Page from './page.js';
import Map from './map.js';

export default 
class App extends React.Component {

    render() {
        return (
            <div className={'chartAndMap'}>
                <Page/>,
                <Map />
            </div>
            
        )
    }
}