"use client";
import Dialogs from "@/components/PokemonList/pokemonCard/Dialogs";
import { addBusca } from "@/components/Store/pokemonSlice/pokemonSlice";
import { useAppDispatch } from "@/components/Store/pokemonSlice/useTypedSelector";
import {
  remPokemonM,
  returnCorAtual,
  returnIcons,
  returnType,
} from "@/components/Utils/function";
import { PokemonRoot } from "@/components/Utils/interface";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

import Buscar from "../../../../public/lupa.png";

function BuscaPokemon() {
  const [busca, setBusca] = useState("");
  const [restornoBusca, setRetornoBusca] = useState<PokemonRoot>();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const BuscaPokemon = async () => {
    if (busca != "") {
      await axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/${busca
            .toLowerCase()
            .trimEnd()
            .replaceAll(" ", "-")}`
        )
        .then((res) => {
          if (res.data?.stats) {
            dispatch(addBusca(res.data));
            setRetornoBusca(res.data);
            setOpen(true);
          }
        })
        .catch(() => remPokemonM("Pokémon não encontrado"));
    } else {
      remPokemonM("Digite o nome do Pokémon");
    }
  };

  const type = returnType(restornoBusca);

  const CorAtual = returnCorAtual(type[0]);

  const Icons = returnIcons(type);

  return (
    <div className="BuscaPokemon">
      <input
        onKeyUp={(e) => (e.key == "Enter" ? BuscaPokemon() : "")}
        placeholder="Procurar Pokemon"
        onChange={(e) => setBusca(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => BuscaPokemon()}
      >
        <Image
          src={Buscar}
          alt="Buscar"
          title="Buscar"
          width={20}
          height={20}
        />
      </button>

      <Dialogs
        open={open}
        setOpen={setOpen}
        pokemon={restornoBusca as PokemonRoot}
        corAtual={CorAtual}
        IconType={Icons}
      />
    </div>
  );
}

export default BuscaPokemon;
