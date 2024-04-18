"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { getFetchPokemons } from "../Store/pokemonSlice/pokemonSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../Store/pokemonSlice/useTypedSelector";
import PokeLoad from "./pokeLoad";
import PokemonCard from "./pokemonCard";

function PokemonList() {
  const [atual, setAtual] = useState(0);
  const dispatch = useAppDispatch();

  const getNewPokemons = () => {
    dispatch(getFetchPokemons(atual));
    setAtual((state) => state + 20);
  };
  const scrollParaBaixo = () => {
    if (document.documentElement.scrollTop === 0) {
      window?.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    window?.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    getNewPokemons();
  }, [dispatch]);

  const { pk } = useAppSelector((state) => state.pokemons);

  const PkList = () => {
    if (atual != 0) {
      return (
        <div
          id="card"
          className="w-full h-full min-h-screen max-w-screen-xl flex justify-center flex-wrap gap-10 mt-28"
        >
          {pk
            .slice()
            .sort((a, b) => a.id - b.id)
            .filter((elem, index, self) => index === self.indexOf(elem))
            // .slice(0, pk.length - favoritos.length)
            .map((p) => {
              return <PokemonCard key={p.name} pokemon={p} />;
            })}
        </div>
      );
    } else {
      return <PokeLoad />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-evenly gap-8 min-h-screen ">
      {PkList()}
      {pk.length != 0 ? (
        <button
          className="text-white  border-2 border-white  rounded-2xl  p-3 mb-7  hover:bg-red-700 "
          onClick={() => {
            getNewPokemons();
            scrollParaBaixo();
          }}
        >
          Mais Pokemons
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default PokemonList;
