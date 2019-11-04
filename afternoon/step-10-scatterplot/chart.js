// Margin convention
let margin = {top: 30, right: 10, left: 50, bottom: 10}
let width = 700 - margin.right - margin.left
let height = 700 - margin.top - margin.bottom

// because we are hot loading:
if (window.timer) window.timer.stop()
d3.selectAll('svg').remove()
const DURATION = 200

let svg = d3.select('div#chart')
  .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

let scale = d3.scaleLinear().range([0, width])
let scaleY = d3.scaleLinear().range([height, 0])
let heading = d3.select('h1')
let axisG = svg.append('g')
  .attr('class', 'axis x')
  .attr('transform', `translate(0, ${height})`)

let axisYG = svg.append('g')
  .attr('class', 'axis y')
  .attr('transform', `translate(${width}, 0)`)

let axis = d3.axisTop(scale).tickSize(height).ticks(5)
let axisY = d3.axisLeft(scaleY).tickSize(width).ticks(5)

let render = (data) => {

  svg.selectAll('circle')
    .data(data, d => d.name)
    .join(
      enter => enter.append('circle')
        .style('fill', '#000')
        .attr('r', 0)
        .attr('cx', d => scale(d.healthExpPerCapita))
        .attr('cy', d => scaleY(d.lifeExpectancy))
        ,
      update => update,
      exit => exit
        .call(exit => exit.transition()
          .duration(100)
          .ease(d3.easeLinear)
          .attr('r', 1)
          .remove()
        )
    )
    .transition()
      .duration(DURATION)
      .ease(d3.easeLinear)
      .attr('r', 3)
      .attr('cx', d => scale(d.healthExpPerCapita))
      .attr('cy', d => scaleY(d.lifeExpectancy))

  /*svg.selectAll('text.country-label')
    .data(data, d => d.name)
    .join(
      enter => enter.append('text')
        .attr('class', 'country-label')
        .attr('dx', -3)
        .attr('dy', 16)
        .style('opacity', 0)
        .attr('y', (d, i) => i * 25)
        .style('text-anchor', 'end')
        .text(d => d.name),
      update => update,
      exit => exit
        .call(exit => exit.transition()
          .style('opacity', 0)
          .remove())
    )
    .transition()
    .style('opacity', 1)
    .attr('y', (d, i) => i * 25)*/
}

d3.csv('../../data/oecd.csv').then(raw => {
  let data = raw.map(d => {
    d.healthExpPerCapita = +d.healthExpPerCapita
    d.year = +d.year
    return d
  }).filter(d => d.healthExpPerCapita && d.lifeExpectancy)

  scale.domain([-0.5, d3.max(data, d => +d.healthExpPerCapita)])
  scaleY.domain(d3.extent(data, d => +d.lifeExpectancy))
  axisG.call(axis)
  axisYG.call(axisY)

  let dataYears = d3.nest()
    .key(function(d) { return d.year })
    .map(data)

  let dataCountries = d3.nest()
    .key(function(d) { return d.name })
    .entries(data)

  let year = 1970

  window.timer = d3.interval(() => {
    heading.text(year)
    render(dataYears['$' + year])
    year += 1
    if (year > 2015) year = 1970
  }, DURATION)
})
