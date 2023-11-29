import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

let tickDuration = 1500;

let top_n = 12;
let height = 600;
let width = 960;
let isActive = true;

const margin = {
  top: 80,
  right: 0,
  bottom: 5,
  left: 0,
};

startChart();

function startChart() {
  const svgExist = document.querySelector('.svg-main');
  const btnExist = document.querySelector('.play-btn');

  if (svgExist) document.body.removeChild(svgExist);
  if (btnExist) document.body.removeChild(btnExist);

  let svg = d3
    .select('body')
    .append('svg')
    .attr('width', 960)
    .attr('height', 600)
    .attr('class', 'svg-main');
  let barPadding = (height - (margin.bottom + margin.top)) / (top_n * 5);
  let title = svg
    .append('text')
    .attr('class', 'title')
    .attr('y', 24)
    .html('Top Characters by Popularity (2023)');
  let subTitle = svg.append('text').attr('class', 'subTitle').attr('y', 55).html('Search Count');
  let caption = svg
    .append('text')
    .attr('class', 'caption')
    .attr('x', width)
    .attr('y', height - 5)
    .style('text-anchor', 'end');

  genBtn();

  fetch('https://www.vydnb.com/db/popularity?top=20').then((data) => {
    let month = 1;
    let day = 1;

    data.forEach((d) => {
      (d.value = +d.value),
        // (d.lastValue = +d.lastValue),
        (d.value = isNaN(d.value) ? 0 : d.value),
        (d.month = +d.month),
        (d.colour = d3.hsl(Math.random() * 360, 0.75, 0.75)),
        (d.day = +d.day);
    });

    let yearSlice = data
      .filter((d) => d.month == month && d.day == day && !isNaN(d.value))
      .sort((a, b) => b.value - a.value)
      .slice(0, top_n);

    let previousYearSlice = [];

    yearSlice.forEach((d, i) => (d.rank = i));
    yearSlice = yearSlice.map((d) => {
      return { ...d, previousValue: d.value };
    });

    let x = d3
      .scaleLinear()
      .domain([0, d3.max(yearSlice, (d) => d.value)])
      .range([margin.left + 150, width - margin.right - 95]);

    let y = d3
      .scaleLinear()
      .domain([top_n, 0])
      .range([height - margin.bottom, margin.top]);

    let xAxis = d3
      .axisTop()
      .scale(x)
      .ticks(width > 500 ? 5 : 2)
      .tickSize(-(height - margin.top - margin.bottom))
      .tickFormat((d) => d3.format(',')(d));

    svg
      .append('g')
      .attr('class', 'axis xAxis')
      .attr('transform', `translate(0, ${margin.top})`)
      .call(xAxis)
      .selectAll('.tick line')
      .classed('origin', (d) => d == 0);

    svg
      .selectAll('rect.bar')
      .data(yearSlice, (d) => d.name)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', x(0))
      .attr('width', (d) => x(d.value) - x(0) - 1)
      .attr('y', (d) => y(d.rank) + 5)
      .attr('height', y(1) - y(0) - barPadding)
      .style('fill', (d) => d.colour)
      .style('z-index', 1000);

    svg
      .selectAll('text.label')
      .data(yearSlice, (d) => d.name)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', 140)
      // .attr('x', (d) => x(d.value) - 8)
      .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
      .style('text-anchor', 'end')
      .style('font-size', '10px')
      .html((d) => d.name);

    svg
      .selectAll('text.valueLabel')
      .data(yearSlice, (d) => d.name)
      .enter()
      .append('text')
      .attr('class', 'valueLabel')
      .attr('x', (d) => x(d.value) + 5)
      .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
      .text((d) => d3.format(',.0f')(d.previousValue));

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    let yearText = svg
      .append('text')
      .attr('class', 'yearText')
      .attr('x', width - margin.right)
      .attr('y', height - 25)
      .style('text-anchor', 'end')
      .html(`${months[month - 1]} - ${day}`)
      .call(halo, 10);

    //! interval
    let ticker = d3.interval((e) => {
      previousYearSlice = structuredClone(yearSlice);
      yearSlice = data
        .filter((d) => d.month == month && d.day == day && !isNaN(d.value))
        .sort((a, b) => b.value - a.value)
        .slice(0, top_n);

      if (yearSlice.length > 0) {
        yearSlice.forEach((d, i) => (d.rank = i));

        // if (previousYearSlice?.length > 0) {
        yearSlice = yearSlice.map((d) => {
          const p = previousYearSlice.find((p) => p.name === d.name);
          return { ...d, previousValue: !p?.value ? d.value : p.value };
        });
        // }

        x.domain([0, d3.max(yearSlice, (d) => d.value)]);

        svg.select('.xAxis').transition().duration(tickDuration).ease(d3.easeLinear).call(xAxis);

        let bars = svg.selectAll('.bar').data(yearSlice, (d) => d.name);

        bars
          .enter()
          .append('rect')
          .attr('class', (d) => `bar ${d.name.replace(/\s/g, '_')}`)
          .attr('x', x(0) + 1)
          .attr('width', (d) => x(d.value) - x(0) - 1)
          .attr('y', (d) => y(top_n + 1) + 5)
          .attr('height', y(1) - y(0) - barPadding)
          .style('fill', (d) => d.colour)
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('y', (d) => y(d.rank) + 5);

        bars
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('width', (d) => x(d.value) - x(0) - 1)
          .attr('y', (d) => y(d.rank) + 5);

        bars
          .exit()
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('width', (d) => x(d.value) - x(0) - 1)
          .attr('y', (d) => y(top_n + 1) + 5)
          .remove();

        let labels = svg.selectAll('.label').data(yearSlice, (d) => d.name);

        labels
          .enter()
          .append('text')
          .attr('class', 'label')
          .attr('x', 140)
          // .attr('x', (d) => x(d.value) - 8)
          .attr('y', (d) => y(top_n + 1) + 5 + (y(1) - y(0)) / 2)
          .style('text-anchor', 'end')
          .style('font-size', '10px')
          .html((d) => d.name)
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1);

        labels
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('x', 140)
          .style('font-size', '10px')
          // .attr('x', (d) => x(d.value) - 8)
          .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1);

        labels
          .exit()
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('x', 140)
          .style('font-size', '10px')
          // .attr('x', (d) => x(d.value) - 8)
          .attr('y', (d) => y(top_n + 1) + 5)
          .remove();

        let valueLabels = svg.selectAll('.valueLabel').data(yearSlice, (d) => d.name);

        valueLabels
          .enter()
          .append('text')
          .attr('class', 'valueLabel')
          .attr('x', (d) => x(d.value) + 5)
          .attr('y', (d) => y(top_n + 1) + 5)
          .text((d) => d3.format(',.0f')(d.previousValue))
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1);

        valueLabels
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('x', (d) => x(d.value) + 5)
          .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
          .tween('text', function (d) {
            let i = d3.interpolateRound(d.previousValue, d.value);
            return function (t) {
              this.textContent = d3.format(',')(i(t));
            };
          });

        valueLabels
          .exit()
          .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('x', (d) => x(d.value) + 5)
          .attr('y', (d) => y(top_n + 1) + 5)
          .remove();

        yearText.html(`${months[month - 1]} - ${day}`);
        day = day + 1;
      }

      if (yearSlice.length === 0) {
        month += 1;
        day = 1;
      }

      // if (month === 3 && day === 2) {
      //   ticker.stop();
      //   isActive = false;
      // }
      if (month === 12 && yearSlice.length === 0) {
        ticker.stop();
        isActive = false;
      }
    }, tickDuration);
  });
}

function genBtn() {
  const playBtn = document.createElement('button');
  playBtn.textContent = 'Play |>';

  document.body.appendChild(playBtn);
  playBtn.classList.add('play-btn');
  playBtn.addEventListener('click', (e) => {
    if (!isActive) {
      isActive = true;
      startChart();
    }
  });
}

const halo = function (text, strokeWidth) {
  text
    .select(function () {
      return this.parentNode.insertBefore(this.cloneNode(true), this);
    })
    .style('fill', '#ffffff')
    .style('stroke', '#ffffff')
    .style('stroke-width', strokeWidth)
    .style('stroke-linejoin', 'round')
    .style('opacity', 1);
};
