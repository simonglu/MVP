import axios from 'Axios';
import React from 'React';

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    }

    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    axios.get('/favoritesList')
      .then((response) => {
        this.setState({
          favorites: response.data
        })
      })
  }

  removeFavorite(event) {
    var removedFavorite = event.target.value;
    var temp = this.state.favorites.slice();

    for (var i = 0; i < temp.length; i++) {
      if (removedFavorite === temp[i].username) {
        temp.splice(i, 1);
      }

      this.setState({
        favorites: temp
      })
    }

    axios.post('/removeFavorite', {username: removedFavorite});
  }

  addFavorite(){
    var newFavorite = document.getElementById('addFavorite').value;
    axios.post('/newFavorite', {username: newFavorite})
    this.setState({
      favorites: this.state.favorites.concat({username: newFavorite})
    })
  }

  render() {
    return (
      <div>
        <h2 id='FavoritesList'>
          Favorites List
          <div className='addToFavorites'>
            Add to Favorites
            <input type='text' className='favoritesText' id='addFavorite'></input>
            <button onClick={ ()=> {this.addFavorite()}} id ='remove'>Add</button>
          </div>
          <div>
            {this.state.favorites.map((element) =>
              <div className='favoritePlayers' id={element.username}>{element.username}
                <button className='remove' id='remove' onClick={this.removeFavorite} value={element.username}>Remove</button>
              </div>
            )}
          </div>
        </h2>

      </div>
    )
  }
}



export default FavoritesList;
