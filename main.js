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
