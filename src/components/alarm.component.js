import React from 'react';
import Toggle from 'material-ui/Toggle';
import { styles } from './styles';

export default class Alarm extends React.Component {

  constructor(props) {
    super(props);
  }

  handleToggle(evt,status) {
    this.props.handleToggle(status,this.props.index)
  }

  recurringLogic() {
    
      let str = this.props.days.map((t,i) => i == 0 ? t : ','+t );
      return str+' '+this.props.alarm;
  }

  render() {
    return (
      <div>
        <li className="list-group-item">
        <span className="pull-left">
          <Toggle
            label="Status"
            defaultToggled={this.props.active}
            style={styles.toggle}
            onToggle={this.handleToggle.bind(this)}
          />
        </span>
        <span>
          {this.props.recurring ? this.recurringLogic.call(this) : this.props.alarm}
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

// {this.props.recurring ? 'Everyday '+this.props.alarm : this.props.alarm}