// Hooks
import React, { useState, useEffect } from 'react'

// componentes
import { Button } from './src/components/Button';

// Iconos
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";

// styles
import './src/sass/App.scss';
import Card from './src/components/Card';

const App = () => {

    const [pokemonId, setPokemonId] = useState(0);
    const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

    useEffect(() => {
        getEvolutions(pokemonId);
        // console.log('Efecto ejecutado')
    }, [pokemonId]);
    
    async function getEvolutions(id){
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data = await response.json()

        let pokemonEvoArrays = []

        let pokemonLv1 = data.chain.species.name
        let pokemonLv1Img = await getPokemonImage(pokemonLv1)
        pokemonEvoArrays.push([pokemonLv1, pokemonLv1Img])

        if(data.chain.evolves_to.length !== 0) {
            let pokemonLv2 = data.chain.evolves_to[0].species.name;
            let pokemonLv2Img = await getPokemonImage(pokemonLv2)
            pokemonEvoArrays.push([pokemonLv2, pokemonLv2Img])
            console.log(pokemonEvoArrays)
            
            if(data.chain.evolves_to[0].evolves_to.length !== 0) {
                let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
                let pokemonLv3Img = await getPokemonImage(pokemonLv3)
                pokemonEvoArrays.push([pokemonLv3, pokemonLv3Img])                
            }
        }
        setPokemonEvolutions(pokemonEvoArrays)
    }
    
    async function getPokemonImage(name){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json()
        return data.sprites.other['official-artwork'].front_default;
        
    }

    const prevClick = () => {
        (pokemonId === 0)?
                setPokemonId(0):
                setPokemonId(pokemonId - 1)
    }

    const nextClick = () => {
        setPokemonId(pokemonId + 1)
    }

    return (
        <div className='app'>
        <div className={`card-container card${pokemonEvolutions.length}`}>
            {pokemonEvolutions.map(pokemon => 
            <Card 
            key={pokemon[0]}
              name={pokemon[0]}
              img={pokemon[1]} />)}
            
        </div>
          <div className='button-container'>
          <Button 
          icon={<TiArrowLeftOutline />} 
          handleClick={prevClick} />           
          {/* {pokemonName} */}
          <Button 
          icon={<TiArrowRightOutline />}
          handleClick={nextClick} />
          </div>
        </div>  
    );
}

export {App};