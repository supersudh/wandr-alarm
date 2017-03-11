import React from 'react';
import moment from 'moment';
moment().utcOffset("+05:30").format()
import DateTime from 'react-datetime';

export default class AddAlarm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selected: '' ,errors: '', recurring: false };
  }

  validateAlarm() {
    if(this.state.selected !== '') {
      this.props.addAlarm(moment(this.state.selected).format('Do, MMMM YYYY HH:mm'),this.state.recurring);
      this.setState({selected:'',errors: '', recurring: this.state.recurring});
    }
    else {
      this.setState({errors: 'Select a proper date and Time'});
    }
  }

  setAlarm(evt) {
    this.setState({selected: evt, recurring: this.state.recurring});
  }

  handleRecurring(evt) {
    let { selected, errors } = this.state;
    this.setState({selected, errors, recurring: !this.state.recurring});
  }

  render() {
    return (
      <div>
        <div>
          <span>
            <DateTime value={this.state.selected} onChange={this.setAlarm.bind(this)} />
          </span>
          <div className="checkbox">
            <label><input type="checkbox" value={this.state.recurring} onChange={this.handleRecurring.bind(this)} />Recurring</label>
          </div>
          <br />
          <span><button className="btn btn-primary" onClick={this.validateAlarm.bind(this)}>Save</button></span>
          <span style={{position:'relative', left:'5px'}}><button className="btn btn-primary" onClick={this.props.cancel}>Cancel</button></span>
        </div>
        <div>
          <p style={{color: 'red'}}>{this.state.errors ? this.state.errors : ''}</p>
        </div>
      </div>
    )
  }

}
