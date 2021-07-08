import axios from 'Axios';
import React from 'React';

class MatchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayerSearched: '',
      currentPlayerMatchIDs: [],
      currentPlayerMatches: [],
      currentlyShowing: []
    };

    this.playerInfo = this.playerInfo.bind(this);
    this.matches = this.matches.bind(this);
  }

  playerInfo() {
    var userSearch = document.getElementById('userSearch').value;
    axios.post('/playerInfo', { username: userSearch })
      .then((response) => {
        this.setState({
          currentPlayerSearched: response.data
        })
        var puuid = response.data.puuid;
        this.matches(puuid);
      })
  };

  matches(puuid) {
    axios.post('/matches', { puuid: puuid })
      .then((response) => {
        this.setState({
          currentPlayerMatchIDs: response.data
        })
        this.individualMatch();
      })
  }

  individualMatch() {
    for (var i = 0; i < 2; i++) {
      var nextMatch = this.state.currentPlayerMatchIDs[i];
      axios.get('/individualMatch', { params: { individualMatch: nextMatch } })
        .then((response) => {
          this.setState({
            currentPlayerMatches: this.state.currentPlayerMatches.concat([response.data.info.participants])
          })
        })
    }
  }

  render() {
    return (
      <div id='MatchHistory'>
        <input type='text' placeholder='Enter a username' id='userSearch'></input>
        <button type='submit' onClick={() => { this.playerInfo() }}>Click</button>
        <div className='matchesForUser'>
            {this.state.currentPlayerMatches.map((element) =>
              <div className ='teams'>
                {element.map((e) =>
                <div>
                  {e.win === true?
                  <div id='winner' className='summonerName'>
                    {e.summonerName}
                    </div> :
                  <div id='loser' className='summonerName'>
                    {e.summonerName}
                    </div>}
                </div>)}
              </div>)}
          </div>
        </div>
    );
  }
}

export default MatchHistory;
