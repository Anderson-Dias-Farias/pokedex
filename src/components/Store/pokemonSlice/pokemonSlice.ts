
import { PokemonRoot, Type2 } from "@/components/Utils/interface";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface PokemonState {
  status:string
  pk: PokemonRoot[]  
}


const getStorLocal = (item:string) => {
  if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(item);
  }
  return null;
}

//@ts-ignore
const PkLocalsInit:PokemonRoot[] = getStorLocal('pkf') ? JSON.parse(getStorLocal('pkf')) : []
export const initialState: PokemonState = {
  status:'idle',
  pk:PkLocalsInit
};

export async function fetchPokemons(atual:number) {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${atual}`).then((res)=>res.data.results)
  const pokemonPromises = await res.map(
    async (pokemon: Type2) => {
      
      return await axios.get(pokemon.url).then((res)=>res.data)
    }
  );
  
  return await Promise.all(pokemonPromises);

}


export const getFetchPokemons = createAsyncThunk(
  "pokemonList/fetchPokemonListDetails",
  async (atual:number) => await fetchPokemons(atual)
);


  
  
const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {

    addFavorito:(state, action)=>{
     
  localStorage.clear();
  state.pk.map((p)=>{
    if(p.id == action.payload.action.id){
      p.favorit = action.payload.ts
    }
  })
  state
  const favoritos = state.pk.filter((pokemon) => pokemon.favorit === true);

  
  localStorage.setItem('pkf', JSON.stringify(favoritos));
    },
    addBusca:(state, action)=>{   
      const novoPokemon = action.payload
      const idsExistente = state.pk.map(pokemon => pokemon.id);

      const novoPokemonFiltrado = idsExistente.includes(novoPokemon.id)
      
      if(novoPokemonFiltrado == false){
        state.pk.push(novoPokemon);
      }
         
    }
    
  },
  extraReducers: builder =>
    builder
  .addCase(getFetchPokemons.fulfilled, (state, action:PayloadAction<PokemonRoot[]>) => {
      
    if(state.pk.length !== 0){
      

      const novosPokemons = action.payload;

      const idsExistente = state.pk.map(pokemon => pokemon.id);
  
      const novosPokemonsFiltrados = novosPokemons.filter(pokemon => !idsExistente.includes(pokemon.id));
  
   
      state.pk.push(...novosPokemonsFiltrados);
  
         
    
    }else{
      state.pk = action.payload
    }
  
  

    })

    
    


});


export const { addFavorito, addBusca } = pokemonSlice.actions;

export default pokemonSlice.reducer;




