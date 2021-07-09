import axios from 'Axios';
import React from 'React';
import MatchHistory from './MatchHistory.jsx';
import FavoritesList from './FavoritesList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className = 'App'>
          <div>
        <MatchHistory/>
        </div>
        <div id ='friendsList'>
          <FavoritesList/>
        </div>
      </div>
    );
  }
}

export default App;
