import { Notify } from 'notiflix';

function onError(err) {
  Notify.failure('Oops, there is no country with that name');
}
export { onError };
