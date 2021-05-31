/* global data */

var $addButton = document.querySelector('.add-button');
var $modal = document.querySelector('.modal');
var $entryForm = $modal.firstElementChild;
var $dayTitle = document.querySelector('.day-title');
var $tables = document.querySelectorAll('table');
var newEntry;
var entriesOrganized;
var i;

window.addEventListener('DOMContentLoaded', function (event) {
  addEntriesToPage();
  stayOnCurrentView();
  resetFormValues();
});

document.addEventListener('click', function (event) {
  if (event.target.matches('.day-button') !== true) {
    return;
  }
  changeDayTitle(event);
  changeTable(event);
  resetFormValues();
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  saveEntry();
  addEntryToPage();
  closeModal();
  resetFormValues();
  data.nextEntryId = data.nextEntryId + 1;
});

$addButton.addEventListener('click', openModal);
$modal.addEventListener('click', cancelOpenModal);

function renderEntry(newEntry) {
  var $tr = document.createElement('tr');
  var $tdTime = document.createElement('td');
  var $tdDesc = document.createElement('td');

  $tdTime.textContent = newEntry.hour + ' ' + newEntry.AMPM.toUpperCase();
  $tdDesc.textContent = newEntry.desc;

  $tr.appendChild($tdTime);
  $tr.appendChild($tdDesc);

  return $tr;
}

function addEntriesToPage() {
  for (var key in data.entries) {
    for (var j = 0; j < $tables.length; j++) {
      var day = $tables[j].getAttribute('data-day');
      if (key === day) {
        if (data.entries[key].length > 0) {
          chronologicallyOrganizeEntries(key);
          for (i = 0; i < entriesOrganized.length; i++) {
            var entryValues = renderEntry(entriesOrganized[i]);
            $tables[j].lastElementChild.appendChild(entryValues);
          }
        }
      }
    }
  }
}

function stayOnCurrentView() {
  var view = data.view;
  for (i = 0; i < $tables.length; i++) {
    if ($tables[i].getAttribute('data-day') !== view) {
      $tables[i].classList.add('hidden');
    } else {
      $tables[i].classList.remove('hidden');
    }
  }
  var dayCap = view.charAt(0).toUpperCase() + view.slice(1);
  $dayTitle.textContent = 'Scheduled events for ' + dayCap;
}

function chronologicallyOrganizeEntries(key) {
  var amEntries = [];
  var pmEntries = [];
  for (i = 0; i < data.entries[key].length; i++) {
    if (data.entries[key][i].AMPM === 'am') {
      amEntries.push(data.entries[key][i]);
    } else {
      pmEntries.push(data.entries[key][i]);
    }
  }
  entriesOrganized = [];
  if (amEntries[0] !== undefined) {
    sort(amEntries);
    for (i = 0; i < amEntries.length; i++) {
      entriesOrganized.push(amEntries[i]);
    }
  }
  if (pmEntries[0] !== undefined) {
    sort(pmEntries);
    for (i = 0; i < pmEntries.length; i++) {
      entriesOrganized.push(pmEntries[i]);
    }
  }
}

function sort(arrayX) {
  var arrayY = arrayX;
  for (i = 0; i < arrayX.length; i++) {
    for (var j = 1; j < arrayY.length; j++) {
      if (parseInt(arrayX[i].hour) < parseInt(arrayY[j].hour)) {
        var value = arrayY[j];
        arrayY[j] = arrayX[i];
        arrayX[i] = value;
      }
    }
  }
  value = arrayX[0];
  arrayX.splice(0, 1);
  arrayX.push(value);
  moveTwelvesToStart(arrayX);
  return arrayX;
}

function moveTwelvesToStart(arrayX) {
  for (i = 0; i < arrayX.length; i++) {
    if (parseInt(arrayX[i].hour) === 12) {
      var value = arrayX[i];
      arrayX.splice(i, 1);
      arrayX.unshift(value);
    }
  }
  return arrayX;
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

function saveEntry() {
  newEntry = {
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

function addEntryToPage() {
  var entryValues = renderEntry(newEntry);
  var entryDay = newEntry.day;
  for (i = 0; i < $tables.length; i++) {
    var tableDay = $tables[i].getAttribute('data-day');
    if (entryDay === tableDay) {
      $tables[i].lastElementChild.appendChild(entryValues);
    }
  }
}

function closeModal() {
  $modal.classList.add('hidden');
}

function openModal(event) {
  $modal.classList.remove('hidden');
}

function cancelOpenModal(event) {
  if (event.target.matches('.modal') === true) {
    $modal.classList.add('hidden');
  }
}

function resetFormValues() {
  $entryForm.elements.desc.value = '';
  $entryForm.elements.hour.value = '12';
  $entryForm.elements.day.value = data.view;
}
