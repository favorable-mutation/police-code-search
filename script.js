function search (fuses, codes, str) {
  return _.mapValues(
    codes,
    (vals, code) => _.pick(vals, _.map(fuses[code].search(str), 'item'))
  )
}

function render (codes, results) {
  _.map(codes, (vals, key) => {
    results.append(`<h3>${key}</h3>`)
    _.map(vals, (meaning, code) => {
      results.append(`<p>${code}: ${meaning}</p>`)
    })
  })
}

$.getJSON('codes.json', (codes) => {
  const searchBar = document.getElementById('code-search')
  const results = $('#results')

  const fuses = _.mapValues(codes, (vals) => {
    return new Fuse(_.filter(_.keys(vals), (key) => !key.startsWith('_')), {})
  })

  render(codes, results)

  searchBar.addEventListener('input', (event) => {
    results.empty()
    render(
      event.target.value
        ? search(fuses, codes, event.target.value)
        : codes,
      results
    )
  })
})
