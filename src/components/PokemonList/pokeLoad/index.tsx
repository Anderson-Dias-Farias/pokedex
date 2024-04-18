import Image from "next/image";
import pokebola from "../../../../public/pokebola.png";

function PokeLoad() {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center mt-8">
      <Image
        className="w-full h-full max-w-[50%] sm:max-w-[20%] max-h-[20%] animate-bounce"
        priority
        src={pokebola}
        alt="Pokebola"
      />
    </div>
  );
}

export default PokeLoad;
