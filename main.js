/* global data */

var $entryButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');
var $entryForm = document.querySelector('.entry-form');
var $tableTime = document.querySelector('.time');
var $tableDesc = document.querySelector('.desc');

$entryButton.addEventListener('click', openModal);
function openModal(event) {
  if (event.target.matches('.add-button') !== true) {
    return;
  }
  $modal.classList.remove('hidden');
}

$entryForm.addEventListener('submit', submitEntry);

function submitEntry(event) {
  saveEntry(event);
  closeModal(event);
}

function saveEntry(event) {
  var newEntry = {
    day: $entryForm.elements.day.value,
    time: $entryForm.elements.time.value,
    desc: $entryForm.elements.desc.value
  };

  data.entries.push(newEntry);
}

function closeModal(event) {
  if (event.target.matches('.submit-button') !== true) {
    return;
  }
  $modal.classList.add('hidden');
}

// function addToSchedule(event) {

// }

function renderEntry() {
  var $tr = document.createElement('tr');
  var $td = document.createElement('td');

  $tr.appendChild($td);

  $td.textContent =
}

function appendToTable() {
  $table.
}
