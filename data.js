/* exported data */
var data = {
  entries: {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  },
  edit: null,
  nextEntryId: 1,
  view: 'home-page',
  currentDay: null
};

var previousEntriesJSON = localStorage.getItem('calendar-storage');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('calendar-storage', dataJSON);
});
