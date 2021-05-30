/* global data */

var $addButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');
var $entryForm = $modal.firstElementChild;
var $dayTitle = document.querySelector('.day-title');
var $tables = document.querySelectorAll('table');
var i;

document.addEventListener('click', changeDay);
$addButton.addEventListener('click', openModal);
$modal.addEventListener('click', cancelOpenModal);
$entryForm.addEventListener('submit', submitEntry);

function changeDay(event) {
  if (event.target.matches('.day-button') !== true) {
    return;
  }
  changeDayTitle(event);
  changeTable(event);
}

function changeDayTitle(event) {
  var day = event.target.getAttribute('data-day');
  data.view = day;
  var dayCap = day.charAt(0).toUpperCase() + day.slice(1);
  $dayTitle.textContent = 'Scheduled events for ' + dayCap;
}

function changeTable(event) {
  var day = event.target.getAttribute('data-day');
  for (i = 0; i < $tables.length; i++) {
    if ($tables[i].getAttribute('data-day') !== day) {
      $tables[i].classList.add('hidden');
    } else {
      $tables[i].classList.remove('hidden');
    }
  }
}

function openModal(event) {
  $modal.classList.remove('hidden');
}

function cancelOpenModal(event) {
  if (event.target.matches('.modal') === true) {
    $modal.classList.add('hidden');
  }
}

function submitEntry(event) {
  event.preventDefault();
  saveEntry();
  closeModal();
  data.nextEntryId = data.nextEntryId + 1;
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
function closeModal() {
  $modal.classList.add('hidden');
}

//

window.addEventListener('DOMContentLoaded', function (event) {
  addEntriesToPage();
});

function renderEntry(newEntry) {
  var $tr = document.createElement('tr');
  var $tdTime = document.createElement('td');
  var $tdDesc = document.createElement('td');

  $tdTime.textContent = newEntry.hour + ' ' + newEntry.AMPM;
  $tdDesc.textContent = newEntry.desc;

  $tr.appendChild($tdTime);
  $tr.appendChild($tdDesc);

  return $tr;
}

function addEntriesToPage() {
  for (var key in data.entries) {
    for (i = 0; i < data.entries[key].length; i++) {
      for (var j = 0; j < $tables.length; j++) {
        var day = $tables[j].getAttribute('data-day');
        if (key === day) {
          var entryValues = renderEntry(data.entries[key][i]);
          $tables[j].lastElementChild.appendChild(entryValues);
        }
      }
    }
  }
}
