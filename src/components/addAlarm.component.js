import React from 'react';
import moment from 'moment';
moment().utcOffset("+05:30").format()
// import DateTime from 'react-datetime';

import TimePicker from 'rc-time-picker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const format = 'h:mm a';
const now = moment().hour(0).minute(0);
const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

export default class AddAlarm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selected_time: '', errors: '', recurring: false, selected_days: [], message:'',selected_message:'' };
  }

  validateAlarm() {
    let { selected_time,selected_days, recurring, message } = this.state;
    if(selected_time == '' || !selected_time) {
      this.setState({ errors: 'Select a Time' });
    }
    else if(recurring && selected_days.length == 0) {
      this.setState({ errors: 'Select the days to repeat' });
    }
    else if(message == '') {
      this.setState({ errors: 'Add a Message' });
    }
    else {
      this.props.addAlarm(selected_time, recurring, selected_days, message);
      this.setState({ ...this.state,selected_time: '', errors: '' });
    }
  }

  // setAlarm(evt) {
  //   this.setState({ ...this.state,selected_time: evt});
  // }

  handleRecurring(evt) {
    this.setState({ ...this.state, recurring: !this.state.recurring });
  }

  onChange(value) {
    let diff = moment.duration(moment(new Date()).diff(value)).asDays();
    console.log(diff);
    let selected_message = diff < 0 ? "Today" : "Tomorrow";
    this.setState({...this.state, selected_time : value && value.format(format), selected_message});
  }

  // helpers for multiple days select
  menuItems(values) {
    return days.map((day) => (
      <MenuItem
        key={day}
        insetChildren={true}
        checked={values && values.includes(day)}
        value={day}
        primaryText={day}
      />
    ));
  }

  renderDaysSelector() {
    const {selected_days} = this.state;
    return (
      <SelectField
        multiple={true}
        hintText="Select a Day"
        value={selected_days}
        onChange={this.handleChange.bind(this)}
      >
        {this.menuItems(selected_days)}
      </SelectField>
    );
  }

  handleChange = (event, index, selected_days) => this.setState({...this.state,selected_days});

  watchMessage(evt) {
    this.setState({...this.state, message: evt.target.value})
  }

  render() {
    let { selected_time, selected_message } = this.state;
    console.log(this.state.recurring);
    return (
      <div>
        <div>
          <span>
            <TimePicker
              showSecond={false}
              onChange={this.onChange.bind(this)}
              format={format}
              use12Hours
            />
          </span>
          <span>
            <p>{selected_time ? 'You are setting alarm for '+selected_time+' '+selected_message : ''}</p>
          </span>
          <div className="checkbox">
            <label><input type="checkbox" value={this.state.recurring} onChange={this.handleRecurring.bind(this)} />Recurring</label>
          </div>
          <div className="days-container">
            {this.state.recurring ? this.renderDaysSelector.call(this) : ''}
          </div>
          <br />
          <div>
            <TextField
              hintText="Enter a Message"
              onChange={this.watchMessage.bind(this)}
            />
          </div>
          <span><button className="btn btn-primary" onClick={this.validateAlarm.bind(this)}>Save</button></span>
        </div>
        <div>
          <p style={{ color: 'red' }}>{this.state.errors ? this.state.errors : ''}</p>
        </div>
      </div>
    )
  }

}

// <DateTime value={this.state.selected_time} onChange={this.setAlarm.bind(this)} />
