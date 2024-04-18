import { PokemonsEvolution } from "@/components/Utils/interface";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CardEvolution from "./CardEvolution";

interface Props {
  id: number;
  corAtual: string;
  openPai: boolean;
  setOpenPai: Dispatch<SetStateAction<boolean>>;
}

interface evolutionList {
  name: string | undefined;
  trigger_name: string | null;
  item: any;
}

function Evolutions({ id, corAtual, openPai, setOpenPai }: Props) {
  const [evolucao, setEvolucao] = useState<PokemonsEvolution>();

  useEffect(() => {
    const getEvo = async () => {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then(async (res) => {
          await axios
            .get(res.data.evolution_chain.url)
            .then((res) => setEvolucao(res.data));
        });
    };
    getEvo();
  }, [id]);

  const orderEvolution = () => {
    let evoChain: evolutionList[] = [];

    let evoData = evolucao?.chain;

    do {
      let numberOfEvolutions = evoData?.evolves_to.length as number;

      evoChain.push({
        name: evoData?.species.name,

        trigger_name: !evoData
          ? null
          : evoData?.evolves_to[0]?.evolution_details[0]?.trigger.name,

        item: !evoData
          ? null
          : evoData.evolves_to[0]?.evolution_details[0]?.item,
      });

      if (numberOfEvolutions > 1) {
        for (let i = 1; i < numberOfEvolutions; i++) {
          evoChain.push({
            name: evoData?.evolves_to[i]?.species.name,

            trigger_name: !evoData?.evolves_to[i]
              ? null
              : evoData?.evolves_to[i]?.evolution_details[0]?.trigger.name,

            item: !evoData?.evolves_to[i]
              ? null
              : evoData.evolves_to[i]?.evolution_details[0]?.item,
          });
        }
      }

      evoData = evoData?.evolves_to[0];
    } while (evoData != undefined && evoData.hasOwnProperty("evolves_to"));

    return evoChain;
  };

  const RES = orderEvolution();

  const PokeList = RES?.map((p, index) => {
    return (
      <CardEvolution
        key={index}
        pokemon={p}
        index={index}
        corAtual={corAtual}
        setOpenPai={setOpenPai}
        openPai={openPai}
      />
    );
  });

  return (
    <div className="w-full h-auto flex items-center justify-evenly flex-wrap ">
      {PokeList}
    </div>
  );
}

export default Evolutions;
