/* global data */

var $addButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');
var $entryForm = $modal.firstElementChild;

$addButton.addEventListener('click', openModal);
$modal.addEventListener('click', cancelOpenModal);
$entryForm.addEventListener('submit', submitEntry);

function openModal(event) {
  $modal.classList.remove('hidden');
}

function cancelOpenModal(event) {
  if (event.target.matches('.modal') === true) {
    $modal.classList.add('hidden');
  }
}

function closeModal() {
  $modal.classList.add('hidden');
}

function submitEntry(event) {
  event.preventDefault();
  saveEntry();
  data.nextEntryId = data.nextEntryId + 1;
  closeModal();
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
