import React from 'react';
import Alarm from './alarm.component';
import AddAlarm from './addAlarm.component';

import moment from 'moment';
moment().utcOffset("+05:30").format()

var interval;

export default class Alarms extends React.Component {

  constructor(props) {
    super(props);
    this.renderAlarmDetails = this.renderAlarmDetails.bind(this);
    this.createAlarm = this.createAlarm.bind(this);
    this.removeAlarm = this.removeAlarm.bind(this);
    this.renderAlarmNew = this.renderAlarmNew.bind(this);
    this.monitorAlarms = this.monitorAlarms.bind(this);
    this.monitorAlarms();
  }

  componentWillMount() {
    let activeAlarms = JSON.parse(window.localStorage.getItem("alarms"));
    if (!activeAlarms) {
      activeAlarms = [];
    }
    this.state = { activeAlarms, pendingSet: false };
  }

  handleToggle(status,i) {
    let activeAlarms = this.state.activeAlarms;
    activeAlarms[i].active = status;
    this.localStorageOp(JSON.stringify(activeAlarms));
    this.setState({...this.state, activeAlarms});
    
  }

  renderAlarmDetails() {
    let str = <h2>Active Alarms</h2>;
    const alarms = this.state.activeAlarms.map((t, i) => {
      return (
        <div key={i}>
          {i == 0 ? str : ''}
          <Alarm
            index={i}
            alarm={t.time}
            recurring={t.recurring}
            days={t.days}
            active={t.active}
            handleToggle={this.handleToggle.bind(this)}
            removeAlarm={() => this.removeAlarm(i)} />
          <br />
        </div>
      );
    });
    return alarms;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.pendingSet == false && nextState.pendingSet == true) {
      return false;
    }
    return true;
  }

  componentDidUpdate (prevProps, prevState) {
    this.monitorAlarms();    
  }

  renderAlarmNew() {
    if (!this.state.pendingSet) {
      this.setState({ pendingSet: true });
      return (
        <AddAlarm
          addAlarm={this.createAlarm}/>
      )
    }
  }

  createAlarm(time,recurring, days, message) {
    let activeAlarms = JSON.parse(window.localStorage.getItem("alarms"));
    if (activeAlarms == undefined) {
      activeAlarms = [];
    }
    activeAlarms.push({time,recurring, days, message, active: true});
    this.localStorageOp(JSON.stringify(activeAlarms));
    this.setState({ activeAlarms, pendingSet: false });
  }

  removeAlarm(index) {
    let activeAlarms = JSON.parse(window.localStorage.getItem("alarms"));
    activeAlarms.splice(index, 1);
    this.localStorageOp(JSON.stringify(activeAlarms));
    this.setState({ activeAlarms, pendingSet: false });
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.renderAlarmDetails()}
        </ul>
        <hr />
        <h2>Add a new Alarm</h2>
        {this.renderAlarmNew()}
      </div>

    )
  }

  monitorAlarms() {
    clearInterval(interval);
    interval = setInterval(() => {
      let alarmsArray = this.state.activeAlarms;
      alarmsArray.forEach((alarm,i) => {
        if(alarm.time == moment().format('h:mm a') && alarm.active && alarm.today !== new Date().getDay())
        {
          alert(alarm.message);
          let activeAlarms = this.state.activeAlarms;
          if(!alarm.recurring) {
            activeAlarms[i].active = false;
          }
          else {
            activeAlarms[i].today = new Date().getDay();
          }
          this.localStorageOp(JSON.stringify(activeAlarms));
          this.setState({activeAlarms, pendingSet: false});
        }
      });
    },1000)
  }

  localStorageOp(activeAlarms) {
    window.localStorage.setItem("alarms", activeAlarms);
  }

}