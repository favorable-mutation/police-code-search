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

function generateResults (id, data, fuses) {
  const searchBar = document.getElementById(`${id}-search`)
  const results = $(`#${id}-results`)

  render(data, results)

  searchBar.addEventListener('input', (event) => {
    results.empty()
    render(
      event.target.value
        ? search(fuses, data, event.target.value)
        : data,
      results
    )
  })
}

function getJSONBy (id) {
  console.log(id)
  $.getJSON(`https://griffin-rademacher.info/bpd-code-search/${id}s.json`, (data) => {
    const fuses = _.mapValues(data, (vals, key) => new Fuse(_.keys(vals), {}))
    console.log(fuses)
    generateResults(id, data, fuses)
  })
}

getJSONBy('code')
getJSONBy('subcode')
