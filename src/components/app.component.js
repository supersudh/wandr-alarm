import React, { Component } from 'react';
import Clock from './clock.component';
import Alarms from './alarms.component';

export default class App extends Component {
    render() {
        return (
            <div>
                <Clock />
                <Alarms />
            </div>
        );
    }
}