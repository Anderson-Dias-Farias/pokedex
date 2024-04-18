import PokemonList from "@/components/PokemonList";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 ">
      <PokemonList />
    </main>
  );
}
