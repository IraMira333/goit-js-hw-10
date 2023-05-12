import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const listEl = document.querySelector('.country-list');
const cardEl = document.querySelector('.country-info');
const inputSearchBoxEl = document.querySelector('#search-box');

inputSearchBoxEl.addEventListener(
  'input',
  debounce(onFetchCountries, DEBOUNCE_DELAY)
);

function onFetchCountries(evt) {
  console.log(evt.target.value);
  let nameCountry = evt.target.value.trim();
  if (nameCountry === '') {
    listEl.innerHTML = '';
    cardEl.innerHTML = '';
    return;
  }
  fetchCountries(nameCountry)
    .then(result => {
      console.log(result.length);
      if (result.length > 10) {
        return tooManyCountries(result);
      }
      if (result.length === 1) {
        const markup = markupCard(result);
        return updateCard(markup);
      }
      if (result.length > 1) {
        const markup = markupList(result);
        return updateList(markup);
      }
    })

    .catch(err => {
      console.log('Second');
      onError(err);
    });
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
      ({
        name: { official },
        flags: { svg },
      }) => `<li class='country-list-item'>
    <img class='flag-icon' src='${svg}' alt='Flag of ${official}' width='60'>
    <h2 class='country-list-title'>${official}</h2>
  </li>`
    )
    .join('');
}

function markupCard(arrCountries) {
  return arrCountries
    .map(
      ({
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
      }) => `<div class='country-info-title'><img src='${svg}' alt='Flag of ${official}' width='60'>
  <h1>${official}</h1></div>
  <ul class='list country-info-list'>
    <li>Capital: ${capital}</li>
    <li>Population: ${population}</li>
    <li>Languages: ${languages}</li>
  </ul>`
    )
    .join('');
}

function updateCard(markup) {
  cardEl.innerHTML = markup;
  listEl.innerHTML = '';
}

function updateList(markup) {
  listEl.innerHTML = markup;
  cardEl.innerHTML = '';
}
