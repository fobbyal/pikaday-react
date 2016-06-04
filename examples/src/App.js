import React,{ Component } from 'react';
import PikadayWrapper from '../../src/pikaday-react';

require('!!style-loader!css-loader!pikaday/css/pikaday.css');


class App extends Component {
  constructor() {
    super();
    this.state = { date:new Date() };
    this.dateChanged = this.dateChanged.bind(this);
  }

  dateChanged(date) {
    this.setState({ date });
  }
  
  render() {
    return (
      <div>
        <h1> Pikaday React Wrapper Example </h1>
        <PikadayWrapper date={this.state.date} onDateChange ={this.dateChanged}/>
      </div> 
    );

  }
};

export default App;

