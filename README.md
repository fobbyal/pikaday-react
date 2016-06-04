# Pikaday react component wrapper

This component fully suppose all features avaialbe int Pikaday via the `config` prop. Please visit the [Pikdaday README](https://github.com/dbushell/Pikaday#configuration) for more detail. Just as pikakay this component does not require moment. However it will prioritize moment if you have it bundled with your application.

## installation
NPM is the only installation method supported at the moment.
```
npm install -S pikaday-react
```

## Code Example

```javascript
import React,{ Component } from 'react';
import PikadayWrapper from 'pikaday-react';

//the following must be imported in order to use the defaul theme
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

```

## What is next?

Tests coming soon
