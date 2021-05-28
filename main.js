/* global data */

var $entryButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');
var $submitButton = document.querySelector('.submit-button');

$entryButton.addEventListener('click', openModal);

function openModal(event) {
  if (event.target.matches('.add-button') !== true) {
    return;
  }
  $modal.classList.remove('hidden');
}

$submitButton.addEventListener('click', closeModal);

function closeModal(event) {
  if (event.target.matches('.submit-button') !== true) {
    return;
  }
  $modal.classList.add('hidden');
}
