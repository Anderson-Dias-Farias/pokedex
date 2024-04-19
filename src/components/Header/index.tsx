"use client";
import { Squash as Hamburger } from "hamburger-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import pokebola from "../../../public/pokebola.png";
import BuscaPokemon from "./BuscaPokemon";

function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="w-full h-16 bg-red-600 flex items-center justify-center fixed z-20 shadow-lg">
      <div className="w-full max-w-7xl flex items-center justify-between px-2">
        <div
          className="flex items-center justify-start gap-2 relative w-auto md:w-32 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={pokebola}
            width={50}
            height={50}
            alt="Pokebola"
            title="Pokebola"
            className="hover:animate-rotate-y cursor-pointer"
          />

          <div className="hidden sm:flex  animate-fade">
            <h1
              style={{
                fontFamily: "Poke",
                color: "yellow",
                fontSize: "2.5rem",
                textShadow: "2px 2px blue",
                position: "absolute",
                left: "58px",
                top: "-15px",
              }}
            >
              Pokédex
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-between gap-0 md:gap-8 w-full md:w-auto sm:justify-end">
          <div className="flex w-full items-center justify-center ml-2 sm:w-auto  sm:justify-end">
            <BuscaPokemon />
          </div>

          <div className="flex md:hidden">
            <Hamburger toggled={open} size={30} toggle={setOpen} color="#fff" />
          </div>
        </div>

        <div
          className="hidden md:flex  items-center justify-center w-36 border-b-2 border-blue-700 cursor-pointer"
          onClick={() => router.push("/capturados")}
        >
          <h1
            style={{
              fontFamily: "Poke",
              color: "yellow",
              fontSize: "1.5rem",
              textShadow: "2px 2px blue",
            }}
          >
            Capturados
          </h1>
        </div>
      </div>
      {open ? (
        <div className="md:hidden">
          <div
            className="flex items-end justify-end space-y-1  bg-red-600 absolute right-[0px] top-[60px] transition-all animate-fade-down pb-3 w-full shadow-xl cursor-pointer"
            onClick={() => router.push("/capturados")}
          >
            <p
              style={{
                fontFamily: "Poke",
                color: "yellow",
                fontSize: "1.1rem",
                textShadow: "2px 2px blue",
                marginLeft: "25px",
                width: "120px",
              }}
            >
              Capturados
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
