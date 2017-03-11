import moment from 'moment';
moment().utcOffset("+05:30").format()


import React from 'react';

export default class Clock extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let time = (moment().format('Do, MMMM YYYY HH:mm:ss'));
    this.state = {time};
    this.updateTime.call(this);
  }

  updateTime() {
    setInterval(() => {
      let time = (moment().format('Do, MMMM YYYY HH:mm:ss'));
      this.setState({ time });
    }, 1000)

  }

  render() {
    return (
      <div>
        <br/>
        <br/>
        <h3 style={{color: '#147CE0'}}>{this.state.time}</h3>
        <hr />
      </div>

    )
  }

}