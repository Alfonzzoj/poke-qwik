/* eslint-disable qwik/jsx-img */
import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// import Counter from "~/components/starter/counter/counter";
// import Hero from "~/components/starter/hero/hero";
// import Infobox from "~/components/starter/infobox/infobox";
// import Starter from "~/components/starter/next-steps/next-steps";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal(1);
  const pokemonMAX = 1010;

  const isFrontPokemon = useSignal(true);
  const togglePokemon = $(() => {
    isFrontPokemon.value = !isFrontPokemon.value;
  });
  const isVisiblePokemon = useSignal(false);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0 || pokemonId.value + value > pokemonMAX)
      return;
    pokemonId.value += value;
    isVisiblePokemon.value = false;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      <PokemonImage
        id={pokemonId.value}
        size={200}
        isFront={isFrontPokemon.value}
        isVisible={isVisiblePokemon.value}
      />

      <h1></h1>
      <div class="mt-2">
        <button
          onClick$={() => changePokemonId(-1)}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button
          onClick$={() => changePokemonId(1)}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </button>
        <button onClick$={() => togglePokemon()} class="btn btn-primary mr-2">
          Voltear
        </button>
        <button
          onClick$={() => (isVisiblePokemon.value = !isVisiblePokemon.value)}
          class="btn btn-primary mr-2"
        >
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "First app with qwik",
      content: "Pokeqwik app",
    },
  ],
};
