var $entryButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');

$entryButton.addEventListener('click', openModal);

function openModal(event) {
  if (event.target.matches('.add-button') !== true) {
    return;
  }
  $modal.classList.remove('hidden');
}
