/* exported data */

var data = {
  entries: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  },
  nextEntryId: 1,
  edit: null,
  currentDay: null
};

var previousDataJSON = localStorage.getItem('calendar-data');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('calendar-data', dataJSON);
});
