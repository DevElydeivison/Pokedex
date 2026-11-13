const pokeApi = {};
const pokemonCache = new Map();
const API_ROOT = 'https://pokeapi.co/api/v2/pokemon/';
function convertPokeApiDetailToPokemon(data) {
 const pokemon = new Pokemon();
 pokemon.number = data.id;
 pokemon.name = data.name;
 pokemon.types = data.types.map(item => item.type.name);
 pokemon.type = pokemon.types[0];
 pokemon.photo = data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.other?.dream_world?.front_default || data.sprites?.front_default || '';
 pokemon.weight = data.weight / 10;
 pokemon.height = data.height / 10;
 pokemon.stats = Object.fromEntries(data.stats.map(s => [s.stat.name, s.base_stat]));
 pokemon.abilities = data.abilities.map(a => a.ability.name);
 return pokemon;
}
pokeApi.getPokemonById = async id => {
 const key = String(id).trim().toLowerCase();
 if (pokemonCache.has(key)) return pokemonCache.get(key);
 const response = await fetch(`${API_ROOT}${encodeURIComponent(key)}`);
 if (!response.ok) throw new Error(`Não foi possível carregar o Pokémon ${key}.`);
 const pokemon = convertPokeApiDetailToPokemon(await response.json());
 pokemonCache.set(key, pokemon);
 pokemonCache.set(String(pokemon.number), pokemon);
 return pokemon;
};
pokeApi.getPokemonDetail = pokemon => pokeApi.getPokemonById(pokemon.url.split('/').filter(Boolean).pop());
pokeApi.getPokemons = async (offset = 0, limit = 20) => {
 const ids = Array.from({length:limit}, (_,i) => offset+i+1);
 const results = await Promise.allSettled(ids.map(id => pokeApi.getPokemonById(id)));
 return results.filter(r => r.status === 'fulfilled').map(r => r.value);
};
