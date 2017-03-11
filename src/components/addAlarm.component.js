import React from 'react';
import moment from 'moment';
moment().utcOffset("+05:30").format()
import DateTime from 'react-datetime';

export default class AddAlarm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selected: '' ,errors: '' };
  }

  validateAlarm() {
    if(this.state.selected !== '') {
      this.props.addAlarm(moment(this.state.selected).format('Do, MMMM YYYY HH:mm'));
      this.setState({selected:'',errors: ''});
    }
    else {
      this.setState({errors: 'Select a proper date and Time'});
    }
  }

  setAlarm(evt) {
    this.setState({selected: evt});
  }

  render() {
    return (
      <div>
        <div>
          <span>
            <DateTime value={this.state.selected} onChange={this.setAlarm.bind(this)} />
          </span>
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
