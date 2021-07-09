import axios from 'Axios';
import React from 'React';

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: ['TSMFTX SwordArt7', 'Tactical', 'Shiba Inu', 'DoubleLift', 'TL Jenkins', 'LOLTYLER1']
    }

    this.removeFavorite = this.removeFavorite.bind(this);
  }

  removeFavorite(event) {
    var removedFavorite = event.target.value;
    var temp = this.state.favorites.slice();

    for (var i = 0; i < temp.length; i++) {
      if (removedFavorite === temp[i]) {
        console.log(temp[i]);
        temp.splice(i, 1);
      }

      this.setState({
        favorites: temp
      })
    }
  }

  render() {
    return (
      <div>
        <h2 id='FavoritesList'>
          Favorites List
          <div>
            {this.state.favorites.map((element) =>
              <div className='favoritePlayers' id={element}>{element}
                <button className='remove' id='remove' onClick={this.removeFavorite} value={element}>Remove</button>
              </div>
            )}
          </div>
        </h2>

      </div>
    )
  }
}



export default FavoritesList;
