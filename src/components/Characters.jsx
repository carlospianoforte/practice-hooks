import React, {useState, useEffect, useReducer, useMemo} from 'react';
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
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')  
            .then(response => response.json())
            .then(data => setCharacters(data.results))
    }, []);

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

    const handleSearch = event => {
        setSearch(event.target.value);
    }

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

    <div className="Search">
        <input type="text" className='input'  placeholder="Buscar..." value={search} onChange={handleSearch}/>
    </div>

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
