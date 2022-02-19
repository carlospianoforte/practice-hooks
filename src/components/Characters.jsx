import React, {useState, useReducer, useMemo, useRef, useCallback} from 'react';
import '../App.css';
import Search from './Search';
import useCharacters from '../hooks/useCharacters';

const intitialState = {
    favorites: []
}

const API='https://rickandmortyapi.com/api/character/'
        

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
    const [favorites, dispatch] = useReducer(favoriteReducer, intitialState);
    const [search, setSearch] = useState('');
    const searchInput = useRef(null);

    const characters = useCharacters(API);

    const handleClick = favorite =>{
        if(!favorites.favorites.includes(favorite)){
            dispatch({type: 'ADD_FAVORITE', payload: favorite});
        }else{
            alert("personaje repetido")
        }
        
    }

      const handleDelete = favorite =>{
        dispatch({type: 'REMOVE_FAVORITE', payload: favorite});
    }
    
    const handleSearch = useCallback (() => {
        setSearch(searchInput.current.value);
    }, []);

/*     const handleSearch = () => {
        setSearch(searchInput.current.value);
    } */

/*     const filteredUsers = characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
    }, [characters, search]); */
    
    const filteredUsers = useMemo(() => 
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        }), 
        [characters, search]
    );


  return (
    <>

    <Search 
        search={search} 
        searchInput={searchInput}
        handleSearch={handleSearch}
    />

    <div className='Characters2'>
        <div className="character_favorites">

    {favorites.favorites.map(favorite => (
        <div className='character_card' key={favorite.id}>
                 <div className='titles'>
                    <h2>{favorite.name}</h2>
                    <h3>{favorite.species}</h3>

                     { favorites.favorites.length >=1 ? 
                    <button type='button' onClick={()=> handleDelete(favorite.id)}>
                        Remove Favorites
                     {console.log(favorite.id)}
                    </button> : null} 

                </div>

            <div className='image_container'>
                <img className='character_image' src={favorite.image} alt="imagen" />
            </div>
        </div>

    ))}
        </div>

    </div>
      
    <div className='Characters'>
   
        {filteredUsers.map(character => (

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
