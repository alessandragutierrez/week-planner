/* global data */

var $addButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');
var $entryForm = $modal.firstElementChild;

$addButton.addEventListener('click', openModal);
function openModal(event) {
  $modal.classList.remove('hidden');
}

$entryForm.addEventListener('submit', submitEntry);
function submitEntry(event) {
  closeModal();
}

function closeModal() {
  $modal.classList.add('hidden');
}
