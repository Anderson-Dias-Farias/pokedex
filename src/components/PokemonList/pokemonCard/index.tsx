"use client";
import { addFavorito } from "@/components/Store/pokemonSlice/pokemonSlice";
import { useAppDispatch } from "@/components/Store/pokemonSlice/useTypedSelector";
import {
  returnCorAtual,
  returnIcons,
  returnType,
} from "@/components/Utils/function";
import { PokemonRoot } from "@/components/Utils/interface";
import Image from "next/image";
import { useState } from "react";
import pokebolaFundo from "../../../../public/pokeball- fundo.png";
import pokebola from "../../../../public/pokebola.png";
import Dialogs from "./Dialogs";

interface Props {
  pokemon: PokemonRoot;
}

function PokemonCard({ pokemon }: Props) {
  const dispatch = useAppDispatch();
  const [capturado, setCapturado] = useState(pokemon.favorit);
  const [open, setOpen] = useState(false);

  const type = returnType(pokemon);

  const CorAtual = returnCorAtual(type[0]);

  const Icons = returnIcons(type);

  const IconType = () => {
    return Icons.map((t) => {
      let nome = t?.name as string;

      let cor = returnCorAtual(nome) as string;
      return (
        <h1
          style={{ color: cor, backgroundColor: "#fff" }}
          className="flex items-center justify-center rounded-md w-full max-w-[50%] gap-1"
          key={nome}
        >
          <div
            style={{
              backgroundColor: cor,
              padding: "4px",
              borderRadius: "50%",
            }}
          >
            <Image
              priority
              width={10}
              height={10}
              src={t?.url}
              alt={nome}
              title={nome}
            />
          </div>
          {nome}
        </h1>
      );
    });
  };

  const CapturarPokemon = () => {
    dispatch(addFavorito({ action: pokemon, ts: !capturado }));
    setCapturado(!capturado);
  };

  return (
    <div
      style={{ backgroundColor: CorAtual }}
      className="w-full max-w-60 h-full flex p-3 items-center flex-col relative justify-start rounded-lg transition duration-300 animate-fade animate-once animate-ease-linear "
    >
      <Dialogs
        open={open}
        setOpen={setOpen}
        pokemon={pokemon}
        IconType={Icons}
        corAtual={CorAtual}
      >
        <Image
          className="w-44 h-auto max-h=[50%] rounded-xl "
          priority
          width={210}
          height={210}
          src={pokemon.sprites.other["official-artwork"].front_default}
          title={pokemon.name}
          alt={pokemon.name}
        />
      </Dialogs>

      <h1
        style={{ textShadow: "1px 1px #000" }}
        className="text-white font-bold text-2xl mt-[-5px] mb-3"
      >
        {pokemon.name}
      </h1>
      <div className=" flex w-full items-center justify-center gap-2 text-lg font-bold">
        {IconType()}
      </div>
      <h1 className="absolute top-0 left-2">#{pokemon.id}</h1>
      <div>
        <div
          className=" absolute top-1 right-1 cursor-pointer"
          onClick={() => CapturarPokemon()}
        >
          <Image
            src={capturado ? pokebola : pokebolaFundo}
            width={20}
            height={20}
            alt={"Capturar Pokemon"}
            title={"Capturar Pokemon"}
          />
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
