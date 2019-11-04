// Margin convention
let margin = {top: 10, right: 10, left: 10, bottom: 10}
let width = 700 - margin.right - margin.left
let height = 500 - margin.top - margin.bottom

// because we are hot loading:
d3.selectAll('svg').remove()

let svg = d3.select('div#chart')
  .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

let snowBody = svg.append('g')
  .attr('fill', 'white')
  .attr('stroke', 'black')

snowBody.append('circle')
  .attr('r', 60)
  .attr('cx', 150)
  .attr('cy', 230)

snowBody.append('circle')
  .attr('r', 40)
  .attr('cx', 150)
  .attr('cy', 150)

snowBody.append('circle')
  .attr('r', 30)
  .attr('cx', 150)
  .attr('cy', 90)

svg.append('ellipse')
  .attr('rx', 3)
  .attr('ry', 5)
  .attr('cx', 140)
  .attr('cy', 80)

svg.append('ellipse')
  .attr('rx', 3)
  .attr('ry', 5)
  .attr('cx', 160)
  .attr('cy', 80)

svg.append('path')
  .attr('d', `M 150,90
              L 170,95
              L 150,100 z`)

svg.append('text')
  .attr('x', 150)
  .attr('y', 40)
  .attr('text-anchor', 'middle')
  .text('Hello, world!')

d3.csv('../../data/oecd.csv').then(raw => {
  let data = raw.map(d => {
    d.healthExpPerCapita = +d.healthExpPerCapita
    d.year = +d.year
    return d
  })

  let dataYears = d3.nest()
    .key(function(d) { return d.year })
    .map(data)

  let dataCountries = d3.nest()
    .key(function(d) { return d.name })
    .entries(data)

  let maxValue = d3.max(data, d => +d.healthExpPerCapita)

  // find top 15 countries in 1970
  let topSpenders = dataYears['$1970']
    .sort((b, a) => +a.healthExpPerCapita - +b.healthExpPerCapita)
    .slice(0, 15)

  console.log(maxValue, topSpenders)
})
