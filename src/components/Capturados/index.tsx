"use client"
import React, { useEffect, useState } from 'react'
import { getFetchPokemons } from '../Store/pokemonSlice/pokemonSlice'
import { useAppDispatch, useAppSelector } from '../Store/pokemonSlice/useTypedSelector'
import { PokemonRoot, Type2 } from '../Utils/interface'
import PokemonCard from '../PokemonList/pokemonCard'
import PokeLoad from '../PokemonList/pokeLoad'
import Image from 'next/image'
import Pikachu from '../../../public/pikachu_lupa.jpg'



function PokemonCapiturados() {
  
    const {pk} = useAppSelector(state => state.pokemons)
    const favorito = pk.filter((p)=> p.favorit == true)
  
    
    const PkList = ()=>{
        if(favorito.length !== 0){
            return (
              <div className='w-full h-full max-w-screen-xl flex items-center justify-center flex-wrap gap-10 mt-28'>
                {favorito.map((p)=>{
                return <PokemonCard key={p.name} pokemon={p} />
            })}
              </div>
            )
        }else{
            return (
                <div className=' w-full h-full min-h-screen flex items-center justify-center flex-col text-center'>
               
                <Image src={Pikachu} width={150} height={150} priority alt='Detetive Pikachu' title='Detetive Pikachu'/> 
                <h1 style={{fontFamily:"Poke", color:"yellow", fontSize:'2.0rem', textShadow:'2px 2px blue'}}>Não ha Pokémons capturados</h1>
                </div>
            )
        }
    }

  return (
    <div className='w-full h-full flex flex-col items-center gap-8  min-h-screen'>
        {PkList()}
    </div>
  )
}

export default PokemonCapiturados