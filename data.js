/* exported data */
var data = {
  entries: [],
  edit: null,
  nextEntryId: 1,
  view: 'home-page'
};

var previousEntriesJSON = localStorage.getItem('calendar-storage');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('calendar-storage', dataJSON);
});
