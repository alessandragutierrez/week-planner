/* global data */

var $entryButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');
var $entryForm = document.querySelector('.entry-form');
var $tableTime = document.querySelector('.time');
var $tableDesc = document.querySelector('.desc');
var i;

$entryButton.addEventListener('click', openModal);
function openModal(event) {
  if (event.target.matches('.add-button') !== true) {
    return;
  }
  $modal.classList.remove('hidden');
}

$entryForm.addEventListener('submit', submitEntry);
$modal.addEventListener('click', closeModal);

function submitEntry(event) {
  event.preventDefault();
  saveEntry(event);
  addNew();
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

function renderEntry(newEntry) {

  var $tr = document.createElement('tr');
  var $td = document.createElement('td');

  $td.textContent = newEntry.time;
  $tr.appendChild($td);

  // $td.textContent =

  return $tr;
}

function appendToPage() {
  for (var i = 0; i < data.entries.length; i++) {
    var entriesValue = renderEntry(data.entries[i]);
    $tableTime.lastElementChild.appendChild(entriesValue);
  }
}

window.addEventListener('DOMContentLoaded', appendToPage);

function addNew() {
  var newEntry = renderEntry(data.entries[data.entries.length - 1]);
  $tableTime.lastElementChild.appendChild(newEntry);
}
