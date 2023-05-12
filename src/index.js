import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputSearchBoxEl = document.querySelector('#search-box');

inputSearchBoxEl.addEventListener('input', onFetchCountries);

function onFetchCountries(evt) {
  console.log(evt.target.value);
  let nameCountry = evt.target.value.trim();
  if (nameCountry === '') {
    return;
  }
  fetchCountries(nameCountry)
    .then(result => {
      console.log(result.length);
      if (result.length > 10) {
        return tooManyCountries(result);
      }
      console.log(markupList(result));
    })
    //.then(arrCountries => console.log(markupList(arrCountries)))
    .catch(onError);
}
console.log(fetchCountries);

function tooManyCountries(result) {
  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function onError(err) {
  Notify.failure('Oops, there is no country with that name');
}

function markupList(arrCountries) {
  return arrCountries
    .map(
      ({ name: { official }, flags: { svg } }) => `<li>
    <img src='${svg}' alt='Flag of ${official}'>
    <h2>${official}</h2>
  </li>`
    )
    .join('');
}
