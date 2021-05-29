/* global data */

var $entryButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');
var $entryForm = document.querySelector('.entry-form');
var $tableTime = document.querySelector('.time');
var $tableDesc = document.querySelector('.desc');
var $dayOfWeek = document.querySelector('.day-title');
var $dayButton = document.querySelectorAll('.day-button');
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
  // debugger;
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

  for (var key in data.entries) {
    // if (!newEntry.day) return;
    if (newEntry.day === key) {
      data.entries[key].push(newEntry);
    }
    console.log(newEntry);
  }
}

function closeModal(event) {
  if (event.target.matches('.submit-button') !== true) {
    return;
  }
  $modal.classList.add('hidden');
}

// function addToSchedule(event) {

// }

function renderEntryTime(newEntry) {
  var $tr = document.createElement('tr');
  var $td = document.createElement('td');

  $td.textContent = newEntry.time;
  $tr.appendChild($td);

  return $tr;
}

function renderEntryDesc(newEntry) {

  var $tr = document.createElement('tr');
  var $td = document.createElement('td');

  $td.textContent = newEntry.desc;
  $tr.appendChild($td);

  return $tr;
}

function appendToPage() {
  for (var i = 0; i < data.entries.monday.length; i++) {
    var entriesValue = renderEntryTime(data.entries.monday[i]);
    $tableTime.lastElementChild.appendChild(entriesValue);
    entriesValue = renderEntryDesc(data.entries.monday[i]);
    $tableDesc.lastElementChild.appendChild(entriesValue);
  }

}

window.addEventListener('DOMContentLoaded', appendToPage);

function addNew() {
  var newEntry = renderEntryTime(data.entries.monday[data.entries.monday.length - 1]);
  $tableTime.lastElementChild.appendChild(newEntry);
  newEntry = renderEntryDesc(data.entries.monday[data.entries.monday.length - 1]);
  $tableDesc.lastElementChild.appendChild(newEntry);
}

// function checkEmpty(newEntry) {
//   var $td = document.querySelectorAll('td');
//   for (i = 0; i < $td.length; i++) {
//     if ($td[i].innerText !== undefined) {
//       addNew();
//       break;
//     } else {
//       $td[i].textContent = newEntry.desc;
//     }
//   }
// }

// check if all the <td>s are empty
// query select all the table names
// loop through the node list and check if innertext of the <td>s are empty,
// if not empty, run the functions from earlier. If empty, update the test value
// of the <td>s instead of creating new ones =-)

document.addEventListener('click', changeDay);
function changeDay(event) {
  if (event.target.matches('.day-button') !== true) {
    return;
  }
  var day = event.target.getAttribute('data-day');
  var dayCap;
  function capitalizeFirstLetter() {
    dayCap = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  }
  capitalizeFirstLetter();
  $dayOfWeek.textContent = ('Schedule events for ' + dayCap);

  data.currentDay = day;
}
