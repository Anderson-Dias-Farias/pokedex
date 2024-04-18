import {
  returnCorAtual,
  returnIcons,
  returnType,
} from "@/components/Utils/function";
import { PokemonRoot } from "@/components/Utils/interface";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import seta from "../../../../../../../public/arrow.svg";
import pokebola from "../../../../../../../public/pokebola.png";
import DialogsEvolution from "./DialogsEvolution";

interface Props {
  pokemon: {
    name: string | undefined;
    trigger_name: string | null;
    item: any;
  };
  index: number;
  corAtual: string;
  setOpenPai: Dispatch<SetStateAction<boolean>>;
  openPai: boolean;
}

interface Foto {
  id: number;
  foto: string;
  fotoItem?: string;
}

interface newPk {
  pokemon: PokemonRoot;
  foto?: string;
}

function CardEvolution({
  pokemon,
  index,
  corAtual,
  openPai,
  setOpenPai,
}: Props) {
  const [newPokemon, setNewPokemon] = useState<newPk>();
  //“Subterfúgio adaptativo”
  const [open, setOpen] = useState(false);
  const [cont, setCont] = useState(false);

  useEffect(() => {
    const pkFoto = async () => {
      if (pokemon.name != undefined) {
        return await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemon?.name}`)

          .then(async (res) => {
            //Em alguns pokémons retorna item:null ou undefined  mesmo sabendo que
            // só evolui com item ex: eevee, não encontrei uma url que retorna todas.

            if (pokemon.item?.name != undefined || pokemon.item?.name != null) {
              await axios.get(pokemon.item?.url).then((r) => {
                setNewPokemon({
                  // foto: res.data.sprites.other["official-artwork"].front_default,
                  pokemon: res.data,
                  foto: r.data.sprites.default,
                });
              });
            } else {
              setNewPokemon({
                pokemon: res.data,
              });
            }
          });
      }
    };
    pkFoto();
  }, [pokemon]);

  /*

Devido ao prazo do teste, fiz este “Subterfúgio adaptativo”, foi uma solução rápida para o problema de sobreposição dos “Dialogs”,

*/
  useEffect(() => {
    if (open == true) {
      setCont(true);
    } else {
      if (cont == true) {
        setOpenPai(false);
      }
    }
  }, [open]);

  const type = returnType(newPokemon?.pokemon);

  const CorAtual = returnCorAtual(type[0]);

  const Icons = returnIcons(type);

  return (
    <div className="flex items-center justify-center animate-fade-up ">
      <div className="flex items-center justify-center flex-col relative">
        <div className="relative ">
          {newPokemon?.foto != undefined ? (
            <Image
              className="absolute right-0 top-[-30%]"
              width={50}
              height={50}
              src={newPokemon.foto as string}
              alt={pokemon.item.name}
              title={pokemon.item.name}
            />
          ) : (
            ""
          )}
          {newPokemon == undefined ? (
            <Image
              priority
              src={pokebola}
              width={100}
              height={100}
              alt={
                pokemon?.name != undefined
                  ? pokemon.name
                  : "Imagem Pokemon Carregando"
              }
              title={
                pokemon?.name != undefined
                  ? pokemon.name
                  : "Imagem Pokemon Carregando"
              }
            />
          ) : (
            <DialogsEvolution
              setOpen={setOpen}
              open={open}
              pokemon={newPokemon?.pokemon as PokemonRoot}
              IconType={Icons as any}
              corAtual={CorAtual}
            >
              <Image
                priority
                src={
                  newPokemon != undefined
                    ? newPokemon.pokemon.sprites.other["official-artwork"]
                        .front_default
                    : pokebola
                }
                width={100}
                height={100}
                alt={
                  pokemon?.name != undefined
                    ? pokemon.name
                    : "Imagem Pokemon Carregando"
                }
                title={
                  pokemon?.name != undefined
                    ? pokemon.name
                    : "Imagem Pokemon Carregando"
                }
              />
            </DialogsEvolution>
          )}
        </div>
        <h1 className="mb-6">{pokemon.name}</h1>
        {pokemon.trigger_name != undefined && index == 0 ? (
          <Image
            style={{
              backgroundColor: corAtual,
              position: "absolute",
              right: "-30%",
              borderRadius: "50%",
            }}
            priority
            src={seta}
            width={30}
            height={30}
            alt="seta para direita"
            title="seta para direita"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CardEvolution;
