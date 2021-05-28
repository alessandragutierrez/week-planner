/* global data */

var $entryButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');
var $submitButton = document.querySelector('.submit-button');

$entryButton.addEventListener('click', openModal);
$submitButton.addEventListener('click', submitEntry);

function submitEntry(event) {
  saveEntry(event);
  closeModal(event);
}

// function addToSchedule(event) {

// }

function openModal(event) {
  if (event.target.matches('.add-button') !== true) {
    return;
  }
  $modal.classList.remove('hidden');
}

function saveEntry(event) {
  var newEntry = {
    day: null,
    time: null,
    desc: null
  };
  data.entries.push(newEntry);
}

function closeModal(event) {
  if (event.target.matches('.submit-button') !== true) {
    return;
  }
  $modal.classList.add('hidden');
}
