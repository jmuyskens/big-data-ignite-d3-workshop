// Write your D3.js code here
let margin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 150
}
if (window.timer) window.timer.stop()
let heading = d3.select('h1')
let width = 700 - margin.left - margin.right
let height = 700 - margin.top - margin.bottom

d3.select('svg').remove()

let scale = d3.scaleLinear()
  .range([0, width])

let svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)

let render = (data) => {
  svg.selectAll('rect')
    .data(data, d => d.name)
    .join(
      enter => enter
        .append('rect')
        .attr('height', 20)
        .attr('fill', d => d.name === "Canada" ? 'salmon' : 'black'),
      update => update,
      exit => exit.remove()
    )
    .transition()
    .delay((d, i) => i * 10)
    .attr('y', (d, i) => i * 25)
    .attr('width', d => scale(+d.lifeExpectancy))

  svg.selectAll('text')
    .data(data, d => d.name)
    .join(
      enter => enter.append('text').text(d => d.name)
        .attr('dy', 18)
        .attr('dx', -5)
        .attr('text-anchor', 'end'),
      update => update,
      exit => exit.remove()
    )
    .transition()
    .delay((d, i) => i * 10)
    .attr('y', (d, i) => i * 25)

}

d3.csv('../../data/oecd.csv').then(data => {
  data = data.sort((b, a) => +a.lifeExpectancy - +b.lifeExpectancy)
  let dataYears = d3.nest()
    .key(d => +d.year)
    .entries(data)

  let maxValue = d3.max(
    dataYears[0].values.map(d => +d.lifeExpectancy))
  scale.domain([0, maxValue])


  let year = 0
  window.timer = d3.interval(() => {
    heading.text(1970 + year)
    render(dataYears[year].values)
    year += 1
    if (year > 45) year = 0
  }, 5000)
})
