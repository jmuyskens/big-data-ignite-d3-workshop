let width = 300
let height = 400

// because we are hot loading:
d3.selectAll('svg').remove()

let svg = d3.select('div#chart')
  .append('svg')
    .attr('width', width)
    .attr('height', height)

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
