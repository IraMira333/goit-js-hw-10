import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const inputSearchBoxEl = document.querySelector('#search-box');

inputSearchBoxEl.addEventListener('input', onFetchCountries);

function onFetchCountries(evt) {
  console.log(evt.target.value);
}
console.log(fetchCountries);
fetchCountries('Ukraine').then(result => console.log(result));
