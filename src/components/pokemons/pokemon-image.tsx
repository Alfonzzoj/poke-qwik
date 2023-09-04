/* eslint-disable qwik/jsx-img */
import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  isFront: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, isFront = true, isVisible = false }: Props) => {
    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      isFront ? id : "back/" + id
    }.png`;

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Cargando . . .</span>}

        <img
          src={imageUrl}
          alt="Pokemon sprite"
          style={{ width: `${size}px`, height: `${size}px` }}
          onLoad$={() => (imageLoaded.value = true)}
          class={[
            {
              hidden: !imageLoaded.value,
              block: imageLoaded.value,
              "brightness-0": !isVisible,
            },
            "transition-all duration-400",
          ]}
        />
      </div>
    );
  }
);
