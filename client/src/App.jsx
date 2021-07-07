import axios from 'Axios';
import React from 'React';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.matchInfo = this.matchInfo.bind(this);
  }

  matchInfo() {
    var userSearch = document.getElementById('userSearch').value;
    console.log(userSearch);
    axios.post('/playerInfo', {username: userSearch}, {
      headers:
        { username: "DanVo" }
    })
    .then((response) => {
      console.log(response.data);
    })

  };


  render() {
    return (
      <div>
        <input type='text' placeholder='Enter a username' id='userSearch'></input>
        <button type='submit' onClick={this.matchInfo}>Click</button>
        hi
      </div>
    );
  }
}

export default App;
