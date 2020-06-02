function search(codes, str) {
  return _.pickBy(codes, (value, code) => code.startsWith(str));
}

const searchBar = document.getElementById('code-search');

$.getJSON("codes.json", (codes) => {
  const results = $('#results');
  _.map(codes, (value, key) => results.append(`<p>${key}: ${value}</p>`));

  searchBar.addEventListener('input', (event) => {
    results.empty();
    _.map(search(codes, event.target.value), (value, key) => results.append(`<p>${key}: ${value}</p>`));
  });

});
