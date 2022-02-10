import React, {useState, useEffect, useReducer} from 'react';
import '../App.css';

const intitialState = {
    favorites: []
}

const favoriteReducer=(state, action) => {
    switch(action.type) {
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(favorite => favorite.id !== action.payload)
            }
        default:
            return state;
    }
}

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [favorites, dispatch] = useReducer(favoriteReducer, intitialState);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')  
            .then(response => response.json())
            .then(data => setCharacters(data.results))
    }, []);

    const handleClick = favorite =>{
        dispatch({type: 'ADD_FAVORITE', payload: favorite});
    }

  return (
    <>
    <div className='Characters'>
        <div className="character_card">

    {favorites.favorites.map(favorite => (
        <div className='character_card' key={favorite.id}>
                 <div className='titles'>
                    <h2>{favorite.name}</h2>
                    <h3>{favorite.species}</h3>

                </div>

            <div className='image_container'>
                <img className='character_image' src={favorite.image} alt="imagen" />
            </div>
        </div>

    ))}
        </div>

    </div>
      
    <div className='Characters'>
     
        {characters.map(character => (

            <div className='character_card' key={character.id}>
                <div className='titles'>
                    <h2>{character.name}</h2>
                    <h3>{character.species}</h3>
                    <button type='button' onClick={()=> handleClick(character)}>
                        Add Favorites
                    </button>
                </div>
                <div className='image_container'>
                    <img className='character_image' src={character.image} alt="imagen" />
                </div>

            </div>
        ))}
    </div>
    </>
  )
};

export default Characters;
