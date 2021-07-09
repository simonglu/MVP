import axios from 'Axios';
import React from 'React';

class MatchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayerSearched: '',
      currentPlayerMatchIDs: [],
      currentParticipants: [],
      currentGameMode: [],
      currentlyShowing: []
    };

    this.playerInfo = this.playerInfo.bind(this);
    this.matches = this.matches.bind(this);
  }

  playerInfo() {
    var current = this.state.currentPlayerSearched.name;
    var userSearch = document.getElementById('userSearch').value;
    var currentlySearched = document.getElementById('currentlySearchedSummonerName');
    currentlySearched.innerHTML = "Current Player: " + userSearch;
    if (current !== undefined) {
      if (current !== userSearch) {
        this.resetAll();
      }
    }

    var currentUserSearch = document.getElementById('currentlySearchedSummonerName');
    currentUserSearch.style.visibility = 'visible';
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
    for (var i = 0; i < 5; i++) {
      var nextMatch = this.state.currentPlayerMatchIDs[i];
      axios.get('/individualMatch', { params: { individualMatch: nextMatch } })
        .then((response) => {
          this.setState({
            currentParticipants: this.state.currentParticipants.concat([response.data.info.participants]),
            currentGameMode: this.state.currentGameMode.concat([response.data.info.gameMode])
          })
        })
    }
  }

  resetAll() {
    this.setState({
      currentPlayerSearched: '',
      currentPlayerMatchIDs: [],
      currentParticipants: [],
      currentGameMode: [],
      currentlyShowing: []
    });
  }

  fetchItems(itemNumber) {
  if(itemNumber !== 0) {
    return `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${itemNumber}.png`;
  }
  }

  fetchChampionIcon(championName) {
    return `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/champion/${championName}.png`
  }

  championInfo (championName) {
    axios.get(`http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion/${championName}.json`)
    .then((response) => {
      console.log(response.data.data);
    })
  }


  render() {
    return (
      <div id='MatchHistory'>
        <div className='Search'>
          <input type='text' placeholder='Enter a username' id='userSearch'></input>
          <button type='submit' id='submitButton' onClick={() => { this.playerInfo() }}>Submit</button>
          <h2 id='currentlySearchedSummonerName'>Current: </h2>
        </div>
        <div className='matchesForUser'>
          {this.state.currentParticipants.map((element) =>
            <div className='teams'>
              {element.map((e) =>
                <div className= 'summonersInGame'>
                  {e.win === true ?
                    <div id='winner' className='summonerName'>
                      <div className='inGameName'>{e.summonerName} </div>
                      <div className='statLine'>
                      {' K: ' + ' ' + e.kills + ' D: ' + e.deaths + ' A:' + e.assists}
                      <div className='damage'>{`Total damage Dealt: ${e.totalDamageDealt} Total Damage Taken: ${e.totalDamageTaken}`}</div>
                      </div>
                      <br></br>
                      <div className='allItems'>
                        <img src={this.fetchItems(e.item1)} className='items'>
                        </img>
                        <img src={this.fetchItems(e.item2)} className='items'>
                        </img>
                        <img src={this.fetchItems(e.item3)} className='items'>
                        </img>
                        <img src={this.fetchItems(e.item4)} className='items'>
                        </img>
                        <img src={this.fetchItems(e.item5)} className='items'>
                        </img>
                        <img src={this.fetchItems(e.item6)} className='items'>
                        </img>
                      </div>
                      <br></br>
                      <img src={this.fetchChampionIcon(e.championName)} class='championName' onClick={()=>{this.championInfo(e.championName)}}></img>
                    </div> :
                    <div id='loser' className='summonerName'>
                       <div className='inGameName'>{e.summonerName} </div>
                      <div className='statLine'>
                      {' K: ' + ' ' + e.kills + ' D: ' + e.deaths + ' A:' + e.assists}
                      <div className='damage'>{`Total damage Dealt: ${e.totalDamageDealt} Total Damage Taken: ${e.totalDamageTaken}`}</div>
                      </div>
                      <div className='allItems'>
                        <img src={this.fetchItems(e.item1)} className='items'>
                        </img>
                        <img src={this.fetchItems(e.item2)} className='items'>
                        </img>
                        <img src={this.fetchItems(e.item3)} className='items'>
                        </img>
                        <img src={this.fetchItems(e.item4)} className='items'>
                        </img>
                        <img src={this.fetchItems(e.item5)} className='items'>
                        </img>
                        <img src={this.fetchItems(e.item6)} className='items'>
                        </img>
                      </div>
                      <br></br>
                      <img src={this.fetchChampionIcon(e.championName)} class='championName'></img>
                    </div>}
                </div>)}
            </div>)}
        </div>
        <div className='gameType'>

        </div>
      </div>
    );
  }
}

export default MatchHistory;
