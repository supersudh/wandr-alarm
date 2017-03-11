import React from 'react';

export default class Alarm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <li className="list-group-item">
        <span>
          {this.props.alarm}
        </span>
        <span className="pull-xs-right" style={{bottom: '7px',position:'relative'}}>
          <button className="btn btn-danger" onClick={this.props.removeAlarm}>
            Remove Alarm
          </button>
        </span>
        </li>
      </div>
    )
  }

}