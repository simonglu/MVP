import axios from 'Axios';
import React from 'React';

class MatchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayerSearched: '',
      currentPlayerMatchIDs: [],
      currentPlayerMatches: [],
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
    var nextMatch = this.state.currentPlayerMatchIDs[0];
    axios.get('/individualMatch', { params: { individualMatch: nextMatch } })
    .then((response)=> {
      this.setState({
        currentPlayerMatches: this.state.currentPlayerMatches.concat(response.data.info.participants)
      })
      console.log(response.data.info.participants);
    })
  }

  loadMoreMatches() {
    var nextMatch = this.state.currentPlayerMatchIDs[0];
    axios.get('/individualMatch', { params: { individualMatch: nextMatch } })
    .then((response)=> {
      this.setState({
        currentPlayerMatches: this.state.currentPlayerMatches.push([response.data.info.participants])
      })
      console.log(response.data.info.participants);
    })
  }

  render() {
    return (
      <div id ='MatchHistory'>
        <input type='text' placeholder='Enter a username' id='userSearch'></input>
        <button type='submit' onClick={this.playerInfo}>Click</button>
        <button type = 'test' onClick = {this.loadMoreMatches}></button>
        <div className='matchesForUser'>
          {this.state.currentPlayerMatches.map((element)=>
          element.summonerName.toLowerCase() === this.state.currentPlayerSearched.name.toLowerCase() ?
          console.log('true') :
          console.log('false'))}
        </div>
      </div>
    );
  }
}

export default MatchHistory;
