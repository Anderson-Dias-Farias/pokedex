import {
  addBusca,
  addFavorito,
} from "@/components/Store/pokemonSlice/pokemonSlice";
import { useAppDispatch } from "@/components/Store/pokemonSlice/useTypedSelector";
import {
  addPokemonM,
  remPokemonM,
  returnCorAtual,
} from "@/components/Utils/function";
import { PokemonRoot } from "@/components/Utils/interface";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import Evolutions from "../..";
import PokebolaFundo from "../../../../../../../../public/pokeball- fundo.png";
import Pokebola from "../../../../../../../../public/pokebola.png";

interface Props {
  children?: React.ReactNode;
  pokemon: PokemonRoot;
  IconType: (
    | {
        name: string;
        url: any;
      }
    | undefined
  )[];
  corAtual: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export default function DialogsEvolution({
  children,
  pokemon,
  IconType,
  corAtual,
  setOpen,
  open,
}: Props) {
  const dispatch = useAppDispatch();
  dispatch(addBusca(pokemon));

  const [capturado, setCapturado] = useState<boolean | null | undefined>(
    pokemon.favorit
  );

  const CapturarPokemon = () => {
    dispatch(addFavorito({ action: pokemon, ts: !capturado }));
    setCapturado(!capturado);
    if (capturado == false || capturado == undefined || capturado == null) {
      addPokemonM("Pokémon capturado");
    } else {
      remPokemonM("Pokémon solto");
    }
  };

  const cancelButtonRef = useRef(null);

  const Stats = pokemon?.stats?.map((a) => {
    let nome = a.stat.name.split("-");
    return {
      name: nome.length > 1 ? nome[0].charAt(0) + "-" + nome[1] : nome,
      base_state: a.base_stat,
    };
  });

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative mt-12 transform overflow-hidden  text-gray-700 font-semibold rounded-lg py-10 px-3 bg-white shadow-xl transition-all w-full sm:max-w-7xl flex-col flex items-center justify-center">
                  <h1 className="font-semibold text-4xl">
                    {pokemon?.name?.toUpperCase()}
                  </h1>
                  <div className="flex-wrap w-full flex items-center justify-center py-5  md:flex-nowrap">
                    <div className="flex flex-col items-center justify-evenly w-full max-w-full md:max-w-[30%] gap-1 ">
                      <div className="flex items-center justify-center gap-4 w-full">
                        <h1 className="w-full text-start max-w-[80px] md:max-w-[30%] md:text-end ">
                          ID
                        </h1>
                        <h1 className="font-normal w-full text-start">
                          #{pokemon?.id}
                        </h1>
                      </div>
                      <div className="flex items-center justify-center gap-4 w-full">
                        <h1 className="w-full text-start max-w-[80px] md:max-w-[30%] md:text-end ">
                          Height
                        </h1>
                        <h1 className="font-normal text-start w-full">
                          {(pokemon?.height / 10).toFixed(2)}m
                        </h1>
                      </div>
                      <div className="flex items-center justify-center gap-4 w-full">
                        <h1 className="w-full text-start max-w-[80px] md:max-w-[30%] md:text-end ">
                          Weight
                        </h1>
                        <h1 className="font-normal text-start w-full">
                          {(pokemon?.weight / 10).toFixed(2)}kg
                        </h1>
                      </div>

                      <div className="flex items-center justify-center gap-4 w-full">
                        <h1 className="w-full text-start max-w-[80px] md:max-w-[30%] md:text-end ">
                          Abilities
                        </h1>
                        <div className="w-full flex gap-2 flex-wrap">
                          {pokemon?.abilities.map((a, index) => (
                            <h1
                              style={{
                                backgroundColor: corAtual,
                                paddingLeft: "6px",
                                paddingRight: "6px",
                                borderRadius: "4px",
                                color: "#fff",
                                fontSize: "0.9rem",
                                fontWeight: "normal",
                                whiteSpace: "nowrap",
                              }}
                              key={index}
                            >
                              {a?.ability.name.toUpperCase()}
                            </h1>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-4 w-full">
                        <h1 className="w-full text-start max-w-[80px] md:max-w-[30%] md:text-end ">
                          Type
                        </h1>
                        <div className="w-full flex  gap-4">
                          {IconType?.map((t, index) => {
                            let nome = t?.name as string;

                            let cor = returnCorAtual(nome);
                            return (
                              <div
                                style={{
                                  color: "#fff",
                                  backgroundColor: cor,
                                  width: "100%",
                                }}
                                className="flex items-center justify-center rounded-[4px] w-full gap-2"
                                key={index}
                              >
                                <Image
                                  priority
                                  width={12}
                                  height={12}
                                  src={t?.url}
                                  alt={nome}
                                  title={nome}
                                />

                                <h1> {nome}</h1>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex items-center justify-start gap-4 w-full">
                        <h1 className="w-full text-start max-w-[80px] md:max-w-[30%] md:text-end ">
                          Forms
                        </h1>
                        <div className="w-full flex  gap-4 ">
                          {pokemon?.forms.map((a, index) => (
                            <h1
                              style={{
                                backgroundColor: corAtual,
                                paddingLeft: "6px",
                                paddingRight: "6px",
                                borderRadius: "4px",
                                color: "#fff",
                                width: "auto",
                              }}
                              key={index}
                            >
                              {a.name.toUpperCase()}
                            </h1>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-full">
                      <Image
                        className="w-full max-w-72"
                        priority
                        width={300}
                        height={300}
                        src={
                          pokemon
                            ? pokemon?.sprites.other["official-artwork"]
                                .front_default
                            : Pokebola
                        }
                        title={pokemon?.name ? pokemon?.name : "Pokebola"}
                        alt={pokemon?.name ? pokemon?.name : "Pokebola"}
                      />
                    </div>
                    <div className=" flex flex-col w-full items-center justify-center  md:max-w-[30%] ">
                      {Stats?.map((s, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-end gap-2 w-full md:max-w-full"
                          >
                            <h1 className=" w-full text-start max-w-[80px] md:max-w-[30%] md:text-end ">
                              {s.name}
                            </h1>
                            <div className="w-full  bg-slate-200 rounded-sm  sm:w-full ">
                              <p
                                style={{
                                  backgroundColor: corAtual,
                                  maxWidth: s.base_state + "%",
                                  borderRadius: "4px",
                                  fontSize: "10px",
                                  paddingRight: "4px",
                                }}
                                className="animate-fade-right animate-once animate-ease-in w-full text-end text-white "
                              >
                                {s?.base_state}%
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <h1 className="mb-7">EVOLUTION CHAIN</h1>
                  <Evolutions
                    id={pokemon?.id}
                    corAtual={corAtual}
                    openPai={open}
                    setOpenPai={setOpen}
                  />

                  <div
                    onClick={() => setOpen(!open)}
                    className="absolute top-1 right-2 rounded-[50%] border-2 cursor-pointer
                  md:hidden hover:text-red-600 hover:border-red-600
                 w-7 h-7 flex items-center justify-center border-gray-700  text-gray-700 "
                  >
                    <h1 className="font-black">X</h1>
                  </div>
                  <div
                    className=" absolute top-1 left-1 cursor-pointer"
                    onClick={() => CapturarPokemon()}
                  >
                    <Image
                      src={capturado ? Pokebola : PokebolaFundo}
                      width={40}
                      height={40}
                      alt={"Capturar Pokemon"}
                      title={"Capturar Pokemon"}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

//
