function multiSearch (fuses, data, str) {
  return _.reduce(
    _.split(str, ' '),
    (acc, subStr) => _.merge(acc, search(fuses, data, subStr)),
    {}
  )
}

function search (fuses, data, str) {
  return _.mapValues(
    data,
    (vals, key) => _.pick(vals, _.map(fuses[key].search(str), 'item'))
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

function generateResults (id, data, fuses) {
  const searchBar = document.getElementById(`${id}-search`)
  const results = $(`#${id}-results`)

  render(data, results)

  searchBar.addEventListener('input', (event) => {
    results.empty()
    render(
      event.target.value
        ? multiSearch(fuses, data, event.target.value)
        : data,
      results
    )
  })
}

function getJSONBy (id) {
  $.getJSON(`${id}s.json`, (data) => {
    const fuses = _.mapValues(data, (vals, key) => new Fuse(_.keys(vals), {}))
    generateResults(id, data, fuses)
  })
}

getJSONBy('code')
getJSONBy('subcode')
