/* global data */

var $addButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');
var $entryForm = $modal.querySelector('.entry-form');

$addButton.addEventListener('click', openModal);
$entryForm.addEventListener('submit', submitEntry);

function openModal(event) {
  if (event.target.matches('.add-button') !== true) {
    return;
  }
  $modal.classList.remove('hidden');
}

function submitEntry(event) {
  event.preventDefault();
  closeModal();
  saveEntry();
  data.nextEntryId = data.nextEntryId + 1;
}

function closeModal() {
  $modal.classList.add('hidden');
}

function saveEntry() {
  var newEntry = {
    day: $entryForm.elements.day.value,
    hour: $entryForm.elements.hour.value,
    AMPM: $entryForm.elements.AMPM.value,
    desc: $entryForm.elements.desc.value,
    entryId: data.nextEntryId
  };
  findDay(newEntry);
}

function findDay(newEntry) {
  for (var key in data.entries) {
    if (newEntry.day === key) {
      data.entries[key].push(newEntry);
    }
  }
}
