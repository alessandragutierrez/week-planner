/* global data */

var $addButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');

$addButton.addEventListener('click', openModal);

function openModal(event) {
  $modal.classList.remove('hidden');
}
