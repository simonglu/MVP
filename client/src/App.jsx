import axios from 'Axios';
import React from 'React';
import MatchHistory from './MatchHistory.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <MatchHistory/>
      </div>
    );
  }
}

export default App;
