const container: HTMLElement | any = document.getElementById("app");
const pokemons: number = 100;

interface Ipokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

const fetchdata = (): void => {
  for (let i = 1; i <= pokemons; i++) {
    getPokemon(i);
  }
};

const getPokemon = async (id: number): Promise<void> => {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ");

  const transformPokemon: any = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  };
  console.log(transformPokemon);
  showPokemon(transformPokemon);
};

const showPokemon: any = (pokemon: Ipokemon): void => {
  let output = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src="${pokemon.image}" alt="${pokemon.name}">
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
            </div>
    `;
  container.innerHTML += output;
};

fetchdata();
