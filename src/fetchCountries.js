const URL = 'https://restcountries.com/v3.1/name/';
function fetchCountries(name) {
  return fetch(`${URL}${name}?fields=nameofficial,capital,population,flags.svg,languages
  `).then(resp => resp.json());
}

export { fetchCountries };
