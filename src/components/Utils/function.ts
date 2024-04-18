import { PokemonRoot } from "./interface"
import { colors } from "./pokemon-color-type"
import { PokeIcons } from "./type-icons"


export const returnType =(type?:PokemonRoot)=>{
    return type? type?.types.map((e)=> e.type.name) :[]
}

export const returnCorAtual = (type:string)=>{
//@ts-ignore
    return type? colors[type] :''
}
 

export const returnIcons = (type:string[])=>{
    return type? type.map((t)=> PokeIcons.find((i)=>i.name == t)) :[]
}

