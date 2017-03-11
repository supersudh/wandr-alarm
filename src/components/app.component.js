import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
    render() {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to={'create_distributor'}>
                            Create Distributor
                        </Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}